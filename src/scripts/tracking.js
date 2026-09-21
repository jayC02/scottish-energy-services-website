// One transport only: gtag pushes into dataLayer. Never send a duplicate raw event.
// Personal details and free-text messages must never enter analytics payloads.
window.sesTrackEvent = (name, payload = {}) => {
  if (window.sesAnalyticsConsent && typeof window.gtag === "function")
    window.gtag("event", name, payload);
};
document.addEventListener("click", (event) => {
  const link = event.target.closest("a,button[data-track]");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  const name = href.startsWith("tel:")
    ? "phone_number_clicked"
    : href.startsWith("mailto:")
      ? "email_clicked"
      : link.dataset.track;
  if (name)
    window.sesTrackEvent(name, {
      ...(link.dataset.service ? { service: link.dataset.service } : {}),
      page_path: location.pathname,
    });
});
const banner = document.querySelector("[data-consent-banner]");
const loadTag = () => {
  if (document.querySelector("[data-google-tag]")) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", "AW-18158926466");
  const script = document.createElement("script");
  script.async = true;
  script.dataset.googleTag = "";
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-18158926466";
  document.head.appendChild(script);
};
let stored = null;
try {
  stored = localStorage.getItem("ses-consent-v1");
} catch {}
window.sesAnalyticsConsent = stored === "accepted";
if (window.sesAnalyticsConsent) loadTag();
if (banner) banner.hidden = stored !== null;
const choose = (value) => {
  try {
    localStorage.setItem("ses-consent-v1", value);
  } catch {}
  window.sesAnalyticsConsent = value === "accepted";
  if (window.sesAnalyticsConsent) {
    loadTag();
    window.gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "denied",
    });
  } else if (window.gtag)
    window.gtag("consent", "update", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  if (banner) banner.hidden = true;
};
document
  .querySelector("[data-consent-accept]")
  ?.addEventListener("click", () => choose("accepted"));
document
  .querySelector("[data-consent-reject]")
  ?.addEventListener("click", () => choose("rejected"));
document.querySelectorAll("[data-cookie-settings]").forEach((button) =>
  button.addEventListener("click", () => {
    if (banner) {
      banner.hidden = false;
      banner.querySelector("button")?.focus();
    }
  }),
);
