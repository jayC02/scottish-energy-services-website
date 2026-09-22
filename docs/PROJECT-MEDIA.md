# Project portfolio handover

The homepage keeps its React Bits expanding accordion and uses five real projects in the requested order. `/projects` provides alternating media-led rows, with anchor destinations instead of thin case-study pages. The shared navigation replaces Coverage with Projects; `/areas` remains available. The ScrollExpand hero and service-page work were not changed.

## Processed media

Decimal MB, rounded to two places. Source files in `D:\Jayveer\Documents\Website Videos` were not overwritten; SHA-256 comparisons confirmed they were unchanged.

| Source | Original MB | Final MB | Output |
| --- | ---: | ---: | --- |
| Edinburgh University.mp4 | 8.44 | 4.49 | public/videos/projects/university-of-edinburgh.mp4 |
| St James Quarter.mp4 | 124.18 | 8.62 | public/videos/projects/st-james-centre.mp4 |
| Armadillo.mp4 | 95.61 | 10.59 | public/videos/projects/sec-armadillo.mp4 |
| Kelvingrove Art Gallery.mp4 | 132.71 | 8.11 | public/videos/projects/kelvingrove-art-gallery.mp4 |
| glasgow airport.jpg | 3.08 | 0.42 | public/images/projects/glasgow-airport.webp |

Videos: 8.4 seconds, H.264, 1920x1080, 25fps, yuv420p, no audio, fast-start moov atom before mdat. A 0.6-second crossfade softens each loop join. Posters at 1280px and 640px are saved in `public/images/projects`. The airport has 1440px and 720px WebP versions plus a 0.53 MB JPEG fallback.

`python scripts/prepare-project-media.py --source "D:\Jayveer\Documents\Website Videos"` regenerates assets using ffmpeg/ffprobe. Requires Python and ffmpeg on PATH. It only writes generated assets and an output report, checks source hashes, and can run from any working directory.

## Files added or changed for this task

- `src/components/AccordionGallery/AccordionGallery.jsx`: typed media items, SSR-compatible rendering, lazy active video playback, touch and keyboard handling, pause control.
- `src/components/AccordionGallery/AccordionGallery.css`: image/video support, readable labels, touch accordion layout and focus states.
- `src/components/ProjectsShowcase.astro`: real project data, portfolio copy and portfolio link.
- `src/components/ProjectMedia.astro`: reusable responsive image/video presentation.
- `src/data/projects.ts`: shared factual project catalogue and anchor URLs.
- `src/pages/projects/index.astro`: editorial portfolio page and quote CTA.
- `src/scripts/project-playback.js`: shared deferred video-source/play/pause helper.
- `src/scripts/project-page.js`: viewport-aware playback, manual controls and motion/data-saving preferences.
- `src/data/site.ts`: shared desktop/mobile navigation change.
- `public/sitemap.xml`: projects URL.
- `src/components/bits/SpotlightSurface.astro`: HTMLElement query type fix for an existing build error; no visual changes.
- `scripts/prepare-project-media.py`: repeatable encoding script.
- `public/videos/projects/*`, `public/images/projects/*`: generated local assets.
- `docs/PROJECT-MEDIA.md`: this handover.

`package-lock.json` was already modified before this task; `npm install` was run. Pre-existing edits to `ServiceCards.astro` and `global.css` were preserved. Browser screenshots and encoding reports are under `output/portfolio`; browser CLI logs are under `.playwright-cli`.

## Verification

- `npm install` completed. npm reported 15 dependency vulnerabilities; no unrelated dependency upgrades were applied.
- `npm run build` passed: 23 static pages, zero errors, zero warnings, four existing hints.
- Production browser checks at 1920, 1280, 768 and 320px found no horizontal overflow or page runtime errors.
- Desktop hover and arrow-key focus expand the appropriate item.
- Mobile first tap expands; second tap opens the matching portfolio anchor.
- No homepage project video source is loaded initially. Only the active visible video plays; inactive/off-screen videos pause.
- Portfolio playback is limited to one visible video; manual pause works.
- Reduced-motion mode does not load/play gallery videos automatically.
- No-JavaScript markup includes five real linked project items with posters/images.

## Owner content still needed

For fuller case studies, supply approved services/scope, dates, challenges, approach, outcomes and any publishable client attribution for each project. No results, savings, assessment counts or quotations were invented. The supplied filename says “St James Quarter”; the displayed title follows your requested “St James Centre”. Confirm if you prefer Quarter as the public title.
