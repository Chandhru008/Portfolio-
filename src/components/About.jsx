import { useRef } from 'react'

export default function About({ parallaxOffset, scrollY, setActiveView }) {
  const sectionRef = useRef(null)

  return (
<section id="about" ref={sectionRef} className="about-section" style={{ background: 'transparent' }}>
      <div className="about-container">
        <div className="about-heading-wrap">
          <p className="about-eyebrow">W H O  I  A M</p>
          <h2 className="about-title">About Me</h2>
        </div>

        <div className="about-grid-top">
          {/* Location Card */}
          <div className="about-card card-location">
<div className="card-bg-image" style={{ backgroundImage: 'url("/assets/mumbai_taj_hotel.png")' }}></div>
            <div className="card-bg-gradient"></div>
            <div className="card-content">
              <div className="card-header">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className="label">LOCATION · HOVER TO EXPLORE</span>
              </div>
              <h3 className="location-name">INDIA</h3>
              <p className="location-coords">
                25.5941° N, 85.1376° E<br />
                GMT+5:30
              </p>
            </div>
            <div className="glass-bubble bubble-1"></div>
            <div className="glass-bubble bubble-2"></div>
          </div>

          {/* About Text Card */}
          <div className="about-card card-about">
            <div className="card-content">
              <div className="card-header">
                <span className="label">/ ABOUT</span>
              </div>
              <p className="about-desc">
                I'm Chandhru — a CS student, building at the intersection of full-stack systems and machine learning. I care deeply about clean architecture, meaningful products, and open-source collaboration.
              </p>
              <div className="divider"></div>
              <p className="about-quote">
                "Where tradition meets technology."
              </p>
            </div>
          </div>
        </div>

        <div className="about-grid-bottom">
          {/* Growth Card */}
          <div className="about-card card-small card-growth">
            <h4 className="card-small-title">GROWTH</h4>
            <p className="card-small-desc">
              An explorer of systems, driven by curiosity and understanding.
            </p>
          </div>

          {/* Focus Card */}
          <div className="about-card card-small card-focus">
            <h4 className="card-small-title">FOCUS</h4>
            <p className="card-small-desc">
              Deep work on efficiency and precision in every layer built.
            </p>
          </div>

          {/* Craft Card */}
          <div className="about-card card-small card-craft">
            <h4 className="card-small-title">CRAFT</h4>
            <p className="card-small-desc">
              Discipline and dedication in every single line of code.
            </p>
          </div>
        </div>

        <div className="about-cta-wrap">
<button aria-label='Learn More'>Learn More</button>
            type="button" 
            className="btn-persona-wrap"
            onClick={() => { if(setActiveView) { setActiveView('persona'); window.scrollTo(0,0); } }}
          >
            <span className="btn-persona-inner">
              View Persona <span className="arrow">→</span>
            </span>
<button aria-label='Learn More'>Learn More</button>
        </div>
      </div>
    </section>
  )
}
