import ScrollExpand from './ScrollExpand/ScrollExpand';
import './HomeScrollHero.css';

export default function HomeScrollHero() {
  return (
    <section className="home-scroll-hero" aria-label="Scottish Energy Services">
      <ScrollExpand
        src="/videos/hero-background.mp4"
        mediaType="video"
        title={
          <span className="home-scroll-hero__logo" role="img" aria-label="Scottish Energy Services">
            <img className="home-scroll-hero__logo-wordmark" src="/images/ses-logo-horizontal.png" alt="" width="1815" height="226" aria-hidden="true" />
            <img className="home-scroll-hero__logo-mark" src="/images/ses-logo-horizontal.png" alt="" width="1815" height="226" aria-hidden="true" />
          </span>
        }
        scrollHint="Scroll"
        startWidth={78}
        startHeight={70}
        startRadius={22}
        endRadius={0}
        mediaZoom={1.08}
        scrollDistance={0.377}
        holdDistance={0.08}
        smoothing={0.08}
        overlayScrim={0.38}
        useWindowScroll
      >
        <div className="home-scroll-hero__content">
          <h2>Energy assessments and building compliance.</h2>
          <p className="home-scroll-hero__copy">
            SAP, SBEM, EPCs, fire risk assessments and modelling for property and design teams, with reports within 48 hours of our site visit.
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
