// Hydrated, real-input spring regression. Run against the built local server only.
// All non-local traffic and all mutations are blocked before the first navigation.
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'Set GA4_PLAYWRIGHT_DIR to an isolated Playwright installation');
const { chromium, webkit } = require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const origin = new URL(process.env.BUTTON_QA_BASE_URL || process.env.FORM_QA_BASE_URL || 'http://127.0.0.1:3100').origin;
assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(new URL(origin).hostname), 'This synthetic QA script only permits a loopback server');
const output = resolve(process.env.BUTTON_QA_OUTPUT || 'outputs/button-motion');
mkdirSync(output, { recursive: true });
const receipt = {
  checkedAt: new Date().toISOString(), origin,
  realLeadsSent: 0, telemetryDelivered: 0,
  networkPolicy: 'Only same-origin GETs without redirects are allowed. /api/lead is mocked; all other requests and WebSockets are denied.',
  scenarios: [], failures: [], screenshots: [],
};
const persist = () => writeFileSync(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
const profiles = [
  { name: 'desktop', viewport: { width: 1365, height: 900 }, isMobile: false, hasTouch: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { name: 'narrow-mobile', viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true },
];
const formSelector = 'form#contact-form';
const submitSelector = `${formSelector} button[type="submit"]`;
const heroSelector = 'section[aria-label="Порівняння простору до і після прибирання"]';
const summarySelector = 'details > summary.button-spring';
const menuSelector = 'header button[aria-controls="mobile-menu"]';
const slug = value => value.replace(/[^a-z0-9-]+/gi, '-').replace(/^-|-$/g, '').slice(0, 90);

// Assert the computed result rather than trusting class presence or CSS text.
async function styleOf(locator) {
  return locator.evaluate(element => {
    const style = getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
    return {
      transform: style.transform, scaleX: matrix.a, scaleY: matrix.d, translateY: matrix.f,
      transitionProperty: style.transitionProperty, transitionDuration: style.transitionDuration,
      transitionTimingFunction: style.transitionTimingFunction,
      outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth,
      outlineColor: style.outlineColor, outlineOffset: style.outlineOffset,
      active: element.matches(':active'), hovered: element.matches(':hover'),
      focusVisible: element.matches(':focus-visible'), disabled: element.matches(':disabled'),
      pointerEvents: style.pointerEvents, touchAction: style.touchAction,
      animations: element.getAnimations().map(animation => ({
        playState: animation.playState,
        iterations: String(animation.effect?.getTiming().iterations),
      })),
    };
  });
}

async function waitForTransform(locator, scale = 1, translateY = 0) {
  const handle = await locator.elementHandle();
  assert.ok(handle, 'Expected an attached spring control');
  try {
    await locator.page().waitForFunction(({ element, scale, translateY }) => {
      const value = getComputedStyle(element).transform;
      const matrix = new DOMMatrixReadOnly(value === 'none' ? undefined : value);
      return Math.abs(matrix.a - scale) < 0.002 && Math.abs(matrix.d - scale) < 0.002
        && Math.abs(matrix.f - translateY) < 0.12
        && element.getAnimations().every(animation => !['running', 'pending'].includes(animation.playState));
    }, { element: handle, scale, translateY }, { timeout: 3500, polling: 'raf' });
  } catch (error) {
    let diagnostic;
    try {
      diagnostic = await locator.evaluate(element => {
        const describe = node => {
          if (!(node instanceof Element)) return null;
          const rect = node.getBoundingClientRect();
          return { tag: node.tagName, id: node.id, class: node.getAttribute('class'), text: node.textContent?.trim().slice(0, 90),
            active: node.matches(':active'), focusVisible: node.matches(':focus-visible'),
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } };
        };
        const rect = element.getBoundingClientRect();
        const point = window.__motionTouch?.requestedPoint || { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
        return { target: describe(element), focused: describe(document.activeElement),
          activeElements: [...document.querySelectorAll(':active')].slice(-10).map(describe),
          hitPoint: point, hitTarget: describe(document.elementFromPoint(point.x, point.y)),
          touch: window.__motionTouch || null,
          viewport: { width: innerWidth, height: innerHeight, scrollX, scrollY, devicePixelRatio,
            visualScale: window.visualViewport?.scale, visualOffsetTop: window.visualViewport?.offsetTop } };
      });
      diagnostic.style = await styleOf(locator);
    } catch (diagnosticError) { diagnostic = { unavailable: diagnosticError.message }; }
    error.message += `\nTransform diagnostic (expected scale=${scale}, translateY=${translateY}): ${JSON.stringify(diagnostic)}`;
    console.error(`TRANSFORM DIAGNOSTIC ${JSON.stringify(diagnostic)}`);
    throw error;
  } finally { await handle.dispose(); }
  return styleOf(locator);
}

function assertSpring(style) {
  const properties = style.transitionProperty.split(/,\s*/);
  const index = properties.indexOf('transform');
  assert.ok(index >= 0, `Missing transform transition: ${JSON.stringify(style)}`);
  const durations = style.transitionDuration.split(/,\s*/);
  assert.equal(Number.parseFloat(durations[index % durations.length]), 0.42);
  assert.match(style.transitionTimingFunction, /cubic-bezier\(0\.34, 1\.56, 0\.64, 1\)/);
  assert.ok(!properties.some(property => ['all', 'width', 'height', 'padding', 'margin', 'top', 'left'].includes(property)), 'Spring must not animate layout');
}

function assertNoMotion(style) {
  assert.equal(style.transform, 'none');
  assert.ok(style.transitionDuration.split(',').every(duration => Number.parseFloat(duration) === 0), JSON.stringify(style));
  assert.equal(style.animations.length, 0);
}

async function layoutOf(locator) {
  return locator.evaluate(element => {
    const layout = node => [node.offsetLeft, node.offsetTop, node.offsetWidth, node.offsetHeight];
    return { target: layout(element), parent: layout(element.parentElement), siblings: [...element.parentElement.children].filter(node => node !== element).map(layout) };
  });
}

async function assertNoOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  if (dimensions.document > dimensions.viewport + 1 || dimensions.body > dimensions.viewport + 1) {
    dimensions.crossingElements = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return [...document.querySelectorAll('body *')].map(element => {
        const rect = element.getBoundingClientRect();
        if (!element.getClientRects().length || rect.right <= width + 1) return null;
        const style = getComputedStyle(element);
        const parent = element.parentElement;
        return { tag: element.tagName, class: element.getAttribute('class'), text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 90),
          rect: { left: rect.left, top: rect.top, right: rect.right, width: rect.width, height: rect.height },
          scrollWidth: element.scrollWidth, clientWidth: element.clientWidth,
          overflowX: style.overflowX, position: style.position, transform: style.transform,
          parent: parent ? { tag: parent.tagName, class: parent.getAttribute('class'), overflowX: getComputedStyle(parent).overflowX } : null };
      }).filter(Boolean).sort((a, b) => b.rect.right - a.rect.right).slice(0, 20);
    });
    dimensions.withoutSpringClasses = await page.evaluate(() => {
      const controls = [...document.querySelectorAll('.button-spring')].map(element => ({ element, className: element.getAttribute('class') }));
      try {
        for (const { element } of controls) element.classList.remove('button-spring');
        // Synchronous layout read; restore every class before the page can render.
        const width = document.documentElement.clientWidth;
        return { viewport: width, document: document.documentElement.scrollWidth, body: document.body.scrollWidth,
          controlsTemporarilyExcluded: controls.length,
          crossingElements: [...document.querySelectorAll('body *')].map(element => {
            const rect = element.getBoundingClientRect();
            return element.getClientRects().length && rect.right > width + 1
              ? { tag: element.tagName, class: element.getAttribute('class'), right: rect.right, width: rect.width } : null;
          }).filter(Boolean).sort((a, b) => b.right - a.right).slice(0, 5) };
      } finally {
        for (const { element, className } of controls) element.setAttribute('class', className);
      }
    });
    console.error(`OVERFLOW DIAGNOSTIC ${JSON.stringify({ path: new URL(page.url()).pathname, ...dimensions })}`);
  }
  assert.ok(dimensions.document <= dimensions.viewport + 1 && dimensions.body <= dimensions.viewport + 1,
    `Horizontal overflow: ${JSON.stringify(dimensions)}`);
  return dimensions;
}

for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
  let browser;
  try {
    browser = await browserType.launch({ headless: true });
    for (const profile of profiles) {
      const { viewport, isMobile, hasTouch } = profile;
      const context = await browser.newContext({ viewport, isMobile, hasTouch, locale: 'uk-UA', reducedMotion: 'no-preference', serviceWorkers: 'block' });
      const meta = { engine, profile: profile.name, viewport, isMobile, hasTouch };
      const network = { mockedLeads: 0, blocked: [], rejectedRedirects: [], allowedRequests: 0 };
      const runtimeErrors = [];
      let pendingLead = null;
      let releaseLead = null;
      let contextClosing = false;
      await context.route('**/*', async route => {
        try {
          // Keep the guard installed throughout teardown; new requests remain denied.
          if (contextClosing) return await route.abort('blockedbyclient');
          const request = route.request();
          const url = new URL(request.url());
          if (url.origin === origin && url.pathname === '/api/lead') {
            network.mockedLeads += 1;
            if (pendingLead) await pendingLead;
            return await route.fulfill({ status: 502, contentType: 'application/json', body: '{"success":false,"error":"synthetic-motion-qa"}' });
          }
          if (url.origin === origin && request.method() === 'GET' && !url.pathname.endsWith('/collect')) {
            network.allowedRequests += 1;
            // continue() can follow redirects without routing the destination again.
            // Fetch only this canonical local URL and reject any redirect response.
            const response = await route.fetch({ maxRedirects: 0, timeout: 30000 });
            if (response.status() >= 300 && response.status() < 400) {
              network.rejectedRedirects.push({ path: url.pathname, status: response.status(), location: response.headers().location });
              return await route.abort('blockedbyclient');
            }
            return await route.fulfill({ response });
          }
          network.blocked.push({ host: url.host, path: url.pathname, method: request.method() });
          return await route.abort('blockedbyclient');
        } catch (error) {
          // Next may still have a prefetched RSC response in flight when close()
          // disposes its request context. Only that explicit teardown is ignored.
          if (contextClosing && (error.name === 'TargetClosedError'
            || /Target page, context or browser has been closed|Target closed|Request context disposed/i.test(error.message))) return;
          throw error;
        }
      });
      await context.routeWebSocket('**/*', socket => socket.close());
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      page.setDefaultNavigationTimeout(30000);
      page.on('pageerror', error => runtimeErrors.push(error.message));
      const form = page.locator(formSelector).first();
      const submit = page.locator(submitSelector).first();

      // Drain Next prefetches before hard fixture resets, not as a hydration signal.
      const rscRequests = new Set();
      let lastRsc = 0;
      page.on('request', request => {
        const url = new URL(request.url());
        if (url.origin === origin && (url.searchParams.has('_rsc') || request.headers().rsc === '1')) {
          rscRequests.add(request); lastRsc = Date.now();
        }
      });
      for (const event of ['requestfinished', 'requestfailed']) page.on(event, request => {
        if (rscRequests.delete(request)) lastRsc = Date.now();
      });

      async function hydrated() {
        // Exercise an observable React handler; gtag/document load alone cannot prove hydration.
        const phone = form.locator('[name="phone"]');
        await phone.waitFor();
        const deadline = Date.now() + 10000;
        for (;;) {
          await phone.fill('qa');
          try {
            await page.waitForFunction(() => document.querySelector('form#contact-form input[name="phone"]')?.validity.customError,
              null, { timeout: 500 });
            break;
          } catch (error) {
            if (Date.now() >= deadline) throw error;
            await phone.fill('');
          }
        }
        await phone.fill('');
        await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
        await page.evaluate(() => document.fonts.ready);
      }

      async function reset(path = '/kontakty') {
        releaseLead?.(); releaseLead = null; pendingLead = null;
        await page.mouse.up();
        await page.keyboard.up('Space');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        const started = Date.now();
        while (rscRequests.size || Date.now() - lastRsc < 200) {
          assert.ok(Date.now() - started < 30000, 'RSC requests did not settle before fixture reset');
          await new Promise(resolve => setTimeout(resolve, 25));
        }
        const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded' });
        assert.equal(response?.status(), 200, `Fixture did not load: ${path}`);
        await hydrated();
        await page.mouse.move(1, 1);
      }

      async function capture(name) {
        const file = `${engine}-${viewport.width}-${slug(name)}.png`;
        await page.screenshot({ path: resolve(output, file), fullPage: false });
        receipt.screenshots.push({ ...meta, name, file });
        return file;
      }

      async function check(name, task, path = '/kontakty') {
        const started = Date.now();
        try {
          if (path !== null) await reset(path);
          const evidence = await task();
          receipt.scenarios.push({ ...meta, name, status: 'PASS', durationMs: Date.now() - started, evidence });
          console.log(`PASS ${engine}/${profile.name}: ${name}`);
        } catch (error) {
          const failure = { ...meta, name, status: 'FAIL', durationMs: Date.now() - started, error: error.stack || error.message };
          try { failure.screenshot = await capture(`failure-${name}`); } catch { /* Preserve the original failure when a page has closed. */ }
          receipt.scenarios.push(failure); receipt.failures.push(failure);
          console.error(`FAIL ${engine}/${profile.name}: ${name}\n${failure.error}`);
        } finally {
          releaseLead?.(); releaseLead = null; pendingLead = null;
          persist();
        }
      }

      function skip(name, reason) {
        receipt.scenarios.push({ ...meta, name, status: 'SKIP', reason });
        console.log(`SKIP ${engine}/${profile.name}: ${name}: ${reason}`);
        persist();
      }

      try {
        for (const path of ['/', '/kontakty', '/himchystka-mebliv-cherkasy', '/prices']) {
          await check(`effective spring coverage and overflow on ${path}`, async () => {
            const fineHover = await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches);
            assert.equal(fineHover, !isMobile, 'Input emulation must exercise the intended hover media query');
            const controls = page.locator('.button-spring:visible');
            const count = await controls.count();
            assert.ok(count >= 5, `Expected shared and page-specific spring controls on ${path}`);
            const tags = new Set();
            for (let index = 0; index < count; index += 1) {
              const control = controls.nth(index);
              const tag = await control.evaluate(element => element.tagName);
              assert.ok(['A', 'BUTTON', 'SUMMARY'].includes(tag)); tags.add(tag);
              assertSpring(await styleOf(control));
            }
            const inlineLinks = page.locator('header nav a, form#contact-form > p a');
            assert.ok(await inlineLinks.count());
            assert.equal(await inlineLinks.evaluateAll(links => links.some(link => link.classList.contains('button-spring'))), false,
              'Ordinary inline/navigation links must remain outside the opt-in treatment');
            const dimensions = await assertNoOverflow(page);
            return { controls: count, tags: [...tags], fineHover, dimensions, screenshot: await capture(`route-${path === '/' ? 'home' : path}`) };
          }, path);
        }

        await check('idle, hover policy, transform-only layout and mouse release/cancel', async () => {
          // Isolate visual input states from native invalid-form auto-scroll. The
          // real submit and its disabled state are exercised separately below.
          await submit.evaluate(element => element.addEventListener('click', event => event.preventDefault()));
          await submit.scrollIntoViewIfNeeded();
          await page.mouse.move(1, 1);
          const baseline = await waitForTransform(submit);
          assertSpring(baseline);
          assert.equal(baseline.animations.length, 0, 'There must be no idle animation');
          const layout = await layoutOf(submit);
          const box = await submit.boundingBox();
          assert.ok(box);
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          const hover = await waitForTransform(submit, isMobile ? 1 : 1.02, isMobile ? 0 : -2);
          assert.deepEqual(await layoutOf(submit), layout, 'Hover transform moved the surrounding layout');
          await assertNoOverflow(page);
          if (isMobile) return { baseline, hover, layout, note: 'Mouse emulation confirms that coarse-pointer devices do not apply hover lift. Native taps tested separately.' };
          await capture('submit-hover');
          for (const cancel of [false, true, false]) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            const pressed = await waitForTransform(submit, 0.97);
            assert.ok(pressed.active);
            assert.ok(pressed.transitionDuration.split(',').every(duration => Number.parseFloat(duration) === 0.09));
            assert.deepEqual(await layoutOf(submit), layout, 'Press transform changed layout dimensions');
            if (cancel) await page.mouse.move(1, 1);
            await page.mouse.up();
            if (!cancel) await waitForTransform(submit, 1.02, -2);
            await page.mouse.move(1, 1);
            await waitForTransform(submit);
            assert.equal(await submit.evaluate(element => element.matches(':active')), false);
            assert.deepEqual(await layoutOf(submit), layout, 'Release changed the layout');
          }
          assert.equal(network.mockedLeads, 0, 'An empty form must not submit a lead');
          return { baseline, hover, layout };
        });

        await check('keyboard Tab focus, Space press and visible reduced-motion focus', async () => {
          // The Viber action immediately precedes submit in the real form's tab order.
          await form.locator('[data-photo-estimate] a').last().focus();
          await page.keyboard.press('Tab');
          assert.ok(await submit.evaluate(element => element === document.activeElement && element.matches(':focus-visible')));
          const focused = await waitForTransform(submit, 1.02, -2);
          assert.notEqual(focused.outlineStyle, 'none');
          assert.ok(Number.parseFloat(focused.outlineWidth) >= 2);
          await capture('keyboard-focus');
          await page.keyboard.down('Space');
          await waitForTransform(submit, 0.97);
          await page.keyboard.up('Space');
          // Empty required fields block submission; recover focus with a real Tab.
          await form.locator('[data-photo-estimate] a').last().focus();
          await page.keyboard.press('Tab');
          await page.emulateMedia({ reducedMotion: 'reduce' });
          const reduced = await waitForTransform(submit);
          assertNoMotion(reduced);
          assert.ok(reduced.focusVisible);
          assert.notEqual(reduced.outlineStyle, 'none');
          assert.ok(Number.parseFloat(reduced.outlineWidth) >= 2);
          await capture('reduced-motion-focus');
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          const restored = await waitForTransform(submit, 1.02, -2);
          assertSpring(restored);
          return { focused, reduced, restored };
        });

        await check('live reduced-motion toggle suppresses hover and held press', async () => {
          await submit.scrollIntoViewIfNeeded();
          await page.emulateMedia({ reducedMotion: 'reduce' });
          const controls = page.locator('.button-spring:visible');
          for (let index = 0; index < await controls.count(); index += 1) assertNoMotion(await styleOf(controls.nth(index)));
          const box = await submit.boundingBox();
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          assertNoMotion(await waitForTransform(submit));
          await page.mouse.down();
          assertNoMotion(await waitForTransform(submit));
          await page.mouse.move(1, 1); await page.mouse.up();
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          assertSpring(await waitForTransform(submit));
          return { reducedControls: await controls.count() };
        });

        await check('native disabled hero replay and reduced-motion interruption', async () => {
          const replay = page.locator(`${heroSelector} button.button-spring`);
          await replay.scrollIntoViewIfNeeded();
          if (isMobile) await replay.tap(); else await replay.click();
          await page.waitForFunction(selector => document.querySelector(selector)?.disabled === true, `${heroSelector} button.button-spring`);
          const disabled = await waitForTransform(replay);
          assert.ok(disabled.disabled); assertNoMotion(disabled);
          await capture('hero-native-disabled');
          // A real preference change interrupts the 8-second playback instead of waiting it out.
          await page.emulateMedia({ reducedMotion: 'reduce' });
          await page.waitForFunction(selector => document.querySelector(selector)?.disabled === false, `${heroSelector} button.button-spring`);
          assertNoMotion(await waitForTransform(replay));
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          await page.mouse.move(1, 1);
          assertSpring(await styleOf(replay));
          return { disabled, reenabled: await replay.isEnabled() };
        }, '/');

        await check('native pending submit is motionless and re-enables after mocked failure', async () => {
          const before = network.mockedLeads;
          pendingLead = new Promise(resolve => { releaseLead = resolve; });
          await form.locator('[name="name"]').fill('SYNTHETIC MOTION QA');
          await form.locator('[name="phone"]').fill('0970000001');
          if (isMobile) await submit.tap(); else await submit.click();
          await page.waitForFunction(selector => document.querySelector(selector)?.disabled === true, submitSelector);
          const disabled = await waitForTransform(submit);
          assert.ok(disabled.disabled); assertNoMotion(disabled);
          const box = await submit.boundingBox();
          // Raw input avoids Playwright's enabled check and verifies native disabled suppression.
          if (isMobile) await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
          else await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
          assertNoMotion(await styleOf(submit));
          await capture('submit-native-disabled');
          releaseLead();
          await form.getByRole('alert').waitFor();
          assert.ok(await submit.isEnabled());
          assert.equal(network.mockedLeads - before, 1);
          await page.mouse.move(1, 1);
          await submit.evaluate(element => element.blur());
          assertSpring(await waitForTransform(submit));
          return { disabled, mockedRequests: network.mockedLeads - before };
        });

        await check('primary CTA retains its contact route and form anchor', async () => {
          const primary = page.locator(`${heroSelector} a[href="/kontakty#contact-form"]`);
          assert.equal(await primary.count(), 1);
          if (isMobile) await primary.tap(); else await primary.click();
          await page.waitForURL(url => url.pathname === '/kontakty' && url.hash === '#contact-form');
          await form.waitFor();
          await page.waitForFunction(() => {
            const rect = document.querySelector('form#contact-form')?.getBoundingClientRect();
            return rect && rect.top >= 0 && rect.top < innerHeight / 2;
          });
          const dimensions = await assertNoOverflow(page);
          const screenshot = await capture('primary-cta-destination');
          await page.goBack({ waitUntil: 'domcontentloaded' });
          await page.waitForURL(url => url.pathname === '/' && !url.hash);
          await primary.waitFor();
          return { destination: '/kontakty#contact-form', back: new URL(page.url()).pathname, dimensions, screenshot };
        }, '/');

        if (isMobile) {
          await check('repeated mobile menu taps, navigation and history recovery', async () => {
            const menu = page.locator(menuSelector);
            for (let index = 0; index < 3; index += 1) {
              await menu.tap();
              await page.locator('#mobile-menu').waitFor({ state: 'visible' });
              assert.equal(await menu.getAttribute('aria-expanded'), 'true');
              await waitForTransform(menu);
              await assertNoOverflow(page);
              if (index === 0) await capture('mobile-menu-open');
              await menu.tap();
              await page.locator('#mobile-menu').waitFor({ state: 'detached' });
              assert.equal(await menu.getAttribute('aria-expanded'), 'false');
              await waitForTransform(menu);
            }
            await menu.tap();
            await page.locator('#mobile-menu a[href="/kontakty"]').tap();
            await page.waitForURL(url => url.pathname === '/kontakty');
            await page.locator('#mobile-menu').waitFor({ state: 'detached' });
            await page.goBack({ waitUntil: 'domcontentloaded' });
            await page.waitForURL(url => url.pathname === '/');
            assert.equal(await menu.getAttribute('aria-expanded'), 'false');
            await menu.tap(); await page.locator('#mobile-menu').waitFor();
            await menu.tap(); await page.locator('#mobile-menu').waitFor({ state: 'detached' });
            await waitForTransform(menu);
          }, '/');

          await check('repeated floating summary taps, CTA navigation and history recovery', async () => {
            const summary = page.locator(summarySelector);
            const details = summary.locator('..');
            for (let index = 0; index < 3; index += 1) {
              await summary.tap();
              assert.ok(await details.evaluate(element => element.open));
              await waitForTransform(summary);
              await assertNoOverflow(page);
              if (index === 0) await capture('floating-contact-open');
              await summary.tap();
              assert.equal(await details.evaluate(element => element.open), false);
              await waitForTransform(summary);
            }
            await summary.tap();
            await details.locator('a[href="/kontakty#contact-form"]').tap();
            await page.waitForURL(url => url.pathname === '/kontakty' && url.hash === '#contact-form');
            await form.waitFor();
            await page.goBack({ waitUntil: 'domcontentloaded' });
            await page.waitForURL(url => url.pathname === '/');
            // <details> may be restored open by the engine; both states must remain usable.
            const restoredOpen = await details.evaluate(element => element.open);
            await summary.tap();
            assert.equal(await details.evaluate(element => element.open), !restoredOpen);
            await summary.tap();
            assert.equal(await details.evaluate(element => element.open), restoredOpen);
            if (restoredOpen) await summary.tap();
            await waitForTransform(summary);
            return { restoredOpen };
          }, '/');

          if (engine === 'chromium') {
            await check('trusted touch press cancels on scrolling without sticky scale', async () => {
              await submit.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
              await page.evaluate(selector => {
                window.__motionTouch = { cancellations: 0, clicks: 0, scrollStart: scrollY, pointerDownEvents: [], requestedPoint: null };
                const button = document.querySelector(selector);
                document.addEventListener('pointerdown', event => {
                  const target = event.target;
                  window.__motionTouch.pointerDownEvents.push({ trusted: event.isTrusted, pointerType: event.pointerType,
                    clientX: event.clientX, clientY: event.clientY, pageX: event.pageX, pageY: event.pageY,
                    target: { tag: target.tagName, class: target.getAttribute?.('class'), text: target.textContent?.trim().slice(0, 90) },
                    hitSubmit: target === button || button.contains(target),
                    submitActive: button.matches(':active'), submitTransform: getComputedStyle(button).transform });
                }, { capture: true });
                button.addEventListener('pointercancel', event => { if (event.isTrusted) window.__motionTouch.cancellations += 1; });
                button.addEventListener('click', () => { window.__motionTouch.clicks += 1; });
              }, submitSelector);
              const box = await submit.boundingBox();
              const point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
              await page.evaluate(point => { window.__motionTouch.requestedPoint = point; }, point);
              assert.ok(point.y > 200 && point.y < viewport.height - 50, 'Touch target must leave enough room for the scroll gesture');
              const session = await context.newCDPSession(page);
              try {
                await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
                console.log(`TOUCH START DIAGNOSTIC ${JSON.stringify({ ...meta, point,
                  events: await page.evaluate(() => window.__motionTouch), style: await styleOf(submit) })}`);
                await waitForTransform(submit, 0.97);
                for (const delta of [15, 45, 90, 160]) {
                  await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x, y: point.y - delta }] });
                  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
                }
                await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
                await page.waitForFunction(() => window.__motionTouch.cancellations > 0 && scrollY > window.__motionTouch.scrollStart + 20);
                await waitForTransform(submit);
                const gesture = await page.evaluate(() => ({ ...window.__motionTouch, scrollEnd: scrollY }));
                assert.equal(gesture.clicks, 0);
                assert.equal(new URL(page.url()).pathname, '/kontakty');
                await assertNoOverflow(page);
                return gesture;
              } finally {
                await session.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] }).catch(() => {});
                await session.detach();
              }
            });
          } else {
            skip('trusted touch press cancels on scrolling without sticky scale', 'Playwright WebKit has no supported touch-drag/CDP API. Native taps are covered; real Safari drag-to-scroll remains manual QA.');
          }
        } else {
          skip('mobile-only menus and touch-scroll gesture', 'Desktop profile intentionally uses a fine pointer without touch.');
        }

        await check('no uncaught runtime errors and network remained guarded', async () => {
          assert.deepEqual(runtimeErrors, []);
          assert.deepEqual(network.rejectedRedirects, [], 'Canonical local fixtures must not redirect');
          assert.ok(network.allowedRequests > 0);
          return { ...network, realLeadsSent: 0, telemetryDelivered: 0 };
        }, null);
      } finally {
        contextClosing = true;
        releaseLead?.();
        await context.close();
      }
    }
  } catch (error) {
    const failure = { engine, name: 'browser/context setup or teardown', status: 'FAIL', error: error.stack || error.message };
    receipt.scenarios.push(failure); receipt.failures.push(failure);
    console.error(`FAIL ${engine}: ${failure.error}`);
  } finally {
    await browser?.close();
    persist();
  }
}

receipt.completedAt = new Date().toISOString();
receipt.summary = Object.fromEntries(['PASS', 'FAIL', 'SKIP'].map(status => [status.toLowerCase(), receipt.scenarios.filter(scenario => scenario.status === status).length]));
persist();
console.log(JSON.stringify({ ...receipt.summary, screenshots: receipt.screenshots.length, realLeadsSent: 0, telemetryDelivered: 0, receipt: resolve(output, 'receipt.json') }, null, 2));
if (receipt.failures.length) process.exitCode = 1;
