import { useEffect, useRef, useState } from 'react'

const WORDS = ['DEVELOPER', 'BUILDER', 'STUDENT', 'ENGINEER']

export default function Hero({ parallaxOffset, scrollY }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [wordAnim, setWordAnim] = useState('word-in')
  const [showResumeMenu, setShowResumeMenu] = useState(false)
  const nebulaRefs = useRef([])
  const orbitRefs = useRef([])
  const starsRef = useRef(null)
  const heroContentRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setWordAnim('word-out')
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % WORDS.length)
        setWordAnim('word-in')
      }, 450)
    }, 2500)
    return () => clearInterval(id)
  }, [])



  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.style.transform = `translateY(${scrollY * 0.25}px)`
      heroContentRef.current.style.opacity = Math.max(0, 1 - scrollY / 600)
    }
  }, [scrollY])

  return (
<section id="home" className="hero-scene" style={{ background: 'transparent' }}>
      <div ref={heroContentRef} className="hero-content">
        <p className="hero-eyebrow">HELLO! I&apos;M</p>
        <div className="hero-name-wrap">
          <div className="hero-orb" />
          <h1 className="hero-name">Chandhru Kusalavan</h1>
        </div>
        <p className="hero-subtitle">
          A passionate <span className="text-cyan">Full-Stack</span> &amp; <span className="text-green">ML</span> Developer
        </p>
        <div className="hero-cycle-wrap">
          <h2 className={`hero-cycle-word ${wordAnim}`}>{WORDS[wordIdx]}</h2>
        </div>
        <div className="hero-dots">
          {WORDS.map((_, i) => (
            <div key={i} className={i === wordIdx ? 'hero-dot-active' : 'hero-dot'} />
          ))}
        </div>
        <p className="hero-desc">
          Building intelligent systems at the intersection of{' '}
          <span className="text-cyan-light">full-stack development</span> and{' '}
          <span className="text-green-light">machine learning</span>.
        </p>
        <div className="hero-cta">
<div style={{ position: 'relative', display: 'inline-block' }}>
<button
              type="button" 
              className="glass-btn cta-resume"
              onClick={() => setShowResumeMenu(!showResumeMenu)}
            >
              Resume &amp; CV
</button>
            
            {showResumeMenu && (
<div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(5, 12, 18, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minWidth: '140px',
                zIndex: 100,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
              }}>
                <a 
                  href="/Chandhru_Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-btn"
                  style={{ padding: '10px 16px', fontSize: '0.9rem', textAlign: 'center', width: '100%', justifyContent: 'center' }}
                  onClick={() => setShowResumeMenu(false)}
                >
                  View
                </a>
                <a 
                  href="/Chandhru_Resume.pdf" 
                  download="Chandhru_Resume.pdf"
                  className="glass-btn"
                  style={{ padding: '10px 16px', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(34, 211, 238, 0.1)', borderColor: 'rgba(34, 211, 238, 0.3)', color: '#22d3ee', width: '100%', justifyContent: 'center' }}
                  onClick={() => setShowResumeMenu(false)}
                >
                  Download
                </a>
              </div>
            )}
          </div>
          <button type="button" className="glass-btn cta-source" onClick={() => document.getElementById('reach-out')?.scrollIntoView({ behavior: 'smooth' })}>Contact Me</button>
        </div>
      </div>
    </section>
  )
}
