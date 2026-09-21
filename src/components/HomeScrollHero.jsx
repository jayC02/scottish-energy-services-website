import ScrollExpand from './ScrollExpand/ScrollExpand';
import './HomeScrollHero.css';

export default function HomeScrollHero() {
  return (
    <section className="home-scroll-hero" aria-label="Scottish Energy Services">
      <ScrollExpand
        src="/videos/hero-background.mp4"
        mediaType="video"
        title="Scottish Energy Services"
        scrollHint="Scroll"
        startWidth={78}
        startHeight={70}
        startRadius={22}
        endRadius={0}
        mediaZoom={1.08}
        scrollDistance={0.58}
        holdDistance={0.08}
        smoothing={0.08}
        overlayScrim={0.38}
        useWindowScroll
      >
        <div className="home-scroll-hero__content">
          <p className="home-scroll-hero__kicker">Energy, compliance & building performance</p>
          <h2>Technical building services for projects across the UK.</h2>
          <p className="home-scroll-hero__copy">
            Commercial EPCs, SAP, SBEM, Section 63, fire risk assessments and advanced building modelling.
          </p>
          <div className="home-scroll-hero__actions">
            <a className="home-scroll-hero__primary" href="/quote">Request a quote</a>
            <a className="home-scroll-hero__secondary" href="/services">Explore services</a>
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
}
