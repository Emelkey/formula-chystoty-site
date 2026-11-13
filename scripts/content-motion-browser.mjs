// Read-only UI QA: no leads or analytics leave the browser.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium, webkit } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR || '.', 'node_modules/playwright'));
const origin = new URL(process.env.CONTENT_QA_BASE_URL || 'http://127.0.0.1:3100').origin;
const output = resolve(process.env.CONTENT_QA_OUTPUT || 'outputs/content-motion');
mkdirSync(output, { recursive: true });
const receipt = {
  origin, realLeadsSent: 0, telemetryDelivered: 0, results: [], failures: [],
  noJavaScriptScope: 'Component-level progressive enhancement using unchanged native details and reveal markup extracted from real SSR responses, with the real stylesheets. Not a whole-application no-JS claim: the inherited root Suspense/loading boundary needs framework JavaScript to reveal the route.'
};
const persist = () => writeFileSync(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
const capture = (page, name) => page.screenshot({ path: resolve(output, `${name}.png`) });
for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
const browser = await browserType.launch({ headless: true, ...(engine === 'chromium' && process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}) });
async function contextFor(options) {
  const context = await browser.newContext({ serviceWorkers: 'block', ...options });
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (request.method() === 'GET' && url.origin === origin && !url.pathname.startsWith('/api/')) return route.continue();
    return route.abort();
  });
  await context.routeWebSocket('**/*', socket => socket.close());
  return context;
}
try {
  for (const viewport of [{ width: 1365, height: 900 }, { width: 390, height: 844 }]) {
    const context = await contextFor({ viewport, isMobile: viewport.width < 768, hasTouch: viewport.width < 768 });
    const page = await context.newPage();
    // Forced fixture navigation must not abort earlier Next.js RSC prefetches.
    // Match the existing form QA isolation, rather than suppressing page errors.
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
    async function navigate(path = '') {
      if (page.url() !== 'about:blank') {
        const started = Date.now();
        while (inflightRsc.size || Date.now() - lastRscActivity < 200) {
          if (Date.now() - started > 30000) throw new Error('RSC prefetches did not settle before fixture navigation');
          await new Promise(resolve => setTimeout(resolve, 25));
        }
      }
      await page.goto(origin + path, { waitUntil: 'networkidle' });
    }
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
    await page.addInitScript(() => {
      const animate = Element.prototype.animate;
      window.contentMotionCalls = [];
      Element.prototype.animate = function (...args) {
        if (this.matches('[data-reveal]')) window.contentMotionCalls.push(this.getAttribute('data-reveal'));
        return animate.apply(this, args);
      };
    });
    await navigate();
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
    await capture(page, `${engine}-${viewport.width}-work-focus`);
    await navigate('/poslugy');
    const detail = page.locator('[data-motion-details]').first();
    const summary = detail.locator('summary');
    const activate = () => viewport.width < 768 ? summary.tap() : summary.click();
    // Wait for the observable settled state, not a timer racing WebKit's animation callbacks.
    const waitForDetails = async (open) => {
      const handle = await detail.elementHandle();
      try {
        await page.waitForFunction(({ element, open }) =>
          element.open === open && element.getAnimations({ subtree: true }).length === 0,
          { element: handle, open }, { timeout: 2000, polling: 'raf' });
      } finally { await handle?.dispose(); }
    };
    await summary.focus();
    await summary.press('Enter');
    await waitForDetails(true);
    assert.equal(await detail.evaluate(element => element.open), true, 'Enter opens native details');
    await summary.press('Space');
    await waitForDetails(false);
    assert.equal(await detail.evaluate(element => element.open), false, 'Space closes native details');
    await activate();
    await page.waitForTimeout(40);
    await activate();
    await page.waitForTimeout(40);
    await activate();
    await waitForDetails(true);
    assert.equal(await detail.evaluate(element => element.open), true, 'interrupted open/close/open settles open');
    assert.equal(await detail.locator('div').first().evaluate(element => getComputedStyle(element).opacity), '1');
    await capture(page, `${engine}-${viewport.width}-faq-open`);
    await activate();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('[data-motion-details]')?.open);
    assert.equal(await detail.evaluate(element => element.open), false, 'motion preference change settles closing');
    await summary.press('Enter');
    assert.equal(await detail.evaluate(element => element.open), true);
    assert.equal(await detail.evaluate(element => element.getAnimations({ subtree: true }).length), 0, 'reduced motion uses native toggle');
    await navigate();
    await step.evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForTimeout(80);
    assert.equal(await page.evaluate(() => window.contentMotionCalls.length), 0, 'reduced motion skips reveals');
    assert.deepEqual(errors, [], 'no page errors');
    receipt.results.push({ engine, viewport, status: 'PASS', cases: ['once-only reveal', 'focus visibility', 'keyboard FAQ', 'rapid reversals', 'live reduced-motion change', 'reduced-motion entrances'] });
    } catch (error) {
      receipt.failures.push({ engine, viewport, error: error.stack || error.message });
      await capture(page, `${engine}-${viewport.width}-failure`).catch(() => {});
    } finally {
      persist();
      await context.close();
    }
  }
  const context = await contextFor({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    // The root loading/Suspense shell is pre-existing and needs framework JS.
    // Extract the actual component nodes from inert server HTML, not a hand-built
    // lookalike, so the no-JS assertion is honestly scoped to our enhancement.
    const faqResponse = await context.request.get(origin + '/poslugy', { maxRedirects: 0 });
    const homeResponse = await context.request.get(origin + '/', { maxRedirects: 0 });
    assert.ok(faqResponse.ok() && homeResponse.ok(), 'SSR sources returned successful responses');
    const fixture = await page.evaluate(({ faqHtml, homeHtml }) => {
      const parser = new DOMParser();
      const faq = parser.parseFromString(faqHtml, 'text/html');
      const home = parser.parseFromString(homeHtml, 'text/html');
      return {
        detail: faq.querySelector('[data-motion-details]')?.outerHTML,
        step: home.querySelector('[data-reveal="step"]')?.outerHTML,
        stylesheets: Array.from(new Set([...faq.querySelectorAll('link[rel="stylesheet"]'), ...home.querySelectorAll('link[rel="stylesheet"]')].map(node => node.outerHTML)))
      };
    }, { faqHtml: await faqResponse.text(), homeHtml: await homeResponse.text() });
    assert.ok(fixture.detail && fixture.step, 'real SSR contains both component fixtures');
    assert.ok(fixture.stylesheets.length > 0, 'real SSR includes production stylesheets');
    const html = `<!doctype html><html lang="uk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="${origin}/">${fixture.stylesheets.join('')}</head><body>${fixture.detail}${fixture.step}</body></html>`;
    writeFileSync(resolve(output, `${engine}-no-js-ssr-components.html`), html);
    await page.setContent(html, { waitUntil: 'networkidle' });
    assert.ok(await page.evaluate(() => document.styleSheets.length > 0), 'real production CSS loaded for component fixture');
    const detail = page.locator('[data-motion-details]');
    await detail.locator('summary').click();
    assert.equal(await detail.evaluate(element => element.open), true, 'SSR native FAQ opens without JS');
    assert.ok(await detail.locator('p').isVisible(), 'native details answer is visible');
    await capture(page, `${engine}-no-js-components-open`);
    await detail.locator('summary').click();
    assert.equal(await detail.evaluate(element => element.open), false, 'SSR native FAQ closes without JS');
    const step = page.locator('[data-reveal="step"]');
    assert.ok(await step.isVisible(), 'SSR reveal component visible without JS');
    assert.equal(await step.evaluate(element => getComputedStyle(element).opacity), '1');
    assert.equal(await step.evaluate(element => element.getAnimations().length), 0);
    receipt.results.push({ engine, javascript: false, scope: 'real SSR component fixtures only', status: 'PASS' });
  } catch (error) {
    receipt.failures.push({ engine, javascript: false, scope: 'SSR component fixtures', error: error.stack || error.message });
    await capture(page, `${engine}-no-js-failure`).catch(() => {});
  } finally {
    persist();
    await context.close();
  }
} finally {
  await browser.close();
}
}
persist();
console.log(JSON.stringify(receipt, null, 2));
assert.equal(receipt.failures.length, 0, JSON.stringify(receipt.failures));
