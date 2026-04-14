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
  const ctx = canvas.getContext('2d', { alpha: true });
  const pointer = { x: 0.5, y: 0.5 };
  const targetPointer = { x: 0.5, y: 0.5 };

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawFlowField = (elapsed, width, height) => {
    const lineCount = Math.max(15, Math.floor(height / 44));
    const segments = Math.max(18, Math.floor(width / 68));

    for (let i = 0; i < lineCount; i += 1) {
      const progress = i / Math.max(1, lineCount - 1);
      const baseY = progress * height;

      ctx.beginPath();
      for (let j = 0; j <= segments; j += 1) {
        const x = (j / segments) * width;
        const waveA = Math.sin((x * 0.0048) + (elapsed * 0.2) + (i * 0.35));
        const waveB = Math.cos((x * 0.0034) - (elapsed * 0.16) + (i * 0.22));
        const pointerLift = (pointer.x - 0.5) * 30 * Math.sin((x / width) * Math.PI);
        const y = baseY + (waveA * 11) + (waveB * 8) + pointerLift;

        if (j === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const alpha = 0.06 + (1 - progress) * 0.05;
      ctx.strokeStyle = `rgba(23, 86, 143, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const drawLightSweep = (elapsed, width, height) => {
    const sweepX = ((elapsed * 0.05) % 1) * width;
    const lateral = (pointer.x - 0.5) * 120;
    const focusY = height * (0.36 + (pointer.y - 0.5) * 0.08);
    const gradient = ctx.createLinearGradient(sweepX - 220 + lateral, 0, sweepX + 300 + lateral, height);

    gradient.addColorStop(0, 'rgba(95, 158, 215, 0)');
    gradient.addColorStop(0.45, 'rgba(95, 158, 215, 0.09)');
    gradient.addColorStop(0.55, 'rgba(68, 135, 197, 0.12)');
    gradient.addColorStop(1, 'rgba(68, 135, 197, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const halo = ctx.createRadialGradient(width * 0.58 + lateral * 0.35, focusY, 0, width * 0.58 + lateral * 0.35, focusY, Math.max(260, width * 0.35));
    halo.addColorStop(0, 'rgba(121, 181, 233, 0.11)');
    halo.addColorStop(1, 'rgba(121, 181, 233, 0)');

    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, width, height);
  };

  const render = (time) => {
    const elapsed = time * 0.001;
    const width = window.innerWidth;
    const height = window.innerHeight;

    pointer.x += (targetPointer.x - pointer.x) * 0.04;
    pointer.y += (targetPointer.y - pointer.y) * 0.04;

    ctx.clearRect(0, 0, width, height);
    drawFlowField(elapsed, width, height);
    drawLightSweep(elapsed, width, height);

    requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', (event) => {
    targetPointer.x = event.clientX / window.innerWidth;
    targetPointer.y = event.clientY / window.innerHeight;
  }, { passive: true });

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(render);
}
