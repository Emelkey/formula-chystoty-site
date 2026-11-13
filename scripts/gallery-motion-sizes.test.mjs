import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { compactWorkImageSizes } from '../lib/work-image-sizes.ts';

const require = createRequire(import.meta.url);
const { getImageProps } = require('next/image');

// Resolve only the small, deliberate sizes grammar used by this component.
function slot(sizes, viewport) {
  const expression = sizes.split(', ').find(item => {
    const min = item.match(/^\(min-width: (\d+)px\)/);
    return !min || viewport >= Number(min[1]);
  }).replace(/^\(min-width: \d+px\) /, '');
  if (/^\d+px$/.test(expression)) return Number(expression.slice(0, -2));
  const calc = expression.match(/^calc\(\(?(100vw) - (\d+)px\)?(?: \/ (\d+))?\)$/);
  assert.ok(calc, `supported CSS length: ${expression}`);
  return (viewport - Number(calc[2])) / Number(calc[3] || 1);
}

test('compact gallery sizes match CSS slots at breakpoints, without under-sizing', () => {
  for (const viewport of [320, 390, 640, 767, 768, 1023, 1024, 1280, 1359, 1360, 1365, 1920, 2560]) {
    const container = Math.min(1200, viewport - (viewport >= 1024 ? 160 : 40));
    const card = viewport >= 768 ? (container - 40) / 3 : container;
    const expected = {
      single: card - 2,
      pair: (card - 2 - 24 - 12) / 2,
      combined: card - 2 - 24,
    };
    for (const [kind, width] of Object.entries(expected)) {
      const declared = slot(compactWorkImageSizes[kind], viewport);
      assert.ok(declared >= width - 0.01 && declared < width + 1, `${kind} @ ${viewport}: ${declared} vs ${width}`);
    }
  }
});

test('Next produces small thumbnail candidates and preserves high-DPR choices', () => {
  for (const [kind, sizes] of Object.entries(compactWorkImageSizes)) {
    const { props } = getImageProps({ src: '/images/works/example.webp', alt: 'fixture', width: 1200, height: 900, sizes });
    assert.equal(props.sizes, sizes);
    assert.equal(props.loading, 'lazy');
    const candidates = props.srcSet.split(', ').map(item => Number(item.match(/ (\d+)w$/)[1]));
    assert.ok(candidates.includes(256), `${kind}: small source candidates retained`);
    for (const viewport of [390, 768, 1024, 1365, 1920]) {
      for (const dpr of [1, 2, 3]) {
        const required = slot(sizes, viewport) * dpr;
        assert.ok(candidates.some(width => width >= required), `${kind} @ ${viewport}, DPR ${dpr}`);
      }
    }
  }
});

test('gallery selects the correct sizes without altering media quality or loading priority', () => {
  const source = readFileSync(new URL('../components/BeforeAfterGallery.tsx', import.meta.url), 'utf8');
  assert.match(source, /compact \? compactWorkImageSizes\.pair : "\(max-width: 768px\) 92vw, 50vw"/);
  assert.match(source, /compact \? compactWorkImageSizes\.combined : "\(max-width: 768px\) 92vw, 66vw"/);
  assert.match(source, /compact \? compactWorkImageSizes\.single : "\(max-width: 768px\) 92vw, 33vw"/);
  assert.doesNotMatch(source, /quality=|priority=|loading="eager"|unoptimized/);
});
