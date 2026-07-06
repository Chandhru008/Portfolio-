import { useState, useEffect } from 'react'
import { useGlobalReveal } from '../hooks/useGlobalReveal'
import UniverseBackground from './UniverseBackground'
import Footer from './Footer'

const certificates = [
  {
    id: 1,
    title: "Machine Learning with Python",
    org: "IBM",
    date: "Dec 2, 2025",
    tags: ["PYTHON", "MACHINE LEARNING", "AI"],
    category: "IBM",
    color: "#22c55e", // Green
    description: "Successfully completed the Machine Learning with Python course, demonstrating proficiency in classification, regression, clustering, and sci-kit learn.",
    certId: "IBM-ML-001",
    pdfUrl: "/certificates/Course 8 - Machine learning with python.pdf"
  },
  {
    id: 2,
    title: "Data Analysis with Python",
    org: "IBM",
    date: "Oct 26, 2025",
    tags: ["PYTHON", "DATA ANALYSIS", "PANDAS"],
    category: "IBM",
    color: "#3b82f6", // Blue
    description: "Completed training on data analysis techniques using Python, covering Pandas, Numpy, and data visualization using Matplotlib and Seaborn.",
    certId: "IBM-DA-002",
    pdfUrl: "/certificates/Coursera 7- Data Analysis with Python.pdf"
  },
  {
    id: 3,
    title: "Python for Data Science, AI & Development",
    org: "IBM",
    date: "Jul 22, 2025",
    tags: ["PYTHON", "DATA SCIENCE", "AI"],
    category: "IBM",
    color: "#f59e0b", // Yellow
    description: "Mastered Python programming fundamentals, data structures, and foundational AI concepts tailored for data science development.",
    certId: "IBM-PY-003",
    pdfUrl: "/certificates/Coursera 4- Python for Data Science , AI and Development.pdf"
  },
  {
    id: 4,
    title: "Prompt Engineering Basics",
    org: "IBM",
    date: "Jun 27, 2025",
    tags: ["GEN AI", "PROMPT ENGINEERING"],
    category: "IBM",
    color: "#a855f7", // Purple
    description: "Acquired fundamental skills in designing, testing, and refining prompts to effectively communicate with Large Language Models (LLMs).",
    certId: "IBM-PE-004",
    pdfUrl: "/certificates/Coursera 3- Prompt Engineering Basics.pdf"
  },
  {
    id: 5,
    title: "Introduction and Applications",
    org: "IBM",
    date: "Jun 24, 2025",
    tags: ["GEN AI", "APPLICATIONS"],
    category: "IBM",
    color: "#ec4899", // Pink
    description: "Explored the introductory concepts and real-world applications of modern AI and Generative AI technologies.",
    certId: "IBM-IA-005",
    pdfUrl: "/certificates/Coursera 2- Introduction and Applications.pdf"
  },
  {
    id: 6,
    title: "Introduction to GenAI",
    org: "IBM",
    date: "Jun 23, 2025",
    tags: ["GEN AI", "BASICS"],
    category: "IBM",
    color: "#06b6d4", // Cyan
    description: "Gained a comprehensive introduction to Generative AI, its underlying models, use cases, and ethical considerations.",
    certId: "IBM-GA-006",
    pdfUrl: "/certificates/Coursera 1- Introducton to GenAI.pdf"
  },
  {
    id: 7,
    title: "Web Engineering",
    org: "Selfmade ninja academy",
    date: "Aug 2024",
    tags: ["WEB DEV", "ENGINEERING", "FULLSTACK"],
    category: "Selfmade ninja academy",
    color: "#ef4444", // Red
    description: "Completed comprehensive training in Web Engineering, covering modern full-stack development practices.",
    certId: "SNA-WE-001",
    pdfUrl: "/certificates/Web Engineering.jpeg"
  },
  {
    id: 8,
    title: "LAHTP Legacy",
    org: "Selfmade ninja academy",
    date: "Jul 2024",
    tags: ["CYBERSECURITY", "PENETRATION TESTING", "HACKING"],
    category: "Selfmade ninja academy",
    color: "#10b981", // Emerald
    description: "Successfully mastered Learn Application Hacking and Penetration Testing (LAHTP), focusing on advanced cybersecurity concepts.",
    certId: "SNA-LAHTP-002",
    pdfUrl: "/certificates/LAHTP LEGACY.jpeg"
  },
  {
    id: 9,
    title: "Atlas Hackathon",
    org: "Hackathon",
    date: "2026",
    tags: ["HACKATHON", "PARTICIPATION", "COMPETITION"],
    category: "Hackathons",
    color: "#f59e0b",
    description: "Successfully participated in the Atlas hackathon, demonstrating problem-solving and rapid development skills.",
    certId: "HACK-ATLAS",
    pdfUrl: "/certificates/hackathon/Atlas.jpeg"
  },
  {
    id: 10,
    title: "Hackarena 2.0 Zonals",
    org: "Hackathon",
    date: "2026",
    tags: ["HACKATHON", "ZONALS", "COMPETITION"],
    category: "Hackathons",
    color: "#3b82f6",
    description: "Qualified and competed in the Hackarena 2.0 Zonals hackathon.",
    certId: "HACK-ARENA",
    pdfUrl: "/certificates/hackathon/Hackarena 2.0 zonals.jpeg"
  },
  {
    id: 11,
    title: "Innovation Hackathon",
    org: "Hackathon",
    date: "2026",
    tags: ["HACKATHON", "INNOVATION"],
    category: "Hackathons",
    color: "#10b981",
    description: "Participated in the Innovation Hackathon, focusing on building creative technical solutions.",
    certId: "HACK-INNOV",
    pdfUrl: "/certificates/hackathon/Innovation.jpeg"
  },
  {
    id: 12,
    title: "Suprathon",
    org: "Hackathon",
    date: "2025",
    tags: ["HACKATHON", "SUPRATHON"],
    category: "Hackathons",
    color: "#8b5cf6",
    description: "Competed in the Suprathon hackathon event.",
    certId: "HACK-SUPRA",
    pdfUrl: "/certificates/hackathon/Suprathon.png"
  },
  {
    id: 13,
    title: "Terna Spot The Bug",
    org: "Hackathon",
    date: "2026",
    tags: ["DEBUGGING", "COMPETITION"],
    category: "Hackathons",
    color: "#ef4444",
    description: "Participated in Terna's Spot the Bug coding and debugging competition.",
    certId: "HACK-TERNA",
    pdfUrl: "/certificates/hackathon/Terna-Spot the bug.jpeg"
  }
]

export default function Credentials({ parallaxOffset, scrollY }) {
  const [filter, setFilter] = useState('All')
  const [selectedCert, setSelectedCert] = useState(null)
  
  useGlobalReveal();
  
  const filters = [
    { name: 'All', count: certificates.length },
    { name: 'IBM', count: certificates.filter(c => c.category === 'IBM').length },
    { name: 'Selfmade ninja academy', count: certificates.filter(c => c.category === 'Selfmade ninja academy').length },
    { name: 'Hackathons', count: certificates.filter(c => c.category === 'Hackathons').length }
  ]

  const filteredCerts = filter === 'All' 
    ? certificates 
    : certificates.filter(c => c.category === filter)

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCert) return;
      
      const currentIndex = filteredCerts.findIndex(c => c.id === selectedCert.id);
      
      if (e.key === 'Escape') {
        setSelectedCert(null);
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setSelectedCert(filteredCerts[currentIndex - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < filteredCerts.length - 1) {
          setSelectedCert(filteredCerts[currentIndex + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert, filteredCerts]);

  return (
    <div className="credentials-section">
      <UniverseBackground parallaxOffset={parallaxOffset} scrollY={scrollY} />
      
      <div className="cred-container">
        <p className="cred-eyebrow">ACHIEVEMENTS</p>
        <h1 className="cred-title">My Certificates</h1>
        <p className="cred-subtitle">{certificates.length} certificates • click any entry to expand</p>
        
        <div className="cred-filters">
          {filters.map(f => (
<button aria-label="Submit">
              key={f.name}
              className={`cred-filter-btn ${filter === f.name ? 'active' : ''}`}
              onClick={() => setFilter(f.name)}
            >
              {f.name} <span className="cred-filter-count">{f.count}</span>
<button aria-label='Submit'>Submit</button>
          ))}
        </div>

        <div className="cred-timeline">
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert, index) => (
<button key={cert.id} className={`cred-item reveal reveal-delay-${index % 5}`} onClick={() => setSelectedCert(cert)}>
<div className="cred-dot" style={{ backgroundColor: cert.color, boxShadow: `0 0 10px ${cert.color}80` }}></div>
                <div className="cred-card">
<div className="cred-card-img" style={{ overflow: 'hidden', padding: 0, background: 'transparent' }}>
                    {cert.pdfUrl.endsWith('.pdf') ? (
                      <iframe 
                        src={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
                        style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                        title={`${cert.title} thumbnail`}
                        tabIndex="-1"
                      />
                    ) : (
<img src={cert.pdfUrl} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div className="cred-content">
                    <div className="cred-header">
                      <div>
                        <h3 className="cred-title-text">{cert.title}</h3>
<p className="cred-org" style={{ color: cert.color }}>{cert.org}</p>
                      </div>
                      <span className="cred-date">{cert.date}</span>
                    </div>
                    <div className="cred-tags">
                      {cert.tags.map(tag => (
<span key={tag} className="cred-tag" style={{ color: cert.color, borderColor: `${cert.color}40`, backgroundColor: `${cert.color}15` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cred-empty">
              <p>No credentials found for this category yet.</p>
            </div>
          )}
        </div>
      </div>
      {/* MODAL */}
      {selectedCert && (
<button className="cert-modal-overlay" onClick={() => setSelectedCert(null)} aria-label="Close certificate modal"></button>
          <div 
            className="cert-modal-content" 
            style={{ borderColor: `${selectedCert.color}50` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-body">
              <div className="cert-modal-left">
                <div className="cert-modal-preview">
                  {selectedCert.pdfUrl.endsWith('.pdf') ? (
                    <iframe 
                      src={`${selectedCert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                      className="cert-iframe" 
                      title={selectedCert.title}
                    />
                  ) : (
<img src={selectedCert.pdfUrl} alt={selectedCert.title} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                  )}
                </div>
              </div>
              
              <div className="cert-modal-right">
<button className="cert-modal-close" aria-label="Close certificate" onClick={() => setSelectedCert(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
<button aria-label='Submit'>Submit</button>
                
                <div className="cm-tags">
                  {selectedCert.tags.map(tag => (
                    <span key={tag} className="cm-tag">{tag}</span>
                  ))}
                </div>
                
                <h2 className="cm-title">{selectedCert.title}</h2>
                <p className="cm-org-date">
<span style={{ color: selectedCert.color }}>{selectedCert.org}</span> — {selectedCert.date}
                </p>
                
                <p className="cm-desc">{selectedCert.description}</p>
                
                <div className="cm-actions">
                  <div className="cm-id">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    {selectedCert.certId}
                  </div>
<button aria-label='Submit'>
                    className="cm-verify" 
                    style={{ color: selectedCert.color, borderColor: selectedCert.color }}
                    onClick={() => window.open(selectedCert.pdfUrl, '_blank')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                    Verify
<button aria-label='Submit'>Submit</button>
                </div>
              </div>
            </div>
            
            <div className="cert-modal-footer">
<button aria-label='Submit'>
                className="cm-nav-btn" 
                disabled={filteredCerts.findIndex(c => c.id === selectedCert.id) === 0}
                onClick={() => setSelectedCert(filteredCerts[filteredCerts.findIndex(c => c.id === selectedCert.id) - 1])}
              >
                &lt; Previous
<button aria-label='Submit'>Submit</button>
              <div className="cm-nav-info">
                {filteredCerts.findIndex(c => c.id === selectedCert.id) + 1} / {filteredCerts.length} • &larr; &rarr; • Esc
              </div>
<button aria-label="Submit">
                className="cm-nav-btn"
                style={{ color: selectedCert.color }}
                disabled={filteredCerts.findIndex(c => c.id === selectedCert.id) === filteredCerts.length - 1}
                onClick={() => setSelectedCert(filteredCerts[filteredCerts.findIndex(c => c.id === selectedCert.id) + 1])}
              >
                Next &gt;
</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
