// Controlled lab comparison, not CrUX, a Lighthouse score, or a significance test.
// BASELINE_URL opts into paired alternating samples; omit it for a public standalone baseline.
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'Set GA4_PLAYWRIGHT_DIR to an isolated Playwright installation');
const { chromium } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const output = resolve(process.env.OUTPUT || 'outputs/motion-performance');
const targets = process.env.BASELINE_URL
  ? [{ name: 'baseline', origin: new URL(process.env.BASELINE_URL).origin }, { name: 'candidate', origin: new URL(process.env.BASE_URL || 'http://127.0.0.1:3100').origin }]
  : [{ name: 'standalone', origin: new URL(process.env.BASE_URL || 'http://127.0.0.1:3100').origin }];
const profiles = [
  { name: 'desktop', viewport: { width: 1365, height: 900 }, isMobile: false, hasTouch: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
];
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}),
});
const receipt = {
  checkedAt: new Date().toISOString(), targets, browser: browser.version(),
  conditions: {
    runsPerTargetProfile: 7, coldBrowserContext: true, cacheDisabled: true, deviceScaleFactor: 1,
    serverWarmup: 'One discarded navigation per target/profile before any measured samples, including an 8-second observation window. Server/image caches are intentionally warm; browser contexts remain cold.',
    sampleOrder: 'Paired targets alternate baseline-first/candidate-first each round on the same runner; profiles alternate first position each round.',
    requestedNetworkLatencyMs: 40, requestedDownloadMbps: 10, requestedUploadMbps: 5, requestedCpuSlowdown: 2,
    measurementWindow: '8 seconds after DOMContentLoaded; initial counters are frozen before screenshots or scrolling',
    galleryPhase: 'After the initial snapshot, scroll each image in the section headed Наші роботи and wait for successful completion. Deduplicate selected currentSrc URLs; include matching responses from both initial and gallery phases. This is transfer evidence, not a timing comparison.',
    networkPolicy: 'Only current-target same-origin GETs outside /api/ allowed; all other traffic and WebSockets denied.',
    limitations: 'Descriptive Chromium lab samples, not real-user CWV, Lighthouse scores, or proof of a statistically significant change. CDP throttling is requested, not independently calibrated. External scripts/telemetry are blocked. Production versus loopback timings include different server/network latency. JS and image bytes include all completed downloads within the fixed window, including possible prefetches. Warm-up does not guarantee every server-side cache is identical.',
  },
  warmups: [], runs: [], medians: {}, failures: [],
};
const persist = () => writeFileSync(resolve(output, 'report.json'), JSON.stringify(receipt, null, 2));

async function sample(target, profile, run, warmup = false) {
  const { name, ...device } = profile;
  const context = await browser.newContext({ ...device, deviceScaleFactor: 1, serviceWorkers: 'block', locale: 'uk-UA' });
  let deniedRequests = 0;
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (request.method() === 'GET' && url.origin === target.origin && !url.pathname.startsWith('/api/')) return route.continue();
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
    const resources = new Map();
    const downloadedImages = [];
    session.on('Network.responseReceived', event => {
      resources.set(event.requestId, { type: event.type, url: event.response.url, status: event.response.status });
    });
    session.on('Network.loadingFinished', event => {
      totalBytes += event.encodedDataLength;
      const resource = resources.get(event.requestId);
      if (resource?.type === 'Script') jsBytes += event.encodedDataLength;
      if (resource?.type === 'Image') downloadedImages.push({ url: resource.url, status: resource.status, encodedBytes: event.encodedDataLength });
    });
    await page.addInitScript(() => {
      window.__motionPerformance = { lcpMs: 0, cls: 0, lcpElement: null };
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          window.__motionPerformance.lcpMs = entry.startTime;
          const element = entry.element;
          window.__motionPerformance.lcpElement = {
            tagName: element?.tagName || null, id: element?.id || null,
            url: entry.url || null, currentSrc: element instanceof HTMLImageElement ? element.currentSrc : null,
            size: entry.size, loadTime: entry.loadTime, renderTime: entry.renderTime,
          };
        }
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
    const response = await page.goto(target.origin, { waitUntil: 'domcontentloaded', timeout: 60000 });
    assert.equal(response.status(), 200, 'Homepage must return 200');
    await page.waitForTimeout(8000);
    const metrics = await page.evaluate(() => ({
      ...window.__motionPerformance,
      fcpMs: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
      ttfbMs: performance.getEntriesByType('navigation')[0].responseStart,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      images: Array.from(document.images).map(image => {
        const rect = image.getBoundingClientRect();
        return { currentSrc: image.currentSrc, sizes: image.sizes, renderedWidth: rect.width, renderedHeight: rect.height,
          naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, complete: image.complete,
          inViewport: rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth };
      }).filter(image => image.currentSrc),
    }));
    assert.ok(metrics.lcpMs > 0 && metrics.fcpMs > 0, 'Paint entries must be recorded');
    // Freeze initial evidence before the separate below-fold phase can load anything.
    const initial = {
      jsBytes, totalBytes, deniedRequests,
      imageBytes: downloadedImages.reduce((sum, image) => sum + image.encodedBytes, 0),
      downloadedImages: downloadedImages.map(image => ({ ...image })),
    };
    if (!warmup && run === 1) await page.screenshot({ path: resolve(output, `${target.name}-${name}-hero.png`) });
    // The baseline has no new gallery data attributes; use its unchanged heading.
    const gallery = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Наші роботи', exact: true }) });
    const galleryErrors = [];
    const galleryImages = [];
    if (await gallery.count() !== 1) galleryErrors.push('Expected exactly one Наші роботи section');
    else {
      const images = gallery.locator('img');
      const count = await images.count();
      if (!count) galleryErrors.push('Gallery contains no images');
      for (let index = 0; index < count; index += 1) {
        const image = images.nth(index);
        try {
          await image.scrollIntoViewIfNeeded({ timeout: 20000 });
          await page.waitForFunction(i => {
            const heading = Array.from(document.querySelectorAll('section h2')).find(item => item.textContent.trim() === 'Наші роботи');
            return heading?.closest('section')?.querySelectorAll('img')[i]?.complete;
          }, index, { timeout: 20000 });
          const info = await image.evaluate(element => {
            const rect = element.getBoundingClientRect();
            return { currentSrc: element.currentSrc, renderedWidth: rect.width, renderedHeight: rect.height,
              naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight,
              complete: element.complete, dpr: devicePixelRatio };
          });
          galleryImages.push(info);
          if (!info.currentSrc || !info.complete || !info.naturalWidth) galleryErrors.push(`Image ${index} did not load successfully`);
        } catch (error) {
          galleryErrors.push(`Image ${index}: ${error.message}`);
        }
      }
    }
    // A URL can be requested more than once while scrolling. Count each selected
    // resource once, using its largest completed response; retain all raw evidence.
    const galleryUrls = [...new Set(galleryImages.map(image => image.currentSrc).filter(Boolean))];
    const galleryResponses = galleryUrls.map(url => {
      const responses = downloadedImages.filter(image => image.url === url);
      if (!responses.length) galleryErrors.push(`No completed image response recorded for ${url}`);
      if (responses.some(image => image.status >= 400)) galleryErrors.push(`Image response failed for ${url}`);
      return { url, encodedBytes: responses.length ? Math.max(...responses.map(image => image.encodedBytes)) : 0,
        responses: responses.map(image => ({ ...image })) };
    });
    const galleryImageBytes = galleryResponses.reduce((sum, image) => sum + image.encodedBytes, 0);
    const result = { target: target.name, origin: target.origin, profile: name, run, ...metrics, ...initial,
      galleryImageBytes, gallery: { images: galleryImages, responses: galleryResponses, errors: galleryErrors } };
    if (warmup) receipt.warmups.push({ target: target.name, profile: name, status: galleryErrors.length ? 'failed' : 'passed', galleryImages: galleryImages.length, galleryErrors });
    else {
      receipt.runs.push(result);
      console.log(JSON.stringify({ target: target.name, profile: name, run, lcpMs: result.lcpMs, fcpMs: result.fcpMs, cls: result.cls, jsBytes: result.jsBytes, imageBytes: result.imageBytes, galleryImageBytes }));
    }
    if (!warmup && run === 1 && await gallery.count() === 1) {
      await gallery.screenshot({ path: resolve(output, `${target.name}-${name}-gallery.png`), animations: 'disabled' });
    }
    assert.equal(galleryErrors.length, 0, JSON.stringify(galleryErrors));
  } catch (error) {
    receipt.failures.push({ target: target.name, profile: name, run, warmup, error: error.message });
  } finally {
    await context.close();
    persist();
  }
}

try {
  // Warm both builds equally before collecting anything, including image optimization at each viewport.
  for (const profile of profiles) for (const target of targets) await sample(target, profile, 0, true);
  assert.equal(receipt.failures.length, 0, 'Warm-up failed; measured comparison would not be equivalent');
  for (let run = 1; run <= 7; run += 1) {
    const orderedProfiles = run % 2 ? profiles : [...profiles].reverse();
    const orderedTargets = run % 2 ? targets : [...targets].reverse();
    for (const profile of orderedProfiles) for (const target of orderedTargets) await sample(target, profile, run);
  }
  for (const target of targets) {
    receipt.medians[target.name] = {};
    for (const profile of profiles) {
      const values = receipt.runs.filter(item => item.target === target.name && item.profile === profile.name);
      receipt.medians[target.name][profile.name] = Object.fromEntries(['lcpMs', 'fcpMs', 'cls', 'ttfbMs', 'jsBytes', 'imageBytes', 'galleryImageBytes', 'totalBytes'].map(key => {
        const sorted = values.map(item => item[key]).sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        return [key, sorted.length ? (sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2) : null];
      }));
    }
  }
} finally {
  await browser.close();
  persist();
}
assert.equal(receipt.failures.length, 0, JSON.stringify(receipt.failures));
assert.equal(receipt.runs.length, targets.length * profiles.length * 7, 'Every target/profile must have seven samples');
console.log(JSON.stringify({ medians: receipt.medians, output }, null, 2));
