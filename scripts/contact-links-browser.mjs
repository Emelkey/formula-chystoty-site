// GET-only navigation and DOM checks, safe on local or canonical production.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const origin = process.env.CONTACT_LINK_QA_BASE_URL || 'http://127.0.0.1:3100';
assert.ok(/^http:\/\/127\.0\.0\.1:\d+$/.test(origin) || origin === 'https://www.formula-chistoty.ck.ua');
const output = process.env.CONTACT_LINK_QA_OUTPUT || 'outputs/contact-links';
mkdirSync(output, { recursive: true });
const pairs = [
  ['himchystka-dyvana-cherkasy', 'himchystka-dyvana-voseny-skilky-sohne'],
  ['dezinfektsiya-prymishchen-cherkasy', 'ozonatsiya-chy-dezinfektsiya-prymishchennya'],
  ['prybyrannya-kvartyr-cherkasy', 'prybyrannya-kvartyr-cherkasy'],
  ['generalne-prybyrannya-kvartyry-cherkasy', 'prybyrannya-kvartyry-pislya-orendariv']
];
const receipt = { checkedAt: new Date().toISOString(), origin, profiles: [], realLeadsSent: 0, telemetryDelivered: 0 };
const browser = await chromium.launch();
try {
  for (const width of [390, 1365]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, serviceWorkers: 'block' });
    await context.route('**/*', route => {
      const req = route.request(), url = new URL(req.url());
      if (req.method() === 'GET' && url.origin === origin && !url.pathname.startsWith('/api/')) return route.continue();
      return route.abort();
    });
    await context.routeWebSocket('**/*', ws => ws.close());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin + '/kontakty#contact-form', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('form#contact-form').count(), 1);
    assert.equal(await page.locator('form#contact-estimate-form').count(), 1);
    const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(n => n.id));
    assert.equal(ids.length, new Set(ids).size);
    await page.locator('form#contact-form').screenshot({ path: `${output}/${width}-first-form.png` });
    await page.locator('form#contact-estimate-form').screenshot({ path: `${output}/${width}-second-form.png` });
    for (const [service, article] of pairs) {
      await page.goto(origin + '/' + service, { waitUntil: 'networkidle' });
      const block = page.locator('[data-contextual-article]');
      const link = block.locator('a');
      assert.equal(await link.count(), 1);
      assert.equal(await link.getAttribute('href'), '/blog/' + article);
      assert.ok((await link.innerText()).length > 25);
      if (service === 'himchystka-dyvana-cherkasy') assert.ok(await page.locator('a[href="/blog/yak-chasto-potribno-robyty-himchystku-dyvana"]').count());
      await block.screenshot({ path: `${output}/${width}-${service}.png` });
      await link.click();
      await page.waitForURL(origin + '/blog/' + article);
      assert.equal(await page.locator('h1').count(), 1);
      await page.goBack({ waitUntil: 'networkidle' });
      assert.equal(new URL(page.url()).pathname, '/' + service);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
    }
    assert.deepEqual(errors, []);
    receipt.profiles.push({ width, uniqueIds: true, forms: 2, contextualLinks: 4, navigationAndBack: true, noOverflow: true });
    await context.close();
  }
} finally { await browser.close(); }
writeFileSync(`${output}/receipt.json`, JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
