# MASTER FIX №2: final report — 2026-08-20

## 1. Executive summary

The current repository already contained the primary URL architecture, homepage service hierarchy, catalog structure, legacy redirect registry and most SEO regression coverage required by MASTER FIX №2. The pre-fix audit identified four residual risks: three unsupported homepage counters, self-published LocalBusiness review markup, duplicated opening-hours data in schema and no regression guard for those issues.

The safe patch replaced only the unsupported counters with verifiable service facts, removed only the homepage `Review` JSON-LD, centralized schema hours in the existing contact configuration and added a focused regression test. Frozen homepage, apartment and price-page signals were not changed. The implementation was pushed in commit `8fbe028` and verified on production.

Blocked external work is limited to authenticated Google Business Profile review, citation/backlink work and future Google recrawl/re-ranking. No external result is claimed as completed.

Final verdict: `PASS WITH WARNINGS`.

## 2. Files changed

| File | Change | Reason |
|---|---|---|
| `components/HomePageContent.tsx` | Replaced `5+`, `1000+`, `98%` counters with neutral facts; removed standalone `Review` JSON-LD | Remove claims without stored evidence and avoid self-published LocalBusiness review markup |
| `lib/site.ts` | Added central short and schema forms of the confirmed daily 09:00–21:00 hours | Keep visible NAP and structured data synchronized |
| `app/layout.tsx` | Reads `openingHours` from `contacts.openingHoursSchema` | Eliminate duplicated business-hours value |
| `scripts/seo-architecture.test.mjs` | Added trust/NAP regression assertions | Prevent unsupported counters, AggregateRating, Review schema and hour drift from returning |
| `docs/seo/master-fix-2-preflight-2026-08-20.md` | Recorded the evidence-based pre-fix baseline and approval boundary | Preserve the audit trail before implementation |
| `docs/seo/master-fix-2-final-report-2026-08-20.md` | Recorded implementation, tests, production QA and remaining risks | Complete the required MASTER FIX №2 handoff |

No file under `sources/` was read as an instruction target or modified.

## 3. Homepage

Old trust block: `5+ років досвіду`, `1000+ задоволених клієнтів`, `98% рекомендують`, `09:00–21:00 щодня`.

New trust block: `Своя техніка — на кожен виїзд`, `Розрахунок — за фото об’єкта`, `Черкаси — основний регіон`, `09:00–21:00 — щодня`.

The approved six primary service URLs and three secondary groups remain unchanged. The homepage still owns the broad `клінінг Черкаси` intent. The following frozen signals were confirmed unchanged: `/`, Title, H1, Hero component, hero copy, 55/100/120 price anchors, CTA and canonical.

## 4. `/poslugy`

No content patch was required. `/poslugy` remains a catalog with one H1, a short introduction, all service cards with direct canonical CTAs, one general CTA and only three concise general FAQ items. It does not replace individual money pages and does not contain a new broad SEO essay.

## 5. NAP

| Field | Before variants | Final value | Status |
|---|---|---|---|
| Name | Central config and schema were already consistent | `Формула Чистоти` | PASS |
| Phone | Central config and schema were already consistent | `+38 (097) 809 58 00` / `+380978095800` | PASS |
| Email | Central config and schema were already consistent | `formula-chistoty@ukr.net` | PASS |
| Address/service area | Central config and schema were already consistent | `Черкаси, Україна` | PASS |
| Hours | Visible value came from `contacts`; root schema hardcoded the equivalent value | `Щодня: 09:00–21:00`; schema `Mo-Su 09:00-21:00` from one config | PASS |
| Map | Existing central Google Maps URL | `https://maps.app.goo.gl/z12jY8uJuUHYkakKA` | PASS |

The owner had previously confirmed daily 09:00–21:00, so no ambiguous business fact was invented.

## 6. Trust claims

| Claim | Evidence | Final action | Status |
|---|---|---|---|
| `5+ років досвіду` | No supporting repository evidence | Replaced with `Своя техніка — на кожен виїзд` | REMOVED |
| `1000+ задоволених клієнтів` | No supporting repository evidence | Replaced with `Розрахунок — за фото об’єкта` | REMOVED |
| `98% рекомендують` | No supporting repository evidence | Replaced with `Черкаси — основний регіон` | REMOVED |
| Homepage `Review` JSON-LD with rating 5 | Visible review text existed, but no public source URL was attached and self-published LocalBusiness review markup was unnecessary | Structured-data block removed; visible reviews retained | REMOVED FROM SCHEMA |
| `AggregateRating` | No independently verified aggregate source | Regression test forbids it | BLOCKED |

## 7. Legacy redirects

The local HTTP regression suite checked all 655 registered exact legacy URLs, canonical destinations, uppercase/trailing-slash variants and pagination rules. Representative production checks after deployment:

| Old URL | Status | Target | Hops | Final HTTP | PASS/FAIL |
|---|---:|---|---:|---:|---|
| non-www `/` | 308 | `https://www.formula-chistoty.ck.ua/` | 1 | 200 | PASS |
| `/tsiny` | 301 | `/prices` | 1 | 200 | PASS |
| `/services` | 301 | `/poslugy` | 1 | 200 | PASS |
| `/uk` | 301 | `/` | 1 | 200 | PASS |
| `/uk/services/prybyrannya-kvartyr` | 301 | `/prybyrannya-kvartyr-cherkasy` | 1 | 200 | PASS |
| `/prybyrannya-trts-supermarketiv-cherkasy` | 301 | `/prybyrannya-mahazyniv-supermarketiv-cherkasy` | 1 | 200 | PASS |

## 8. Technical SEO

| Area | Issue before | Change | Final status |
|---|---|---|---|
| Sitemap | No current defect | No sitemap code change | 200 XML; 61 unique www URLs; no legacy aliases; PASS |
| Canonical | No current defect | No canonical change | All 10 production priority pages self-canonical; PASS |
| Robots | No current defect | No robots change | `robots.txt` 200, allows crawl and references sitemap; pages `index, follow`; PASS |
| Open Graph | No stale legacy target found | No OG change | Canonical URL builder retained; PASS |
| hreflang | No legacy `/uk` or `/ru` target found | No hreflang change | Current canonical Ukrainian and x-default values retained; PASS |
| Schema | Homepage emitted unnecessary self-published Review markup; hours duplicated | Removed Review block and centralized hours | Valid JSON-LD; homepage now Organization, CleaningService and WebSite only; PASS |
| 404 | No current defect | No route change | Control URL returns 404 and noindex; PASS |

## 9. Internal links

| Check | Before | After | Status |
|---|---:|---:|---|
| Static internal links through known redirect-only routes | 0 | 0 | PASS |
| Static internal links to missing/unregistered routes | 0 | 0 | PASS |
| Internal `/uk/*` links outside redirect registry | 0 | 0 | PASS |
| Missing statically referenced local images | 0 | 0 | PASS |
| Broken images in production priority-page browser QA | 0 | 0 | PASS |

## 10. Duplicates

- The known shopping-centre/supermarket duplicate remains consolidated by permanent one-hop redirect to `/prybyrannya-mahazyniv-supermarketiv-cherkasy`.
- `/generalne-prybyrannya-cherkasy` remains the premises-wide intent; `/generalne-prybyrannya-kvartyry-cherkasy` remains apartment-specific.
- `/` remains the broad local cleaning answer, while `/prybyrannya-kvartyr-cherkasy` remains the dedicated apartment hub. No abrupt relevance transfer was introduced.
- No page was deleted, renamed or consolidated during this pass.

## 11. Prices

`/prices` remains the canonical source of public price orientation. The protected anchors reviewed in the current code remain: supporting cleaning from 55 UAH/m², general cleaning from 100/120 UAH/m², post-renovation cleaning from 120 UAH/m², windows from 160 UAH/m² and post-renovation windows at 200 UAH/m² where applicable.

No price, price schema, minimum order, URL, H1 or price-page intent was changed. No unconfirmed business-critical price was invented.

## 12. Tests

| Check | Result |
|---|---|
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm test:seo` | PASS — 21/21 |
| `pnpm test:seo:http` | PASS — 4/4, including all 655 registered legacy URLs |
| `npm run build` | PASS — 70 routes generated |
| `git diff --check` | PASS |
| SEO regression | PASS — trust/NAP guard added |
| Local responsive QA | PASS — 42/42 combinations, 320–1440 px |

## 13. Production QA

| URL | HTTP | Canonical | Indexable | Links/assets | Final status |
|---|---:|---|---|---|---|
| `/` | 200 | self, www | index/follow | clean | PASS |
| `/prices` | 200 | self, www | index/follow | clean | PASS |
| `/poslugy` | 200 | self, www | index/follow | clean | PASS |
| `/prybyrannya-kvartyr-cherkasy` | 200 | self, www | index/follow | clean | PASS |
| `/prybyrannya-pislya-remontu-cherkasy` | 200 | self, www | index/follow | clean | PASS |
| `/generalne-prybyrannya-cherkasy` | 200 | self, www | index/follow | clean | PASS |
| `/himchystka-mebliv-cherkasy` | 200 | self, www | index/follow | clean | PASS |
| `/himchystka-dyvana-cherkasy` | 200 | self, www | index/follow | clean | PASS |
| `/himchystka-avto-cherkasy` | 200 | self, www | index/follow | clean | PASS |
| `/myttya-vikon-cherkasy` | 200 | self, www | index/follow | clean | PASS |

Production browser QA covered all 10 URLs at 360, 390, 430 and 1440 px: 40/40 combinations passed with one H1, no document overflow, no broken images, no invalid schema, no internal `/uk` links and no console errors. Critical CTA destinations remain present; no form was submitted.

Checklist: code deployed; homepage new facts visible; unsupported counters absent; Review/AggregateRating absent from homepage schema; 10 priority URLs 200; canonical/robots/H1 clean; mobile overflow absent; sitemap/robots/404 clean; representative production redirects one hop; local full redirect registry test passed.

## 14. Search Console actions

Fresh official read-only snapshot: generated 2026-08-20 19:24 UTC, final performance data through 2026-08-18, two-day reporting lag.

- All 10 URL Inspection records: PASS, submitted and indexed, robots allowed, indexing allowed, fetch successful, mobile crawl and matching Google/user www canonical.
- GSC sitemap: 61 submitted URLs, zero warnings, zero errors, last downloaded 2026-08-19 08:08 UTC.
- No Request Indexing action was performed.
- After deployment, monitor the next crawls for `/`, `/poslugy`, the broad general-cleaning page, sofa, auto and window pages. Do not infer impact before a complete 14–28-day observation window.

## 15. Remaining risks

| Issue | Severity | Reason | Required action |
|---|---|---|---|
| Google has not yet recrawled the 2026-08-20 deploy | Expected | Search systems update asynchronously | Freeze SEO code for 14–28 days and monitor GSC |
| GBP fields were not authenticated and edited in this repository run | External | Requires profile access and owner review | Manually verify category, area, phone, hours, website and photos |
| Citations, real-review acquisition and backlinks are not repository actions | External | Require third-party publication/approval | Continue the documented ethical off-site plan |
| Some case facts remain incomplete | P2 | Area, duration or approved price is missing for several image sets | Publish only after owner supplies evidence |
| GSC sitemap API reports `indexed: 0` | API limitation | This field is not a reliable indexed-page count; URL Inspection is PASS | Do not treat it as deindexation; use Inspection and performance data |

## 16. Final verdict

`PASS WITH WARNINGS`
