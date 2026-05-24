# Expanded Homepage with Role Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the homepage with role-specific sections (Admin, Teacher, Parent) that animate into view as the user scrolls, highlighting key features of the BatangAware ecosystem.

**Architecture:** Use a dedicated `RoleSection` component to display each role's features. Implement scroll-triggered animations using the `Intersection Observer API` and CSS classes for staggered entrances. Maintain the existing retro-cyber aesthetic.

**Tech Stack:** React (Functional Components, Hooks), Vanilla CSS, Intersection Observer API.

---

### Task 1: Create RoleSection Component

**Files:**
- Create: `src/components/RoleSection.jsx`
- Test: `tests/components/RoleSection.test.jsx`

- [ ] **Step 1: Implement RoleSection component**

```jsx
function RoleSection({ title, subtitle, features, reverse = false, id }) {
  return (
    <section id={id} className={`role-section ${reverse ? 'reverse' : ''}`}>
      <div className="role-content">
        <h2 className="role-title neon-text">{title}</h2>
        <p className="role-subtitle">{subtitle}</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card cyber-card" style={{ '--index': index }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="role-visual">
        {/* Placeholder for role-specific visual/illustration */}
        <div className="visual-placeholder cyber-card pulse-badge">
          <span className="neon-text">{title} Portal</span>
        </div>
      </div>
    </section>
  )
}

export default RoleSection
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RoleSection.jsx
git commit -m "feat: add RoleSection component"
```

### Task 2: Update HomePage with Role Sections and Scroll Logic

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Add Intersection Observer hook and role data**

```jsx
import { useEffect, useRef } from 'react'
import RoleSection from '../components/RoleSection'

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

// Inside HomePage component:
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

// Update JSX to include RoleSections mapping
{ROLE_DATA.map((role, idx) => (
  <div key={role.id} ref={el => sectionRefs.current[idx] = el} className="reveal-section">
    <RoleSection {...role} />
  </div>
))}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: integrate role sections and scroll reveal logic in HomePage"
```

### Task 3: Style Role Sections and Animations

**Files:**
- Modify: `src/pages/HomePage.css`

- [ ] **Step 1: Add styles for sections and staggered animations**

```css
/* Existing styles... */

.role-section {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.role-section.reverse {
  grid-template-columns: 0.8fr 1.2fr;
}

.role-section.reverse .role-content {
  order: 2;
}

.role-section.reverse .role-visual {
  order: 1;
}

.role-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.role-subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  color: var(--text);
  opacity: 0.8;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 2rem;
  text-align: left;
  background: var(--panel-bg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--glow-primary);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.visual-placeholder {
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
}

/* Animations */
.reveal-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-section.visible .feature-card {
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
  animation-delay: calc(0.2s + (var(--index) * 0.1s));
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 968px) {
  .role-section, .role-section.reverse {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .feature-card {
    text-align: center;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.css
git commit -m "style: add styles and animations for role sections"
```

### Task 4: Final Polish and Navigation

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/pages/HomePage.css`

- [ ] **Step 1: Add smooth scroll and update navigation links if needed**

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/HomePage.css
git commit -m "style: add smooth scrolling"
```
