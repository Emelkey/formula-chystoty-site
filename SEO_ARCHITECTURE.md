# SEO Architecture: Formula Chistoty

This document is the permanent source of truth for search-intent ownership. The machine-readable registry is `lib/seo-architecture.ts`; CI validates it on every push.

## Core rule

One transactional search intent has one primary canonical URL. A hub may summarize child services, a catalog may list them, and blog posts may explain them, but those pages must not compete for the same primary query.

## Primary hierarchy

| Cluster | Primary URL | Primary intent | Boundary |
| --- | --- | --- | --- |
| Brand/local | `/` | клінінг Черкаси | Brief overview and links only; no full service landing copy |
| Prices | `/prices` | ціни на клінінг Черкаси | Price comparison and links; not an apartment landing |
| Catalog | `/poslugy` | клінінгові послуги Черкаси | Short cards; no full landing copy |
| Apartments | `/prybyrannya-kvartyr-cherkasy` | прибирання квартир Черкаси | Hub for supporting, general and post-renovation formats |
| General premises | `/generalne-prybyrannya-cherkasy` | генеральне прибирання приміщень Черкаси | Premises-wide service; not apartment-specific |
| General apartment | `/generalne-prybyrannya-kvartyry-cherkasy` | генеральне прибирання квартири Черкаси | Apartment-specific deep cleaning |
| Supporting apartment | `/pidtrymuyuche-prybyrannya-kvartyr-cherkasy` | підтримуюче прибирання квартири Черкаси | Regular maintenance only |
| Post-renovation | `/prybyrannya-pislya-remontu-cherkasy` | прибирання після ремонту Черкаси | Construction dust and post-building work |
| Furniture | `/himchystka-mebliv-cherkasy` | хімчистка м’яких меблів Черкаси | Furniture hub; links to object-specific pages |
| Sofa | `/himchystka-dyvana-cherkasy` | хімчистка дивана Черкаси | Sofa only |
| Mattress | `/himchystka-matratsa-cherkasy` | хімчистка матраца Черкаси | Mattress only |
| Carpet | `/himchystka-kylymiv-cherkasy` | хімчистка килимів Черкаси | Removable carpets |
| Fitted carpet | `/himchystka-kovrolinu-cherkasy` | хімчистка ковроліну Черкаси | Fixed floor covering |
| Business | `/prybyrannya-komertsiynykh-prymishchen-cherkasy` | прибирання комерційних приміщень Черкаси | B2B hub |
| Offices | `/prybyrannya-ofisiv-cherkasy` | прибирання офісів Черкаси | Office-specific landing |
| Retail | `/prybyrannya-mahazyniv-supermarketiv-cherkasy` | прибирання магазинів і супермаркетів Черкаси | Retail and sales floors |
| Restaurants | `/prybyrannya-restoraniv-kafe-cherkasy` | прибирання ресторанів і кафе Черкаси | Food-service premises |
| Warehouses | `/prybyrannya-skladiv-cherkasy` | прибирання складів Черкаси | Warehouse premises |
| Production | `/prybyrannya-vyrobnychykh-prymishchen-cherkasy` | прибирання виробничих приміщень Черкаси | Production areas |
| Medical | `/prybyrannya-medychnykh-tsentriv-cherkasy` | прибирання медичних приміщень Черкаси | Medical facilities |

## Additional canonical landings

| Cluster | Primary URL | Primary intent | Boundary |
| --- | --- | --- | --- |
| General kitchen | `/generalne-prybyrannya-kuhni-cherkasy` | генеральне прибирання кухні Черкаси | Kitchen-only deep cleaning |
| Houses | `/prybyrannya-budynkiv-cherkasy` | прибирання будинків Черкаси | Private houses, not apartments |
| Flood | `/prybyrannya-pislya-potopu-cherkasy` | прибирання після потопу Черкаси | Water-damage cleanup |
| Fire | `/prybyrannya-pislya-pozhezhi-cherkasy` | прибирання після пожежі Черкаси | Soot and fire consequences |
| Outdoor territory | `/prybyrannya-prylegloyi-terytoriyi-cherkasy` | прибирання прилеглої території Черкаси | Outdoor areas only |
| Car interior | `/himchystka-avto-cherkasy` | хімчистка авто Черкаси | Vehicle interior only |
| Chairs | `/himchystka-stiltsiv-cherkasy` | хімчистка стільців Черкаси | Upholstered chairs only |
| Armchairs | `/himchystka-krisel-cherkasy` | хімчистка крісел Черкаси | Armchairs only |
| Windows | `/myttya-vikon-cherkasy` | миття вікон Черкаси | Glass, frames and window structures |
| Facades | `/myttya-fasadiv-cherkasy` | миття фасадів Черкаси | Exterior facades, not windows |
| Paving | `/myttya-plytky-cherkasy` | миття тротуарної плитки Черкаси | Pressure washing of paving |
| Disinfection | `/dezinfektsiya-prymishchen-cherkasy` | дезінфекція приміщень Черкаси | Disinfection, ozonation and biohazard cleanup |
| Regular B2B | `/rehulyarne-prybyrannya-biznesu-cherkasy` | регулярне прибирання бізнесу Черкаси | Recurring service contracts |

Trust and navigation pages (`/nashi-roboty`, `/vidguky`, `/blog`, `/pro-nas`, `/kontakty`) have non-transactional roles. Exact Title, H1, secondary queries, prohibited queries and related pages for every canonical landing are recorded in `seoIntentRegistry`.

## Metadata ownership matrix

`lib/seo-architecture.ts` is the normative machine-readable Title/H1 matrix. Every canonical landing has exactly one row with its role, primary query, secondary queries, prohibited primary queries, supporting articles and related landing pages. CI compares every service row with the effective `seoTitle` and `h1` from `lib/site.ts`, and also rejects missing or duplicated service descriptions.

This registry must be updated in the same pull request as any intentional Title, H1 or search-intent change. A content editor must not transfer a primary query to another URL without first resolving the ownership conflict in this matrix.

## Blog policy

Every `/blog/*` page is a supporting information page. Its title and H1 must remain informational, and it must link to the relevant transactional landing page. A blog article must not claim a transactional primary query already owned by the registry.

Every published article must appear in at least one `supportingUrls` list. The registry is the ownership map for all current blog articles; CI fails if an article is unassigned or a supporting URL does not exist.

## Internal-link policy

1. Homepage links to six primary directions, then visually weaker secondary categories.
2. `/poslugy` lists all canonical service pages.
3. Landing pages link to two to five related canonical pages with varied natural anchors.
4. Blog posts link contextually to their primary landing pages.
5. Internal links never point to `/uk/*`, redirects, non-www URLs or missing routes.

CI scans static internal `href` values in `app`, `components` and `lib`; a direct link to a redirect-only, legacy, missing or unregistered route blocks the change.

## New-page gate

Before creating an indexable landing page, document its primary query, difference from existing pages, supporting relationships and canonical target. If an existing registry entry owns the intent, strengthen that page instead of creating a duplicate.

The pull request must also answer:

1. Which existing URL is closest to the proposed intent?
2. Which phrases are explicitly prohibited on the new page as primary targets?
3. Which canonical pages will link to it, and which pages will it link back to?
4. Does the route render with a self-canonical, one H1, service schema and breadcrumbs?
5. Does its meaningful body copy remain below the critical similarity threshold?

## Similarity thresholds

- below 30%: acceptable;
- 30–50%: manual review;
- 50–70%: high cannibalization risk;
- above 70%: CI-blocking critical duplication.

The automated check compares meaningful service copy rather than navigation, footer and shared interface text.

## CI protection

`pnpm test:seo` blocks:

- duplicate canonical paths, Title, H1 or primary-query ownership;
- a service route missing from the registry or a registry Title/H1 that differs from live service data;
- unassigned or nonexistent supporting blog URLs;
- internal architecture targets that use legacy, redirect-only or missing paths;
- an incorrect six-card homepage hierarchy or missing homepage media;
- related-service blocks outside the two-to-five-link limit;
- a blog Title/H1 that duplicates a transactional landing;
- service-copy similarity above 70%;
- service routes that bypass the shared metadata and structured service layout.

The HTTP regression suite separately verifies the permanent one-hop legacy redirects after a production build.

## Change process

Any change to Title, H1, URL ownership or primary query must update `lib/seo-architecture.ts` in the same pull request. `pnpm test:seo` prevents duplicate Title/H1/query ownership, missing service entries, critical content similarity and invalid homepage/related-service targets.
