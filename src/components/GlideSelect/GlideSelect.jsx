'use client';

// React Bits GlideSelect, with viewport fitting and accessible click support.
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import ArrowDown01Icon from '@hugeicons/core-free-icons/ArrowDown01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import './GlideSelect.css';

const SIZES = {
  sm: { chip: 28, row: 26, font: 12 },
  md: { chip: 32, row: 30, font: 13 },
  lg: { chip: 44, row: 40, font: 14 }
};
const PAD = 4;
const GAP = 1;
const MENU_GAP = 6;
const VIEWPORT_PAD = 12;
const DEFAULT_OPTIONS = ['One', 'Two', 'Three'];

const norm = option => typeof option === 'string' ? { value: option, label: option } : option;
const textOf = item => typeof item.label === 'string' ? item.label : item.value;
const typeaheadIndex = (items, from, character) => {
  for (let offset = 1; offset <= items.length; offset += 1) {
    const index = (from + offset) % items.length;
    if (textOf(items[index]).toLowerCase().startsWith(character.toLowerCase())) return index;
  }
  return from;
};

export default function GlideSelect({
  options = DEFAULT_OPTIONS,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  showTags = true,
  accentColor = '#f5f5f5',
  surfaceColor = '#27272a',
  highlightColor = '#3f3f46',
  textColor = '#f5f5f5',
  size = 'md',
  radius = 10,
  menuWidth = 176,
  placement = 'bottom',
  align = 'left',
  popDuration = 180,
  glideDuration = 220,
  rememberPosition = true,
  disabled = false,
  ariaLabel = 'Select',
  className = ''
}) {
  const items = options.map(norm);
  const [inner, setInner] = useState(defaultValue ?? '');
  const current = value ?? inner;
  const selected = items.findIndex(item => item.value === current);
  const [phase, setPhase] = useState('closed');
  const [active, setActive] = useState(null);
  const [side, setSide] = useState(placement);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const listRef = useRef(null);
  const pillRef = useRef(null);
  const instant = useRef(false);
  const closeTimer = useRef(undefined);
  const scrub = useRef(null);
  const pendingPick = useRef(null);
  const id = useId();
  const dimensions = SIZES[size] ?? SIZES.md;
  const step = dimensions.row + GAP;
  const popOut = Math.round(popDuration * 2 / 3);
  const isDisabled = disabled || items.length === 0;

  useLayoutEffect(() => {
    if (phase !== 'open') return undefined;
    const menu = menuRef.current;
    const root = rootRef.current;
    if (!menu || !root) return undefined;

    const positionMenu = () => {
      const rect = root.getBoundingClientRect();
      const topInset = parseFloat(getComputedStyle(root).getPropertyValue('--gs-viewport-top')) || VIEWPORT_PAD;
      const naturalHeight = items.length * step - GAP + PAD * 2;
      const below = Math.max(0, window.innerHeight - rect.bottom - MENU_GAP - VIEWPORT_PAD);
      const above = Math.max(0, rect.top - MENU_GAP - topInset);
      const preferredSpace = placement === 'bottom' ? below : above;
      const otherSpace = placement === 'bottom' ? above : below;
      const nextSide = naturalHeight > preferredSpace && otherSpace > preferredSpace
        ? placement === 'bottom' ? 'top' : 'bottom'
        : placement;
      setSide(nextSide);
      menu.style.setProperty('--gs-max-menu-h', (nextSide === 'bottom' ? below : above) + 'px');

      // The menu may be wider than its trigger on narrow screens.
      const desiredLeft = align === 'right' ? rect.right - menu.offsetWidth : rect.left;
      const left = Math.max(VIEWPORT_PAD, Math.min(desiredLeft, window.innerWidth - menu.offsetWidth - VIEWPORT_PAD));
      menu.style.left = left - rect.left + 'px';
      menu.style.right = 'auto';
    };

    positionMenu();
    menu.style.transitionDuration = '';
    menu.dataset.state = 'closed';
    void menu.offsetHeight;
    menu.dataset.state = 'open';
    const pill = pillRef.current;
    if (pill) {
      pill.style.transition = 'none';
      pill.style.transform = 'translateY(' + Math.max(0, selected) * step + 'px)';
      pill.style.opacity = '0';
      void pill.offsetHeight;
      pill.style.transition = '';
    }

    window.addEventListener('resize', positionMenu);
    window.addEventListener('scroll', positionMenu, { capture: true, passive: true });
    return () => {
      window.removeEventListener('resize', positionMenu);
      window.removeEventListener('scroll', positionMenu, true);
    };
    // Reposition while open without replaying the entrance for each hover.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, placement, align, items.length, step]);

  useLayoutEffect(() => {
    const pill = pillRef.current;
    if (!pill || phase !== 'open') return;
    if (active === null) {
      pill.style.opacity = '0';
      return;
    }
    const jump = instant.current || pill.style.opacity !== '1';
    pill.style.transitionDuration = jump ? '0ms, 150ms' : '';
    pill.style.transform = 'translateY(' + active * step + 'px)';
    pill.style.opacity = '1';
    instant.current = false;

    const list = listRef.current;
    if (list) {
      const top = active * step;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (top + dimensions.row > list.scrollTop + list.clientHeight) {
        list.scrollTop = top + dimensions.row - list.clientHeight;
      }
    }
  }, [active, phase, step, dimensions.row]);

  const open = viaKey => {
    if (isDisabled) return;
    clearTimeout(closeTimer.current);
    instant.current = true;
    setActive(selected >= 0 ? selected : viaKey ? 0 : null);
    setPhase('open');
  };

  const close = mode => {
    scrub.current = null;
    pendingPick.current = null;
    setActive(null);
    clearTimeout(closeTimer.current);
    const menu = menuRef.current;
    if (mode === 'instant' || !menu) {
      setPhase('closed');
      return;
    }
    menu.style.transitionDuration = '';
    menu.dataset.state = 'closed';
    setPhase('closing');
    closeTimer.current = setTimeout(() => setPhase('closed'), popOut + 20);
  };

  const pick = (index, viaKey) => {
    const item = items[index];
    if (!item) {
      close('instant');
      return;
    }
    if (item.value !== current) {
      if (value === undefined) setInner(item.value);
      onChange?.(item.value, item);
      if (!viaKey && rootRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        rootRef.current.dataset.swap = '';
      }
    }
    close('instant');
    triggerRef.current?.focus({ preventScroll: true });
  };

  const onTriggerKey = event => {
    const key = event.key;
    const count = items.length;
    const currentIndex = active ?? Math.max(0, selected);
    if (isDisabled) return;
    if (phase !== 'open') {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(key)) {
        event.preventDefault();
        open(true);
      }
      return;
    }
    const go = index => {
      event.preventDefault();
      instant.current = true;
      setActive(Math.min(count - 1, Math.max(0, index)));
    };
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      go(active === null ? currentIndex : currentIndex + (key === 'ArrowDown' ? 1 : -1));
    } else if (key === 'Home' || key === 'End') {
      go(key === 'Home' ? 0 : count - 1);
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      pick(currentIndex, true);
    } else if (key === 'Escape' || key === 'Tab') {
      if (key === 'Escape') event.preventDefault();
      close('instant');
    } else if (key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      go(typeaheadIndex(items, currentIndex, key));
    }
  };

  useEffect(() => {
    if (phase === 'closed') return undefined;
    const onDown = event => {
      if (rootRef.current && !rootRef.current.contains(event.target)) close('pop');
    };
    document.addEventListener('pointerdown', onDown, true);
    return () => document.removeEventListener('pointerdown', onDown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (isDisabled && phase !== 'closed') close('instant');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const rowAt = y => {
    const list = listRef.current;
    if (!list || !scrub.current) return null;
    const rect = list.getBoundingClientRect();
    if (y < rect.top || y >= rect.bottom) return null;
    const index = Math.floor((y - rect.top + list.scrollTop) / step);
    return index >= 0 && index < items.length ? index : null;
  };
  const onListDown = event => {
    if (event.button !== 0 || scrub.current) return;
    pendingPick.current = null;
    try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Capture is optional. */ }
    scrub.current = { id: event.pointerId };
    instant.current = true;
    setActive(rowAt(event.clientY));
  };
  const onListMove = event => {
    if (!scrub.current || scrub.current.id !== event.pointerId) return;
    const index = rowAt(event.clientY);
    if (index !== active) setActive(index);
  };
  const onListUp = event => {
    if (!scrub.current || scrub.current.id !== event.pointerId) return;
    const index = event.type === 'pointerup' ? rowAt(event.clientY) : null;
    scrub.current = null;
    // Keep the menu mounted until click so touch cannot activate a card below it.
    pendingPick.current = index;
    if (index === null && !rememberPosition) setActive(null);
  };
  const onListClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const index = pendingPick.current;
    pendingPick.current = null;
    if (index !== null) {
      pick(index, false);
    } else if (event.detail === 0) {
      // Assistive technology can activate an option without pointer events.
      const row = event.target.closest('[data-index]');
      if (row) pick(Number(row.dataset.index), false);
    }
  };
  const onListOver = event => {
    if (event.pointerType === 'touch' || scrub.current) return;
    const row = event.target.closest('[data-index]');
    if (!row) return;
    const index = Number(row.dataset.index);
    if (index !== active) setActive(index);
  };

  return (
    <div
      ref={rootRef}
      className={'glide-select' + (className ? ' ' + className : '')}
      data-size={size}
      data-disabled={isDisabled ? '' : undefined}
      style={{
        '--gs-accent': accentColor,
        '--gs-surface': surfaceColor,
        '--gs-highlight': highlightColor,
        '--gs-text': textColor,
        '--gs-radius': radius + 'px',
        '--gs-inner-radius': Math.max(3, radius - 4) + 'px',
        '--gs-chip': dimensions.chip + 'px',
        '--gs-row': dimensions.row + 'px',
        '--gs-font': dimensions.font + 'px',
        '--gs-menu-w': menuWidth + 'px',
        '--gs-pop': popDuration + 'ms',
        '--gs-pop-out': popOut + 'ms',
        '--gs-glide': glideDuration + 'ms',
        '--gs-origin': (side === 'bottom' ? 'top' : 'bottom') + ' ' + align
      }}
      onAnimationEnd={event => {
        if (event.animationName === 'gs-swap' && rootRef.current) delete rootRef.current.dataset.swap;
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={phase === 'open'}
        aria-controls={phase !== 'closed' ? id + '-list' : undefined}
        aria-activedescendant={phase === 'open' && active !== null ? id + '-' + active : undefined}
        aria-label={ariaLabel}
        disabled={isDisabled}
        className="glide-select__trigger"
        onClick={() => phase === 'open' ? close('pop') : open(false)}
        onKeyDown={onTriggerKey}
      >
        <span className="glide-select__label" key={current} data-empty={selected < 0 ? '' : undefined}>
          {selected >= 0 ? items[selected].label : placeholder}
        </span>
        <span className="glide-select__chevron" aria-hidden="true">
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={2} />
        </span>
      </button>
      {phase !== 'closed' ? (
        <div ref={menuRef} className="glide-select__menu" data-state="open" data-side={side} data-align={align} aria-hidden={phase !== 'open'}>
          <div
            ref={listRef}
            id={id + '-list'}
            role="listbox"
            aria-label={ariaLabel}
            className="glide-select__list"
            data-live={active !== null ? '' : undefined}
            onPointerOver={onListOver}
            onPointerLeave={() => {
              if (!scrub.current && !rememberPosition) setActive(null);
            }}
            onPointerDown={onListDown}
            onPointerMove={onListMove}
            onPointerUp={onListUp}
            onPointerCancel={onListUp}
            onLostPointerCapture={onListUp}
            onClick={onListClick}
          >
            <span ref={pillRef} className="glide-select__pill" aria-hidden="true" />
            {items.map((item, index) => (
              <div
                key={item.value}
                id={id + '-' + index}
                role="option"
                aria-selected={index === selected}
                data-index={index}
                className="glide-select__option"
              >
                <span className="glide-select__name">{item.label}</span>
                {showTags && item.tag ? <span className="glide-select__tag">{item.tag}</span> : null}
                <span className="glide-select__check" data-on={index === selected ? '' : undefined} aria-hidden="true">
                  <HugeiconsIcon icon={Tick02Icon} size={15} strokeWidth={2} />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
