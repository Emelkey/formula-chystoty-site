import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFileSync(path.join(root, file), "utf8");
const globalClients = ["Header", "Buttons", "ContactAction", "ContactForm"];
const articleMarkers = [
  "Ціна прибирання після ремонту залежить не лише від площі.",
  "Під час роботи озонатора у приміщенні не повинно бути людей, тварин або рослин."
];

function load(file, imports = {}) {
  const compiled = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  });
  const context = { exports: {}, require: (name) => {
    assert.ok(name in imports, `Unexpected dependency ${name} in ${file}`);
    return imports[name];
  } };
  vm.runInNewContext(compiled.outputText, context, { filename: file });
  return context.exports;
}

function builtScripts(route) {
  const htmlPath = route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
  const html = read(`.next/server/app/${htmlPath}`);
  const scripts = [...html.matchAll(/<script\b([^>]*)>/g)]
    .filter(([, attrs]) => !/\bnoModule\b|\bnomodule\b/.test(attrs))
    .map(([, attrs]) => /\bsrc="([^"]+)"/.exec(attrs)?.[1])
    .filter((src) => src?.startsWith("/_next/static/"));
  assert.ok(scripts.length, `No production client scripts found for ${route}; run the build first`);
  return { html, scripts: [...new Set(scripts)].map((src) => ({ src, text: read(`.next/${decodeURIComponent(src.slice("/_next/".length))}`) })) };
}

test("contacts are dependency-free and site.ts preserves the same public export", () => {
  const contacts = load("lib/contacts.ts");
  assert.deepEqual(Object.keys(contacts), ["contacts"]);
  assert.ok(Object.values(contacts.contacts).every((value) => typeof value === "string"));
  const site = load("lib/site.ts", {
    "@/lib/contacts": contacts,
    "@/lib/blog-post-content": { blogPostContentEnhancements: {} }
  });
  assert.equal(site.contacts, contacts.contacts);
});

test("global interactive components import only the small contacts module", () => {
  for (const component of globalClients) {
    const source = read(`components/${component}.tsx`);
    assert.match(source, /import\s*{\s*contacts\s*}\s*from\s*["']@\/lib\/contacts["']/);
    assert.doesNotMatch(source, /from\s*["']@\/lib\/site["']/);
  }
});

for (const route of ["/", "/kontakty", "/prybyrannya-pislya-remontu-cherkasy", "/blog/skilky-koshtuye-klining-u-cherkasakh-2026"]) {
  test(`${route} does not ship unrelated full article bodies in initial client JS`, () => {
    const { scripts } = builtScripts(route);
    for (const { src, text } of scripts) {
      for (const marker of articleMarkers) assert.ok(!text.includes(marker), `${src} still bundles unrelated article body on ${route}`);
    }
  });
}

test("article server rendering and the interactive blog catalog retain their content", () => {
  const article = builtScripts("/blog/skilky-koshtuye-klining-u-cherkasakh-2026");
  assert.match(article.html, /application\/ld\+json/);
  assert.ok(article.html.includes("Скільки коштує клінінг у Черкасах"));
  assert.ok(article.html.includes("Як порівняти два кошториси на однаковий обсяг"));
  const blog = builtScripts("/blog");
  assert.ok(blog.html.includes("skilky-koshtuye-klining-u-cherkasakh-2026"));
  assert.ok(blog.scripts.some(({ text }) => articleMarkers.some((marker) => text.includes(marker))), "The existing interactive blog catalog still needs its content; do not remove article data globally");
});
