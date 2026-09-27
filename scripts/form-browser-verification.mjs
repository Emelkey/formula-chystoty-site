// Real hydrated DOM regression. All lead requests and telemetry are intercepted before navigation.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const require = createRequire(import.meta.url);
assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'Set GA4_PLAYWRIGHT_DIR to an isolated Playwright installation');
const { chromium, webkit } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const origin = new URL(process.env.FORM_QA_BASE_URL || 'http://127.0.0.1:3100').origin;
const output = resolve(process.env.FORM_QA_OUTPUT || 'outputs/form-browser');
mkdirSync(output, { recursive: true });
const receipt = { checkedAt: new Date().toISOString(), origin, realLeadsSent: 0, telemetryDelivered: 0, scenarios: [], failures: [] };
const expectedId = 'G-E2Q1N11QWJ';
const phone = '0970000001'; // Sent only to this script's mocked route.
for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
  const browser = await browserType.launch({ headless: true });
  try {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1365, height: 900 }]) {
      const context = await browser.newContext({ viewport, locale: 'uk-UA', serviceWorkers: 'block' });
      let requests = [], blocked = [], reply = { status: 200, body: '{"success":true}' }, delayMs = 0;
      // Default deny. Form behavior needs only site GETs; ga4-verification.mjs separately exercises the real external tag.
      await context.route('**/*', async route => {
        const request = route.request(), url = new URL(request.url());
        if (url.origin === origin && url.pathname === '/api/lead') {
          requests.push(JSON.parse(request.postData() || '{}'));
          if (delayMs) await new Promise(r => setTimeout(r, delayMs));
          return route.fulfill({ status: reply.status, contentType: 'application/json', body: reply.body });
        }
        if (url.pathname.endsWith('/collect')) {
          blocked.push({ host: url.host, kind: 'telemetry' });
          return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true' } });
        }
        if (request.method() === 'GET' && url.origin === origin) return route.continue();
        blocked.push({ host: url.host, kind: 'denied' });
        return route.abort();
      });
      const page = await context.newPage();
      // Let the previous document finish its same-origin RSC prefetches before a forced fixture reset.
      // This is reset isolation, not a page-readiness signal; hydration assertions below stay unchanged.
      const inflightRsc = new Set();
      let lastRscActivity = 0;
      page.on('request', request => {
        const url = new URL(request.url());
        if (url.origin === origin && (url.searchParams.has('_rsc') || request.headers().rsc === '1')) {
          inflightRsc.add(request);
          lastRscActivity = Date.now();
        }
      });
      for (const event of ['requestfinished', 'requestfailed']) page.on(event, request => {
        if (inflightRsc.delete(request)) lastRscActivity = Date.now();
      });
      async function drainRscBeforeForcedNavigation() {
        if (page.url() === 'about:blank') return;
        const started = Date.now();
        while (inflightRsc.size || Date.now() - lastRscActivity < 200) {
          if (Date.now() - started > 30000) throw new Error('RSC requests did not settle before fixture reset: ' + [...inflightRsc].map(request => request.url()).join(', '));
          await new Promise(resolve => setTimeout(resolve, 25));
        }
      }
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const form = page.locator('form#contact-form').first();
      const leads = async () => page.evaluate(() => (window.dataLayer || []).filter(x => x[0] === 'event' && x[1] === 'lead_submit').map(x => x[2]));
      async function reset(path = '/kontakty') {
        await drainRscBeforeForcedNavigation();
        requests = []; reply = { status: 200, body: '{"success":true}' }; delayMs = 0;
        await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
        await page.waitForFunction(() => typeof window.gtag === 'function');
        // Verify the real React input handler is active before each scenario.
        await form.locator('[name="phone"]').fill('qa');
        await page.waitForFunction(() => document.querySelector('form#contact-form input[name="phone"]')?.validity.customError);
        await form.locator('[name="phone"]').fill('');
        await form.locator('[name="name"]').fill('SYNTHETIC QA');
      }
      async function fill(value = phone) { await form.locator('[name="phone"]').fill(value); }
      async function submit() { await form.locator('button[type="submit"]').click(); }
      async function check(name, task) {
        try { await task(); receipt.scenarios.push({ engine, viewport, name, status: 'PASS' }); }
        catch (error) { receipt.failures.push({ engine, viewport, name, error: error.message }); }
      }
      for (const value of ['0970000001', '380970000001', '+380970000001', '+38 (097) 000-00-01']) {
        await check('normalize ' + value, async () => {
          await reset(); await fill(value); await submit();
          await form.getByRole('status').waitFor();
          assert.equal(requests.length, 1); assert.equal(requests[0].phone, '+380970000001');
          const events = await leads(); assert.equal(events.length, 1); assert.equal(events[0].send_to, expectedId);
          assert.deepEqual(Object.keys(events[0]).sort(), ['event_category','event_label','send_to']);
        });
      }
      for (const value of ['', '097', '097000000111', '0970000001abc']) {
        await check('invalid phone ' + value, async () => {
          await reset(); await fill(value); await submit();
          assert.equal(await form.locator('[name="phone"]').evaluate(e => e.checkValidity()), false);
          assert.equal(requests.length, 0); assert.equal((await leads()).length, 0);
        });
      }
      for (const failure of [{ status: 200, body: '{"success":false}' }, { status: 200, body: 'invalid JSON' }, { status: 400, body: '{"success":false}' }, { status: 502, body: '{"success":false,"error":"telegram_send_failed"}' }]) {
        await check('server failure ' + failure.status + ' ' + failure.body, async () => {
          await reset(); reply = failure; await fill(); await submit(); await form.getByRole('alert').waitFor();
          assert.equal(await form.getByRole('status').count(), 0); assert.equal((await leads()).length, 0);
          assert.ok(await form.locator('a[href^="tel:"]').count());
        });
      }
      await check('pending click and Enter produce one request', async () => {
        await reset(); delayMs = 1200; await fill(); await submit();
        await form.locator('[name="phone"]').press('Enter');
        await form.evaluate(e => e.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
        await form.getByRole('status').waitFor(); assert.equal(requests.length, 1); assert.equal((await leads()).length, 1);
      });
      await check('honeypot sends nothing', async () => {
        await reset(); await fill(); await form.locator('[name="website"]').evaluate(e => { e.value = 'bot'; }); await submit();
        assert.equal(requests.length, 0); assert.equal((await leads()).length, 0);
      });
      for (const analytics of ['missing', 'throwing']) {
        await check('analytics ' + analytics + ' preserves business success', async () => {
          await reset(); await page.evaluate(mode => { window.gtag = mode === 'missing' ? undefined : () => { throw new Error('synthetic analytics failure'); }; }, analytics);
          await fill(); await submit(); await form.getByRole('status').waitFor(); assert.equal(requests.length, 1);
          assert.equal(await form.getByRole('alert').count(), 0);
        });
      }
      await check('SPA navigation retains one correctly routed form event', async () => {
        await reset('/'); await page.evaluate(() => { window.__qaDocument = 'same'; });
        if (viewport.width < 1024) await page.getByRole('button', { name: 'Відкрити меню' }).click();
        await page.locator(viewport.width < 1024 ? '#mobile-menu a[href="/kontakty"]' : 'header nav a[href="/kontakty"]').click();
        await page.waitForURL('**/kontakty'); assert.equal(await page.evaluate(() => window.__qaDocument), 'same');
        await form.locator('[name="name"]').fill('SYNTHETIC QA'); await fill(); await submit(); await form.getByRole('status').waitFor();
        assert.equal(requests.length, 1); const events = await leads(); assert.equal(events.length, 1); assert.equal(events[0].send_to, expectedId);
      });
      if (process.env.FORM_QA_EXPECT_UX === '1') {
        await check('photo explanation and contact destinations', async () => {
          await reset(); const note = form.locator('[data-photo-estimate]'); assert.equal(await note.count(), 1);
          assert.match(await note.innerText(), /Фото через цю форму не передаються/);
          assert.equal(await note.locator('a').nth(0).getAttribute('href'), 'https://t.me/formula_chystoty/');
          assert.equal(await note.locator('a').nth(1).getAttribute('href'), 'viber://chat/?number=%2B380978095800');
          await note.screenshot({ path: resolve(output, `${engine}-${viewport.width}-photo.png`) });
          await note.locator('a').evaluateAll(links => links.forEach(link => link.addEventListener('click', event => event.preventDefault())));
          await note.locator('a').nth(0).click(); await note.locator('a').nth(1).click();
          const contacts = await page.evaluate(() => (window.dataLayer || []).filter(x => x[0] === 'event' && ['telegram_click', 'viber_click'].includes(x[1])).map(x => ({ name: x[1], params: x[2] })));
          assert.deepEqual(contacts.map(x => x.name).sort(), ['telegram_click', 'viber_click']);
          assert.ok(contacts.every(x => x.params.send_to === expectedId));
          assert.equal((await leads()).length, 0); assert.equal(requests.length, 0);
        });
        await check('minimum order visible outside protected hero', async () => {
          await reset('/himchystka-mebliv-cherkasy'); const notes = page.locator('[data-minimum-order]');
          assert.equal(await notes.count(), 2); assert.match(await notes.first().innerText(), /від 3000 грн/);
          assert.equal(await page.locator('main > section').first().locator('[data-minimum-order]').count(), 0);
          await notes.first().screenshot({ path: resolve(output, `${engine}-${viewport.width}-minimum.png`) });
        });
      }
      await check('no uncaught runtime errors', async () => assert.deepEqual(errors, []));
      receipt.scenarios.push({ engine, viewport, name: 'pre-navigation default-deny network guard', status: 'PASS', mockedLeadEndpoint: true, interceptedRequests: blocked.length });
      await context.close();
    }
  } finally { await browser.close(); }
}
writeFileSync(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify({ passed: receipt.scenarios.length, failures: receipt.failures, realLeadsSent: 0, telemetryDelivered: 0 }, null, 2));
if (receipt.failures.length) process.exitCode = 1;
