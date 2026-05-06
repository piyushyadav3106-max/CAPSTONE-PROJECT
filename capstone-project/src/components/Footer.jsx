import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="22" height="22" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1"/>
                  <stop offset="100%" stopColor="#a855f7"/>
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#footerGrad)"/>
              <path d="M32 14 L46 24 L46 38 C46 46 40 52 32 54 C24 52 18 46 18 38 L18 24 Z"
                    fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M26 34 L30 38 L38 28"
                    fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>PhishGuard<span className="footer-ai">AI</span></span>
          </div>
          <p className="footer-tagline">AI-Powered Phishing Detection System</p>
        </div>
        <div className="footer-info">
          <p className="footer-disclaimer">
            This tool uses heuristic analysis and pattern matching. It does not
            guarantee 100% accuracy. Always exercise caution with unknown URLs.
          </p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PhishGuard AI — Capstone Project</span>
          <span className="footer-tech">Built with React + Vite</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
