const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
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

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
});

counters.forEach((counter) => counterObserver.observe(counter));

const canvas = document.querySelector('#ambient-canvas');
if (canvas instanceof HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const glowA = document.querySelector('.ambient-glow-a');
  const glowB = document.querySelector('.ambient-glow-b');

  if (ctx) {
    const palette = ['rgba(15,110,165,0.14)', 'rgba(33,134,182,0.12)', 'rgba(45,157,133,0.1)'];
    const points = Array.from({ length: 8 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      radius: 180 + Math.random() * 260,
      speedX: (Math.random() - 0.5) * 0.0003,
      speedY: (Math.random() - 0.5) * 0.00024,
      color: palette[index % palette.length]
    }));

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let pointerX = 0;
    let pointerY = 0;
    window.addEventListener('pointermove', (event) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 10;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 10;
    });

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      points.forEach((point) => {
        point.x += point.speedX;
        point.y += point.speedY;

        if (point.x < -0.1 || point.x > 1.1) point.speedX *= -1;
        if (point.y < -0.1 || point.y > 1.1) point.speedY *= -1;

        const gradient = ctx.createRadialGradient(
          point.x * width,
          point.y * height,
          0,
          point.x * width,
          point.y * height,
          point.radius
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      if (glowA instanceof HTMLElement) {
        glowA.style.transform = `translate3d(${pointerX * -0.8}px, ${pointerY * -0.8}px, 0)`;
      }
      if (glowB instanceof HTMLElement) {
        glowB.style.transform = `translate3d(${pointerX * 0.6}px, ${pointerY * 0.6}px, 0)`;
      }

      requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);

    if (!prefersReducedMotion) {
      draw();
    } else {
      points.forEach((point) => {
        const gradient = ctx.createRadialGradient(
          point.x * window.innerWidth,
          point.y * window.innerHeight,
          0,
          point.x * window.innerWidth,
          point.y * window.innerHeight,
          point.radius
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x * window.innerWidth, point.y * window.innerHeight, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }
}
