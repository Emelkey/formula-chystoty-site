import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const expectedId = 'G-E2Q1N11QWJ';
const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const loaderIds = [...layout.matchAll(/googletagmanager\.com\/gtag\/js\?id=(G-[A-Z0-9]+)/g)].map((match) => match[1]);
const configIds = [...layout.matchAll(/gtag\('config', '(G-[A-Z0-9]+)'\)/g)].map((match) => match[1]);
assert.deepEqual(loaderIds, [expectedId], 'The loader must target the verified website stream exactly once');
assert.deepEqual(configIds, [expectedId], 'The config command must use the same verified stream');
assert.ok(!layout.includes('G-FNN4YK664L'), 'The unverified destination must not remain in the layout');
assert.match(layout, /window\.dataLayer = window\.dataLayer \|\| \[\]/, 'Preserve the existing event queue');
console.log('PASS: 4 GA4 source configuration checks');

// Live mode reads the public site only. It never submits a lead or sends a conversion event.
if (process.argv.includes('--live')) {
  const require = createRequire(import.meta.url);
  assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'GA4_PLAYWRIGHT_DIR must point to an isolated Playwright installation');
  const { chromium } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
  const output = resolve('outputs/ga4-browser');
  mkdirSync(output, { recursive: true });
  const receipt = { checkedAt: new Date().toISOString(), expectedId, mode: 'public-site-read-only', realLeadsSent: 0, note: 'HTTP acceptance is not proof of GA4 report processing or Google Ads conversion import.', pages: [] };
  const browser = await chromium.launch({ headless: true });
  try {
    const paths = ['/', '/prybyrannya-kvartyr-cherkasy', '/himchystka-mebliv-cherkasy'];
    for (let index = 0; index < paths.length; index += 1) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'uk-UA' });
      // Label automatic page views as debugging traffic without fabricating lead events.
      await context.addInitScript(() => {
        window.dataLayer = window.dataLayer || [];
        (function () { window.dataLayer.push(arguments); })('set', { debug_mode: true });
      });
      await context.route('**/api/lead', (route) => route.abort());
      const page = await context.newPage();
      const result = { path: paths[index], loader: [], hits: [], errors: [], pass: false };
      receipt.pages.push(result);
      page.on('pageerror', (error) => result.errors.push(String(error.message).slice(0, 300)));
      page.on('response', (response) => {
        const url = new URL(response.url());
        if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') {
          result.loader.push({ id: url.searchParams.get('id'), status: response.status() });
        }
        if ((url.hostname === 'google-analytics.com' || url.hostname.endsWith('.google-analytics.com') || url.hostname === 'analytics.google.com') && url.pathname.endsWith('/g/collect')) {
          const payloads = (response.request().postData() || '').split('\n');
          for (const payload of payloads) {
            const params = new URLSearchParams(url.search);
            for (const [key, value] of new URLSearchParams(payload)) params.set(key, value);
            // Keep only non-identifying evidence, never client IDs, cookies or full request URLs.
            result.hits.push({ id: params.get('tid'), event: params.get('en'), status: response.status(), debug: params.get('_dbg') || params.get('ep.debug_mode') || params.get('epn.debug_mode') });
          }
        }
      });
      try {
        const response = await page.goto(`https://www.formula-chistoty.ck.ua${paths[index]}?qa_tracking=20260925`, { waitUntil: 'domcontentloaded', timeout: 45000 });
        result.httpStatus = response?.status();
        await page.waitForFunction(() => typeof window.gtag === 'function', { timeout: 20000 });
        for (let attempt = 0; attempt < 10 && !result.hits.some((hit) => hit.id === expectedId && hit.event === 'page_view'); attempt += 1) {
          await page.waitForTimeout(1000);
        }
        result.dom = await page.evaluate(() => ({
          title: document.title,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          h1Count: document.querySelectorAll('h1').length,
          configIds: (window.dataLayer || []).filter((entry) => entry?.[0] === 'config').map((entry) => entry[1]),
          phoneInputs: [...document.querySelectorAll('input[name="phone"]')].map((input) => ({ pattern: input.getAttribute('pattern'), required: input.required })),
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
        }));
        await page.screenshot({ path: resolve(output, `page-${index + 1}.png`), fullPage: false });
        assert.equal(result.httpStatus, 200);
        assert.ok(result.loader.some((item) => item.id === expectedId && item.status === 200), 'Verified tag script did not load');
        assert.equal(result.dom.configIds.filter((id) => id === expectedId).length, 1, 'Expected one configuration of the verified destination');
        assert.ok(!result.dom.configIds.includes('G-FNN4YK664L'), 'Old destination is still configured');
        assert.ok(result.hits.some((hit) => hit.id === expectedId && hit.event === 'page_view' && hit.status >= 200 && hit.status < 300), 'No accepted page_view for the verified destination');
        assert.ok(!result.hits.some((hit) => hit.event === 'lead_submit' || hit.event === 'generate_lead'), 'Read-only check must not send lead conversions');
        assert.equal(result.dom.h1Count, 1);
        assert.ok(result.dom.phoneInputs.every((input) => input.pattern === null), 'Obsolete phone pattern is still deployed');
        result.pass = true;
      } catch (error) {
        result.failure = String(error.message).slice(0, 500);
        process.exitCode = 1;
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
    receipt.pass = receipt.pages.length === 3 && receipt.pages.every((page) => page.pass);
    writeFileSync(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
    console.log(JSON.stringify(receipt, null, 2));
    if (!receipt.pass) process.exitCode = 1;
  }
}
