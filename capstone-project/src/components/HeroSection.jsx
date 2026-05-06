import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-effects">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-grid-lines"></div>
      </div>
      <div className="hero-content animate-fade-in-up">
        <div className="hero-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          AI-Powered Protection
        </div>
        <h1 className="hero-title">
          Detect <span className="gradient-text">Phishing</span> URLs
          <br />
          Before They Strike
        </h1>
        <p className="hero-subtitle">
          Our intelligent system analyzes URLs in real-time using 12+ security checks
          to protect you from malicious websites, phishing attacks, and online threats.
        </p>
        <div className="hero-stats-row">
          <div className="hero-stat">
            <span className="hero-stat-number">12+</span>
            <span className="hero-stat-label">Security Checks</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">Real-time</span>
            <span className="hero-stat-label">Analysis</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">100%</span>
            <span className="hero-stat-label">Client-side</span>
          </div>
        </div>
        <a href="#scanner" className="hero-cta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          Start Scanning Now
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
