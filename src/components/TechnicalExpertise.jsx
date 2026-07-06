import { useRef, useState } from 'react'
import { CATEGORIES } from '../data/categories'
import { GLOBE_SKILLS } from '../data/globeSkills'
import { useGlobalReveal } from '../hooks/useGlobalReveal'
import GlobeScene from './GlobeScene'
import StarsBackground from './StarsBackground'
import Footer from './Footer'

export default function TechnicalExpertise({ parallaxOffset, scrollY }) {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIdx, setActiveIdx] = useState(0)
  const [panelCollapsed, setPanelCollapsed] = useState(false)

  useGlobalReveal()

  const cat = CATEGORIES[activeIdx]
  const [localScroll, setLocalScroll] = useState(0)

  const handleScroll = (e) => {
    setLocalScroll(e.target.scrollTop)
  }

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="expertise-section"
      onScroll={handleScroll}
      data-lenis-prevent
    >
      <div
        className="expertise-heading"
        style={{ transform: `translateX(-50%) translateY(${localScroll * 0.4}px)` }}
      >
        <span className="sub">EXPERTISE</span>
        <h2 className="main">
          Technical Expertise
        </h2>
      </div>

<div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transform: `translateY(${localScroll * 0.5}px)` }}>
        <StarsBackground />
      </div>

      <GlobeScene
        sectionRef={sectionRef}
        cardRefs={cardRefs}
        parallaxOffset={parallaxOffset}
      />

      {GLOBE_SKILLS.map((skill, i) => (
        <div
          key={skill.name}
          ref={(el) => { cardRefs.current[i] = el }}
          className="globe-card reveal"
          style={{ '--ic': skill.ic }}
        >
          <div
            className="gc-icon"
            dangerouslySetInnerHTML={{ __html: skill.iconHtml }}
          />
          <span className="gc-label">{skill.name}</span>
        </div>
      ))}

      <div className="skills-panel">
        <nav className="tab-nav">
          {CATEGORIES.map((c, i) => (
<button
              key={c.label}
              type="button"
              className={`tab-btn ${i === activeIdx ? 'active' : ''}`}
              style={{ '--tc': c.color }}
              onClick={() => setActiveIdx(i)}
            >
              <span className="tab-dot" />
              {c.label}
</button>
          ))}
        </nav>
        <div className="cat-card">
          <div className="cat-header">
            <div className="cat-left">
              <div
                className="cat-indicator"
                style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
              />
              <div className="cat-title-wrap">
                <h3 className="cat-title">{cat.label}</h3>
                <p className="cat-desc">{cat.desc}</p>
              </div>
            </div>
            <span
              className="cat-count"
              style={{
                color: cat.color,
                borderColor: `${cat.color}55`,
              }}
            >
              {cat.skills.length} skills
            </span>
          </div>
          <div className="skill-pills">
            {cat.skills.map((skill) => {
              const globeItem = GLOBE_SKILLS.find(s => s.name === skill)
              return (
<span key={skill} className="skill-pill" style={{ '--pd': cat.color }}>
                  {globeItem && globeItem.iconHtml && (
<div className="sp-icon" dangerouslySetInnerHTML={{ __html: globeItem.iconHtml }} style={{ color: globeItem.ic }} />
                  )}
                  {skill}
                </span>
              )
            })}
          </div>
        </div>
      </div>
      <Footer className="expertise-footer" />
    </section>
  )
}
