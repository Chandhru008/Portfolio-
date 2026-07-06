import { useState, useEffect } from 'react'

export default function Navbar({ fixed = false, activeView, setActiveView }) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    if (newTheme) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
  }

  const getMobileLinkClass = (viewName) => {
    const base = "flex items-center gap-3 w-full font-medium px-4 py-3 rounded-xl transition-all text-sm tracking-wide"
    if (activeView === viewName) {
      return `${base} bg-cyan-900/40 text-cyan-400`
    }
    return `${base} text-gray-300 hover:bg-white/5 hover:text-white`
  }

  return (
    <nav
      className={`${fixed ? 'fixed' : 'absolute'} top-3.5 left-1/2 -translate-x-1/2 w-[92%] max-w-[1100px] glass-nav rounded-full px-5 py-2 flex items-center justify-between gap-3 z-[90]`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="brand">chandhru.me</div>
      <div className="hidden md:flex gap-5 links">
        <a href="#home" onClick={(e) => { e.preventDefault(); setActiveView('main'); window.scrollTo(0,0); }}>HOME</a>
        <a href="#expertise" onClick={(e) => { e.preventDefault(); setActiveView('expertise'); }}>EXPERTISE</a>
        <a href="#persona" onClick={(e) => { e.preventDefault(); setActiveView('persona'); window.scrollTo(0,0); }}>PERSONA</a>
        <a href="#certificates" onClick={(e) => { e.preventDefault(); setActiveView('certificates'); window.scrollTo(0,0); }}>CERTIFICATES</a>
        <a href="#projects" onClick={(e) => { e.preventDefault(); setActiveView('projects'); window.scrollTo(0,0); }}>PROJECTS</a>
      </div>
      <div className="flex gap-2.5 actions">
<button aria-label='Navigation Menu'>
          type="button" 
          className="glass-btn nav-btn-secondary"
          onClick={toggleTheme}
        >
          {isDarkMode ? 'DARK' : 'LIGHT'}
</button>
        {/* Hamburger Menu Button */}
<button
          type="button"
          className="glass-btn nav-btn-secondary md:hidden flex flex-col justify-center items-center gap-[4px] w-[40px] h-[40px]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-5 h-[2px] bg-white transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
          <span className={`block w-5 h-[2px] bg-white transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-[2px] bg-white transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
</button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
<div className="absolute top-[120%] left-0 w-full rounded-2xl flex flex-col p-3 gap-1 md:hidden z-[100] shadow-2xl border border-white/5 overflow-hidden" style={{ background: '#13151a', backdropFilter: 'blur(20px)' }}>
          <a href="#home" onClick={(e) => { e.preventDefault(); setActiveView('main'); window.scrollTo(0,0); setIsMobileMenuOpen(false); }} className={getMobileLinkClass('main')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            HOME
          </a>
          
          <a href="#projects" onClick={(e) => { e.preventDefault(); setActiveView('projects'); window.scrollTo(0,0); setIsMobileMenuOpen(false); }} className={getMobileLinkClass('projects')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            PROJECTS
          </a>
          
          <a href="#certificates" onClick={(e) => { e.preventDefault(); setActiveView('certificates'); window.scrollTo(0,0); setIsMobileMenuOpen(false); }} className={getMobileLinkClass('certificates')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            CREDENTIALS
          </a>

          <a href="#expertise" onClick={(e) => { e.preventDefault(); setActiveView('expertise'); setIsMobileMenuOpen(false); }} className={getMobileLinkClass('expertise')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            EXPERTISE
          </a>
          
          <a href="#persona" onClick={(e) => { e.preventDefault(); setActiveView('persona'); window.scrollTo(0,0); setIsMobileMenuOpen(false); }} className={getMobileLinkClass('persona')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            PERSONA
          </a>
        </div>
      )}
    </nav>
  )
}
