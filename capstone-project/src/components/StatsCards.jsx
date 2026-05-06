import './StatsCards.css';

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'URL Analysis',
    desc: 'Breaks down the URL into domain, path, and query parameters to identify hidden threats.',
    color: 'var(--accent-primary)'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'SSL Verification',
    desc: 'Checks whether the URL uses secure HTTPS encryption or risky HTTP protocol.',
    color: 'var(--success)'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Pattern Detection',
    desc: 'Identifies typosquatting, homograph attacks, and suspicious domain naming patterns.',
    color: 'var(--warning)'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Domain Intelligence',
    desc: 'Cross-references against a database of known legitimate domains and suspicious TLDs.',
    color: 'var(--info)'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Risk Scoring',
    desc: 'Assigns a 0-100 risk score based on weighted analysis of multiple security indicators.',
    color: 'var(--danger)'
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Real-Time Analysis',
    desc: 'All scanning happens instantly in your browser — no data is sent to any external server.',
    color: 'var(--accent-secondary)'
  }
];

function StatsCards() {
  return (
    <section className="stats-section" id="how-it-works">
      <div className="stats-container">
        <div className="stats-header animate-fade-in-up">
          <span className="stats-badge">How It Works</span>
          <h2 className="stats-title">Multi-Layer Security Analysis</h2>
          <p className="stats-subtitle">
            Our AI engine performs 12+ checks across multiple security dimensions
            to give you a comprehensive threat assessment.
          </p>
        </div>
        <div className="features-grid" id="stats">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="feature-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon-wrap" style={{ background: feature.color + '15', color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsCards;
