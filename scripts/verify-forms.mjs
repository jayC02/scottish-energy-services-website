import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const compiled = ts.transpileModule(fs.readFileSync("api/forms.ts", "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { default: handler } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);
const originalFetch = globalThis.fetch;
let requests = [];
let captcha = true;
let email = true;
process.env.TURNSTILE_SECRET_KEY = "mock-secret";
process.env.RESEND_API_KEY = "mock-key";
process.env.FORM_FROM_EMAIL = "test@example.invalid";
globalThis.fetch = async (url, options) => {
  requests.push({ url, body: options.body });
  if (url.includes("siteverify"))
    return { ok: true, json: async () => ({ success: captcha }) };
  if (url.includes("resend.com"))
    return {
      ok: email,
      status: email ? 200 : 500,
      text: async () => "mock failure",
    };
  throw Error("Unexpected network request");
};
const valid = {
  formType: "quote",
  name: "Test Person",
  email: "test@example.invalid",
  phone: "0141 255 1360",
  service: "Commercial EPCs",
  postcode: "G2 4JR",
  floorArea: "120",
  propertyType: "Office",
  timeframe: "Within a month",
  message: "Test property <script>alert(1)</script>",
  sourcePage: "/quote",
  "cf-turnstile-response": "mock-token",
};
async function send(body, method = "POST") {
  let result;
  await handler(
    { method, body, headers: {} },
    {
      status: (status) => ({
        json: (data) => {
          result = { status, data };
        },
      }),
    },
  );
  return result;
}
assert.equal((await send({}, "GET")).status, 405);
assert.equal((await send({})).status, 400);
assert.equal((await send({ ...valid, postcode: "invalid" })).status, 400);
assert.equal((await send({ ...valid, floorArea: "-1" })).status, 400);
assert.equal((await send({ ...valid, message: "a".repeat(8001) })).status, 400);
requests = [];
assert.equal((await send({ ...valid, website: "spam" })).status, 200);
assert.equal(requests.length, 0);
captcha = false;
assert.equal((await send(valid)).status, 400);
captcha = true;
requests = [];
assert.equal((await send(valid)).status, 200);
assert.equal(requests.length, 2);
const delivered = JSON.parse(requests[1].body);
assert.match(delivered.html, /G2 4JR/);
assert.match(delivered.html, /120/);
assert.match(delivered.html, /Within a month/);
assert.match(delivered.html, /&lt;script&gt;/);
assert.doesNotMatch(delivered.html, /<script>/);
email = false;
const saved = console.error;
console.error = () => {};
assert.equal((await send(valid)).status, 500);
console.error = saved;
globalThis.fetch = originalFetch;
console.log(
  "PASS: method, validation, spam, captcha rejection, complete field delivery, HTML escaping and email failure. All external calls mocked.",
);
