import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve } from "node:path";
import test from "node:test";
import ts from "typescript";

import { seoIntentRegistry } from "../lib/seo-architecture.ts";

const root = resolve(import.meta.dirname, "..");

function sourceFile(relativePath) {
  const fileName = resolve(root, relativePath);
  return ts.createSourceFile(fileName, readFileSync(fileName, "utf8"), ts.ScriptTarget.Latest, true, relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

function unwrap(node) {
  let current = node;
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

function literalValue(input) {
  const node = unwrap(input);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node) && node.text === "undefined") return undefined;
  if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
    return node.operator === ts.SyntaxKind.MinusToken ? -Number(node.operand.text) : Number(node.operand.text);
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalValue);
  if (ts.isObjectLiteralExpression(node)) {
    const value = {};
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const name = propertyName(property.name);
      if (name) value[name] = literalValue(property.initializer);
    }
    return value;
  }
  return undefined;
}

function variableValue(file, variableName) {
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName && declaration.initializer) {
        return literalValue(declaration.initializer);
      }
    }
  }
  throw new Error(`Variable ${variableName} was not found in ${file.fileName}`);
}

function normalize(value) {
  return value.normalize("NFKC").toLocaleLowerCase("uk-UA").replace(/[’`]/g, "'").replace(/\s+/g, " ").trim();
}

function assertUnique(items, field) {
  const seen = new Map();
  for (const item of items) {
    const value = normalize(item[field]);
    assert.ok(value, `${field} must not be empty for ${item.path}`);
    assert.equal(seen.has(value), false, `Duplicate ${field}: ${item[field]} (${seen.get(value)} and ${item.path})`);
    seen.set(value, item.path);
  }
}

function flattenText(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(flattenText);
  if (value && typeof value === "object") return Object.values(value).flatMap(flattenText);
  return [];
}

function shingles(text, size = 3) {
  const words = normalize(text).match(/[\p{L}\p{N}]+/gu) ?? [];
  const result = new Set();
  for (let index = 0; index <= words.length - size; index += 1) result.add(words.slice(index, index + size).join(" "));
  return result;
}

function similarity(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function walkSourceFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = resolve(directory, name);
    return statSync(path).isDirectory() ? walkSourceFiles(path) : [path];
  });
}

function staticHrefs(file) {
  const hrefs = [];
  function visit(node) {
    if (ts.isJsxAttribute(node) && node.name.text === "href" && node.initializer) {
      if (ts.isStringLiteral(node.initializer)) hrefs.push(node.initializer.text);
      if (ts.isJsxExpression(node.initializer) && node.initializer.expression) {
        const value = literalValue(node.initializer.expression);
        if (typeof value === "string") hrefs.push(value);
      }
    }
    if (ts.isPropertyAssignment(node) && propertyName(node.name) === "href") {
      const value = literalValue(node.initializer);
      if (typeof value === "string") hrefs.push(value);
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return hrefs;
}

function canonicalPathFromHref(href) {
  if (href.startsWith("https://www.formula-chistoty.ck.ua")) {
    const url = new URL(href);
    return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  }
  if (!href.startsWith("/") || href.startsWith("//")) return undefined;
  const path = href.split(/[?#]/, 1)[0];
  return path === "/" ? "/" : path.replace(/\/$/, "");
}

const siteFile = sourceFile("lib/site.ts");
const homeFile = sourceFile("components/HomeServicesSection.tsx");
const relatedFile = sourceFile("components/RelatedServices.tsx");
const sitemapFile = sourceFile("app/sitemap.xml/route.ts");
const baseServices = variableValue(siteFile, "servicePages");
const serviceEnhancements = variableValue(siteFile, "serviceSeoEnhancements");
const blogPosts = variableValue(siteFile, "rawBlogPosts");
const primaryServices = variableValue(homeFile, "primaryServices");
const secondaryGroups = variableValue(homeFile, "secondaryGroups");
const relatedLinks = variableValue(relatedFile, "relatedLinks");
const mainRoutes = variableValue(sitemapFile, "mainRoutes");
const services = baseServices.map((service) => ({ ...service, ...(serviceEnhancements[service.slug] ?? {}) }));
const serviceRegistry = seoIntentRegistry.filter((item) => item.path.slice(1) in Object.fromEntries(services.map((service) => [service.slug, true])));
const registryPaths = new Set(seoIntentRegistry.map((item) => item.path));
const blogPaths = new Set(blogPosts.map((post) => `/blog/${post.slug}`));
const redirectOnlyPaths = new Set(["/contacts", "/services", "/tsiny", "/uk", "/ru", "/myttya-plitky-cherkasy"]);

test("SEO registry has unique ownership signals", () => {
  assertUnique(seoIntentRegistry, "path");
  assertUnique(seoIntentRegistry, "title");
  assertUnique(seoIntentRegistry, "h1");
  assertUnique(seoIntentRegistry, "primaryQuery");
});

test("every service has one registry entry with the effective Title and H1", () => {
  assert.deepEqual(
    serviceRegistry.map((item) => item.path).sort(),
    services.map((service) => `/${service.slug}`).sort()
  );
  for (const service of services) {
    const architecture = seoIntentRegistry.find((item) => item.path === `/${service.slug}`);
    assert.equal(architecture.title, service.seoTitle, `Title mismatch for /${service.slug}`);
    assert.equal(architecture.h1, service.h1, `H1 mismatch for /${service.slug}`);
    assert.ok(existsSync(resolve(root, "app", service.slug, "page.tsx")), `Missing route for /${service.slug}`);
  }
});

test("service descriptions are present and unique", () => {
  assertUnique(
    services.map((service) => ({ path: `/${service.slug}`, description: service.seoDescription })),
    "description"
  );
});

test("supporting articles are assigned to an existing landing page", () => {
  const assigned = new Set(seoIntentRegistry.flatMap((item) => item.supportingUrls));
  assert.deepEqual([...assigned].sort(), [...blogPaths].sort());
  for (const url of assigned) assert.ok(blogPaths.has(url), `Unknown supporting URL: ${url}`);
});

test("sitemap is XML and contains only direct canonical routes", () => {
  const sitemapSource = readFileSync(resolve(root, "app/sitemap.xml/route.ts"), "utf8");
  const sitemapPaths = [
    ...mainRoutes.map((route) => route.loc),
    ...services.map((service) => `/${service.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`)
  ];

  assert.equal(new Set(sitemapPaths).size, sitemapPaths.length, "Sitemap routes must be unique");
  assert.equal(sitemapPaths.length, mainRoutes.length + services.length + blogPosts.length);
  assert.equal(sitemapPaths.length, 61, "Sitemap must contain 8 main, 30 service, and 23 blog URLs");
  for (const path of sitemapPaths) {
    assert.equal(redirectOnlyPaths.has(path), false, `Sitemap contains redirect-only URL: ${path}`);
    assert.equal(path.startsWith("/uk") || path.startsWith("/ru"), false, `Sitemap contains legacy URL: ${path}`);
    assert.ok(registryPaths.has(path) || blogPaths.has(path), `Sitemap contains unregistered URL: ${path}`);
  }

  assert.match(sitemapSource, /<urlset xmlns=/, "Sitemap must render an XML urlset");
  assert.match(sitemapSource, /<loc>/, "Sitemap must render loc elements");
  assert.match(sitemapSource, /<lastmod>/, "Sitemap must render lastmod elements");
  assert.match(sitemapSource, /<changefreq>/, "Sitemap must render changefreq elements");
  assert.match(sitemapSource, /<priority>/, "Sitemap must render priority elements");
  assert.match(sitemapSource, /application\/xml; charset=utf-8/, "Sitemap must use the XML content type");
  assert.match(sitemapSource, /servicePages\.map/, "Sitemap must include all canonical services");
  assert.match(sitemapSource, /blogPosts\.map/, "Sitemap must include all canonical articles");
});

test("registry related targets are canonical, live routes", () => {
  for (const item of seoIntentRegistry) {
    for (const target of item.relatedLandingPages) {
      assert.ok(registryPaths.has(target), `${item.path} points to an unregistered target: ${target}`);
      assert.equal(redirectOnlyPaths.has(target), false, `${item.path} points through a redirect: ${target}`);
      assert.equal(target.startsWith("/uk") || target.startsWith("/ru"), false, `Legacy target: ${target}`);
    }
  }
});

test("homepage implements the approved six-card hierarchy", () => {
  const expected = [
    ["Прибирання квартир", "Підтримуюче, генеральне та післяремонтне прибирання квартир.", "/prybyrannya-kvartyr-cherkasy"],
    ["Генеральне прибирання", "Глибоке очищення житлових і комерційних приміщень.", "/generalne-prybyrannya-cherkasy"],
    ["Прибирання після ремонту", "Видаляємо будівельний пил, сліди ремонту та складні забруднення.", "/prybyrannya-pislya-remontu-cherkasy"],
    ["Хімчистка меблів", "Професійна чистка диванів, крісел, стільців і матраців з виїздом.", "/himchystka-mebliv-cherkasy"],
    ["Миття вікон", "Миття вікон, рам, склопакетів і складних скляних конструкцій.", "/myttya-vikon-cherkasy"],
    ["Прибирання для бізнесу", "Разове та регулярне прибирання офісів, магазинів і комерційних об’єктів.", "/prybyrannya-komertsiynykh-prymishchen-cherkasy"]
  ];
  assert.deepEqual(primaryServices.map((service) => [service.title, service.description, service.href]), expected);
  assert.equal(secondaryGroups.length, 3);
  for (const service of primaryServices) {
    assert.ok(registryPaths.has(service.href), `Homepage target is not canonical: ${service.href}`);
    assert.ok(existsSync(resolve(root, "public", service.image.slice(1))), `Missing homepage image: ${service.image}`);
  }
  for (const group of secondaryGroups) {
    for (const link of group.links) assert.ok(registryPaths.has(link.href), `Secondary target is not canonical: ${link.href}`);
  }
  const source = readFileSync(resolve(root, "components/HomeServicesSection.tsx"), "utf8");
  assert.match(source, /Послуги[\s\S]*«Формули Чистоти»/);
  assert.match(source, /Обирайте потрібний формат прибирання — від регулярного догляду за квартирою до складного післяремонтного та комерційного клінінгу\./);
});

test("related-service blocks use two to five direct canonical targets", () => {
  assert.deepEqual(
    Object.keys(relatedLinks).sort(),
    services.map((service) => service.slug).sort(),
    "Every service must own a RelatedServices block"
  );
  for (const [slug, links] of Object.entries(relatedLinks)) {
    assert.ok(services.some((service) => service.slug === slug), `Unknown RelatedServices owner: ${slug}`);
    assert.ok(links.length >= 2 && links.length <= 5, `${slug} has ${links.length} related links`);
    const uniqueTargets = new Set(links.map((link) => link.href));
    assert.equal(uniqueTargets.size, links.length, `Duplicate related link for ${slug}`);
    for (const link of links) {
      assert.ok(registryPaths.has(link.href), `${slug} points to an unregistered target: ${link.href}`);
      assert.equal(redirectOnlyPaths.has(link.href), false, `${slug} points through a redirect: ${link.href}`);
      assert.ok(link.label.trim().length > 3, `Weak anchor on ${slug}: ${link.label}`);
    }
  }
});

test("static internal links use canonical routes instead of redirects or missing pages", () => {
  const canonicalPaths = new Set([...registryPaths, ...blogPaths]);
  const files = ["app", "components", "lib"]
    .flatMap((directory) => walkSourceFiles(resolve(root, directory)))
    .filter((path) => /\.(?:ts|tsx)$/.test(path))
    .filter((path) => !path.endsWith("lib/legacy-uk-routes.ts"));

  for (const path of files) {
    const file = sourceFile(relative(root, path));
    for (const href of staticHrefs(file)) {
      const internalPath = canonicalPathFromHref(href);
      if (!internalPath) continue;
      assert.equal(redirectOnlyPaths.has(internalPath), false, `${relative(root, path)} links through redirect ${href}`);
      assert.equal(internalPath.startsWith("/uk") || internalPath.startsWith("/ru"), false, `${relative(root, path)} links to legacy URL ${href}`);
      assert.ok(canonicalPaths.has(internalPath), `${relative(root, path)} links to missing or unregistered URL ${href}`);
    }
  }
});

test("blog titles and headings do not duplicate landing-page signals", () => {
  const titles = new Set(seoIntentRegistry.map((item) => normalize(item.title)));
  const headings = new Set(seoIntentRegistry.map((item) => normalize(item.h1)));
  for (const post of blogPosts) {
    assert.equal(titles.has(normalize(post.title)), false, `Blog Title duplicates a landing page: ${post.slug}`);
    assert.equal(headings.has(normalize(post.h1 ?? post.title)), false, `Blog H1 duplicates a landing page: ${post.slug}`);
  }
});

test("service pages do not have critically duplicated body content", (context) => {
  const fields = ["shortDescription", "included", "excluded", "whenNeeded", "faq", "seoIntro", "seoSections", "cleaningHelps", "priceFactors", "valueParagraphs", "valueItems"];
  const documents = services.map((service) => ({
    slug: service.slug,
    shingles: shingles(fields.flatMap((field) => flattenText(service[field])).join(" "))
  }));
  let highest = { score: 0, pair: "" };
  for (let left = 0; left < documents.length; left += 1) {
    for (let right = left + 1; right < documents.length; right += 1) {
      const score = similarity(documents[left].shingles, documents[right].shingles);
      if (score > highest.score) highest = { score, pair: `${documents[left].slug} ↔ ${documents[right].slug}` };
      assert.ok(score <= 0.7, `Critical content similarity ${(score * 100).toFixed(1)}%: ${documents[left].slug} and ${documents[right].slug}`);
    }
  }
  context.diagnostic(`Highest service-content similarity: ${(highest.score * 100).toFixed(1)}% (${highest.pair})`);
});

test("service route templates preserve canonical metadata and structured layout", () => {
  for (const service of services) {
    const route = readFileSync(resolve(root, "app", service.slug, "page.tsx"), "utf8");
    assert.match(route, new RegExp(`getService\\(["']${service.slug}["']\\)`), `Route lookup mismatch for ${service.slug}`);
    assert.match(route, /buildMetadata\(/, `Missing metadata builder for ${service.slug}`);
    assert.match(route, /ServicePageLayout/, `Missing service layout for ${service.slug}`);
  }

  const layout = readFileSync(resolve(root, "components/ServicePageLayout.tsx"), "utf8");
  const breadcrumbs = readFileSync(resolve(root, "components/Breadcrumbs.tsx"), "utf8");
  const site = readFileSync(resolve(root, "lib/site.ts"), "utf8");
  assert.equal((layout.match(/<h1\b/g) ?? []).length, 1, "Shared service layout must render one H1");
  assert.match(layout, /<Breadcrumbs\s+items=/, "Shared service layout must render breadcrumbs");
  assert.match(layout, /"@type":\s*"Service"/, "Missing Service structured data");
  assert.match(layout, /"@type":\s*"LocalBusiness"/, "Missing LocalBusiness structured data");
  assert.match(layout, /"@type":\s*"FAQPage"/, "Missing FAQPage structured data");
  assert.match(breadcrumbs, /"@type":\s*"BreadcrumbList"/, "Missing BreadcrumbList structured data");
  assert.match(site, /robots:\s*{\s*index:\s*true,\s*follow:\s*true/s, "Service metadata must remain indexable");
  assert.match(site, /alternates:\s*{\s*canonical:\s*url/s, "Service metadata must remain self-canonical");
  assert.match(site, /openGraph:\s*{[\s\S]*?url,/s, "Open Graph must use the canonical page URL");
});
