# MASTER FIX №2: pre-fix audit — 2026-08-20

Scope: implementation audit of `FORMULA_MASTER_FIX_2.md` against the current repository. This report records the baseline before the remaining safe corrections. It does not claim external Google Business Profile, citation, backlink, review, deployment or Search Console actions that have not been independently verified.

## Protected pages and signals

- `/`: URL, Title, H1, Hero, hero copy, 55/100/120 price anchors, CTA and canonical are frozen.
- `/prybyrannya-kvartyr-cherkasy`: URL, Title, H1, Hero, 55/100/120 price anchors and canonical are frozen.
- `/prices`: URL, price intent, H1 and canonical are frozen.
- No destructive consolidation is authorized without evidence and a reversible redirect plan.

## Baseline already complete

- Canonical www HTTPS architecture and one-intent/one-primary-URL registry.
- Six primary homepage service directions plus secondary groups and `/poslugy` catalog CTA.
- 655 exact permanent legacy mappings plus normalized pagination handling.
- Direct canonical internal links, canonical-only sitemap and no active `/uk/*` pages.
- Separate intent ownership for premises-wide and apartment-specific general cleaning.
- Permanent consolidation of `/prybyrannya-trts-supermarketiv-cherkasy` into `/prybyrannya-mahazyniv-supermarketiv-cherkasy`.
- Automated checks for redirect coverage, sitemap membership, unique Title/H1/query ownership, static internal links, local images and critical body-copy similarity.
- Pre-fix `pnpm test:seo`: 20/20 passed on 2026-08-20.

## Confirmed remaining gaps

| Priority | Gap | Evidence | Safe action |
| --- | --- | --- | --- |
| P0 | Unsupported homepage trust counters | `components/HomePageContent.tsx` contains `5+`, `1000+` and `98%`; no supporting evidence is stored in the repository | Replace only these counters with neutral, verifiable service facts; leave the frozen Hero and SEO signals unchanged |
| P0 | Self-published Review JSON-LD is not needed for a local business | Homepage emits a `Review` for the business from a local array without a public source URL | Remove only this structured-data block; keep visible customer reviews unchanged |
| P1 | Opening hours are duplicated in schema | `app/layout.tsx` hardcodes `Mo-Su 09:00-21:00` while visible NAP uses `contacts` | Store the schema value in `contacts` and consume it from the root schema |
| P1 | Regression suite does not prevent trust/NAP drift | Existing tests do not reject unsupported counters, self-published review markup or duplicated hours | Add focused trust and NAP assertions to the SEO suite |

The owner has previously confirmed the schedule as daily 09:00–21:00, so this value is not blocked by ambiguity.

## Reviewed, no immediate code change required

- `/poslugy` is a catalog with one H1, a short introduction, cards and direct CTAs. Its FAQ contains only three concise general questions, not a large duplicated FAQ.
- The principal public price anchors reviewed against `/prices` remain consistent. No business-critical price will be changed in this pass.
- Existing reviews remain visible content; only unsupported or ineligible structured claims are in scope.
- External GBP fields, citations, review acquisition and backlink outreach remain manual tasks and must not be reported as completed repository work.

## Planned validation

After the safe patch: `pnpm test:seo`, `pnpm test:seo:http`, `pnpm lint`, `pnpm typecheck`, `npm run build`, `git diff --check`, sitemap/redirect/schema checks, priority-page HTTP checks and responsive browser QA. Commit, push and production deployment remain outside this run unless separately requested.
