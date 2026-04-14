const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
const header = document.querySelector('[data-header]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

if (header) {
  const handleHeader = () => header.classList.toggle('compact', window.scrollY > 10);
  handleHeader();
  window.addEventListener('scroll', handleHeader, { passive: true });
}

if (!reducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in-view'));
}

const counters = document.querySelectorAll('[data-count]');
const animateCounter = (el) => {
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.round(target / 80));
  const tick = () => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      return;
    }
    el.textContent = current.toLocaleString();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if (!reducedMotion && counters.length) {
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => counterObserver.observe(counter));
}

const heroCanvas = document.querySelector('#hero-field');
if (heroCanvas && !reducedMotion) {
  const ctx = heroCanvas.getContext('2d', { alpha: true });
  const pointer = { x: 0.5, y: 0.5 };
  const pointerTarget = { x: 0.5, y: 0.5 };

  const getHeroBounds = () => {
    const section = heroCanvas.closest('.hero');
    if (!section) return { width: window.innerWidth, height: Math.max(420, window.innerHeight * 0.72) };
    const rect = section.getBoundingClientRect();
    return { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
  };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = getHeroBounds();
    heroCanvas.width = Math.floor(width * ratio);
    heroCanvas.height = Math.floor(height * ratio);
    heroCanvas.style.width = `${width}px`;
    heroCanvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const render = (time) => {
    const elapsed = time * 0.001;
    const width = heroCanvas.clientWidth;
    const height = heroCanvas.clientHeight;

    pointer.x += (pointerTarget.x - pointer.x) * 0.035;
    pointer.y += (pointerTarget.y - pointer.y) * 0.035;

    ctx.clearRect(0, 0, width, height);

    const lines = Math.max(11, Math.floor(height / 56));
    const segments = Math.max(20, Math.floor(width / 56));

    for (let row = 0; row < lines; row += 1) {
      const rowProgress = row / Math.max(1, lines - 1);
      const baseY = height * (0.12 + rowProgress * 0.78);
      const alpha = 0.045 + (1 - rowProgress) * 0.04;

      ctx.beginPath();
      for (let i = 0; i <= segments; i += 1) {
        const x = (i / segments) * width;
        const waveA = Math.sin((x * 0.006) + (elapsed * 0.12) + row * 0.42) * 7;
        const waveB = Math.cos((x * 0.0028) - (elapsed * 0.08) + row * 0.2) * 5;
        const parallax = (pointer.x - 0.5) * 20 * Math.sin((x / width) * Math.PI);
        const y = baseY + waveA + waveB + parallax;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(31, 79, 124, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', (event) => {
    pointerTarget.x = event.clientX / window.innerWidth;
    pointerTarget.y = event.clientY / window.innerHeight;
  }, { passive: true });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(render);
}

const createToast = () => {
  const existing = document.querySelector('[data-form-toast]');
  if (existing) return existing;

  const toast = document.createElement('div');
  toast.className = 'form-toast';
  toast.setAttribute('data-form-toast', '');
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.hidden = true;
  document.body.appendChild(toast);
  return toast;
};

const showToast = (message, variant = 'success') => {
  const toast = createToast();
  toast.textContent = message;
  toast.dataset.variant = variant;
  toast.hidden = false;
  toast.classList.add('is-visible');

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => {
      toast.hidden = true;
    }, 220);
  }, 3800);
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_REGEX = /^[+\d\s().-]{7,20}$/;

const setFieldError = (form, fieldName, message = '') => {
  const field = form.querySelector(`[name="${fieldName}"]`);
  const errorSlot = form.querySelector(`[data-error-for="${fieldName === 'cf-turnstile-response' ? 'turnstileToken' : fieldName}"]`);

  if (field) {
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  if (errorSlot) {
    errorSlot.textContent = message;
  }
};

const initializeTurnstile = (form) => {
  const widget = form.querySelector('[data-turnstile-widget]');
  const tokenInput = form.querySelector('[name="cf-turnstile-response"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector('[data-form-status]');
  if (!widget || !tokenInput) return;

  const siteKey = widget.getAttribute('data-sitekey')?.trim();
  if (!siteKey) {
    setFieldError(form, 'turnstileToken', 'Captcha is currently unavailable. Please try again shortly or call us directly.');
    if (statusEl) statusEl.textContent = 'Captcha is currently unavailable. Please try again shortly or call us directly.';
    if (submitButton) submitButton.disabled = true;
    return;
  }

  const renderWidget = () => {
    if (!window.turnstile || typeof window.turnstile.render !== 'function') return false;
    if (widget.dataset.rendered === 'true') return true;

    window.turnstile.render(widget, {
      sitekey: siteKey,
      theme: widget.getAttribute('data-theme') || 'light',
      callback: (token) => {
        tokenInput.value = token;
        setFieldError(form, 'turnstileToken', '');
      },
      'expired-callback': () => {
        tokenInput.value = '';
      },
      'error-callback': () => {
        tokenInput.value = '';
        setFieldError(form, 'turnstileToken', 'Captcha failed to load. Please refresh and try again.');
      }
    });

    widget.dataset.rendered = 'true';
    return true;
  };

  if (renderWidget()) return;

  let attempts = 0;
  const poll = window.setInterval(() => {
    attempts += 1;
    if (renderWidget() || attempts >= 40) {
      window.clearInterval(poll);
      if (attempts >= 40 && widget.dataset.rendered !== 'true') {
        setFieldError(form, 'turnstileToken', 'Captcha failed to load. Please refresh and try again.');
      }
    }
  }, 150);
};

const validateClientValues = (values, options = { captchaRequired: true }) => {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!values.email || !EMAIL_REGEX.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.service) errors.service = 'Please select the service you need.';
  if (!values.message || values.message.trim().length < 12) errors.message = 'Please provide a bit more detail (at least 12 characters).';
  if (values.phone && !PHONE_REGEX.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (values.formType === 'quote' && !values.postcode) errors.postcode = 'Please enter the property postcode.';
  if (options.captchaRequired && !values['cf-turnstile-response']) errors.turnstileToken = 'Please complete the captcha check.';

  return errors;
};

const collectValues = (formData) => Object.fromEntries(formData.entries());

document.querySelectorAll('[data-ajax-form]').forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');
  const statusEl = form.querySelector('[data-form-status]');

  initializeTurnstile(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const values = collectValues(formData);

    ['name', 'email', 'service', 'phone', 'postcode', 'message', 'turnstileToken'].forEach((field) => setFieldError(form, field, ''));
    if (statusEl) statusEl.textContent = '';

    const captchaWidget = form.querySelector('[data-turnstile-widget]');
    const captchaRequired = Boolean(captchaWidget && captchaWidget.getAttribute('data-sitekey'));
    const clientErrors = validateClientValues(values, { captchaRequired });
    Object.entries(clientErrors).forEach(([field, message]) => setFieldError(form, field, message));

    if (Object.keys(clientErrors).length > 0) {
      const firstErrorField = form.querySelector('[aria-invalid="true"]');
      if (firstErrorField instanceof HTMLElement) firstErrorField.focus();
      return;
    }

    const defaultText = submitButton?.dataset.submitText || submitButton?.textContent || 'Submit';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (statusEl) statusEl.textContent = 'Submitting your request...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const payload = await response.json();

      if (!response.ok) {
        if (payload?.errors && typeof payload.errors === 'object') {
          Object.entries(payload.errors).forEach(([field, message]) => {
            if (typeof message === 'string') setFieldError(form, field, message);
          });
        }

        const message = payload?.message || 'We could not submit your request. Please try again.';
        if (statusEl) statusEl.textContent = message;
        showToast(message, 'error');
        return;
      }

      form.reset();
      const tokenInput = form.querySelector('[name="cf-turnstile-response"]');
      if (tokenInput) tokenInput.value = '';
      if (window.turnstile && typeof window.turnstile.reset === 'function') {
        const captchaWidget = form.querySelector('[data-turnstile-widget]');
        if (captchaWidget) window.turnstile.reset(captchaWidget);
      }

      const successMessage = 'Thanks — your form was submitted successfully. We will get back to you shortly.';
      if (statusEl) statusEl.textContent = successMessage;
      showToast(successMessage, 'success');
    } catch (error) {
      if (statusEl) statusEl.textContent = 'Unable to send right now. Please try again in a moment.';
      showToast('Unable to send right now. Please try again in a moment.', 'error');
      console.error(error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultText;
      }
    }
  });
});
