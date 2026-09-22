// Video URLs stay in data-src until playback is actually requested.
// Shared by the React accordion and the editorial project page.
export function setProjectPlayback(video, shouldPlay) {
  if (!video) return;
  video.dataset.playback = shouldPlay ? 'play' : 'pause';
  if (!shouldPlay) {
    video.pause();
    return;
  }
  if (!video.getAttribute('src')) video.src = video.dataset.src;
  video.muted = true;
  const attempt = video.play();
  attempt?.then(() => {
    // A different panel may have become active while play() was pending.
    if (video.dataset.playback !== 'play') video.pause();
  }).catch(() => {
    // The poster remains usable if autoplay is blocked or the media is unavailable.
  });
}
