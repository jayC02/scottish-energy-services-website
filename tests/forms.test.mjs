import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/forms.ts';

const valid = { formType: 'quote', name: 'Test enquiry', email: 'test@example.invalid', phone: '', service: 'Commercial EPCs', message: 'A fictional test property enquiry.', sourcePage: '/quote', 'cf-turnstile-response': 'test-token' };
async function submit(body, headers = {}, method = 'POST') {
  let code; let result;
  const response = { setHeader() {}, status(value) { code = value; return { json(value) { result = value; } }; } };
  await handler({ method, body, headers: { 'content-type': 'application/json', ...headers } }, response);
  return { code, result };
}

test('form endpoint validation and mocked delivery', async (t) => {
  const originalFetch = globalThis.fetch;
  const envKeys = ['TURNSTILE_SECRET_KEY', 'TURNSTILE_ALLOWED_HOSTNAMES', 'RESEND_API_KEY', 'FORM_FROM_EMAIL'];
  const previous = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
  Object.assign(process.env, { TURNSTILE_SECRET_KEY: 'test-only', RESEND_API_KEY: 'test-only', FORM_FROM_EMAIL: 'test@example.invalid', TURNSTILE_ALLOWED_HOSTNAMES: 'www.scottishenergyservices.co.uk' });
  let calls = [];
  let captcha = { success: true, hostname: 'www.scottishenergyservices.co.uk', action: 'enquiry' };
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify(String(url).includes('siteverify') ? captcha : { id: 'mock' }), { status: 200 });
  };
  try {
    await t.test('rejects unsafe formats, cross-site posts, malformed JSON and unsupported form types', async () => {
      assert.equal((await submit(valid, {}, 'GET')).code, 405);
      assert.equal((await submit(valid, { 'content-type': 'text/plain' })).code, 415);
      assert.equal((await submit(valid, { origin: 'https://other.example' })).code, 403);
      assert.equal((await submit('{broken')).code, 400);
      assert.equal((await submit({ ...valid, formType: 'unknown' })).code, 400);
      assert.equal(calls.length, 0);
    });
    await t.test('rejects oversized bodies, invalid services and header injection before provider calls', async () => {
      assert.equal((await submit({ ...valid, message: 'x'.repeat(40000) })).code, 413);
      assert.equal((await submit({ ...valid, message: 'x'.repeat(10001) })).code, 400);
      assert.equal((await submit({ ...valid, service: 'arbitrary' })).code, 400);
      assert.equal((await submit({ ...valid, email: 'test@example.invalid\r\nBcc: victim@example.invalid' })).code, 400);
      assert.equal(calls.length, 0);
    });
    await t.test('honeypot is discarded without email and missing CAPTCHA fails closed', async () => {
      assert.equal((await submit({ ...valid, website: 'bot' })).code, 200);
      assert.equal((await submit({ ...valid, 'cf-turnstile-response': '' })).code, 400);
      assert.equal(calls.length, 0);
    });
    await t.test('requires CAPTCHA success, expected hostname and action', async () => {
      for (const change of [{ success: false }, { hostname: 'other.example' }, { action: 'other' }]) {
        captcha = { success: true, hostname: 'www.scottishenergyservices.co.uk', action: 'enquiry', ...change };
        assert.equal((await submit(valid)).code, 400);
      }
      assert.ok(calls.every(call => String(call.url).includes('siteverify')));
    });
    await t.test('escapes email HTML, preserves recipient and accepts optional phone', async () => {
      calls = [];
      captcha = { success: true, hostname: 'www.scottishenergyservices.co.uk', action: 'enquiry' };
      assert.equal((await submit({ ...valid, message: '<img src=x onerror=alert(1)> testing' })).code, 200);
      assert.equal(calls.length, 2);
      const email = JSON.parse(calls[1].options.body);
      assert.deepEqual(email.to, ['info@scottishenergyservices.co.uk']);
      assert.ok(email.html.includes('&lt;img'));
      assert.ok(!email.html.includes('<img'));
      assert.ok(calls.every(call => call.options.signal));
    });
    await t.test('optional quotation details are validated before providers and delivered safely', async () => {
      calls = [];
      for (const details of [{ propertyAddress: 'x'.repeat(301) }, { floorArea: '-20' }, { floorArea: '250 m2' }, { buildingStatus: 'arbitrary' }, { drawings: 'unknown' }, { propertyType: 'office\n<script>' }]) {
        assert.equal((await submit({ ...valid, ...details })).code, 400);
      }
      assert.equal(calls.length, 0);
      assert.equal((await submit({ ...valid, propertyAddress: '<test address>', propertyType: 'Office', floorArea: '250.5', buildingStatus: 'Existing building', drawings: 'Available', completionDate: 'Within four weeks' })).code, 200);
      const email = JSON.parse(calls[1].options.body);
      assert.ok(email.html.includes('&lt;test address&gt;'));
      assert.ok(!email.html.includes('<test address>'));
      for (const value of ['Office', '250.5', 'Existing building', 'Available', 'Within four weeks']) assert.ok(email.text.includes(value));
    });
    await t.test('does not disclose provider errors or log submitted personal details', async () => {
      const originalError = console.error;
      const logs = [];
      console.error = (...values) => logs.push(values.join(' '));
      globalThis.fetch = async () => { throw new Error('provider-private-data'); };
      try {
        const result = await submit(valid);
        assert.equal(result.code, 500);
        assert.ok(!JSON.stringify(result).includes('provider-private-data'));
        assert.deepEqual(logs, ['Form delivery failed']);
      } finally { console.error = originalError; }
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of envKeys) previous[key] === undefined ? delete process.env[key] : process.env[key] = previous[key];
  }
});
