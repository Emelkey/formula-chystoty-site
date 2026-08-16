import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const canonicalUrl = "https://www.formula-chistoty.ck.ua";
const { getUkLegacyDestination, ukLegacyRouteRegistry } = await import(
  join(root, "lib/legacy-uk-routes.ts")
);

const requiredRoutes = new Map([
  ["/uk", "/"],
  ["/uk/services", "/poslugy"],
  ["/uk/services-uk", "/poslugy"],
  ["/uk/price-uk", "/prices"],
  ["/uk/services/prybyrannya-kvartyr", "/prybyrannya-kvartyr-cherkasy"],
  ["/uk/services/prybyrannya-ofisiv", "/prybyrannya-ofisiv-cherkasy"],
  ["/uk/services/generalne-prybyrannya", "/generalne-prybyrannya-cherkasy"],
  ["/uk/services/myttya-vikon-vitryn-ta-fasadiv", "/myttya-fasadiv-cherkasy"],
  ["/uk/services/himchystka-myakyh-mebliv", "/himchystka-mebliv-cherkasy"],
  ["/uk/services/prybyrannya-prylegloyi-terytoriyi", "/prybyrannya-prylegloyi-terytoriyi-cherkasy"],
  ["/uk/services/prybyrannya-torgovyh-czentriv", "/prybyrannya-mahazyniv-supermarketiv-cherkasy"],
  ["/uk/services/himchystka-avtomobilya", "/himchystka-avto-cherkasy"]
]);

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

test("the centralized registry contains unique permanent Ukrainian legacy routes", () => {
  assert.equal(ukLegacyRouteRegistry.length, 655);
  assert.equal(new Set(ukLegacyRouteRegistry.map((route) => route.source)).size, ukLegacyRouteRegistry.length);

  for (const route of ukLegacyRouteRegistry) {
    assert.match(route.source, /^\/uk(?:\/|$)/);
    assert.doesNotMatch(route.destination, /^\/uk(?:\/|$)/);
    assert.equal(route.permanent, true);
    assert.match(route.migrationDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(route.reason.length > 0);
  }
});

test("the committed legacy manifest matches the redirect registry", () => {
  const manifest = readFileSync(join(root, "LEGACY_REDIRECTS.md"), "utf8");
  assert.match(manifest, new RegExp(`Exact legacy URLs: \\*\\*${ukLegacyRouteRegistry.length}\\*\\*`));
  for (const route of ukLegacyRouteRegistry) {
    const row = `| \`${route.source}\` | \`${route.destination}\` | 301 | ${route.reason} | ${route.migrationDate} |`;
    assert.ok(manifest.includes(row), `legacy manifest is missing ${route.source}`);
  }
});

test("all mandatory and normalized variants resolve to the intended canonical path", () => {
  for (const [source, destination] of requiredRoutes) {
    assert.equal(getUkLegacyDestination(source), destination);
    assert.equal(getUkLegacyDestination(`${source}/`), destination);
    assert.equal(getUkLegacyDestination(source.toUpperCase()), destination);
  }

  assert.equal(getUkLegacyDestination("/uk/services/page/2"), "/poslugy");
});

test("every registry destination is backed by an App Router page", () => {
  for (const destination of new Set(ukLegacyRouteRegistry.map((route) => route.destination))) {
    if (destination === "/") {
      assert.ok(existsSync(join(root, "app/page.tsx")));
      continue;
    }
    assert.ok(existsSync(join(root, `app${destination}/page.tsx`)), `${destination} has no page.tsx`);
  }
});

test("legacy Ukrainian pages are not renderable and current source has no internal /uk links", () => {
  assert.equal(existsSync(join(root, "app/uk/page.tsx")), false);
  assert.equal(existsSync(join(root, "app/uk/tsiny-na-klining-cherkasy-2026/page.tsx")), false);

  const files = ["app", "components", "lib"]
    .flatMap((directory) => walk(join(root, directory)))
    .filter((path) => /\.(?:ts|tsx|js|jsx)$/.test(path))
    .filter((path) => !path.endsWith("lib/legacy-uk-routes.ts"));

  const offenders = files
    .filter((path) => /["'`]\/uk(?:\/|["'`])/.test(readFileSync(path, "utf8")))
    .map((path) => relative(root, path));
  assert.deepEqual(offenders, []);
});

test("sitemap, robots, canonical and hreflang sources do not revive /uk URLs", () => {
  const sitemap = readFileSync(join(root, "app/sitemap.xml/route.ts"), "utf8");
  const robots = readFileSync(join(root, "app/robots.txt/route.ts"), "utf8");
  const site = readFileSync(join(root, "lib/site.ts"), "utf8");

  assert.doesNotMatch(sitemap, /["'`]\/uk(?:\/|["'`])/);
  assert.doesNotMatch(robots, /Disallow:\s*\/uk/);
  assert.doesNotMatch(site, /https?:\/\/[^\s"']+\/uk(?:\/|[\s"'])/);
});

test("the production build manifest contains a permanent redirect for every registered URL", () => {
  const manifestPath = join(root, ".next/routes-manifest.json");
  assert.ok(existsSync(manifestPath), "run npm run build before test:seo");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const redirects = new Map(manifest.redirects.map((redirect) => [redirect.source, redirect]));

  for (const route of ukLegacyRouteRegistry) {
    const redirect = redirects.get(route.source);
    assert.ok(redirect, `missing build redirect for ${route.source}`);
    assert.equal(redirect.statusCode, 301);
    assert.equal(redirect.destination, `${canonicalUrl}${route.destination}`);
  }

  const pagination = redirects.get("/uk/services/page/:page(\\d+)");
  assert.ok(pagination, "missing pagination redirect");
  assert.equal(pagination.statusCode, 301);
  assert.equal(pagination.destination, `${canonicalUrl}/poslugy`);
});
