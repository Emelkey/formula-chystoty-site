import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const root=resolve(import.meta.dirname, "..");
const require=createRequire(`${root}/package.json`);
const ts=require('typescript');
assert.ok(process.env.GA4_PLAYWRIGHT_DIR, 'Set GA4_PLAYWRIGHT_DIR to an isolated Playwright installation');
const { chromium }=require(resolve(process.env.GA4_PLAYWRIGHT_DIR, 'node_modules/playwright'));
const source=ts.createSourceFile('site.ts',readFileSync(`${root}/lib/site.ts`,'utf8'),ts.ScriptTarget.Latest,true);
const ast=source.statements.flatMap(s=>ts.isVariableStatement(s)?[...s.declarationList.declarations]:[]).find(d=>d.name.text==='rawBlogPosts');
function value(n){ if(ts.isStringLiteral(n)) return n.text; if(ts.isArrayLiteralExpression(n)) return n.elements.map(value); if(ts.isObjectLiteralExpression(n))return Object.fromEntries(n.properties.filter(ts.isPropertyAssignment).map(p=>[p.name.text,value(p.initializer)])); }
const post=value(ast.initializer).find(p=>p.slug==='himchystka-dyvana-voseny-skilky-sohne');
const origin=new URL(process.env.ARTICLE_QA_BASE_URL||'http://127.0.0.1:3141').origin;
assert.ok(['http://127.0.0.1:3141','https://www.formula-chistoty.ck.ua'].includes(origin), 'Only the local article server and canonical production domain are permitted');
const dest=`/blog/${post.slug}`;
const output=resolve(process.env.ARTICLE_QA_OUTPUT||'outputs/autumn-sofa-browser');mkdirSync(output,{recursive:true});
const receipt={origin,checkedAt:new Date().toISOString(),profiles:[],blockedRequests:[],realLeadsSent:0,analyticsDelivered:0};
const browser=await chromium.launch({headless:true});
try {
for(const profile of [{name:'desktop',width:1440,height:1000},{name:'mobile',width:390,height:844},{name:'narrow-mobile',width:360,height:800}]){
 const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},isMobile:profile.name!=='desktop',hasTouch:profile.name!=='desktop',serviceWorkers:'block'});
 let closing=false;
 await context.route('**/*',async route=>{try {const req=route.request(),u=new URL(req.url());if(u.origin!==origin||req.method()!=='GET'||/^\/(api|_vercel)\//.test(u.pathname)){receipt.blockedRequests.push({url:u.origin+u.pathname,method:req.method()});return route.abort();}const response=await route.fetch({maxRedirects:0}); assert.ok(response.status()<300||response.status()>=400, 'Unexpected redirect: '+req.url()); return await route.fulfill({response});} catch(error) {if(!closing)throw error;}});
 await context.routeWebSocket('**/*',ws=>ws.close());
 const page=await context.newPage();const errors=[];page.on('pageerror',err=>errors.push(err.message));
 const res=await page.goto(origin+dest,{waitUntil:'networkidle'});assert.equal(res.status(),200);assert.doesNotMatch(res.headers()['x-robots-tag']||'',/noindex/i);
 assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('h1').innerText(),post.h1);
 assert.equal(await page.title(),post.seoTitle);assert.equal(await page.locator('meta[name="description"]').getAttribute('content'),post.seoDescription);
 assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.formula-chistoty.ck.ua'+dest);
 assert.doesNotMatch((await page.locator('meta[name="robots"]').getAttribute('content'))||'',/noindex/);
 const article=page.locator('article');const text=(await article.innerText()).replace(/\s+/g,' ');
 const parts=[post.excerpt,...post.intro,...post.content.flatMap(s=>[s.heading,...s.paragraphs||[],...s.list||[]]),...post.faq.flatMap(f=>[f.question,f.answer])];
 for(const part of parts)assert.ok(text.includes(part.replace(/\s+/g,' ')),`Missing text: ${part.slice(0,70)}`);
 const img=article.locator('img').first();await img.scrollIntoViewIfNeeded();await page.waitForFunction(()=>{const i=document.querySelector('article img');return i.complete&&i.naturalWidth>0;});
 assert.equal(await img.getAttribute('alt'),post.imageAlt);
 const nodes=(await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(x=>{const p=JSON.parse(x);return Array.isArray(p)?p:p['@graph']||[p]});
 const schema=nodes.find(n=>n['@type']==='BlogPosting');assert.equal(schema.headline,post.title);assert.equal(schema.datePublished,post.publishedAt);assert.equal(schema.image,'https://www.formula-chistoty.ck.ua'+post.mainImage);assert.equal(schema.mainEntityOfPage,'https://www.formula-chistoty.ck.ua'+dest);
 const faq=nodes.find(n=>n['@type']==='FAQPage');assert.deepEqual(faq.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text})),post.faq);
 const overflow=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));assert.ok(overflow.scrollWidth<=overflow.width+1,JSON.stringify(overflow));
 const hrefs=await article.locator('a').evaluateAll(els=>els.map(a=>a.getAttribute('href')));
 for(const target of ['/himchystka-dyvana-cherkasy','/himchystka-mebliv-cherkasy','/blog/yak-chasto-potribno-robyty-himchystku-dyvana'])assert.ok(hrefs.includes(target),`Missing ${target}`);
 if(profile.name==='desktop'){
  for(const href of [...new Set(hrefs)].filter(h=>h.startsWith('/'))){const r=await context.request.get(origin+href,{maxRedirects:0});assert.equal(r.status(),200,`Internal link ${href}`);}
  const sitemap=await context.request.get(origin+'/sitemap.xml');assert.equal(sitemap.status(),200);assert.ok((await sitemap.text()).includes('https://www.formula-chistoty.ck.ua'+dest));
  const robots=await context.request.get(origin+'/robots.txt');assert.equal(robots.status(),200);assert.doesNotMatch(await robots.text(),/Disallow:\s*\/(?:blog|\s*$)/im);
 }
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`${output}/${profile.name}-top.png`});
 const cta=article.getByRole('link',{name:post.cta.buttonLabel,exact:true});await cta.scrollIntoViewIfNeeded();await page.screenshot({path:`${output}/${profile.name}-cta.png`});
 await cta.click();await page.waitForURL(origin+'/himchystka-dyvana-cherkasy');assert.equal(await page.locator('h1').innerText(),'Хімчистка дивана у Черкасах');
 await page.goto(origin+'/kontakty#contact-form',{waitUntil:'networkidle'});assert.ok(await page.locator('form#contact-form').first().isVisible());
 await page.goto(origin+'/blog',{waitUntil:'networkidle'});await page.getByPlaceholder('Введіть тему').fill('восени');const card=page.locator(`a[href="${dest}"]`);assert.ok(await card.count()>0);await card.first().click();await page.waitForURL(origin+dest);assert.equal(await page.locator('h1').innerText(),post.h1);
 assert.deepEqual(errors,[]);receipt.profiles.push({profile:profile.name,status:'passed',paragraphsVerified:parts.length,horizontalOverflow:false,heroImageLoaded:true,ctaNavigation:true,contactFormVisible:true,blogSearchNavigation:true,consolePageErrors:errors});closing=true;await context.close();
}
receipt.status='passed';
} catch(error) {receipt.status='failed';receipt.error=error.stack;throw error;} finally {writeFileSync(`${output}/receipt.json`,JSON.stringify(receipt,null,2));await browser.close();}
console.log(JSON.stringify(receipt,null,2));
