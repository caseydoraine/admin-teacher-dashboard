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
