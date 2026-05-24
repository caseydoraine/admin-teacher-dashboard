function RoleSection({ title, subtitle, features, reverse = false, id, visual: Visual }) {
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
        <div className="visual-wrapper cyber-card">
          {Visual ? <Visual /> : (
            <div className="visual-placeholder pulse-badge">
              <span className="neon-text">{title} Portal</span>
            </div>
          )}
          <div className="scanner-line" />
        </div>
      </div>
    </section>
  )
}

export default RoleSection
