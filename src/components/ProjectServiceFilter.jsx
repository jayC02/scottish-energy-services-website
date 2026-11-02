import { useEffect, useRef, useState } from 'react';
import GlideSelect from './GlideSelect/GlideSelect';

export default function ProjectServiceFilter({ options }) {
  const [value, setValue] = useState('all');
  const rootRef = useRef(null);

  const applyFilter = next => {
    let visible = 0;
    document.querySelectorAll('[data-project-card]').forEach(card => {
      const matches = next === 'all' || card.dataset.services.split(' ').includes(next);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    const count = document.querySelector('[data-project-count]');
    if (count) count.textContent = visible + (visible === 1 ? ' project' : ' projects');
  };

  useEffect(() => {
    // Keep an upward-opening menu below the site's sticky navigation.
    const header = document.querySelector('[data-header]');
    if (header && rootRef.current) {
      rootRef.current.style.setProperty('--gs-viewport-top', header.getBoundingClientRect().height + 12 + 'px');
    }
    const readLocation = () => {
      const query = new URLSearchParams(window.location.search).get('service');
      const initial = options.some(option => option.value === query) ? query : 'all';
      setValue(initial);
      applyFilter(initial);
    };
    readLocation();
    const control = rootRef.current?.closest('[data-project-filter-control]');
    if (control) control.hidden = false;
    window.addEventListener('popstate', readLocation);
    return () => window.removeEventListener('popstate', readLocation);
  }, [options]);

  return (
    <div ref={rootRef} className="project-service-filter">
      <GlideSelect
        options={options}
        value={value}
        onChange={next => {
          setValue(next);
          applyFilter(next);
        }}
        ariaLabel="Filter projects by service"
        accentColor="#0f6ea5"
        surfaceColor="#ffffff"
        highlightColor="#deecf6"
        textColor="#0f1b2a"
        size="lg"
        radius={12}
        menuWidth={280}
        popDuration={180}
        glideDuration={220}
        rememberPosition
      />
    </div>
  );
}
