import LogoLoop from '../LogoLoop/LogoLoop.jsx';

// Scale evens out the optical size of square and very wide logos at one height.
const clients = [
  { alt: 'M&S', src: '/images/client-logos/marks-and-spencer.png', scale: 1.1 },
  { alt: 'Savills', src: '/images/client-logos/savills.svg', scale: 1.45 },
  { alt: 'Glasgow City Council', src: '/images/client-logos/glasgow-city-council.png', scale: 1 },
  { alt: 'Hilton', src: '/images/client-logos/hilton.png', scale: 0.9 },
  { alt: 'The University of Edinburgh', src: '/images/client-logos/university-of-edinburgh.png', scale: 0.92 },
  { alt: 'Max Fordham', src: '/images/client-logos/max-fordham.svg', scale: 0.62 },
  { alt: 'Aldi', src: '/images/client-logos/aldi.svg', scale: 1.5 },
  { alt: 'Knight Frank', src: '/images/client-logos/knight-frank.svg', scale: 1.1 },
  { alt: 'AGS Airports', src: '/images/client-logos/ags-airports.png', scale: 1.3 },
  { alt: 'IHG Hotels & Resorts', src: '/images/client-logos/ihg-hotels-resorts.svg', scale: 0.78 },
  { alt: 'University of Glasgow', src: '/images/client-logos/university-of-glasgow.svg', scale: 1.3 },
  { alt: 'Glasgow Life', src: '/images/client-logos/glasgow-life.svg', scale: 0.82 },
  { alt: 'Praxis Real Estate Management', src: '/images/client-logos/praxis-real-estate-management.png', scale: 0.8 },
  { alt: 'Southside Housing Association', src: '/images/client-logos/southside-housing-association.png', scale: 1.5 },
  { alt: 'Marine & Lawn Hotels & Resorts', src: '/images/client-logos/marine-lawn-hotels-resorts.png', scale: 0.95 },
  { alt: 'Peel Retail & Leisure', src: '/images/client-logos/peel-retail-leisure.svg', scale: 0.92 },
  { alt: 'University of the West of Scotland', src: '/images/client-logos/university-of-the-west-of-scotland.svg', scale: 1.4 },
  { alt: 'Keegans', src: '/images/client-logos/keegans.svg', scale: 0.8 },
  { alt: 'Estama', src: '/images/client-logos/estama.svg', scale: 0.92 },
  { alt: 'Cairn Group', src: '/images/client-logos/cairn-group.png', scale: 1.45 }
];

const renderLogo = item => (
  <img
    src={item.src}
    alt={item.alt}
    title={item.alt}
    loading="lazy"
    decoding="async"
    draggable={false}
    style={{ height: `calc(var(--logoloop-logoHeight) * ${item.scale})` }}
  />
);

export default function ClientLogoLoop() {
  return (
    <LogoLoop
      logos={clients}
      speed={38}
      logoHeight={34}
      gap={72}
      muted={0}
      fadeOutWidth={0.1}
      renderItem={renderLogo}
      ariaLabel="Organisations we work with"
      className="hp-logoloop"
    />
  );
}
