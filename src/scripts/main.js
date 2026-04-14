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

const canvas = document.querySelector('#ambient-canvas');
if (canvas && !reducedMotion) {
  const ctx = canvas.getContext('2d');
  const pointer = { x: 0.5, y: 0.45 };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  let start = performance.now();

  const drawGlow = (x, y, radius, color) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const render = (t) => {
    const elapsed = (t - start) / 1000;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    const driftX = Math.sin(elapsed * 0.2) * 28;
    const driftY = Math.cos(elapsed * 0.23) * 24;

    drawGlow(w * 0.18 + driftX, h * 0.16 + driftY, Math.max(260, w * 0.28), 'rgba(106, 173, 240, 0.18)');
    drawGlow(w * (0.84 + (pointer.x - 0.5) * 0.03), h * (0.74 + (pointer.y - 0.5) * 0.03), Math.max(240, w * 0.25), 'rgba(106, 207, 170, 0.14)');
    drawGlow(w * (0.52 + (pointer.x - 0.5) * 0.05), h * (0.1 + (pointer.y - 0.5) * 0.05), Math.max(220, w * 0.2), 'rgba(159, 196, 238, 0.13)');

    requestAnimationFrame(render);
  };

  window.addEventListener('mousemove', (event) => {
    pointer.x = event.clientX / window.innerWidth;
    pointer.y = event.clientY / window.innerHeight;
  }, { passive: true });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(render);
}
