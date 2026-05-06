import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#a855f7"/>
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#logoGrad)"/>
              <path d="M32 14 L46 24 L46 38 C46 46 40 52 32 54 C24 52 18 46 18 38 L18 24 Z"
                    fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M26 34 L30 38 L38 28"
                    fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="navbar-title">PhishGuard<span className="navbar-ai">AI</span></span>
        </div>
        <div className="navbar-links">
          <a href="#scanner" className="nav-link">Scanner</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#stats" className="nav-link">Stats</a>
        </div>
        <div className="navbar-badge">
          <span className="live-dot"></span>
          Protected
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
