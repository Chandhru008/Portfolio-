import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechnicalExpertise from './components/TechnicalExpertise'
import Projects from './components/Projects'
import About from './components/About'
import ReachOut from './components/ReachOut'
import Persona from './components/Persona'
import Credentials from './components/Credentials'
import CustomCursor from './components/CustomCursor'
import UniverseBackground from './components/UniverseBackground'
import { usePointerParallax } from './hooks/usePointerParallax'
import { useScrollParallax } from './hooks/useScrollParallax'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function App() {
  const parallaxOffset = usePointerParallax()
  const scrollY = useScrollParallax()
  const [activeView, setActiveView] = useState('main')

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    window.lenis = lenis

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  // Scroll to top when view changes
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }, 10)
  }, [activeView])

  return (
    <div className="portfolio-app">
      <Navbar fixed activeView={activeView} setActiveView={setActiveView} />
      {activeView === 'expertise' && <TechnicalExpertise parallaxOffset={parallaxOffset} scrollY={scrollY} />}
      {activeView === 'projects' && <Projects parallaxOffset={parallaxOffset} scrollY={scrollY} />}
      {activeView === 'persona' && <Persona parallaxOffset={parallaxOffset} scrollY={scrollY} />}
      {activeView === 'certificates' && <Credentials parallaxOffset={parallaxOffset} scrollY={scrollY} />}
      {activeView === 'main' && (
        <>
<div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
            <UniverseBackground parallaxOffset={parallaxOffset} scrollY={scrollY} />
          </div>
          <Hero parallaxOffset={parallaxOffset} scrollY={scrollY} />
          <Projects featuredOnly setActiveView={setActiveView} parallaxOffset={parallaxOffset} scrollY={scrollY} />
          <About parallaxOffset={parallaxOffset} scrollY={scrollY} setActiveView={setActiveView} />
          <ReachOut />
        </>
      )}
      <CustomCursor />
    </div>
  )
}
