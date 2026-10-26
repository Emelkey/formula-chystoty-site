/* Offline contract tests. Telegram and NextResponse are mocked; no external requests. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checks = [];
function load(file, imports = {}, globals = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const compiled = ts.transpileModule(source, {reportDiagnostics: true, compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, strict: true
  }});
  assert.equal((compiled.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0);
  const context = {exports: {}, require: id => {if (id in imports) return imports[id]; throw Error(`Unexpected import: ${id}`);},
    console: {log(){}, error(){}}, ...globals};
  vm.runInNewContext(compiled.outputText, context, {filename: file});
  return context.exports;
}
function check(name, fn) {fn(); checks.push({name, status: 'PASS'});}
const phone = load('lib/phone.ts');
const accepted = ['+380970000001','380970000001','0970000001','+38 (097) 000-00-01','097 000 00 01','  +380970000001  ','+380\u00a097\u00a0000\u00a000\u00a001','097.000.00.01'];
for (const value of accepted) check(`phone accepts ${JSON.stringify(value)}`, () => assert.equal(phone.normalizeUkrainianPhone(value), '+380970000001'));
const rejected = ['', '1234567','+480970000001','++380970000001','0+970000001','0970000001abc',null,1234567,{},'097000000','09700000011','+380970000001 ext 2',' '.repeat(3)];
for (const value of rejected) check(`phone rejects ${JSON.stringify(value)}`, () => assert.equal(phone.normalizeUkrainianPhone(value), null));
function makeRoute({env = {TELEGRAM_BOT_TOKEN:'mock-only', TELEGRAM_CHAT_ID:'mock-only'}, tgStatus=200, tgBody={ok:true}, tgText, thrown=false} = {}) {
  const sent = [];
  const route=load('app/api/lead/route.ts', {
    'next/server':{NextResponse:{json:(obj, init) => Response.json(obj, init)}}, '@/lib/phone':phone
  }, {process:{env}, fetch:async (url, request) => {
    assert.equal(url, 'https://api.telegram.org/botmock-only/sendMessage');
    sent.push(JSON.parse(request.body));
    if (thrown) throw Error('Mock network error');
    return tgText === undefined ? Response.json(tgBody,{status:tgStatus}) : new Response(tgText,{status:tgStatus});
  }});
  return {...route,sent};
}
async function api(name, payload, expectedStatus, expectedError, options={}, expectedSent=0, raw=false) {
  const route=makeRoute(options);
  const request = new Request('http://local.test/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:raw?payload:JSON.stringify(payload)});
  const response=await route.POST(request);
  const body=await response.json();
  assert.equal(response.status, expectedStatus,name);
  assert.equal(body.error,expectedError,name);
  assert.equal(route.sent.length,expectedSent,name);
  if(expectedStatus===200 && expectedSent===1) {
    assert.equal(body.success,true,name);
    assert.ok(route.sent[0].text.includes('Телефон: +380970000001'),name);
  }
  checks.push({name,status:'PASS'});
}
(async()=>{
  for(const value of accepted) await api(`API normalizes ${JSON.stringify(value)}`, {name:'LOCAL TEST',phone:value},200,undefined,{},1);
  await api('API missing name',{phone:'0970000001'},400,'name_required');
  await api('API missing phone',{name:'LOCAL TEST'},400,'phone_required');
  await api('API rejects short phone',{name:'LOCAL TEST',phone:'1234567'},400,'phone_invalid');
  await api('API rejects text in phone',{name:'LOCAL TEST',phone:'0970000001abc'},400,'phone_invalid');
  for(const payload of [null,[],42,'wrong']) await api(`API rejects shape ${JSON.stringify(payload)}`,payload,400,'invalid_payload');
  await api('API invalid JSON','{',400,'invalid_json',{},0,true);
  await api('API honeypot produces no send',{name:'LOCAL TEST',phone:'0970000001',website:'bot'},200,undefined);
  await api('API missing environment',{name:'LOCAL TEST',phone:'0970000001'},500,'telegram_env_missing',{env:{}});
  await api('API rejects oversized payload',{name:'LOCAL TEST',phone:'0970000001',message:'x'.repeat(2001)},400,'payload_too_large');
  await api('API rejects Telegram HTTP failure',{name:'LOCAL TEST',phone:'0970000001'},502,'telegram_send_failed',{tgStatus:502,tgBody:{ok:false}},1);
  await api('API rejects Telegram ok=false',{name:'LOCAL TEST',phone:'0970000001'},502,'telegram_send_failed',{tgBody:{ok:false}},1);
  await api('API rejects Telegram non-JSON',{name:'LOCAL TEST',phone:'0970000001'},502,'telegram_send_failed',{tgText:'invalid'},1);
  await api('API rejects Telegram network failure',{name:'LOCAL TEST',phone:'0970000001'},500,'lead_api_unhandled_error',{thrown:true},1);
  const summary = {scope:'Offline TypeScript/phone/API contract tests. Not production, not a full Next.js build.',passed:checks.length,failed:0,checks};
  console.log(JSON.stringify(summary,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
