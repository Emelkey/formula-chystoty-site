// Visual/layout regression. Never submits forms or sends analytics.
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium, webkit } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const origin = new URL(process.env.MOTION_QA_BASE_URL || 'http://127.0.0.1:3100').origin;
const output = resolve(process.env.MOTION_QA_OUTPUT || 'outputs/motion-layout');
mkdirSync(output, { recursive: true });
const receipt = { origin, checks: [], failures: [], realLeadsSent: 0, telemetryDelivered: 0 };
for (const [engine, type] of Object.entries({ chromium, webkit })) {
  const browser = await type.launch({ headless: true });
  try {
    for (const width of [320, 390, 768, 1024, 1280, 1365, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: width < 1024, isMobile: width < 1024, serviceWorkers: 'block' });
      await context.route('**/*', route => {
        const req = route.request(), url = new URL(req.url());
        return req.method() === 'GET' && url.origin === origin && !url.pathname.startsWith('/api/') ? route.continue() : route.abort();
      });
      await context.routeWebSocket('**/*', socket => socket.close());
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        await page.goto(origin, { waitUntil: 'networkidle' });
        const prices = page.locator('[data-pricing-section]');
        const lastCard = prices.locator('a.service-motion-card').last();
        await lastCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal page overflow');
        if (width >= 1024) {
          const rail = page.locator('.floating-contact-desktop');
          const box = await rail.boundingBox();
          assert.ok(box && box.width === 48, 'desktop rail stays compact');
          const rightEdges = await prices.locator('a.service-motion-card').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().right));
          assert.ok(Math.max(...rightEdges) + 8 < box.x, 'contact rail never overlaps prices, including focus outline');
          const cta = rail.getByRole('link', { name: 'Залишити заявку', exact: true });
          assert.equal(await cta.getAttribute('href'), '/kontakty#contact-form');
          await cta.focus();
          assert.notEqual(await cta.evaluate(e => getComputedStyle(e).outlineStyle), 'none');
        } else {
          const summary = page.locator('details > summary.button-spring');
          assert.ok(await summary.isVisible());
          for (let toggle = 0; toggle < 2; toggle++) {
            await summary.click();
            assert.ok(await page.locator('details[open] a[aria-label="Залишити заявку"]').isVisible());
            await summary.click();
            assert.equal(await summary.evaluate(e => e.parentElement.open), false);
          }
        }
        await page.screenshot({ path: resolve(output, `${engine}-${width}-prices.png`) });
        const card = page.locator('[aria-label^="Основні послуги"] article').first();
        await card.scrollIntoViewIfNeeded();
        await card.locator('a').first().focus();
        await page.waitForTimeout(300);
        const moved = await card.evaluate(e => new DOMMatrixReadOnly(getComputedStyle(e).transform).m42);
        assert.ok(moved < 0, 'keyboard focus receives service-card lift');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForTimeout(60);
        assert.equal(await card.evaluate(e => getComputedStyle(e).transform), 'none');
        assert.equal(await card.locator('img').evaluate(e => getComputedStyle(e).transform), 'none');
        await page.screenshot({ path: resolve(output, `${engine}-${width}-services.png`) });
        assert.deepEqual(errors, []);
        receipt.checks.push({ engine, width, status: 'PASS' });
      } catch (error) {
        receipt.failures.push({ engine, width, error: error.message });
        await page.screenshot({ path: resolve(output, `${engine}-${width}-failure.png`) }).catch(() => {});
      } finally { await context.close(); }
    }
  } finally { await browser.close(); }
}
writeFileSync(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt));
assert.equal(receipt.failures.length, 0, JSON.stringify(receipt.failures));
