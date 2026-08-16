import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { ukLegacyPatternRedirects, ukLegacyRouteRegistry } from "../lib/legacy-uk-routes.ts";

const root = resolve(import.meta.dirname, "..");
const rows = ukLegacyRouteRegistry.map((route) =>
  `| \`${route.source}\` | \`${route.destination}\` | 301 | ${route.reason} | ${route.migrationDate} |`
);
const patterns = ukLegacyPatternRedirects.map((route) =>
  `| \`${route.source}\` | \`${route.destination}\` | ${route.statusCode} | Legacy paginated services archive | 2026-08-15 |`
);

const content = `# Legacy Redirects

This manifest is generated from \`lib/legacy-uk-routes.ts\`. Do not edit redirect rows by hand.

- Canonical host: \`https://www.formula-chistoty.ck.ua\`
- Exact legacy URLs: **${ukLegacyRouteRegistry.length}**
- Pattern redirects: **${ukLegacyPatternRedirects.length}**
- Policy: one permanent redirect hop to the closest canonical 200 URL
- Regenerate: \`pnpm seo:legacy-manifest\`

## Exact redirects

| Old URL | New URL | Permanent | Reason | Migration date |
| --- | --- | ---: | --- | --- |
${rows.join("\n")}

## Pattern redirects

| Old URL pattern | New URL | Permanent | Reason | Migration date |
| --- | --- | ---: | --- | --- |
${patterns.join("\n")}
`;

writeFileSync(resolve(root, "LEGACY_REDIRECTS.md"), content);
