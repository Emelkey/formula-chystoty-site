import test from 'node:test';
import assert from 'node:assert/strict';
import { readLeadJson, MAX_LEAD_BODY_BYTES } from '../lib/lead-security.ts';
const request = (body, headers = {}) => new Request('https://www.formula-chistoty.ck.ua/api/lead', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body,
  ...(body instanceof ReadableStream ? { duplex: 'half' } : {})
});
test('valid JSON and same-origin request', async () => {
  assert.deepEqual(await readLeadJson(request('{"name":"тест"}', {origin:'https://www.formula-chistoty.ck.ua'})), {name:'тест'});
});
test('rejects cross-origin browser requests and non-JSON content', async () => {
  for (const headers of [{origin:'https://attacker.invalid'}, {'sec-fetch-site':'cross-site'}]) {
    await assert.rejects(readLeadJson(request('{}', headers)), {status:403});
  }
  await assert.rejects(readLeadJson(request('{}', {'content-type':'text/plain'})), {status:415});
});
test('bounds declared and streamed body before JSON parsing', async () => {
  await assert.rejects(readLeadJson(request('{}', {'content-length':String(MAX_LEAD_BODY_BYTES + 1)})), {status:413});
  let cancelled = false;
  const stream = new ReadableStream({start(c){ c.enqueue(new Uint8Array(MAX_LEAD_BODY_BYTES)); c.enqueue(new Uint8Array(1)); }, cancel(){cancelled=true;}});
  await assert.rejects(readLeadJson(request(stream)), {status:413});
  assert.equal(cancelled,true);
});
test('multibyte body is measured in bytes, not characters', async () => {
  await assert.rejects(readLeadJson(request(JSON.stringify('я'.repeat(MAX_LEAD_BODY_BYTES / 2)))), {status:413});
});
test('slow input is cancelled at deadline', async () => {
  let cancelled=false;
  const stream = new ReadableStream({cancel(){cancelled=true;}});
  await assert.rejects(readLeadJson(request(stream), 10), {status:408});
  assert.equal(cancelled,true);
});
test('invalid JSON remains rejected', async () => {
  await assert.rejects(readLeadJson(request('{')), SyntaxError);
});
