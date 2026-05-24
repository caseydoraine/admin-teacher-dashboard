import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import RoleSection from '../components/RoleSection'
import './HomePage.css'
import heroImage from '../assets/hero.png'

const ROLE_DATA = [
  {
    id: 'admin',
    title: 'Command Center for Admins',
    subtitle: 'Full oversight of the BatangAware ecosystem.',
    features: [
      { icon: '👥', title: 'User Management', description: 'Create and manage accounts for students, teachers, and parents.' },
      { icon: '📊', title: 'Real-time Analytics', description: 'Monitor platform-wide engagement and game metrics.' },
      { icon: '🏫', title: 'Class Orchestration', description: 'Organize student groups and assign educational leaders.' }
    ]
  },
  {
    id: 'teacher',
    title: 'Empowerment for Teachers',
    subtitle: 'Tools to guide learning through play.',
    features: [
      { icon: '🎮', title: 'Host Game Lobbies', description: 'Launch and manage social deduction sessions effortlessly.' },
      { icon: '📈', title: 'Progress Tracking', description: 'Analyze student performance and social interaction patterns.' },
      { icon: '💬', title: 'Class Communication', description: 'Stay connected with students and their guardians.' }
    ],
    reverse: true
  },
  {
    id: 'parent',
    title: 'Insights for Parents',
    subtitle: 'Stay involved in your child\'s development.',
    features: [
      { icon: '🧿', title: 'Child Monitoring', description: 'View activity summaries and game-based learning outcomes.' },
      { icon: '📧', title: 'Direct Messaging', description: 'Secure communication channel with classroom teachers.' },
      { icon: '🏆', title: 'Achievement Records', description: 'Celebrate your child\'s milestones and social growth.' }
    ]
  }
]

function HomePage() {
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-layout login-page-bg">
      <div className="retro-grid" aria-hidden="true" />
      <div className="floating-particles" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ '--index': i }} />
        ))}
      </div>

      <nav className="home-nav">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <img src="/batangaware-logo.png" alt="BatangAware" className="nav-logo" />
            <span className="neon-text">BatangAware</span>
          </Link>
          <div className="nav-links">
            <a href="#download" className="nav-link">Download</a>
            <Link to="/login" className="btn btn-secondary btn-small">Login</Link>
          </div>
        </div>
      </nav>

      <main className="home-hero">
        <div className="hero-content animate-in">
          <div className="hero-image-container cyber-card">
            <img src={heroImage} alt="BatangAware Game" className="hero-image" />
            <div className="hero-overlay">
              <h2 className="hero-title neon-text glitch-hover">Ready to Play?</h2>
              <p className="hero-subtitle">Experience the ultimate social deduction game.</p>
              <button id="download" className="btn btn-primary btn-large glow-cta">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </main>

      <section className="home-roles">
        {ROLE_DATA.map((role, idx) => (
          <div 
            key={role.id} 
            ref={el => sectionRefs.current[idx] = el} 
            className="reveal-section"
          >
            <RoleSection {...role} />
          </div>
        ))}
      </section>

      <footer className="home-footer">
        <p>&copy; 2026 BatangAware. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
