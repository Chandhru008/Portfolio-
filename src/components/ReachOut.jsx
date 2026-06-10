import { useRef } from 'react'
import { useGlobalReveal } from '../hooks/useGlobalReveal'
import Footer from './Footer'

export default function ReachOut() {
  const sectionRef = useRef(null)
  useGlobalReveal()

  return (
    <section id="reach-out" ref={sectionRef} className="reachout-section" style={{ background: 'transparent' }}>
      <div className="reachout-container">
        <div className="reachout-header">
          <p className="reachout-eyebrow">SKILLS · WORKFLOW · IDENTITY</p>
          <h2 className="reachout-title">Reach Out</h2>
        </div>

        <div className="reachout-card">
          {/* Top Section - Workflow */}
          <div className="reachout-workflow">
            <span className="ro-label">WORKFLOW</span>
            
            <h2 className="workflow-title reveal">My Workflow</h2>
            <div className="workflow-track">
              <div className="workflow-line reveal"></div>
              
              <div className="workflow-nodes">
                {/* Node: IDEA */}
                <div className="wf-node wf-idea reveal">
                  <div className="wf-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21h6M12 21v-4M12 17a5 5 0 10-5-5 5.006 5.006 0 003.5 4.8"/></svg>
                  </div>
                  <span className="wf-label">IDEA</span>
                </div>

                {/* Node: PLAN */}
                <div className="wf-node wf-plan reveal reveal-delay-1">
                  <div className="wf-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1zM9 12h6M9 16h6"/></svg>
                  </div>
                  <span className="wf-label">PLAN</span>
                </div>

                {/* Node: AI HELP */}
                <div className="wf-node wf-ai reveal reveal-delay-2">
                  <div className="wf-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4c-3 0-5 2-5 5v1a5 5 0 00-3 2 5 5 0 003 8h10a5 5 0 003-8 5 5 0 00-3-2v-1c0-3-2-5-5-5z"/></svg>
                  </div>
                  <span className="wf-label">AI HELP</span>
                </div>

                {/* Node: CODE (Active/Center) */}
                <div className="wf-node wf-code active reveal reveal-delay-3">
                  <div className="wf-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  </div>
                  <span className="wf-label">CODE</span>
                  <div className="wf-glow-under"></div>
                </div>

                {/* Node: REVIEW */}
                <div className="wf-node wf-review reveal reveal-delay-4">
                  <div className="wf-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                  </div>
                  <span className="wf-label">REVIEW</span>
                </div>

                {/* Node: TEST */}
                <div className="wf-node wf-test reveal reveal-delay-5">
                  <div className="wf-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M10 3v9l-5 9h14l-5-9V3"/></svg>
                  </div>
                  <span className="wf-label">TEST</span>
                </div>

                {/* Node: LEARN */}
                <div className="wf-node wf-learn reveal reveal-delay-5">
                  <div className="wf-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V4H6.5A2.5 2.5 0 004 6.5v13z"/></svg>
                  </div>
                  <span className="wf-label">LEARN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ro-divider"></div>

          {/* Bottom Section - Hit Me Up */}
          <div className="reachout-hitmeup">
            <span className="ro-label">HIT ME UP</span>
            <div className="ro-buttons">
              <a href="mailto:chandhrukusalavan1234@gmail.com" className="ro-btn btn-mail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                Mail
              </a>
              <a href="https://github.com/Chandhru008" target="_blank" rel="noopener noreferrer" className="ro-btn btn-github">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/chandhrukusalavan/" target="_blank" rel="noopener noreferrer" className="ro-btn btn-linkedin">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
