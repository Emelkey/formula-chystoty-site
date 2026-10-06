import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import postcss from "postcss";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const css = postcss.parse(read("app/globals.css"));
const rules = [];
css.walkRules(rule => {
  if (!rule.selector.includes(".button-spring")) return;
  const media = [];
  for (let parent = rule.parent; parent; parent = parent.parent) {
    if (parent.type === "atrule" && parent.name === "media") media.push(parent.params);
  }
  rules.push({ selector: rule.selector, media, declarations: Object.fromEntries(rule.nodes.filter(node => node.type === "decl").map(node => [node.prop, node.value])) });
});

test("spring motion is opt-in, transform-only, and never loops at idle", () => {
  assert.ok(rules.length);
  for (const { declarations } of rules) {
    assert.ok(Object.keys(declarations).every(name => /^(transform|transition|outline)(-|$)/.test(name)), JSON.stringify(declarations));
  }
  const resting = rules.find(rule => rule.declarations.transition?.includes("cubic-bezier"));
  assert.ok(resting.media.includes("(prefers-reduced-motion: no-preference)"));
  assert.match(resting.declarations.transition, /transform 420ms cubic-bezier\(0\.34, 1\.56, 0\.64, 1\)/);
});

test("hover is limited to a fine pointer and presses exclude disabled controls", () => {
  const hover = rules.find(rule => rule.selector.endsWith(":hover"));
  assert.ok(hover.media.includes("(hover: hover) and (pointer: fine)"));
  for (const state of [":hover", ":active", ":focus-visible"]) {
    const rule = rules.find(rule => rule.selector.endsWith(state) && rule.declarations.transform);
    assert.match(rule.selector, /:not\(:disabled\):not\(\[aria-disabled="true"\]\)/);
    assert.ok(rule.media.includes("(prefers-reduced-motion: no-preference)"));
  }
  const disabled = rules.find(rule => rule.selector.includes(":where(:disabled,"));
  assert.equal(disabled.declarations.transform, "none");
  assert.equal(disabled.declarations.transition, "none");
  // The tag selector keeps this reset at least as specific as the base transition.
  assert.ok(disabled.selector.includes(":is(a, button, summary)"));
});

test("reduced motion removes both transform and transition while focus remains visible", () => {
  const reduced = rules.find(rule => rule.media.includes("(prefers-reduced-motion: reduce)"));
  assert.equal(reduced.declarations.transform, "none");
  assert.equal(reduced.declarations.transition, "none");
  assert.ok(rules.some(rule => rule.selector === ".button-spring:focus-visible" && rule.declarations.outline && !rule.media.length));
});

test("shared lead, contact, hero, form and mobile controls opt into the same spring", () => {
  for (const file of ["Buttons", "Header", "FloatingContactButtons", "ContactForm", "HeroSection", "GoogleMapsTrust", "ReviewRequest", "HomeServicesSection", "PricesSeoPage", "ServicePageLayout"]) {
    assert.ok(read(`components/${file}.tsx`).includes("button-spring"), file);
  }
  assert.match(read("components/ContactForm.tsx"), /<button className="button-spring [^"]*" type="submit" disabled=\{status === "sending"\}/);
  assert.match(read("components/HeroSection.tsx"), /<button className=\{"button-spring " \+ styles.replay\} type="button" onClick=\{replay\} disabled=\{playing\}/);
  assert.match(read("components/FloatingContactButtons.tsx"), /<summary className="button-spring /);
  assert.ok(!read("components/ContactAction.tsx").includes("button-spring"), "inline contact links must not be opted in globally");
  assert.ok(!read("components/TrackedLink.tsx").includes("button-spring"), "inline tracked links must not be opted in globally");
});
