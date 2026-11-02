import { setProjectPlayback } from './project-playback.js';

const videos = [...document.querySelectorAll('[data-project-video]')];
const ratios = new Map(videos.map(video => [video, 0]));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;

const updatePlayback = () => {
  const autoplay = !document.hidden && !reduced.matches && !connection?.saveData;
  const eligible = videos.filter(video => (ratios.get(video) || 0) >= 0.35);
  // Play only the most visible project; off-screen videos stay paused.
  eligible.sort((a, b) => ratios.get(b) - ratios.get(a));
  videos.forEach(video => setProjectPlayback(video, autoplay && video === eligible[0]));
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => ratios.set(entry.target, entry.intersectionRatio));
  updatePlayback();
}, { threshold: [0, 0.35, 0.5, 0.75, 1] });
videos.forEach(video => observer.observe(video));
document.addEventListener('visibilitychange', updatePlayback);
reduced.addEventListener('change', updatePlayback);
connection?.addEventListener('change', updatePlayback);
window.addEventListener('pagehide', () => videos.forEach(video => setProjectPlayback(video, false)));
window.addEventListener('pageshow', updatePlayback);
