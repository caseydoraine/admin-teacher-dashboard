export const AdminVisual = () => (
  <div className="visual-container admin-visual">
    <div className="radar-circle">
      <div className="radar-sweep" />
      <div className="radar-point p1" />
      <div className="radar-point p2" />
      <div className="radar-point p3" />
    </div>
    <div className="data-grid-overlay" />
  </div>
)

export const TeacherVisual = () => (
  <div className="visual-container teacher-visual">
    <div className="lobby-stack">
      {[1, 2, 3].map((i) => (
        <div key={i} className={`lobby-item l${i}`}>
          <div className="lobby-pulse" />
          <div className="lobby-bar" />
        </div>
      ))}
    </div>
    <div className="connection-lines">
      <div className="line l1" />
      <div className="line l2" />
    </div>
  </div>
)

export const ParentVisual = () => (
  <div className="visual-container parent-visual">
    <div className="growth-node">
      <div className="node-center">
        <div className="inner-glow" />
      </div>
      <div className="orbit o1" />
      <div className="orbit o2" />
      <div className="achievement-star s1" />
      <div className="achievement-star s2" />
    </div>
  </div>
)
