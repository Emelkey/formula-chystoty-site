import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { trackAnalyticsEvent } from '../lib/analytics.ts';

const expectedId = 'G-E2Q1N11QWJ';
const disabledId = 'G-FNN4YK664L';
const origin = 'https://www.formula-chistoty.ck.ua';
const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const eventNames = ['lead_submit', 'phone_click', 'telegram_click', 'viber_click', 'instagram_click', 'calculate_click', 'contact_form_open'];
const checks = [];
function check(name, fn) { fn(); checks.push(name); }
check('one verified loader', () => assert.deepEqual([...layout.matchAll(/gtag\/js\?id=(G-[A-Z0-9]+)/g)].map((m) => m[1]), [expectedId]));
check('one verified configuration', () => assert.deepEqual([...layout.matchAll(/gtag\('config', '(G-[A-Z0-9]+)'\)/g)].map((m) => m[1]), [expectedId]));
check('destination guard precedes hydration', () => assert.match(layout, /id="google-analytics-destination-guard" strategy="beforeInteractive"/));
check('only obsolete destination disabled', () => assert.deepEqual([...layout.matchAll(/window\['ga-disable-(G-[A-Z0-9]+)'\] = true/g)].map((m) => m[1]), [disabledId]));
check('event queue preserved', () => assert.match(layout, /window\.dataLayer = window\.dataLayer \|\| \[\]/));
check('server rendering does not require window', () => { assert.equal(typeof window, 'undefined'); trackAnalyticsEvent('lead_submit', { event_category: 'lead', event_label: 'test' }); });
try {
  for (const event of eventNames) {
    check(`route ${event} exactly once`, () => {
      const calls = [];
      globalThis.window = { gtag: (...args) => calls.push(args) };
      const params = { event_category: 'lead', event_label: 'test' };
      trackAnalyticsEvent(event, params);
      assert.deepEqual(calls, [['event', event, { ...params, send_to: expectedId }]]);
      assert.equal(Object.hasOwn(params, 'send_to'), false);
    });
  }
  check('caller cannot replace destination', () => {
    let received;
    globalThis.window = { gtag: (...args) => { received = args[2]; } };
    trackAnalyticsEvent('lead_submit', { event_category: 'lead', event_label: 'test', send_to: disabledId });
    assert.equal(received.send_to, expectedId);
  });
  check('missing analytics is non-blocking', () => { globalThis.window = {}; trackAnalyticsEvent('phone_click', { event_category: 'contact', event_label: 'test' }); });
  check('throwing analytics is non-blocking', () => { globalThis.window = { gtag() { throw new Error('test'); } }; trackAnalyticsEvent('lead_submit', { event_category: 'lead', event_label: 'test' }); });
} finally { delete globalThis.window; }
console.log(`PASS: ${checks.length} source and routing checks`);

if (process.argv.includes('--sandbox') || process.argv.includes('--live')) {
  const require = createRequire(import.meta.url);
  assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'GA4_PLAYWRIGHT_DIR must point to an isolated Playwright installation');
  const { chromium } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
  const live = process.argv.includes('--live');
  const output = resolve('outputs/ga4-browser');
  mkdirSync(output, { recursive: true });
  const receipt = { checkedAt: new Date().toISOString(), expectedId, disabledId, sourceChecks: checks, mode: live ? 'production-with-intercepted-telemetry-and-mocked-lead-API' : 'isolated-real-tag-with-intercepted-telemetry', realLeadsSent: 0, analyticsEventsSent: 0, note: 'Telemetry requests are intercepted in this browser and never delivered. This proves routing, not GA4 ingestion, Telegram delivery or Google Ads import.', pages: [] };
  const browser = await chromium.launch({ headless: true });
  try {
    const paths = live ? ['/', '/prybyrannya-kvartyr-cherkasy', '/himchystka-mebliv-cherkasy'] : ['/'];
    for (let index = 0; index < paths.length; index += 1) {
      const result = { path: paths[index], interceptedHits: [], errors: [], loader: [], mockedLeadRequests: 0, pass: false };
      receipt.pages.push(result);
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'uk-UA', serviceWorkers: 'block' });
      let leadSuccess = false;
      await context.route('**/*', async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        const params = new URLSearchParams(url.search);
        if (url.pathname.endsWith('/g/collect') || url.pathname === '/collect') {
          for (const body of (request.postData() || '').split('\n')) {
            const entry = new URLSearchParams(params);
            for (const [key, value] of new URLSearchParams(body)) entry.set(key, value);
            result.interceptedHits.push({ destination: entry.get('tid'), event: entry.get('en'), intercepted: true });
          }
          return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true' } });
        }
        if (url.origin === origin && url.pathname === '/api/lead') {
          result.mockedLeadRequests += 1;
          return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: leadSuccess }) });
        }
        if (!live && request.isNavigationRequest() && url.origin === origin) {
          const guard = layout.match(/<Script id="google-analytics-destination-guard"[^>]*>\s*\{`([\s\S]*?)`\}/)?.[1];
          const init = layout.match(/<Script id="google-analytics"[^>]*>\s*\{`([\s\S]*?)`\}/)?.[1];
          assert.ok(guard && init, 'Extract the actual guarded initialization from the changed source');
          return route.fulfill({ status: 200, contentType: 'text/html', body: `<!doctype html><html><head><script>${guard}</script><script>${init}</script><script async src="https://www.googletagmanager.com/gtag/js?id=${expectedId}"></script></head><body><h1>Isolated tracking test</h1></body></html>` });
        }
        const publicSiteRead = url.origin === origin && request.method() === 'GET';
        const publicTagRead = url.hostname === 'www.googletagmanager.com' && /^\/gtag\/(js|destination)$/.test(url.pathname) && request.method() === 'GET';
        if (publicSiteRead || publicTagRead) return route.continue();
        // Fail closed for all other destinations and methods, including telemetry beacons.
        return route.abort();
      });
      const page = await context.newPage();
      page.on('pageerror', (error) => result.errors.push(String(error.message).slice(0, 200)));
      page.on('response', (response) => {
        const url = new URL(response.url());
        if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') result.loader.push({ id: url.searchParams.get('id'), status: response.status() });
      });
      async function waitUntil(predicate, message) {
        for (let attempt = 0; attempt < 40 && !predicate(); attempt += 1) await page.waitForTimeout(250);
        assert.ok(predicate(), message);
      }
      try {
        const response = await page.goto(`${origin}${paths[index]}?qa_isolation=20260925`, { waitUntil: 'domcontentloaded', timeout: 45000 });
        result.httpStatus = response?.status();
        await waitUntil(() => result.interceptedHits.some((hit) => hit.destination === expectedId && hit.event === 'page_view'), 'No page_view for verified destination');
        if (!live) {
          await page.evaluate(({ source, events }) => {
            const track = (0, eval)(`(${source})`);
            for (const event of events) track(event, { event_category: 'lead', event_label: 'isolated_test' });
          }, { source: trackAnalyticsEvent.toString(), events: eventNames });
          await waitUntil(() => eventNames.every((event) => result.interceptedHits.some((hit) => hit.event === event && hit.destination === expectedId)), 'Not all contact events reached the verified destination');
          for (const event of eventNames) assert.equal(result.interceptedHits.filter((hit) => hit.event === event && hit.destination === expectedId).length, 1, `${event} duplicated`);
        } else if (index === 0) {
          const form = page.locator('form#contact-form');
          await form.locator('input[name="name"]').fill('QA local intercepted test');
          await form.locator('input[name="phone"]').fill('123');
          await form.locator('button[type="submit"]').click();
          await page.waitForTimeout(200);
          assert.equal(result.mockedLeadRequests, 0, 'Invalid number must not reach API');
          await form.locator('input[name="phone"]').fill('+38 (000) 000-00-00');
          await form.locator('button[type="submit"]').click();
          await form.locator('[role="alert"]').waitFor({ state: 'visible' });
          assert.equal(result.mockedLeadRequests, 1);
          assert.equal(result.interceptedHits.filter((hit) => hit.event === 'lead_submit').length, 0, 'Rejected server response must not emit a lead');
          leadSuccess = true;
          await form.evaluate((element) => { element.requestSubmit(); element.requestSubmit(); });
          await form.locator('[role="status"]').waitFor({ state: 'visible' });
          await waitUntil(() => result.interceptedHits.some((hit) => hit.event === 'lead_submit'), 'Successful mocked delivery must emit a lead');
          assert.equal(result.mockedLeadRequests, 2, 'Double submit must result in one additional request');
          assert.equal(result.interceptedHits.filter((hit) => hit.event === 'lead_submit').length, 1, 'Exactly one lead event after confirmed mocked delivery');
          result.formChecks = ['invalid phone blocked', 'success=false does not emit lead', 'double submit locked', 'success=true emits one routed lead'];
        }
        await page.waitForTimeout(2000);
        result.dom = await page.evaluate(() => ({
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          h1Count: document.querySelectorAll('h1').length,
          disabledOld: window['ga-disable-G-FNN4YK664L'] === true,
          disabledVerified: window['ga-disable-G-E2Q1N11QWJ'] === true,
          configIds: (window.dataLayer || []).filter((entry) => entry?.[0] === 'config').map((entry) => entry[1]),
          phoneInputs: [...document.querySelectorAll('input[name="phone"]')].map((input) => ({ pattern: input.getAttribute('pattern'), required: input.required })),
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
        }));
        assert.equal(result.httpStatus, 200);
        assert.equal(result.dom.disabledOld, true);
        assert.equal(result.dom.disabledVerified, false);
        assert.deepEqual(result.dom.configIds, [expectedId]);
        assert.equal(result.interceptedHits.filter((hit) => hit.destination === disabledId).length, 0, 'Obsolete destination received telemetry');
        assert.equal(result.interceptedHits.filter((hit) => hit.destination === expectedId && hit.event === 'page_view').length, 1, 'Initial page_view must not duplicate');
        assert.ok(result.loader.some((item) => item.id === expectedId && item.status === 200));
        assert.equal(result.errors.length, 0);
        assert.equal(result.dom.h1Count, 1);
        if (live) {
          assert.equal(result.dom.horizontalOverflow, false);
          assert.ok(result.dom.phoneInputs.length > 0);
          assert.ok(result.dom.phoneInputs.every((input) => input.pattern === null));
          // Remove test data before taking the public-page screenshot.
          await page.locator('input[name="name"]').fill('');
          await page.locator('input[name="phone"]').fill('');
          await page.screenshot({ path: resolve(output, `page-${index + 1}.png`) });
        }
        result.pass = true;
      } catch (error) {
        result.failure = String(error.message).slice(0, 700);
        process.exitCode = 1;
      } finally { await context.close(); }
    }
  } finally {
    await browser.close();
    receipt.pass = receipt.pages.every((page) => page.pass);
    writeFileSync(resolve(output, live ? 'production-receipt.json' : 'sandbox-receipt.json'), JSON.stringify(receipt, null, 2));
    console.log(JSON.stringify(receipt, null, 2));
    if (!receipt.pass) process.exitCode = 1;
  }
}
