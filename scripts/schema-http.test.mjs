import assert from 'node:assert/strict';
import test from 'node:test';

// Rendered-HTML regression checks for known P0 schema contracts. This is not a
// schema.org vocabulary validator or a Google rich-result eligibility test.
// Start a production build separately, or set SEO_TEST_BASE_URL to production.
const baseUrl = new URL(process.env.SEO_TEST_BASE_URL ?? 'http://localhost:3100');
const canonicalOrigin = 'https://www.formula-chistoty.ck.ua';
const businessId = `${canonicalOrigin}/#localbusiness`;
const organizationId = `${canonicalOrigin}/#organization`;
const paths = [
  '/',
  '/prices',
  '/poslugy',
  '/prybyrannya-kvartyr-cherkasy',
  '/prybyrannya-pislya-remontu-cherkasy',
  '/generalne-prybyrannya-cherkasy',
  '/himchystka-mebliv-cherkasy',
  '/himchystka-dyvana-cherkasy',
  '/himchystka-avto-cherkasy',
  '/myttya-vikon-cherkasy'
];
const knownTopLevelTypes = new Set(['Organization', 'LocalBusiness', 'WebSite', 'Service', 'FAQPage', 'BreadcrumbList']);

assert.ok(['http:', 'https:'].includes(baseUrl.protocol), 'SEO_TEST_BASE_URL must be an HTTP(S) URL');

function attribute(attributes, name) {
  const expression = new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = attributes.match(expression);
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3]) : undefined;
}

function decodeEntities(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (match, entity) => {
    if (entity.startsWith('#')) {
      const hex = entity[1].toLowerCase() === 'x';
      const codePoint = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return codePoint >= 0 && codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
    }
    return named[entity.toLowerCase()];
  });
}

function visibleText(html) {
  return decodeEntities(html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' '))
    .normalize('NFC').replace(/\s+/g, ' ').trim();
}

function types(node) {
  return Array.isArray(node['@type']) ? node['@type'] : [node['@type']].filter(Boolean);
}

function graphNodes(value) {
  if (Array.isArray(value)) return value.flatMap(graphNodes);
  assert.ok(value && typeof value === 'object', 'Every JSON-LD root must be an object or array');
  return value['@graph'] ? graphNodes(value['@graph']) : [value];
}

function nestedObjects(value) {
  if (Array.isArray(value)) return value.flatMap(nestedObjects);
  if (!value || typeof value !== 'object') return [];
  return [value, ...Object.values(value).flatMap(nestedObjects)];
}

function readJsonLd(html, path) {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => attribute(match[1], 'type') === 'application/ld+json');
  assert.ok(scripts.length, `${path}: no rendered JSON-LD script`);
  return scripts.flatMap((match, index) => {
    let value;
    try { value = JSON.parse(match[2]); }
    catch (error) { assert.fail(`${path}: JSON-LD script ${index + 1} is invalid JSON: ${error.message}`); }
    return graphNodes(value);
  });
}

function assertEntityAndServiceContracts(nodes, path) {
  for (const node of nodes) {
    assert.ok(types(node).length, `${path}: top-level schema entity has no @type`);
    for (const type of types(node)) {
      assert.ok(knownTopLevelTypes.has(type), `${path}: unexpected top-level type ${type}; review vocabulary before extending this allowlist`);
    }
  }

  const allNodes = nodes.flatMap(nestedObjects);
  assert.ok(!allNodes.some((node) => types(node).includes('CleaningService')), `${path}: unrecognized CleaningService type returned`);
  assert.ok(!allNodes.some((node) => types(node).includes('SearchAction')), `${path}: a SearchAction is advertised although the site has no URL-backed search`);

  const businesses = nodes.filter((node) => node['@id'] === businessId && types(node).includes('LocalBusiness'));
  assert.ok(businesses.length, `${path}: shared LocalBusiness ${businessId} is missing`);
  assert.ok(businesses.every((node) => node.name === businesses[0].name), `${path}: inconsistent business name for one @id`);
  assert.ok(businesses.some((node) => node.telephone && node.address), `${path}: business definition lacks phone/address`);
  assert.ok(businesses.every((node) => node.address?.addressCountry === 'UA'), `${path}: business country must use the verified ISO code UA`);
  assert.ok(nodes.some((node) => node['@id'] === organizationId && types(node).includes('Organization')), `${path}: shared Organization is missing`);
  const website = nodes.find((node) => types(node).includes('WebSite'));
  assert.equal(website?.publisher?.['@id'], organizationId, `${path}: WebSite publisher does not resolve to the organization`);

  for (const service of allNodes.filter((node) => types(node).includes('Service'))) {
    assert.ok(!Object.hasOwn(service, 'priceRange'), `${path}: priceRange belongs to LocalBusiness, not Service`);
  }
  const pageServices = nodes.filter((node) => types(node).includes('Service'));
  const isMoneyPage = !['/', '/prices', '/poslugy'].includes(path);
  assert.equal(pageServices.length, path === '/prices' || isMoneyPage ? 1 : 0, `${path}: unexpected top-level Service count`);
  for (const service of pageServices) {
    assert.equal(service.provider?.['@id'], businessId, `${path}: Service provider must resolve to the shared LocalBusiness`);
    assert.equal(new URL(service.url).pathname, path, `${path}: Service URL points to another page`);
    if (isMoneyPage) {
      const offers = Array.isArray(service.offers) ? service.offers : [service.offers];
      assert.ok(offers.length && offers.every((offer) => offer && types(offer).includes('Offer')), `${path}: money-page pricing must be represented as an Offer`);
      assert.ok(offers.every((offer) => offer.description?.trim()), `${path}: Offer price description is empty`);
    }
  }
}

function assertBreadcrumbParity(mainHtml, nodes, path) {
  const navs = [...mainHtml.matchAll(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/gi)]
    .filter((match) => attribute(match[1], 'aria-label') === 'Хлібні крихти');
  const schemas = nodes.filter((node) => types(node).includes('BreadcrumbList'));
  assert.equal(navs.length, path === '/' ? 0 : 1, `${path}: unexpected visible breadcrumb navigation count`);
  assert.equal(schemas.length, navs.length, `${path}: visible/schema breadcrumb count differs`);
  if (!navs.length) return;

  const visible = [...navs[0][2].matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    name: visibleText(match[2]),
    item: new URL(attribute(match[1], 'href'), canonicalOrigin).href
  }));
  const schema = schemas[0].itemListElement;
  assert.ok(Array.isArray(schema), `${path}: BreadcrumbList.itemListElement must be an array`);
  assert.deepEqual(schema.map((item, index) => {
    assert.ok(types(item).includes('ListItem'), `${path}: breadcrumb must contain ListItem`);
    assert.equal(item.position, index + 1, `${path}: breadcrumb positions are not consecutive`);
    return { name: visibleText(item.name), item: new URL(typeof item.item === 'string' ? item.item : item.item?.['@id']).href };
  }), visible, `${path}: JSON-LD breadcrumbs differ from visible links`);
  assert.equal(new URL(visible[0].item).pathname, '/', `${path}: breadcrumb must start at home`);
  assert.equal(new URL(visible.at(-1).item).pathname, path, `${path}: breadcrumb must end at the current page`);
  if (!['/prices', '/poslugy'].includes(path)) {
    assert.ok(visible.some((item) => new URL(item.item).pathname === '/poslugy'), `${path}: money-page breadcrumb omits the services hub`);
  }
}

function assertFaqParity(mainHtml, nodes, path) {
  // Distinguish the actual "Часті питання" section from the homepage's service
  // navigation accordions. Inspect rendered text, not imported FAQ source data.
  const sections = [...mainHtml.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/gi)]
    .filter((section) => [...section[1].matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)]
      .some((heading) => visibleText(heading[1]) === 'Часті питання'));
  assert.ok(sections.length <= 1, `${path}: multiple visible FAQ sections require explicit schema mapping`);
  const visible = [...(sections[0]?.[1] ?? '').matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map((match) => {
    const question = match[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    const answer = match[1].match(/<p\b[^>]*>([\s\S]*?)<\/p>/i);
    assert.ok(question && answer, `${path}: expected an accessible FAQ question and answer`);
    return { question: visibleText(question[1]), answer: visibleText(answer[1]) };
  });
  const schemas = nodes.filter((node) => types(node).includes('FAQPage'));
  assert.equal(schemas.length, visible.length ? 1 : 0, `${path}: FAQPage must match the actual FAQ section`);
  if (!visible.length) return;
  assert.ok(Array.isArray(schemas[0].mainEntity), `${path}: FAQPage.mainEntity must be an array`);
  const schema = schemas[0].mainEntity.map((question) => {
    assert.ok(types(question).includes('Question'), `${path}: FAQ entry is not a Question`);
    assert.ok(question.acceptedAnswer && types(question.acceptedAnswer).includes('Answer'), `${path}: FAQ entry lacks an Answer`);
    return { question: visibleText(question.name), answer: visibleText(question.acceptedAnswer.text) };
  });
  assert.deepEqual(schema, visible, `${path}: FAQ schema differs from visible questions/answers`);
}

for (const path of paths) {
  test(`P0 rendered schema contracts: ${path}`, async () => {
    const response = await fetch(new URL(path, baseUrl), { redirect: 'manual', signal: AbortSignal.timeout(30_000) });
    assert.equal(response.status, 200, `${path}: expected direct HTTP 200`);
    assert.ok(response.headers.get('content-type')?.includes('text/html'), `${path}: response is not HTML`);
    const html = await response.text();
    const nodes = readJsonLd(html, path);
    assert.ok(/<main\b[^>]*>/.test(html), `${path}: main element not found in server-rendered HTML`);
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
    assert.ok(body, `${path}: body not found in server-rendered HTML`);
    // Next.js streams a Suspense route in a later body segment (S:0), then moves
    // it into the initial main boundary (B:0). Reading only raw <main> would
    // inspect the loading fallback. Inspect server-emitted route markup from
    // all body segments, excluding scripts and shared header/footer content.
    const pageHtml = body[1]
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, '')
      .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, '');
    assertEntityAndServiceContracts(nodes, path);
    assertBreadcrumbParity(pageHtml, nodes, path);
    assertFaqParity(pageHtml, nodes, path);
  });
}
