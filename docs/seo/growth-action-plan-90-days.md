# SEO growth action plan: 90 days

Start date: 2026-08-16. This plan follows the technical cleanup and does not authorize bulk page creation, fabricated cases, fake reviews or spam links.

## Operating rules

1. Keep `SEO_ARCHITECTURE.md` and `lib/seo-architecture.ts` as the intent source of truth.
2. Change one cluster at a time and record the deployment date.
3. Use only final canonical 200 URLs in internal links.
4. Treat missing Search Console rows as unavailable data, not as zero.
5. Do not publish a case until its origin and visible facts are confirmed.
6. Do not change a price until it is reconciled with `/prices` and approved by the owner.
7. Evaluate ranking changes only after enough final Search Console days have accumulated.

## Days 1-14: baseline and evidence

| Workstream | Action | Evidence / output | Owner | Status |
| --- | --- | --- | --- | --- |
| Search Console | Preserve the 2026-08-16 API snapshot and query-to-page baseline | `growth-baseline-2026-08-16.md` | SEO | Complete |
| Intent architecture | Verify one primary URL per transactional intent | `SEO_ARCHITECTURE.md`, `lib/seo-architecture.ts` | Engineering | Complete |
| Legacy migration | Keep every confirmed `/uk/*` route on a one-hop permanent redirect | `LEGACY_REDIRECTS.md`, regression tests | Engineering | Complete |
| Blog inventory | Classify every current article as KEEP or UPDATE | `blog-audit-2026-08-16.csv` | Content | Complete |
| Case inventory | Separate confirmed cases from visual-only evidence | `case-inventory-2026-08-16.csv` | Content / owner | Complete |
| Competitor gap | Record only verifiable public competitor signals | `competitor-gap-2026-08-16.md` | SEO | Complete |
| GBP alignment | Verify category, website, phone, hours, service area, photos and Q&A | `google-business-profile-content.md` | Owner | Pending external |
| NAP | Verify existing profiles; do not create duplicates | `off-site-plan-2026-08-12.md` | Owner | Pending external |

## Days 15-30: strongest money pages

Priority pages:

1. `/prybyrannya-kvartyr-cherkasy`
2. `/prybyrannya-pislya-remontu-cherkasy`
3. `/himchystka-avto-cherkasy`

For each page:

- confirm one H1, unique Title and self-canonical;
- reconcile all visible prices with `/prices`;
- use two to five relevant internal links;
- add only confirmed case facts and real photos;
- keep visible FAQ and FAQ schema synchronized;
- verify mobile CTA, pricing, tables and galleries;
- record the deployment and wait for final GSC data before another major edit.

Required owner input:

- apartment case: object type, area, duration, work list and approved price range;
- auto case: vehicle type, initial condition, duration and performed work;
- client comment only when permission to publish exists.

The post-renovation 100 m² case is already sufficiently documented for on-site use: cleaning at 120 UAH/m² plus approximately 30 m² of post-renovation window washing at 200 UAH/m², approximately 18,000 UAH total.

## Days 31-60: supporting clusters and local proof

| Cluster | Primary page | Safe next content actions |
| --- | --- | --- |
| Apartments | `/prybyrannya-kvartyr-cherkasy` | Update overlapping informational articles; keep transactional pricing on the landing |
| General cleaning | `/generalne-prybyrannya-cherkasy` | Clarify premises-wide intent versus apartment and kitchen pages |
| Renovation | `/prybyrannya-pislya-remontu-cherkasy` | Expand only with confirmed project evidence and practical preparation guidance |
| Furniture | `/himchystka-mebliv-cherkasy` | Add confirmed object-specific cases for sofa, mattress, chairs, carpets |
| Windows | `/myttya-vikon-cherkasy` | Add real window projects with access and contamination details when known |
| B2B | `/prybyrannya-komertsiynykh-prymishchen-cherkasy` | Obtain one approved recurring-business case before expanding claims |

External actions:

- upload two to four real work photos to GBP weekly;
- request reviews only from completed real orders;
- correct existing local citations without creating duplicates;
- pursue one or two relevant local or partner mentions, not bulk directories.

## Days 61-90: authority and CTR

1. Use `LINK_BUILDING_PLAN.md` for manual, relevant outreach.
2. Prepare one linkable checklist from confirmed expertise, such as a post-renovation preparation checklist.
3. Review pages with positions 3-20 and meaningful impressions for CTR opportunities.
4. Test at most one Title variant per approved page and record old/new values and date.
5. Re-run the competitor review using public pages; use an approved SEO tool for backlink counts if available.
6. Compare final 28-day periods only when the official API includes complete data.

## Measurement cadence

| Timing | Check | Decision rule |
| --- | --- | --- |
| Day 0 | HTTP, canonical, sitemap, robots, structured data, mobile | Fix only verified regressions |
| Day 3-7 | Last crawl and indexability | Do not infer ranking impact from recrawl alone |
| Day 14 | Query-to-URL mapping | Act only on repeated mapping conflicts with enough impressions |
| Day 28 | 28 days after vs 28 days before | Compare clicks, impressions, CTR, position and leads |
| Monthly | Competitor and authority review | Record evidence; do not copy or estimate unavailable data |

## Success metrics

Primary:

- organic calls and form submissions when measurement is available;
- clicks to money pages;
- number of priority queries in the top 10.

Secondary:

- impressions;
- CTR;
- average position by query and page;
- number of ranking queries.

Diagnostic:

- canonical and redirect regressions;
- sitemap validity;
- indexed-page and crawl issues;
- Core Web Vitals for priority pages.
