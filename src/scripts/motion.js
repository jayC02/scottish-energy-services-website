const control = document.querySelector('[data-pause-videos]');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
window.sesVideosPaused = reduced.matches;
const updateLabel = () => {
  if (!control) return;
  control.hidden = !document.querySelector('video');
  control.setAttribute('aria-pressed', String(window.sesVideosPaused));
  const label = window.sesVideosPaused ? 'Play videos' : 'Pause videos';
  if (control.textContent !== label) control.textContent = label;
};
const apply = () => {
  document.querySelectorAll('video').forEach(video => {
    if (window.sesVideosPaused || document.hidden) video.pause();
    else if ((video.autoplay || video.dataset.playback === 'play') && video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().top < window.innerHeight) {
      if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src;
      video.play()?.catch(() => {});
    }
  });
  updateLabel();
};
document.addEventListener('play', event => {
  if (event.target instanceof HTMLVideoElement && (window.sesVideosPaused || document.hidden)) event.target.pause();
}, true);
control?.addEventListener('click', () => { window.sesVideosPaused = !window.sesVideosPaused; apply(); });
reduced.addEventListener('change', () => { window.sesVideosPaused = reduced.matches; apply(); });
document.addEventListener('visibilitychange', apply);
const observer = new MutationObserver(updateLabel);
observer.observe(document.body, { childList: true, subtree: true });
apply();
