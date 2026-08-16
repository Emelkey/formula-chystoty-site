# Master SEO fix and growth report: 2026-08-16

Scope: repository implementation and evidence review for `FORMULA_CHYSTOTY_MASTER_SEO_FIX.md` and `FORMULA_CHYSTOTY_MASTER_SEO_GROWTH_AUTHORITY.md`.

This report distinguishes completed repository work from manual external work. It does not claim backlinks, reviews, Google Business Profile changes or Search Console indexation actions that were not independently confirmed.

## A. Technical foundation

| Requirement | Evidence | Status |
| --- | --- | --- |
| One intent = one primary URL | `SEO_ARCHITECTURE.md`, `lib/seo-architecture.ts` | Complete |
| Legacy `/uk/*` migration | 655 exact mappings plus pagination pattern in `lib/legacy-uk-routes.ts` | Complete in code |
| Permanent redirect manifest | `LEGACY_REDIRECTS.md` generated from the registry | Complete |
| `/tsiny` and `/uk/price-uk` consolidate to `/prices` | redirect registry and HTTP regression coverage | Complete in code |
| Canonical host is www HTTPS | site configuration and SEO tests | Complete |
| Sitemap contains canonical indexable routes only | 61 current routes: 8 main/trust, 30 services, 23 blog | Complete in code |
| Legacy/internal redirect URLs excluded from sitemap | sitemap and architecture tests | Complete |
| Internal links avoid legacy, redirect-only and missing routes | static link scan in `pnpm test:seo` | Complete |
| Unique service Title, H1 and primary-query ownership | architecture registry tests | Complete |
| Critical content similarity blocked | meaningful service-copy threshold test | Complete |
| Used local images exist | static image-path test | Complete |
| CI regression workflow | `.github/workflows/legacy-url-regression.yml` | Complete |

The dated 2026-08-12 audit remains historical. The current redirect count is 655 exact routes, not the older count recorded before the registry expansion.

## B. Canonical intent boundaries

| Intent | Primary URL | Boundary status |
| --- | --- | --- |
| клінінг Черкаси | `/` | Homepage overview and six main directions |
| ціни на клінінг Черкаси | `/prices` | Price source and comparison page |
| клінінгові послуги | `/poslugy` | Catalog, not a full landing |
| прибирання квартир Черкаси | `/prybyrannya-kvartyr-cherkasy` | Apartment hub |
| генеральне прибирання приміщень | `/generalne-prybyrannya-cherkasy` | Premises-wide intent |
| генеральне прибирання квартири | `/generalne-prybyrannya-kvartyry-cherkasy` | Apartment-specific intent |
| підтримуюче прибирання квартири | `/pidtrymuyuche-prybyrannya-kvartyr-cherkasy` | Regular maintenance |
| прибирання після ремонту | `/prybyrannya-pislya-remontu-cherkasy` | Construction dust and post-building work |
| хімчистка меблів | `/himchystka-mebliv-cherkasy` | Furniture hub |
| хімчистка дивана / матраца / килима / ковроліну | object-specific canonical pages | Separated in registry |
| commercial / office / retail / restaurant / warehouse / production / medical | B2B-specific canonical pages | Separated in registry |

Full boundaries, supporting articles, prohibited overlap and related pages are stored in `SEO_ARCHITECTURE.md` and `lib/seo-architecture.ts`.

## C. Homepage and catalog

- Homepage retains the primary intent `клінінг Черкаси` and the agreed H1.
- The service hierarchy contains six primary directions, visually secondary categories and a catalog CTA.
- `/poslugy` remains the service catalog and links to canonical service pages.
- SEO tests protect the six-card hierarchy and reject legacy or missing targets.

No new homepage or catalog rewrite was required in this pass.

## D. Prices

- `/prices` remains the canonical source of truth.
- Current verified public values used by the site include supporting cleaning at 55 UAH/m², general cleaning at 100/120 UAH/m², post-renovation cleaning at 120 UAH/m², windows at 160 UAH/m², post-renovation windows at 200 UAH/m² and fitted carpet at 90 UAH/m².
- The confirmed post-renovation example is 100 m² at 120 UAH/m² plus about 30 m² of windows at 200 UAH/m², approximately 18,000 UAH total.
- Price conflicts must remain blocked pending owner approval; no price was changed during this implementation.

## E. Content and real experience

| Area | Result |
| --- | --- |
| Blog | 23 existing articles classified in `blog-audit-2026-08-16.csv` |
| Cases | Confirmed and partial-evidence inventory in `case-inventory-2026-08-16.csv` |
| Money pages | Quality and missing-evidence matrix in `money-page-quality-2026-08-16.csv` |
| Similarity | No critical service-copy duplication in the current automated audit |
| Fabricated facts | None added |

The strongest fully documented case is the post-renovation 100 m² example. Other clusters have useful real images, but area, duration, work list or approved price are often not confirmed; those facts remain explicitly missing rather than invented.

## F. Search Console baseline

Official snapshot generated 2026-08-16, final data through 2026-08-14:

| Period | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| 2026-08-08 to 2026-08-14 | 49 | 1,184 | 4.14% | 13.68 |
| 2026-08-01 to 2026-08-07 | 52 | 1,034 | 5.03% | 10.30 |

Detailed query-to-page evidence and data limitations are in `growth-baseline-2026-08-16.md`. The snapshot does not provide a verified 28-day versus previous 28-day or three-month versus previous three-month comparison, so those values were not invented.

## G. Competitor gap

The qualitative review uses only public Cleaning Services pages and is recorded in `competitor-gap-2026-08-16.md`. No competitor ranking or backlink count is asserted without an approved data source.

Main opportunity: make Formula Chistoty stronger through verified local cases, clearer evidence and consistent business data, not through copied competitor content or keyword stuffing.

## H. Local SEO and authority

| Deliverable | Status |
| --- | --- |
| Corrected local GBP content brief | Complete in `docs/google-business-profile-content.md` |
| NAP and citation workflow | Complete as plan in `docs/seo/off-site-plan-2026-08-12.md` |
| Ethical link-building workflow | Complete as plan in `LINK_BUILDING_PLAN.md` |
| 90-day rollout | Complete in `growth-action-plan-90-days.md` |
| Monthly reporting template | Complete in `monthly-seo-report-template.md` |
| Actual GBP edits, citation approvals, reviews, backlinks | Pending external/manual confirmation |

No duplicate profiles, fake reviews or acquired backlinks are claimed.

## I. CI and repeatability

The repository now provides:

- machine-readable intent ownership;
- generated legacy redirect manifest;
- redirect-manifest parity test;
- static image existence test;
- Title/H1/query uniqueness tests;
- blog-support assignment validation;
- internal-link and route validation;
- critical content-similarity protection;
- production HTTP regression suite for legacy redirects.

Local commands:

```bash
pnpm seo:legacy-manifest
pnpm test:seo
pnpm test:seo:http
pnpm lint
pnpm typecheck
npm run build
```

## J. Remaining external dependencies

| Item | Why it remains | Required owner action |
| --- | --- | --- |
| GBP field verification | Requires authenticated profile access | Verify category, service area, website, phone, hours and photos |
| Real reviews | Must come from real customers | Send review link after completed orders |
| Citation corrections | Requires third-party approvals | Submit corrections and retain confirmation |
| Backlinks | Require real outreach and editorial acceptance | Follow `LINK_BUILDING_PLAN.md` |
| Complete case facts | Not present in repository | Supply approved area, duration, work list and price data |
| 28-day and 3-month comparisons | Not present in the current API snapshot | Export when final periods are available |
| Production Search Console selected canonical | Requires live GSC inspection | Check after deployment and recrawl |

## K. Release and monitoring decision

Repository work is classified as `PASS WITH WARNINGS`.

Validation completed on 2026-08-16:

- `pnpm test:seo`: 20/20 tests passed;
- `pnpm lint`: passed;
- `pnpm typecheck`: passed;
- `npm run build`: passed, 70 routes generated;
- `git diff --check`: passed;
- production browser QA: six priority pages checked at 360, 390, 430 and 1440 px;
- all 24 page/viewport combinations had one H1, `index, follow`, a www canonical, no broken images and no document-level horizontal overflow;
- the official Search Console sitemap record is healthy: 61 submitted URLs, zero errors and zero warnings, last downloaded 2026-08-15.

`pnpm test:seo:http` could not start its temporary localhost server because the managed sandbox rejected the port bind with `EPERM` on `127.0.0.1:3210`. The test now correctly accepts either permanent status allowed by the specification, 301 or 308, while still rejecting temporary 302/307 redirects. The suite must be rerun in a normal local Terminal or CI before release.

Warnings are limited to the blocked localhost HTTP run, external/manual authority work, unavailable measurement periods and production redirect-header verification that requires an unrestricted network environment. They are not presented as completed work.

No commit, push or deployment is part of this report.
