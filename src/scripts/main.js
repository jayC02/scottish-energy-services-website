import "./tracking.js";
const navigation = document.querySelector("[data-navigation]");
const desktop = window.matchMedia("(min-width: 961px)");
const syncNavigation = () => {
  if (navigation) navigation.open = desktop.matches;
};
syncNavigation();
desktop.addEventListener("change", syncNavigation);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".services-menu[open]").forEach((menu) => {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    });
    if (navigation?.open && !desktop.matches) {
      navigation.open = false;
      navigation.querySelector("summary")?.focus();
    }
  }
});
document.addEventListener("click", (event) => {
  document.querySelectorAll(".services-menu[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
if (document.querySelector("[data-turnstile-widget][data-sitekey]")) {
  const script = document.createElement("script");
  script.src =
    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  script.async = true;
  document.head.appendChild(script);
}
const createToast = () => {
  const existing = document.querySelector("[data-form-toast]");
  if (existing) return existing;

  const toast = document.createElement("div");
  toast.className = "form-toast";
  toast.setAttribute("data-form-toast", "");
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.hidden = true;
  document.body.appendChild(toast);
  return toast;
};

const showToast = (message, variant = "success") => {
  const toast = createToast();
  toast.textContent = message;
  toast.dataset.variant = variant;
  toast.hidden = false;
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => {
      toast.hidden = true;
    }, 220);
  }, 3800);
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_REGEX = /^[+\d\s().-]{7,20}$/;

const setFieldError = (form, fieldName, message = "") => {
  const field = form.querySelector(`[name="${fieldName}"]`);
  const errorSlot = form.querySelector(
    `[data-error-for="${fieldName === "cf-turnstile-response" ? "turnstileToken" : fieldName}"]`,
  );

  if (field) {
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  if (errorSlot) {
    errorSlot.textContent = message;
  }
};

const initializeTurnstile = (form) => {
  const widget = form.querySelector("[data-turnstile-widget]");
  const tokenInput = form.querySelector('[name="cf-turnstile-response"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector("[data-form-status]");
  if (!widget || !tokenInput) return;

  const siteKey = widget.getAttribute("data-sitekey")?.trim();
  if (!siteKey) {
    setFieldError(
      form,
      "turnstileToken",
      "Captcha is currently unavailable. Please try again shortly or call us directly.",
    );
    if (statusEl)
      statusEl.textContent =
        "Captcha is currently unavailable. Please try again shortly or call us directly.";
    if (submitButton) submitButton.disabled = true;
    return;
  }

  const renderWidget = () => {
    if (!window.turnstile || typeof window.turnstile.render !== "function")
      return false;
    if (widget.dataset.rendered === "true") return true;

    const widgetId = window.turnstile.render(widget, {
      "response-field": false,
      sitekey: siteKey,
      theme: widget.getAttribute("data-theme") || "light",
      callback: (token) => {
        tokenInput.value = token;
        setFieldError(form, "turnstileToken", "");
      },
      "expired-callback": () => {
        tokenInput.value = "";
      },
      "error-callback": () => {
        tokenInput.value = "";
        setFieldError(
          form,
          "turnstileToken",
          "Captcha failed to load. Please refresh and try again.",
        );
      },
    });

    widget.dataset.widgetId = widgetId;
    widget.dataset.rendered = "true";
    return true;
  };

  if (renderWidget()) return;

  let attempts = 0;
  const poll = window.setInterval(() => {
    attempts += 1;
    if (renderWidget() || attempts >= 40) {
      window.clearInterval(poll);
      if (attempts >= 40 && widget.dataset.rendered !== "true") {
        setFieldError(
          form,
          "turnstileToken",
          "Captcha failed to load. Please refresh and try again.",
        );
      }
    }
  }, 150);
};

const validateClientValues = (values, options = { captchaRequired: true }) => {
  const errors = {};

  if (!values.name || values.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!values.email || !EMAIL_REGEX.test(values.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!values.service) errors.service = "Please select the service you need.";
  if (!values.message || values.message.trim().length < 12)
    errors.message =
      "Please provide a bit more detail (at least 12 characters).";
  if (values.phone && !PHONE_REGEX.test(values.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (options.captchaRequired && !values["cf-turnstile-response"])
    errors.turnstileToken = "Please complete the captcha check.";

  if (
    !values.postcode ||
    !/^(?:[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}|GIR\s*0AA)$/i.test(
      values.postcode.trim(),
    )
  )
    errors.postcode = "Please enter a valid UK postcode.";
  if (
    values.floorArea &&
    (!Number.isFinite(Number(values.floorArea)) ||
      Number(values.floorArea) <= 0)
  )
    errors.floorArea = "Enter a floor area greater than zero.";
  return errors;
};

const collectValues = (formData) => Object.fromEntries(formData.entries());

document.querySelectorAll("[data-ajax-form]").forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector("[data-form-status]");

  form.noValidate = true;
  initializeTurnstile(form);
  let started = false;
  form.addEventListener("input", () => {
    if (!started) {
      started = true;
      window.sesTrackEvent("quote_form_started", { form_type: form.name });
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === "true") return;

    const formData = new FormData(form);
    const values = collectValues(formData);

    [
      "name",
      "email",
      "service",
      "phone",
      "message",
      "postcode",
      "floorArea",
      "turnstileToken",
    ].forEach((field) => setFieldError(form, field, ""));
    if (statusEl) statusEl.textContent = "";

    const captchaWidget = form.querySelector("[data-turnstile-widget]");
    const captchaRequired = Boolean(
      captchaWidget && captchaWidget.getAttribute("data-sitekey"),
    );
    const clientErrors = validateClientValues(values, { captchaRequired });
    Object.entries(clientErrors).forEach(([field, message]) =>
      setFieldError(form, field, message),
    );

    if (Object.keys(clientErrors).length > 0) {
      const firstErrorField = form.querySelector('[aria-invalid="true"]');
      if (firstErrorField instanceof HTMLElement) firstErrorField.focus();
      return;
    }

    form.dataset.submitting = "true";
    const defaultText =
      submitButton?.dataset.submitText || submitButton?.textContent || "Submit";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (statusEl) statusEl.textContent = "Submitting your request...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        signal: AbortSignal.timeout(30000),
        body: JSON.stringify(values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const payload = await response.json();

      if (!response.ok || payload.ok !== true) {
        if (payload?.errors && typeof payload.errors === "object") {
          Object.entries(payload.errors).forEach(([field, message]) => {
            if (typeof message === "string")
              setFieldError(form, field, message);
          });
        }

        const message =
          payload?.message ||
          "We could not submit your request. Please try again.";
        if (statusEl) statusEl.textContent = message;
        showToast(message, "error");
        form.querySelector('[aria-invalid="true"]')?.focus();
        const widget = form.querySelector("[data-turnstile-widget]");
        if (window.turnstile && widget?.dataset.widgetId)
          window.turnstile.reset(widget.dataset.widgetId);
        form.querySelector('[name="cf-turnstile-response"]').value = "";
        return;
      }

      window.sesTrackEvent("quote_form_submitted", {
        form_type: form.name,
        service: values.service,
      });
      started = false;
      form.reset();
      const tokenInput = form.querySelector('[name="cf-turnstile-response"]');
      if (tokenInput) tokenInput.value = "";
      if (window.turnstile && typeof window.turnstile.reset === "function") {
        const captchaWidget = form.querySelector("[data-turnstile-widget]");
        if (captchaWidget)
          window.turnstile.reset(captchaWidget.dataset.widgetId);
      }

      const successMessage =
        "Thank you. Your enquiry has been received. We will get back to you shortly.";
      if (statusEl) {
        statusEl.textContent = successMessage;
        statusEl.focus();
      }
      showToast(successMessage, "success");
    } catch (error) {
      if (statusEl)
        statusEl.textContent =
          "Unable to send right now. Please try again in a moment.";
      showToast(
        "Unable to send right now. Please try again in a moment.",
        "error",
      );
      const widget = form.querySelector("[data-turnstile-widget]");
      if (window.turnstile && widget?.dataset.widgetId)
        window.turnstile.reset(widget.dataset.widgetId);
      form.querySelector('[name="cf-turnstile-response"]').value = "";
      console.error(error);
    } finally {
      form.dataset.submitting = "false";
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultText;
      }
    }
  });
});
