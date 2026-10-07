import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const code = readFileSync(new URL('../src/scripts/consent.js', import.meta.url), 'utf8');
function page(saved, unavailable = false) {
  const requests = []; let reloads = 0;
  const button = choice => ({ dataset: { cookieChoice: choice }, addEventListener(_type, callback) { this.click = callback; }, focus() {} });
  const reject = button('false'); const accept = button('true'); const close = button('');
  const settings = button('');
  const notice = { hidden: true, querySelector(selector) { return selector === 'button' ? reject : close; }, querySelectorAll() { return [reject, accept]; } };
  let stored = saved ? JSON.stringify(saved) : null;
  const document = { cookie: '', head: { appendChild(script) { requests.push(script.src); } }, createElement() { return {}; }, querySelector() { return notice; }, querySelectorAll() { return [settings]; } };
  const window = {};
  const context = { window, document, location: { hostname: 'www.scottishenergyservices.co.uk', reload() { reloads++; } }, localStorage: { getItem() { if (unavailable) throw Error(); return stored; }, setItem(_key, value) { if (unavailable) throw Error(); stored = value; } }, Date, Set, JSON, Number };
  vm.runInNewContext(code, context);
  return { requests, window, notice, reject, accept, settings, saved: () => JSON.parse(stored), reloads: () => reloads };
}
test('no Google requests or tracking before consent, including invalid/expired storage', () => {
  for (const saved of [null, { advertising: false, time: Date.now() }, { advertising: true, time: 0 }, { advertising: 'true', time: Date.now() }]) {
    const p = page(saved);
    p.window.sesTrackEvent('phone_click');
    assert.equal(p.requests.length, 0);
    assert.equal(p.window.dataLayer, undefined);
  }
  assert.equal(page(null, true).requests.length, 0);
});
test('accept injects one tag; only approved non-personal events are sent once', () => {
  const p = page();
  p.accept.click(); p.accept.click();
  assert.equal(p.requests.length, 1);
  const before = p.window.dataLayer.length;
  p.window.sesTrackEvent('phone_click', { email: 'private@example.invalid' });
  p.window.sesTrackEvent('unapproved');
  assert.equal(p.window.dataLayer.length, before + 1);
  assert.deepEqual(Array.from(p.window.dataLayer.at(-1)), ['event', 'phone_click']);
  assert.equal(p.saved().advertising, true);
});
test('rejection persists; settings reopen; withdrawal blocks subsequent events and unloads tag', () => {
  const p = page();
  p.reject.click(); assert.equal(p.saved().advertising, false);
  p.settings.click({ currentTarget: p.settings }); assert.equal(p.notice.hidden, false);
  p.accept.click(); p.reject.click();
  const count = p.window.dataLayer.length;
  p.window.sesTrackEvent('quote_form_submitted');
  assert.equal(p.window.dataLayer.length, count);
  assert.equal(p.reloads(), 1);
  assert.equal(p.saved().advertising, false);
});
