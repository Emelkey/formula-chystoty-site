import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
const read = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
test('kitchen quotes keep the visitor on the matching local form', () => {
 const layout=read('components/ServicePageLayout.tsx');
 assert.match(layout,/href=\{service.slug === "generalne-prybyrannya-kuhni-cherkasy" \? "#contact-form" : undefined\}/);
 assert.match(layout,/defaultService=\{service.slug === "generalne-prybyrannya-kuhni-cherkasy" \? "Генеральне прибирання кухні" : undefined\}/);
 const form=read('components/ContactForm.tsx');
 assert.match(form,/const cleaningTypes = \[.*"Генеральне прибирання кухні"/);
 assert.match(form,/<select name="type" defaultValue=\{defaultService/);
});
test('kitchen lastmod reflects the November content edit',()=>{
 assert.match(read('app/sitemap.xml/route.ts'),/"generalne-prybyrannya-kuhni-cherkasy": "2026-11-18T00:00:00.000Z"/);
});
