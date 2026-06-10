import { useState, useRef, useEffect } from 'react'
import { PROJECTS } from '../data/projects'
import { useGlobalReveal } from '../hooks/useGlobalReveal'
import Footer from './Footer'
import UniverseBackground from './UniverseBackground'

export default function Projects({ parallaxOffset, scrollY, featuredOnly = false, setActiveView }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [filter, setFilter] = useState('ALL')
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [isVisible, setIsVisible] = useState(false)

  useGlobalReveal()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Parallax tilt on cards
  useEffect(() => {
    let raf
    const tick = () => {
      if (!parallaxOffset?.current) { raf = requestAnimationFrame(tick); return }
      const { nx, ny } = parallaxOffset.current
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        const depth = 0.3 + (i % 3) * 0.15
        const tx = -nx * 6 * depth
        const ty = -ny * 4 * depth
        el.style.transform = `translate(${tx}px, ${ty}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [parallaxOffset])

  const filtered = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter)
    
  const displayedProjects = featuredOnly ? PROJECTS.slice(0, 3) : filtered

  const filters = [
    { label: 'All Projects', key: 'ALL' },
    { label: 'Scope', key: 'SCOPE' },
    { label: 'Tech', key: 'TECH' },
  ]

  return (
    <section ref={sectionRef} id="projects" className={`projects-section ${featuredOnly ? 'featured-mode' : 'full-mode'}`} style={featuredOnly ? { background: 'transparent' } : {}}>
      {!featuredOnly && (
        <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <UniverseBackground parallaxOffset={parallaxOffset} scrollY={scrollY} />
        </div>
      )}
      {!featuredOnly && <div className="projects-bg-glow" />}

      <div className="projects-container">
        {/* Section header */}
        <div className={`projects-header ${isVisible ? 'visible' : ''}`}>
          <span className="projects-eyebrow" style={{ letterSpacing: featuredOnly ? '0.2em' : 'normal' }}>
            {featuredOnly ? (
              <><span style={{color:'#22d3ee'}}>●</span> &nbsp; FEATURED WORK</>
            ) : (
              "✦ &nbsp; PORTFOLIO &nbsp; ✦"
            )}
          </span>
          <h2 className="projects-title">
            {featuredOnly ? "Projects" : <>Selected <span>Works</span></>}
          </h2>
          {!featuredOnly && (
            <p className="projects-subtitle">
              A curated collection of projects that showcase my expertise in
              full-stack development, AI/ML, and building products that matter.
            </p>
          )}
        </div>

        {/* Filter pills */}
        {!featuredOnly && (
          <div className={`projects-filters ${isVisible ? 'visible' : ''}`}>
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`filter-pill ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                <span className="filter-dot" />
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Projects grid */}
        <div className="projects-grid">
          {displayedProjects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className={`project-card ${isVisible ? 'visible' : ''} reveal reveal-delay-${i % 5}`}
              style={{
                '--card-color': project.color,
                '--card-delay': `${i * 0.12}s`,
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {featuredOnly ? (
                <>
                  <div className="card-top-line" style={{ background: project.color, width: '32px', height: '2px', marginBottom: '20px' }}></div>
                  <h3 className="card-title" style={{ fontSize: '1.4rem', marginBottom: '16px' }}>{project.title}</h3>
                  <p className="card-desc" style={{ fontSize: '0.9rem', marginBottom: '24px', flexGrow: 1, color: '#d1d5db', lineHeight: 1.6 }}>{project.description}</p>
                  <div className="card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="card-tag" style={{ border: `1px solid ${project.color}33`, color: project.color, background: 'transparent' }}>{tag}</span>
                    ))}
                  </div>
                  <div className="card-shine" />
                </>
              ) : (
                <>
                  {/* Top glow bar */}
                  <div className="card-glow-bar" />

                  {/* Project Image */}
                  {project.image && (
                    <div className="card-image-wrap">
                      <img src={project.image} alt={project.title} className="card-image" />
                    </div>
                  )}

                  {/* Card header with emoji & category */}
                  <div className="card-top">
                    <div className="card-emoji-wrap">
                      <span className="card-emoji">{project.emoji}</span>
                    </div>
                    <div className="card-badges">
                      <span className="card-category">{project.category}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-subtitle">{project.subtitle}</p>

                  {/* Description */}
                  <p className="card-desc">{project.description}</p>

                  {/* Impact highlight */}
                  <div className="card-impact">
                    <span className="impact-icon">⚡</span>
                    {project.impact}
                  </div>

                  {/* Tech stack tags */}
                  <div className="card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="card-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="card-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6" />
                          <polyline points="8 6 2 12 8 18" />
                        </svg>
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-link card-link-live"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live
                      </a>
                    )}
                  </div>

                  {/* Hover shine effect */}
                  <div className="card-shine" />
                </>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        {featuredOnly && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '56px' }}>
            <button
              type="button"
              className="btn-persona-wrap"
              onClick={() => { if(setActiveView) { setActiveView('projects'); window.scrollTo(0,0); } }}
            >
              <span className="btn-persona-inner" style={{ padding: '10px 28px', fontSize: '0.9rem' }}>
                View All Projects <span className="arrow">→</span>
              </span>
            </button>
          </div>
        )}
      </div>
      {!featuredOnly && <Footer />}
    </section>
  )
}
