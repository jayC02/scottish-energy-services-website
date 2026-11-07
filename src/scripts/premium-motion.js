// Scroll-driven motion and conversion helpers for service pages and cards.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* Reveal on scroll ------------------------------------------------------- */
const animated = [...document.querySelectorAll('[data-animate]')];
if (animated.length && !reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  const viewport = window.innerHeight;
  animated.forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Already visible at load: show immediately so nothing blinks out.
    if (rect.top < viewport && rect.bottom > 0) el.classList.add('is-in');
    else observer.observe(el);
  });
  root.classList.add('motion-ready');
}

/* Subtle parallax on hero imagery --------------------------------------- */
const parallax = [...document.querySelectorAll('[data-parallax]')];
if (parallax.length && !reduced) {
  let ticking = false;
  const update = () => {
    ticking = false;
    parallax.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const strength = Number(el.dataset.parallax || 0.12);
      el.style.transform = `translate3d(0, ${(rect.top * -strength).toFixed(1)}px, 0) scale(1.12)`;
    });
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* Count-up numbers (e.g. the 48-hour promise) --------------------------- */
const counters = [...document.querySelectorAll('[data-countup]')];
if (counters.length && !reduced && 'IntersectionObserver' in window) {
  const run = (el) => {
    const target = Number(el.dataset.countup);
    const start = performance.now();
    const duration = 1400;
    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => counterObserver.observe(el));
}

/* Service filter on /services ------------------------------------------- */
const filterBar = document.querySelector('[data-service-filter]');
if (filterBar) {
  const buttons = [...filterBar.querySelectorAll('button[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const status = document.querySelector('[data-filter-status]');
  filterBar.hidden = false;
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      let shown = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) {
          card.style.setProperty('--d', `${shown * 60}ms`);
          shown += 1;
          if (!reduced) {
            card.classList.remove('card-pop');
            void card.offsetWidth;
            card.classList.add('card-pop');
          }
        }
      });
      if (status) status.textContent = `Showing ${shown} service${shown === 1 ? '' : 's'}`;
    });
  });
}

/* Sticky quote bar on service pages ------------------------------------- */
const sticky = document.querySelector('[data-sticky-cta]');
const hero = document.querySelector('[data-sticky-after]');
const finalCta = document.querySelector('[data-sticky-hide]');
if (sticky && hero && 'IntersectionObserver' in window) {
  let pastHero = false;
  let atEnd = false;
  const sync = () => sticky.classList.toggle('is-visible', pastHero && !atEnd);
  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    sync();
  }).observe(hero);
  if (finalCta) {
    new IntersectionObserver(([entry]) => { atEnd = entry.isIntersecting; sync(); }).observe(finalCta);
  }
}

/* Open an accordion item when linked to directly ------------------------ */
const openFromHash = () => {
  if (!location.hash) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target instanceof HTMLDetailsElement) target.open = true;
};
openFromHash();
window.addEventListener('hashchange', openFromHash);
