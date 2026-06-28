import { useState, useRef, useEffect } from 'react'
import { useGlobalReveal } from '../hooks/useGlobalReveal'
import UniverseBackground from './UniverseBackground'
import Footer from './Footer'

export default function Persona({ parallaxOffset, scrollY }) {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState('about')
  
  useGlobalReveal();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <section ref={sectionRef} className="persona-section">
      <UniverseBackground parallaxOffset={parallaxOffset} scrollY={scrollY} />
      
      <div className="persona-container">
        <div className="persona-header reveal">
          <span className="persona-eyebrow">WHO I AM</span>
          <h1 className="persona-title">Persona</h1>
        </div>

        <div className="persona-grid-main">
          {/* Left Column - Intro */}
          <div className="persona-intro reveal reveal-left">
            <h2>Hi, I'm Chandhru</h2>
            <p>
              Fourth-year <span className="highlight-cyan">Computer Engineering</span> undergraduate with a strong focus on AI/ML and full-stack development. I build at the intersection of scalable backend engineering and applied ML.
            </p>
            <p>
              Experienced with the full model pipeline from data preprocessing to deployment, and proficient in building robust React/Node.js web applications.
            </p>
            
            <div className="persona-tags">
              <span className="p-tag">Mumbai, India</span>
              <span className="p-tag">SIES · 2027</span>
            </div>
          </div>

          {/* Right Column - Education */}
          <div className="persona-edu">
            <h3 className="edu-title reveal">Education</h3>
            
            <div className="edu-timeline">
              {/* Item 1 */}
              <div className="edu-timeline-item reveal reveal-up">
                <div className="edu-timeline-dot"></div>
                <div className="edu-card">
                  <div className="edu-icon-wrap">
                    <span className="edu-icon">SIES</span>
                  </div>
                  <div className="edu-content">
                    <div className="edu-header">
                      <h4>SIES Graduate School of Technology</h4>
                    </div>
                    <p className="edu-degree">Bachelors of Engineering in Computer Engineering</p>
                    <p className="edu-year">2023 – 2027</p>
                    <div className="edu-stats">
                      <span>Mumbai, India</span>
                      <span className="edu-badge">4th year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="edu-timeline-item reveal reveal-up reveal-delay-1">
<div className="edu-timeline-dot" style={{ top: '20px' }}></div>
                <div className="edu-card edu-card-small">
                  <div className="edu-content">
                    <div className="edu-header">
                      <h4>SIES College of Arts, Science and Commerce</h4>
                    </div>
                    <p className="edu-degree">Higher Secondary Certificate (HSC) – Science</p>
                    <p className="edu-year">2021 – 2023</p>
                    <div className="edu-stats">
                      <span>Mumbai, India</span>
                      <span className="edu-badge highlight-text">64.67%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="edu-timeline-item reveal reveal-up reveal-delay-2">
<div className="edu-timeline-dot" style={{ top: '20px' }}></div>
                <div className="edu-card edu-card-small">
                  <div className="edu-content">
                    <div className="edu-header">
                      <h4>Little Angel's High School</h4>
                    </div>
                    <p className="edu-degree">Secondary School Certificate (SSC)</p>
                    <p className="edu-year">2021</p>
                    <div className="edu-stats">
                      <span>Mumbai, India</span>
                      <span className="edu-badge highlight-text">81.60%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-bubble p-bubble-1"></div>
            <div className="glass-bubble p-bubble-2"></div>
          </div>
        </div>

        {/* Bottom Socials */}
<div className="find-me-section reveal" style={{ marginTop: '80px' }}>
<h3 className="edu-title" style={{ marginBottom: '32px' }}>Find me on</h3>
          <div className="persona-stats-grid social-grid">
            <a href="https://x.com/CKusalavan42473" className="social-card reveal reveal-scale" target="_blank" rel="noopener noreferrer">
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" color="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <span className="social-title">X</span>
              <span className="social-handle">@CKusalavan42473</span>
            </a>
            <a href="https://www.linkedin.com/in/chandhrukusalavan/" className="social-card reveal reveal-scale reveal-delay-1" target="_blank" rel="noopener noreferrer">
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <span className="social-title">LinkedIn</span>
              <span className="social-handle">@chandhrukusalavan</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100010058851292" className="social-card reveal reveal-scale reveal-delay-2" target="_blank" rel="noopener noreferrer">
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="social-title">Facebook</span>
              <span className="social-handle">Chandhru Kusalavan</span>
            </a>
            <a href="https://github.com/Chandhru008" className="social-card reveal reveal-scale reveal-delay-3" target="_blank" rel="noopener noreferrer">
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <span className="social-title">GitHub</span>
              <span className="social-handle">@Chandhru008</span>
            </a>
            <a href="mailto:chandhrukusalavan1234@gmail.com" className="social-card reveal reveal-scale reveal-delay-4" target="_blank" rel="noopener noreferrer">
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ea4335"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              </div>
              <span className="social-title">Gmail</span>
              <span className="social-handle">chandhrukusalavan1234</span>
            </a>
            <a href="https://leetcode.com/Chandhru008/" className="social-card reveal reveal-scale reveal-delay-5" target="_blank" rel="noopener noreferrer">
              <div className="social-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffa116"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.298 5.253 5.253 0 0 0 1.053 2.222 5.228 5.228 0 0 0 2.113 1.543 5.357 5.357 0 0 0 2.502.269 5.346 5.346 0 0 0 2.238-.85l2.454-1.748a1.374 1.374 0 0 0 .524-1.077 1.374 1.374 0 0 0-.344-1.127 1.374 1.374 0 0 0-1.085-.436 1.374 1.374 0 0 0-1.086.42l-2.454 1.748a2.64 2.64 0 0 1-1.116.425 2.651 2.651 0 0 1-1.237-.133 2.585 2.585 0 0 1-1.047-.76 2.607 2.607 0 0 1-.52-1.096 2.646 2.646 0 0 1 .063-1.14 2.607 2.607 0 0 1 .596-1.044l3.854-4.126 4.316-4.646a1.374 1.374 0 0 0 .344-1.127 1.374 1.374 0 0 0-.524-1.077 1.374 1.374 0 0 0-1.086-.436zM22.062 13.916a1.374 1.374 0 0 0-1.086.42l-5.744 5.922a1.374 1.374 0 0 0-.344 1.127 1.374 1.374 0 0 0 .524 1.077 1.374 1.374 0 0 0 1.085.436 1.374 1.374 0 0 0 1.086-.42l5.744-5.922a1.374 1.374 0 0 0 .344-1.127 1.374 1.374 0 0 0-.524-1.077 1.374 1.374 0 0 0-1.085-.436z"/></svg>
              </div>
              <span className="social-title">LeetCode</span>
              <span className="social-handle">@Chandhru008</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
