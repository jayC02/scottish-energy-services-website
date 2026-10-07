// Basic consent mode: Google is never contacted before an affirmative choice.
const KEY = 'ses-consent-v1';
const TTL = 180 * 24 * 60 * 60 * 1000;
const ADS_ID = 'AW-18158926466';
let allowed = false;
let started = false;
let storedChoice = null;
let opener = null;
const notice = document.querySelector('[data-cookie-notice]');

try {
  const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (saved && typeof saved.advertising === 'boolean' && Number.isFinite(saved.time) && saved.time <= Date.now() && Date.now() - saved.time < TTL) storedChoice = saved.advertising;
} catch { /* Unavailable storage means no consent, rather than assumed consent. */ }

function startAds() {
  if (started || !allowed) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'denied' });
  window.gtag('js', new Date());
  window.gtag('config', ADS_ID, { allow_google_signals: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  document.head.appendChild(script);
}

function clearAdsCookies() {
  for (const item of document.cookie.split(';')) {
    const name = item.split('=')[0].trim();
    if (!/^(_gcl_|_gac_|_ga(?:_|$)|_gid$|_gat)/.test(name)) continue;
    const domains = ['', location.hostname, '.scottishenergyservices.co.uk'];
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
  }
}

// Only a small, non-personal event vocabulary is permitted. No past events are replayed.
const EVENTS = new Set(['phone_click', 'email_click', 'primary_cta_click', 'service_cta_click', 'quote_form_started', 'quote_form_submitted', 'contact_form_started', 'contact_form_submitted']);
window.sesTrackEvent = (name) => {
  if (allowed && EVENTS.has(name) && window.gtag) window.gtag('event', name);
};

function showPreferences(event) {
  opener = event?.currentTarget || null;
  if (!notice) return;
  notice.hidden = false;
  const close = notice.querySelector('[data-cookie-close]');
  if (close) close.hidden = storedChoice === null;
  notice.querySelector('button')?.focus();
}

document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', showPreferences));
notice?.querySelector('[data-cookie-close]')?.addEventListener('click', () => {
  notice.hidden = true;
  opener?.focus();
});
notice?.querySelectorAll('[data-cookie-choice]').forEach(button => button.addEventListener('click', () => {
  const wasStarted = started;
  allowed = button.dataset.cookieChoice === 'true';
  storedChoice = allowed;
  try { localStorage.setItem(KEY, JSON.stringify({ advertising: allowed, time: Date.now() })); } catch { /* Choice applies to this page even without storage. */ }
  notice.hidden = true;
  if (allowed) startAds();
  else {
    if (window.gtag) window.gtag('consent', 'update', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    clearAdsCookies();
    // Unload Google's code after withdrawal; script removal alone does not stop it.
    if (wasStarted) location.reload();
  }
  opener?.focus();
}));
if (storedChoice === null && notice) notice.hidden = false;
allowed = storedChoice === true;
startAds();
