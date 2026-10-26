import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { canPublishCase, caseEditorialInventory, caseStudies, getCasePublicationIssues, getServiceCaseStudies } from '../lib/case-studies.ts';

test('published evidence has provenance and distinct real before/after assets', () => {
  assert.equal(caseStudies.length, new Set(caseStudies.map((record) => record.id)).size);
  for (const record of caseStudies) {
    assert.equal(canPublishCase(record), true, record.id);
    assert.notEqual(record.beforeImage.src, record.afterImage.src, record.id);
    for (const photo of [record.beforeImage, record.afterImage]) {
      assert.ok(photo.src.startsWith('/images/works/'), record.id);
      assert.doesNotMatch(photo.src, /generated|premium|stock/i, record.id);
      assert.ok(existsSync(fileURLToPath(new URL(`../public${photo.src}`, import.meta.url))), photo.src);
    }
  }
});

test('one renovation object stays one evidence record and is not counted as a complete case', () => {
  const records = getServiceCaseStudies('prybyrannya-pislya-remontu-cherkasy');
  assert.equal(records.length, 1);
  assert.equal(records[0].publicationMode, 'evidence');
  assert.equal(records[0].facts.completedOn, undefined);
  assert.equal(records[0].facts.duration, undefined);
  assert.equal(records[0].facts.team, undefined);
  assert.equal(getServiceCaseStudies('prybyrannya-kvartyr-cherkasy').length, 0);
  assert.equal(getServiceCaseStudies('himchystka-avto-cherkasy').length, 0);
  const inventory = caseEditorialInventory.find((record) => record.id === records[0].id);
  assert.equal(inventory.fullCaseBlockers.length, 3);
  assert.ok(inventory.fullCaseBlockers.some((issue) => issue.includes('дата виконання')));
  assert.equal(canPublishCase({ ...records[0], publicationMode: 'complete' }), false);
});

test('publication fails closed without verification, source, consent or a verified photo pair', () => {
  const record = caseStudies[0];
  for (const change of [
    { verified: false },
    { sourceReference: ' ' },
    { publicationApproved: false },
    { beforeAfterVerified: false }
  ]) {
    assert.equal(canPublishCase({ ...record, evidence: { ...record.evidence, ...change } }), false);
  }
  assert.equal(canPublishCase({ ...record, afterImage: { src: '', alt: '' } }), false);
  assert.equal(canPublishCase({ ...record, afterImage: record.beforeImage }), false);
  assert.equal(canPublishCase({ ...record, facts: { ...record.facts, price: { text: 'Test', publicationApproved: false } } }), false);
});

test('full case validation rejects invalid calendar dates while price remains optional', () => {
  const evidence = { verified: true, sourceReference: 'test-only fixture', publicationApproved: true, beforeAfterVerified: true };
  const facts = { serviceType: 'fixture', location: 'fixture', areaOrScope: 'fixture', problem: 'fixture', completedWorks: ['fixture'], team: 'fixture', duration: 'fixture', completedOn: '2026-02-28' };
  assert.deepEqual(getCasePublicationIssues(facts, evidence, true, 'complete'), []);
  assert.ok(getCasePublicationIssues({ ...facts, completedOn: '2026-02-31' }, evidence, true, 'complete').length > 0);
});
