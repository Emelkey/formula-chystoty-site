// Read-only UI QA: no leads or analytics leave the browser.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium, webkit } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR || '.', 'node_modules/playwright'));
const origin = new URL(process.env.CONTENT_QA_BASE_URL || 'http://127.0.0.1:3100').origin;
const results = [];
for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
const browser = await browserType.launch({ headless: true, ...(engine === 'chromium' && process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}) });
async function contextFor(options) {
  const context = await browser.newContext({ serviceWorkers: 'block', ...options });
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (request.method() === 'GET' && url.origin === origin && !url.pathname.startsWith('/api/')) return route.continue();
    return route.abort();
  });
  return context;
}
try {
  for (const viewport of [{ width: 1365, height: 900 }, { width: 390, height: 844 }]) {
    const context = await contextFor({ viewport, isMobile: viewport.width < 768, hasTouch: viewport.width < 768 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      const animate = Element.prototype.animate;
      window.contentMotionCalls = [];
      Element.prototype.animate = function (...args) {
        if (this.matches('[data-reveal]')) window.contentMotionCalls.push(this.getAttribute('data-reveal'));
        return animate.apply(this, args);
      };
    });
    await page.goto(origin, { waitUntil: 'networkidle' });
    const step = page.locator('[data-reveal="step"]').first();
    await step.evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForFunction(() => document.querySelector('[data-reveal="step"]')?.getAttribute('data-revealed') === 'true');
    await page.waitForTimeout(450);
    const calls = await page.evaluate(() => window.contentMotionCalls.filter(item => item === 'step').length);
    assert.ok(calls > 0, 'steps animate on entry');
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await step.evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForTimeout(450);
    assert.equal(await page.evaluate(() => window.contentMotionCalls.filter(item => item === 'step').length), calls, 'steps do not replay');
    const work = page.locator('[data-reveal="work"]').first();
    await work.locator('a').first().focus();
    await page.waitForTimeout(50);
    assert.equal(await work.evaluate(element => element.getAnimations().length), 0, 'focus cancels entrance immediately');
    assert.equal(await work.evaluate(element => getComputedStyle(element).opacity), '1');
    await page.goto(origin + '/poslugy', { waitUntil: 'networkidle' });
    const detail = page.locator('[data-motion-details]').first();
    const summary = detail.locator('summary');
    const activate = () => viewport.width < 768 ? summary.tap() : summary.click();
    await summary.focus();
    await summary.press('Enter');
    await page.waitForTimeout(240);
    assert.equal(await detail.evaluate(element => element.open), true, 'Enter opens native details');
    await summary.press('Space');
    await page.waitForTimeout(180);
    assert.equal(await detail.evaluate(element => element.open), false, 'Space closes native details');
    await activate();
    await page.waitForTimeout(40);
    await activate();
    await page.waitForTimeout(40);
    await activate();
    await page.waitForTimeout(250);
    assert.equal(await detail.evaluate(element => element.open), true, 'interrupted open/close/open settles open');
    assert.equal(await detail.locator('div').first().evaluate(element => getComputedStyle(element).opacity), '1');
    await activate();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('[data-motion-details]')?.open);
    assert.equal(await detail.evaluate(element => element.open), false, 'motion preference change settles closing');
    await summary.press('Enter');
    assert.equal(await detail.evaluate(element => element.open), true);
    assert.equal(await detail.evaluate(element => element.getAnimations({ subtree: true }).length), 0, 'reduced motion uses native toggle');
    await page.goto(origin, { waitUntil: 'networkidle' });
    await step.evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForTimeout(80);
    assert.equal(await page.evaluate(() => window.contentMotionCalls.length), 0, 'reduced motion skips reveals');
    assert.deepEqual(errors, [], 'no page errors');
    results.push({ engine, viewport, status: 'PASS', cases: ['once-only reveal', 'focus visibility', 'keyboard FAQ', 'rapid reversals', 'live reduced-motion change', 'reduced-motion entrances'] });
    await context.close();
  }
  const context = await contextFor({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(origin + '/poslugy');
  const detail = page.locator('[data-motion-details]').first();
  await detail.locator('summary').click();
  assert.equal(await detail.evaluate(element => element.open), true, 'FAQ works without JS');
  await page.goto(origin);
  assert.equal(await page.locator('[data-reveal="step"]').first().evaluate(element => getComputedStyle(element).opacity), '1', 'content visible without JS');
  results.push({ engine, javascript: false, status: 'PASS' });
  await context.close();
} finally {
  await browser.close();
}
}
console.log(JSON.stringify({ origin, realLeadsSent: 0, results }, null, 2));
