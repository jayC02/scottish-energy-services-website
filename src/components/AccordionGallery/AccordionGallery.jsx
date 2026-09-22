import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';
import { setProjectPlayback } from '../../scripts/project-playback.js';

const AccordionGallery = ({
  items = EMPTY_ITEMS,
  defaultIndex = 0,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = ''
}) => {
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const pointerTypeRef = useRef(null);
  const tappedPanelRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const [mobile, setMobile] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [videosEnabled, setVideosEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const vertical = orientation === 'vertical' || mobile;
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), Math.max(0, count - 1)));

  useEffect(() => {
    const smallScreen = window.matchMedia('(max-width: 640px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const updateMobile = () => setMobile(smallScreen.matches);
    const updateMotion = () => {
      setPrefersReduced(reduced.matches);
      setVideosEnabled(!reduced.matches && !connection?.saveData);
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMobile(); updateMotion(); updateVisibility();
    smallScreen.addEventListener('change', updateMobile);
    reduced.addEventListener('change', updateMotion);
    connection?.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      smallScreen.removeEventListener('change', updateMobile);
      reduced.removeEventListener('change', updateMotion);
      connection?.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const videos = videoRefs.current;
    videos.forEach((video, index) => setProjectPlayback(video, index === active && videosEnabled && inView && pageVisible));
    return () => videos.forEach(video => setProjectPlayback(video, false));
  }, [active, videosEnabled, inView, pageVisible]);

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i, event) => {
    if (event.pointerType === 'mouse' && trigger === 'hover' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) setActive(i);
  };

  const handleClick = (i, e) => {
    const pointerType = e.nativeEvent.pointerType || pointerTypeRef.current;
    const touchTap = e.detail !== 0 && (pointerType === 'touch' || pointerType === 'pen' ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches);
    pointerTypeRef.current = null;
    // A focus/hover event must not count as the first deliberate tap.
    // This also makes the initially expanded panel require two taps.
    if (touchTap) {
      if (tappedPanelRef.current !== i || i !== active) {
        e.preventDefault();
        tappedPanelRef.current = i;
        setActive(i);
      }
      return;
    }
    tappedPanelRef.current = null;
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    pointerTypeRef.current = null;
    tappedPanelRef.current = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (i + 1) % count; setActive(next); panelRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const next = (i - 1 + count) % count; setActive(next); panelRefs.current[next]?.focus();
    }
  };

  return (
    <div className="ag-shell">
    <div className="ag-controls">
      <p>Explore a project. Tap once to expand, again to view.</p>
      {items.some(item => item.type === 'video') && <button type="button" onClick={() => setVideosEnabled(enabled => !enabled)} aria-pressed={videosEnabled}>
        {videosEnabled ? 'Pause project videos' : 'Play project videos'}
      </button>}
    </div>
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical && !mobile ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="group"
      aria-label="Selected project gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={i}
            ref={el => { panelRefs.current[i] = el; }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onPointerDown={event => { pointerTypeRef.current = event.pointerType; }}
            onPointerEnter={event => handleEnter(i, event)}
            onFocus={() => {
              // Touch focus must not turn the first tap into immediate navigation.
              if (pointerTypeRef.current !== 'touch' && pointerTypeRef.current !== 'pen') setActive(i);
            }}
            onKeyDown={e => handleKeyDown(i, e)}
            tabIndex={0}
            aria-label={`${item.label}${item.sector ? `, ${item.sector}` : ""} – view project`}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={el => { mediaRefs.current[i] = el; }}>
                {item.type === 'video' ? (
                  <video ref={element => { videoRefs.current[i] = element; }} data-src={item.src}
                    poster={item.poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
                ) : (
                  <img src={item.src || item.image} srcSet={item.thumbnail ? `${item.thumbnail} 720w, ${item.src} 1440w` : undefined}
                    sizes="(max-width: 640px) 92vw, 55vw" alt={item.alt || item.label || ''}
                    loading="lazy" decoding="async" draggable="false" />
                )}
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && <span className="ag-panel__collapsed" aria-hidden="true">{item.label}</span>}
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={el => { barRefs.current[i] = el; }} />
                <span className="ag-panel__text" ref={el => { textRefs.current[i] = el; }}>
                  <span className="ag-panel__sector">{item.sector}</span>
                  <span className="ag-panel__name">{item.label} <span aria-hidden="true">↗</span></span>
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
    </div>
  );
};

/** @type {import("../../data/projects").Project[]} */
const EMPTY_ITEMS = [];

export default AccordionGallery;
