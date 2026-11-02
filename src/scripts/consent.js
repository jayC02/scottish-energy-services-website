// Opt-out measurement: a saved rejection prevents Google from loading.
const KEY = 'ses-consent-v2';
const LEGACY_KEY = 'ses-consent-v1';
const TTL = 180 * 24 * 60 * 60 * 1000;
const ADS_ID = 'AW-18512642483';
const ANALYTICS_ID = 'G-YL8BX0TB0H';
const LEAD_CONVERSION = 'AW-18512642483/EQICCOjQoqodELODwvtE';
const COMMON_EVENTS = new Set(['phone_click', 'email_click', 'primary_cta_click', 'service_cta_click', 'quote_form_started', 'quote_form_submitted', 'contact_form_started', 'contact_form_submitted']);
const ANALYTICS_EVENTS = new Set(['internal_link_click', 'outbound_link_click', 'scroll_depth']);
const LEAD_EVENTS = new Set(['quote_form_submitted', 'contact_form_submitted']);
let choice = { analytics: true, advertising: true };
let knownChoice = false;
let started = false;
let adsConfigured = false;
let analyticsConfigured = false;
let opener = null;
const notice = document.querySelector('[data-cookie-notice]');

function current(saved) {
  return saved && Number.isFinite(saved.time) && saved.time <= Date.now() && Date.now() - saved.time < TTL;
}
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (current(saved) && typeof saved.analytics === 'boolean' && typeof saved.advertising === 'boolean') {
    choice = { analytics: saved.analytics, advertising: saved.advertising };
    knownChoice = true;
  } else {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null');
    if (current(legacy) && legacy.advertising === false) {
      choice = { analytics: false, advertising: false };
      knownChoice = true;
    }
  }
} catch { /* A preference cookie also remembers rejection when storage is unavailable. */ }
if (document.cookie.split(';').some(item => item.trim() === 'ses_tracking=off')) {
  choice = { analytics: false, advertising: false };
  knownChoice = true;
}

function permissions() {
  return {
    ad_storage: choice.advertising ? 'granted' : 'denied',
    ad_user_data: choice.advertising ? 'granted' : 'denied',
    ad_personalization: choice.advertising ? 'granted' : 'denied',
    analytics_storage: choice.analytics ? 'granted' : 'denied',
  };
}

function pageLocation() {
  const url = new URL(location.href);
  const clean = new URL(url.origin + url.pathname);
  // Preserve attribution, not arbitrary query strings, form values or fragments.
  for (const name of ['gclid', 'gbraid', 'wbraid']) {
    const value = url.searchParams.get(name);
    if (value && /^[A-Za-z0-9_-]{10,512}$/.test(value)) clean.searchParams.set(name, value);
  }
  for (const name of ['utm_source', 'utm_medium']) {
    const value = url.searchParams.get(name);
    if (value && /^[a-z_]{1,30}$/i.test(value)) clean.searchParams.set(name, value);
  }
  const campaign = url.searchParams.get('utm_campaign');
  if (campaign && /^ses_[a-z0-9_]{1,100}$/i.test(campaign)) clean.searchParams.set('utm_campaign', campaign);
  return clean.href;
}

function pageReferrer() {
  try {
    const url = new URL(document.referrer);
    return url.origin === location.origin ? url.origin + url.pathname : url.origin;
  } catch { return ''; }
}

function startGoogle() {
  if (!choice.analytics && !choice.advertising) return;
  if (!started) {
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Do not record a consent signal that the visitor has not actually given.
    if (knownChoice) window.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
  }
  if (knownChoice) window.gtag('consent', 'update', permissions());
  if (choice.advertising && !adsConfigured) {
    adsConfigured = true;
    window.gtag('config', ADS_ID, { allow_google_signals: false });
  }
  if (choice.analytics && !analyticsConfigured) {
    analyticsConfigured = true;
    window.gtag('config', ANALYTICS_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: pageLocation(),
      page_referrer: pageReferrer(),
      page_title: document.title,
    });
  }
  if (document.querySelector('[data-ses-google-tag]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-ses-google-tag', '');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${choice.advertising ? ADS_ID : ANALYTICS_ID}`;
  document.head.appendChild(script);
}

function clearGoogleCookies(revoked) {
  for (const item of document.cookie.split(';')) {
    const name = item.split('=')[0].trim();
    const advertising = /^(_gcl_|_gac_)/.test(name);
    const analytics = /^(_ga(?:_|$)|_gid$|_gat)/.test(name);
    if (!(revoked.advertising && advertising) && !(revoked.analytics && analytics)) continue;
    for (const domain of ['', location.hostname, '.scottishenergyservices.co.uk']) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

// No element text, form values or full link URLs are accepted as event metadata.
function eventDetails(details) {
  const safe = { page_path: location.pathname };
  if (details && typeof details === 'object') {
    if (['header', 'footer', 'content'].includes(details.placement)) safe.placement = details.placement;
    if (typeof details.link_path === 'string' && /^\/[a-z0-9/_-]*$/i.test(details.link_path) && details.link_path.length <= 160) safe.link_path = details.link_path;
    if (typeof details.link_domain === 'string' && /^[a-z0-9.-]{1,100}$/i.test(details.link_domain)) safe.link_domain = details.link_domain;
    if ([25, 50, 75, 90].includes(details.percent_scrolled)) safe.percent_scrolled = details.percent_scrolled;
  }
  return safe;
}

window.sesTrackEvent = (name, details) => {
  if (!COMMON_EVENTS.has(name) && !ANALYTICS_EVENTS.has(name)) return;
  if (choice.analytics && analyticsConfigured && window.gtag) {
    window.gtag('event', name, { send_to: ANALYTICS_ID, ...eventDetails(details) });
    if (LEAD_EVENTS.has(name)) window.gtag('event', 'generate_lead', {
      send_to: ANALYTICS_ID,
      page_path: location.pathname,
      form_type: name === 'quote_form_submitted' ? 'quote' : 'contact',
    });
  }
  if (choice.advertising && adsConfigured && COMMON_EVENTS.has(name) && window.gtag) {
    window.gtag('event', name, { send_to: ADS_ID });
    // The form handler emits success only after the enquiry API accepts it.
    if (LEAD_EVENTS.has(name)) window.gtag('event', 'conversion', { send_to: LEAD_CONVERSION });
  }
};

const scrolled = new Set();
window.addEventListener('scroll', () => {
  if (!choice.analytics || !analyticsConfigured) return;
  const height = document.documentElement.scrollHeight;
  if (height <= window.innerHeight) return;
  const percent = Math.min(100, (window.scrollY + window.innerHeight) / height * 100);
  for (const threshold of [25, 50, 75, 90]) {
    if (percent >= threshold && !scrolled.has(threshold)) {
      scrolled.add(threshold);
      window.sesTrackEvent('scroll_depth', { percent_scrolled: threshold });
    }
  }
}, { passive: true });

function applyChoice(next) {
  const revoked = { analytics: choice.analytics && !next.analytics, advertising: choice.advertising && !next.advertising };
  choice = next;
  knownChoice = true;
  try { localStorage.setItem(KEY, JSON.stringify({ ...choice, time: Date.now() })); } catch { /* Choice still applies on this page. */ }
  document.cookie = `ses_tracking=${choice.analytics || choice.advertising ? 'on' : 'off'}; Max-Age=${TTL / 1000}; path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  if (notice) notice.hidden = true;
  if (started && (revoked.analytics || revoked.advertising)) {
    window.gtag('consent', 'update', permissions());
    clearGoogleCookies(revoked);
    // Reload unloads Google's code; script removal alone cannot do this.
    location.reload();
    return;
  }
  startGoogle();
  opener?.focus();
}

function showPreferences(event) {
  opener = event?.currentTarget || null;
  if (!notice) return;
  notice.hidden = false;
  notice.querySelector('button')?.focus();
}

document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', showPreferences));
notice?.querySelectorAll('[data-cookie-choice]').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.cookieChoice;
  if (action === 'all') applyChoice({ analytics: true, advertising: true });
  else if (action === 'none') applyChoice({ analytics: false, advertising: false });
}));
if (!knownChoice && notice) notice.hidden = false;
startGoogle();
