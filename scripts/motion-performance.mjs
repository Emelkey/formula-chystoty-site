// Repeatable lab comparison, not CrUX or a Lighthouse score. Never sends leads or telemetry.
// GA4_PLAYWRIGHT_DIR=/path/to/isolated/install BASE_URL=https://... OUTPUT=outputs/... node scripts/motion-performance.mjs
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'Set GA4_PLAYWRIGHT_DIR to an isolated Playwright installation');
const { chromium } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const origin = new URL(process.env.BASE_URL || 'http://127.0.0.1:3100').origin;
const output = resolve(process.env.OUTPUT || 'outputs/motion-performance');
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}),
});
const receipt = {
  checkedAt: new Date().toISOString(), origin, browser: browser.version(),
  conditions: {
    runsPerProfile: 3, coldContext: true, cacheDisabled: true,
    networkLatencyMs: 40, downloadMbps: 10, uploadMbps: 5, cpuSlowdown: 2,
    measurementWindow: '8 seconds after DOMContentLoaded; no interactions before measurement',
    networkPolicy: 'Only same-origin GETs outside /api/ allowed; all other traffic and WebSockets denied.',
    limitations: 'Controlled Chromium lab samples, not real-user CWV or Lighthouse scores. External scripts/telemetry are blocked. Production versus loopback timings include different server/network latency. JS bytes count downloaded scripts in the fixed window, not every lazily loaded route. Report medians and individual runs; do not infer significance from three samples.',
  },
  runs: [], medians: {}, failures: [],
};
const persist = () => writeFileSync(resolve(output, 'report.json'), JSON.stringify(receipt, null, 2));
try {
  for (const profile of [
    { name: 'desktop', viewport: { width: 1365, height: 900 }, isMobile: false, hasTouch: false },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ]) {
    for (let run = 1; run <= 3; run += 1) {
      const { name, ...device } = profile;
      const context = await browser.newContext({ ...device, deviceScaleFactor: 1, serviceWorkers: 'block', locale: 'uk-UA' });
      let deniedRequests = 0;
      await context.route('**/*', route => {
        const request = route.request(), url = new URL(request.url());
        if (request.method() === 'GET' && url.origin === origin && !url.pathname.startsWith('/api/')) return route.continue();
        deniedRequests += 1;
        return route.abort();
      });
      await context.routeWebSocket('**/*', socket => socket.close());
      try {
        const page = await context.newPage();
        const session = await context.newCDPSession(page);
        await session.send('Network.enable');
        await session.send('Network.setCacheDisabled', { cacheDisabled: true });
        await session.send('Network.emulateNetworkConditions', {
          offline: false, latency: 40,
          downloadThroughput: 10 * 1024 * 1024 / 8, uploadThroughput: 5 * 1024 * 1024 / 8,
        });
        await session.send('Emulation.setCPUThrottlingRate', { rate: 2 });
        let jsBytes = 0, totalBytes = 0;
        const scripts = new Set();
        session.on('Network.responseReceived', event => { if (event.type === 'Script') scripts.add(event.requestId); });
        session.on('Network.loadingFinished', event => {
          totalBytes += event.encodedDataLength;
          if (scripts.has(event.requestId)) jsBytes += event.encodedDataLength;
        });
        await page.addInitScript(() => {
          window.__motionPerformance = { lcpMs: 0, cls: 0 };
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) window.__motionPerformance.lcpMs = entry.startTime;
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          let windowStart = 0, previousShift = 0, windowValue = 0;
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              if (entry.hadRecentInput) continue;
              if (!windowStart || entry.startTime - previousShift >= 1000 || entry.startTime - windowStart >= 5000) {
                windowStart = entry.startTime;
                windowValue = 0;
              }
              previousShift = entry.startTime;
              windowValue += entry.value;
              window.__motionPerformance.cls = Math.max(window.__motionPerformance.cls, windowValue);
            }
          }).observe({ type: 'layout-shift', buffered: true });
        });
        const response = await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 60000 });
        assert.equal(response.status(), 200, 'Homepage must return 200');
        // An explicit fixed sampling window makes before/after measurements reproducible.
        await page.waitForTimeout(8000);
        const metrics = await page.evaluate(() => ({
          ...window.__motionPerformance,
          fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          ttfbMs: performance.getEntriesByType('navigation')[0].responseStart,
          horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        }));
        assert.ok(metrics.lcpMs > 0 && metrics.fcpMs > 0, 'Paint entries must be recorded');
        const sample = { profile: name, run, ...metrics, jsBytes, totalBytes, deniedRequests };
        receipt.runs.push(sample);
        console.log(JSON.stringify(sample));
        if (run === 1) await page.screenshot({ path: resolve(output, `${name}-hero.png`) });
      } catch (error) {
        receipt.failures.push({ profile: name, run, error: error.message });
      } finally {
        await context.close();
        persist();
      }
    }
    const values = receipt.runs.filter(sample => sample.profile === profile.name);
    receipt.medians[profile.name] = Object.fromEntries(['lcpMs', 'fcpMs', 'cls', 'ttfbMs', 'jsBytes', 'totalBytes'].map(key => {
      const sorted = values.map(sample => sample[key]).sort((a, b) => a - b);
      return [key, sorted.length ? sorted[Math.floor(sorted.length / 2)] : null];
    }));
    persist();
  }
} finally {
  await browser.close();
  persist();
}
assert.equal(receipt.failures.length, 0, JSON.stringify(receipt.failures));
console.log(JSON.stringify({ medians: receipt.medians, output }, null, 2));
