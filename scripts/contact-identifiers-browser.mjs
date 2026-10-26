// Hydrated regression: all lead submissions are intercepted, never delivered.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium, webkit } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const origin = process.env.FORM_QA_BASE_URL || 'http://127.0.0.1:3100';
assert.ok(/^http:\/\/127\.0\.0\.1:\d+$/.test(origin), 'Mock submissions are local-only');
const output = process.env.CONTACT_ID_QA_OUTPUT || 'outputs/contact-identifiers';
mkdirSync(output, { recursive: true });
const receipt = { checkedAt: new Date().toISOString(), checks: [], realLeadsSent: 0, telemetryDelivered: 0 };
for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
  const browser = await browserType.launch();
  try {
    for (const width of [390, 1365]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
      let requests = 0, successful = true;
      await context.route('**/*', async route => {
        const req = route.request(), url = new URL(req.url());
        if (url.origin === origin && url.pathname === '/api/lead') {
          requests++;
          return route.fulfill({ status: successful ? 200 : 502, contentType: 'application/json', body: JSON.stringify({ success: successful }) });
        }
        if (req.method() === 'GET' && url.origin === origin) return route.continue();
        return route.abort();
      });
      await context.routeWebSocket('**/*', ws => ws.close());
      const page = await context.newPage(), errors = [];
      page.on('pageerror', e => errors.push(e.message));
      for (const id of ['contact-form', 'contact-estimate-form']) {
        await page.goto(origin + '/kontakty#' + id, { waitUntil: 'networkidle' });
        // A hash-only navigation preserves React state; reload isolates each form fixture.
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForFunction(() => typeof window.gtag === 'function');
        const form = page.locator('form#' + id);
        assert.equal(await form.count(), 1);
        const ids = await page.locator('[id]').evaluateAll(elements => elements.map(e => e.id));
        assert.equal(ids.length, new Set(ids).size, 'No duplicate IDs in DOM');
        assert.equal(await page.evaluate(() => document.querySelector(location.hash)?.tagName), 'FORM');
        assert.equal(await page.locator('form').first().getAttribute('id'), 'contact-form');
        assert.equal(await form.locator('input[name="name"]').evaluate(e => e.labels.length), 1);
        assert.equal(await form.locator('input[name="phone"]').evaluate(e => e.labels.length), 1);
        requests = 0;
        await form.locator('[name="phone"]').fill('qa');
        await page.waitForFunction(formId => document.querySelector('#' + formId + ' input[name="phone"]').validity.customError, id);
        await form.locator('[name="phone"]').fill('');
        await form.locator('button[type="submit"]').click();
        assert.equal(await form.locator('[name="name"]').evaluate(e => document.activeElement === e), true);
        assert.equal(requests, 0);
        await form.locator('[name="name"]').fill('SYNTHETIC QA');
        await form.locator('[name="phone"]').fill('097');
        await form.locator('button[type="submit"]').click();
        assert.equal(await form.locator('[name="phone"]').evaluate(e => document.activeElement === e), true);
        assert.equal(requests, 0);
        await form.locator('[name="phone"]').fill('0970000001');
        successful = false;
        await form.locator('button[type="submit"]').click();
        await form.getByRole('alert').waitFor();
        assert.equal(requests, 1);
        assert.equal(await form.getByRole('status').count(), 0);
        successful = true;
        await form.locator('button[type="submit"]').click();
        await form.getByRole('status').waitFor();
        assert.equal(requests, 2);
        assert.equal(await form.getByRole('alert').count(), 0);
        const other = page.locator('form#' + (id === 'contact-form' ? 'contact-estimate-form' : 'contact-form'));
        assert.equal(await other.locator('[role="status"], [role="alert"]').count(), 0, 'Independent status per form');
        const events = await page.evaluate(() => (window.dataLayer || []).filter(x => x[0] === 'event' && x[1] === 'lead_submit'));
        assert.equal(events.length, 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
        await form.screenshot({ path: `${output}/${engine}-${width}-${id}.png` });
        receipt.checks.push({ engine, width, id, uniqueIds: true, labels: true, anchor: true, validationFocus: true, errorThenSuccess: true, isolatedState: true, successEventOnly: true });
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
  } finally { await browser.close(); }
}
writeFileSync(`${output}/receipt.json`, JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
