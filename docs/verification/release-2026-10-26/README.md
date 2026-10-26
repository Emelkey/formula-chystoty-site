# Formula Chystoty — original article and dependency maintenance

## Scope

One original kitchen-scope article, standard blog/sitemap/intent-registry integration, and an approved supported CMS dependency upgrade. Existing landing titles/descriptions/H1/hero, prices, redirects, forms, schema fields, dataset configuration and content remain unchanged. A minimal `sanity.cli.ts` keeps the modern CLI aligned with existing public Studio environment names; no credentials or dataset writes are included.

## Dependency rationale

- Next16.4.3 and sharp0.35.5 address the current image-optimizer advisories. Next16 is required for Sanity5’s native React useEffectEvent; the attempted Next15 build failed because its internal React lacked that export. The separately approved framework migration retains Webpack and existing middleware/redirect behavior.
- Sanity3.99 and even CLI4/5 contain bundled tar6.2.1 not represented by an external dependency audit. Sanity5.31.2 + next-sanity11.6.13 has compatible declared peer ranges, while CLI6.7.2 uses external patched tar7.5.21. Next16 provides the required internal React hook. Matching native flat ESLint config and an equivalent module-static ServiceCard icon lookup address new lint compatibility without changing visible content. Independent comparison covered all 30 service slugs and 508 additional branch/combination/default cases: identical icon selections, href and JSX. No fork aliases, vendored codegen patches, audit exclusions or dev-dependency reclassification are used.
- Remaining scoped resolutions select fixed compatible APIs. Tailwind3/postcss-nested with selector-parser7.1.6 produced byte-identical actual application CSS and nested-selector fixtures; typeid-js with UUID11.1.1 passed CJS/ESM ID generation, round-trip and validation tests. adm-zip0.6.1 passed the ZIP creation APIs actually used by runtime-cli.
- Full installed dependency audit (including development dependencies) on2026-10-26: zero known advisories; peer check clean. This is not a guarantee of absence of unknown vulnerabilities.
- Independent active CLI distribution scan:1165 files/480 embedded sources, no old bundled tar6.2.1 or decompress4.2.1 markers.

## Repeatable checks

```sh
pnpm install --frozen-lockfile
pnpm audit
pnpm peers check
pnpm lint
pnpm typecheck
pnpm build
pnpm test:seo
bash scripts/cms-smoke.sh
```

The CMS smoke script isolates HOME and blocks HTTP/HTTPS/net/TLS/fetch, checks CLI help/version and extracts local schema (20 types, including seven business types). It does not authenticate, upload, deploy or change Sanity datasets. Browser CI uses a version-matched official Playwright image to avoid unreliable system-library downloads, and intercepts all form submissions. Article tests cover1440/390/360 pixels, content/meta/schema/image/links/search/CTA/Back and no horizontal overflow.

## Known limits outside this release

- `/kontakty` has two existing `id="contact-form"` attributes. Tested form behavior works; this is documented markup debt, not proof of lost leads. Form structure was not changed.
- Technical crawlability is not proof of Google indexing.
- Cloud-proxy performance samples are not field Core Web Vitals.
- No real form submissions, analytics test events or authenticated CMS content writes are used for verification.

## Primary references

- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://www.sanity.io/docs/help/v3-to-v4
- https://www.sanity.io/docs/help/v4-to-v5
- https://github.com/advisories/GHSA-2464-fhr4-w9xw
- https://playwright.dev/docs/docker
