# Formula Chystoty remaining work — 2026-09-27

This release starts from `4d4babd5bfaf9511eb99186a66fc81d477bf82f9` and preserves the existing phone normalization, submission lock, Telegram success validation, GA4 destination guard, and `lead_submit` name.

## User-visible changes

- Furniture cleaning shows the existing minimum city visit price beside the price section and final enquiry CTA, outside the protected hero. The amount is shared with `/prices` through `lib/order-conditions.ts`; existing rendered price values are unchanged.
- Every contact form explains which photos to send and provides the existing verified Telegram/Viber contact destinations. The form does not claim to upload photos. Messenger links emit contact events only.
- Exact legacy service mappings take precedence over broad slug heuristics. This corrects mixed carpet/carpet-flooring legacy addresses without changing the approved route map.

## Regression coverage

`npm run test:leads:browser` tests the hydrated Next.js form in Chromium and WebKit at 390×844 and 1365×900. It requires an isolated Playwright install (`GA4_PLAYWRIGHT_DIR`), a production server (`FORM_QA_BASE_URL`, default `http://127.0.0.1:3100`), and optionally `FORM_QA_EXPECT_UX=1` for the new explanation checks. All `/api/lead` requests are mocked and all telemetry/external writes are blocked before navigation. No synthetic leads or analytics events leave the test browser.

Coverage includes valid/invalid phone forms, HTTP/application/JSON errors, duplicate submission while pending, honeypot, unavailable analytics, SPA navigation, exact event destination, minimum-order visibility, and photo contact links. Existing offline Telegram/API tests and GA4 tag isolation tests remain mandatory. The dedicated GitHub workflow retains browser receipts and screenshots.

Local verification uses Node22 and pnpm11 with the frozen lockfile. The final private owner report records command exit codes, exact tested SHA, deployment receipt, full live crawl, Lighthouse medians, and remaining administrative/data/material dependencies.

## Scope and evidence limits

No protected Title/Description/H1/hero, service price, schema entity, canonical map, or main post-renovation copy is changed. No database, upload service, tracking vendor, new CRM, budget, or bidding strategy is introduced. Browser tests prove local behavior and routing, not Telegram delivery, GA4 ingestion, or Ads attribution. Real cases require provenance and permission; new cases are not invented.

Rollback: revert this release commit/PR to the verified base above and verify the production domain. Ads/GA4 administrative changes have separate private receipts and must not be inferred from this code release.
