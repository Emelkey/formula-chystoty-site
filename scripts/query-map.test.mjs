import assert from 'node:assert/strict';
import test from 'node:test';
import { queryMap } from '../seo/query-map.ts';
import { serviceCatalog } from '../seo/service-catalog.ts';

const normalize = (s) => s.normalize('NFKC').toLocaleLowerCase('uk-UA').replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();
test('every primary intent has one canonical owner and a valid acyclic parent', () => {
  const owners = new Map();
  for (const item of queryMap) {
    const intent = normalize(item.primaryIntent);
    assert.ok(intent);
    assert.ok(!owners.has(intent), `${intent}: ${owners.get(intent)} and ${item.path}`);
    owners.set(intent, item.path);
    assert.equal(item.canonicalUrl, `https://www.formula-chistoty.ck.ua${item.path}`);
    assert.ok(!item.forbiddenIntents.map(normalize).includes(intent));
    const visited = new Set([item.path]);
    let parent = item.hubParent;
    while (parent) {
      assert.ok(!visited.has(parent), `Parent cycle at ${item.path}`);
      visited.add(parent);
      const next = queryMap.find((entry) => entry.path === parent);
      assert.ok(next, `Missing parent ${parent}`);
      parent = next.hubParent;
    }
  }
});

test('catalog covers every commercial service once with a short teaser', () => {
  const cards = serviceCatalog.flatMap((group) => group.services);
  assert.equal(cards.length, new Set(cards.map((card) => card.slug)).size);
  const services = queryMap.filter((entry) => ['hub', 'primary'].includes(entry.role) && !['/', '/prices'].includes(entry.path));
  assert.deepEqual(cards.map((card) => `/${card.slug}`).sort(), services.map((entry) => entry.path).sort());
  for (const card of cards) assert.ok(card.summary.length > 20 && card.summary.length < 250);
});
