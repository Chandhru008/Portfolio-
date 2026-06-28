import { useEffect, useRef } from 'react'
import StarsBackground from './StarsBackground'

export default function UniverseBackground({ parallaxOffset, scrollY }) {
  const nebulaRefs = useRef([])
  const orbitRefs = useRef([])
  const starsRef = useRef(null)

  useEffect(() => {
    let raf
    const tick = () => {
      if (!parallaxOffset?.current) { raf = requestAnimationFrame(tick); return }
      const { nx, ny } = parallaxOffset.current
      const sy = window.scrollY || 0

      nebulaRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = (i + 1) / (nebulaRefs.current.length + 1)
        const tx = -nx * 16 * depth
        const ty = -ny * 10 * depth + (sy * 0.5 * depth)
        el.style.translate = `${tx}px ${ty}px`
      })
      orbitRefs.current.forEach((el, i) => {
        if (!el) return
        const depth = (i + 1) / (orbitRefs.current.length + 1)
        const tx = -nx * 10 * depth
        const ty = -ny * 6 * depth + (sy * 0.35 * depth)
        el.style.translate = `${tx}px ${ty}px`
      })
      if (starsRef.current) {
        starsRef.current.style.translate = `${-nx * 28}px ${-ny * 18 + sy * 0.25}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [parallaxOffset])

  return (
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="nebula nebula-4" ref={(el) => { nebulaRefs.current[0] = el }} />
      <div className="nebula nebula-3" ref={(el) => { nebulaRefs.current[1] = el }} />
      <div className="nebula nebula-2" ref={(el) => { nebulaRefs.current[2] = el }} />
      <div className="nebula nebula-core" ref={(el) => { nebulaRefs.current[3] = el }} />

      <div className="orbit orbit-solid o1" ref={(el) => { orbitRefs.current[0] = el }} />

      <div className="orbit orbit-dashed o2" ref={(el) => { orbitRefs.current[1] = el }}>
<div className="icon-pin" style={{ top: '-36px' }}>
<div className="icon-box" style={{ background: 'rgba(0, 217, 255, 0.12)', border: '1px solid rgba(0, 217, 255, 0.35)', boxShadow: '0 0 20px rgba(0, 217, 255, 0.25)' }}>⚛️</div>
<span className="icon-label" style={{ color: '#67e8f9' }}>React</span>
        </div>
      </div>

      <div className="orbit orbit-solid o3" ref={(el) => { orbitRefs.current[2] = el }}>
<div className="icon-pin" style={{ top: '-36px' }}>
<div className="icon-box" style={{ background: 'rgba(0, 200, 170, 0.12)', border: '1px solid rgba(0, 200, 170, 0.35)', boxShadow: '0 0 20px rgba(0, 200, 170, 0.25)' }}>🔗</div>
          <span className="icon-label">LangChain</span>
        </div>
        <div className="icon-pin icon-pin-bottom">
<div className="icon-box" style={{ background: 'rgba(255, 255, 255, 0.07)', border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)', fontWeight: 800, color: '#fff', fontSize: '18px' }}>N</div>
<span className="icon-label" style={{ color: '#d1d5db' }}>Next.js</span>
        </div>
      </div>

      <div className="orbit orbit-dashed o4" ref={(el) => { orbitRefs.current[3] = el }}>
<div className="icon-pin" style={{ top: '-36px' }}>
<div className="icon-box" style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.35)', boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' }}>🌊</div>
<span className="icon-label" style={{ color: '#22d3ee' }}>Tailwind</span>
        </div>
        <div className="icon-pin icon-pin-bottom">
<div className="icon-box" style={{ background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.35)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)', color: '#93c5fd', fontWeight: 800, fontSize: '16px' }}>TS</div>
<span className="icon-label" style={{ color: '#93c5fd' }}>TypeScript</span>
        </div>
      </div>

      <div className="orbit orbit-solid o5" ref={(el) => { orbitRefs.current[4] = el }}>
        <div className="orbit-icon orbit-icon-left">
<div className="icon-box" style={{ background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.35)', boxShadow: '0 0 20px rgba(34, 197, 94, 0.2)' }}>🟢</div>
<span className="icon-label" style={{ color: '#86efac' }}>Node.js</span>
        </div>
        <div className="orbit-icon orbit-icon-bl">
<div className="icon-box" style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>⚡</div>
<span className="icon-label" style={{ color: '#6ee7b7' }}>FastAPI</span>
        </div>
        <div className="orbit-icon orbit-icon-bottom">
<div className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)' }}>🔴</div>
<span className="icon-label" style={{ color: '#fca5a5' }}>Git</span>
        </div>
        <div className="orbit-icon orbit-icon-br">
<div className="icon-box" style={{ background: 'rgba(14, 165, 233, 0.12)', border: '1px solid rgba(14, 165, 233, 0.35)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.2)' }}>🐳</div>
<span className="icon-label" style={{ color: '#7dd3fc' }}>Docker</span>
        </div>
        <div className="orbit-icon orbit-icon-right">
<div className="icon-box" style={{ background: 'rgba(250, 204, 21, 0.12)', border: '1px solid rgba(250, 204, 21, 0.35)', boxShadow: '0 0 20px rgba(250, 204, 21, 0.2)' }}>🐍</div>
<span className="icon-label" style={{ color: '#fde68a' }}>Python</span>
        </div>
      </div>

      <div className="orbit orbit-dashed o6" ref={(el) => { orbitRefs.current[5] = el }} />

<div className="shoot" style={{ top: '8%', left: '10%', '--dur': '7s', '--del': '0s' }} />
<div className="shoot" style={{ top: '20%', left: '60%', '--dur': '9s', '--del': '3s', width: '60px' }} />
<div className="shoot" style={{ top: '65%', left: '5%', '--dur': '11s', '--del': '1.5s', width: '80px' }} />

      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        <StarsBackground />
      </div>
    </div>
  )
}
