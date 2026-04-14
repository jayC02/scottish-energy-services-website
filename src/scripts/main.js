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
