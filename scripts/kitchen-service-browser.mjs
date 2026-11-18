import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require(resolve(process.env.GA4_PLAYWRIGHT_DIR,'node_modules/playwright'));
const origin=process.env.KITCHEN_QA_ORIGIN || 'http://127.0.0.1:3100';
const local=/^http:\/\/127\.0\.0\.1:\d+$/.test(origin);
assert.ok(local || origin==='https://www.formula-chistoty.ck.ua');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try {
 for(const width of [320,360,390,430,1365]) {
  const ctx=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
  const payloads=[];
  await ctx.route('**/*',route=>{
   const r=route.request(),u=new URL(r.url());
   if(local && u.origin===origin && u.pathname==='/api/lead') {payloads.push(JSON.parse(r.postData()));return route.fulfill({status:200,contentType:'application/json',body:'{"success":true}'});}
   if(r.method()==='GET' && u.origin===origin && !u.pathname.startsWith('/api/')) return route.continue();
   return route.abort();
  });
  await ctx.routeWebSocket('**/*',ws=>ws.close());
  const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/generalne-prybyrannya-kuhni-cherkasy',{waitUntil:'networkidle'});
  for (const link of await page.locator('a[aria-label="Залишити заявку"]').all()) assert.equal(await link.getAttribute('href'),'#contact-form');
  if(width<1024){
   await page.getByRole('button',{name:'Відкрити меню',exact:true}).click();
   const menu=page.locator('#mobile-menu');
   await menu.getByRole('link',{name:'Розрахувати вартість',exact:true}).click();
   await menu.waitFor({state:'detached'});
   assert.equal(new URL(page.url()).hash,'#contact-form');
  } else {assert.equal(await page.getByRole('link',{name:'Розрахувати',exact:true}).getAttribute('href'),'#contact-form');}
  const cta=page.getByRole('link',{name:'Розрахувати вартість',exact:true}).first();
  assert.equal(await cta.getAttribute('href'),'#contact-form');await cta.click();
  assert.equal(new URL(page.url()).hash,'#contact-form');
  const f=page.locator('form#contact-form');
  assert.equal(await f.locator('select[name="type"]').inputValue(),'Генеральне прибирання кухні');
  assert.ok(await f.isVisible());
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(local){
   await f.locator('[name="name"]').fill('SYNTHETIC LOCAL QA');await f.locator('[name="phone"]').fill('0970000001');
   await f.locator('button[type="submit"]').click();await f.getByRole('status').waitFor();
   assert.equal(payloads.length,1);assert.equal(payloads[0].service,'Генеральне прибирання кухні');
   assert.equal(await f.locator('select[name="type"]').inputValue(),'Генеральне прибирання кухні');
  }
  assert.deepEqual(errors,[]);console.log(JSON.stringify({width,local,cta:true,selection:true,overflow:false,mockedPayload:payloads.length,realLeads:0}));
  await ctx.close();
 }
} finally {await browser.close();}
