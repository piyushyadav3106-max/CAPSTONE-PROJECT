import { useState } from 'react';
import './UrlScanner.css';

function UrlScanner({ onScan, isScanning }) {
  const [url, setUrl] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (url.trim() && !isScanning) {
      onScan(url);
    }
  }

  function handleExampleClick(exampleUrl) {
    setUrl(exampleUrl);
  }

  return (
    <section className="scanner-section" id="scanner">
      <div className="scanner-container animate-fade-in-up">
        <div className="scanner-header">
          <h2 className="scanner-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            URL Scanner
          </h2>
          <p className="scanner-desc">Paste any URL below to analyze it for phishing threats</p>
        </div>

        <form className="scanner-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              id="url-input"
              type="text"
              className="scanner-input"
              placeholder="Enter URL to scan (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isScanning}
              autoComplete="off"
            />
            {url && (
              <button
                type="button"
                className="input-clear"
                onClick={() => setUrl('')}
                aria-label="Clear input"
              >
                ✕
              </button>
            )}
          </div>
          <button
            id="scan-button"
            type="submit"
            className="scan-button"
            disabled={!url.trim() || isScanning}
          >
            {isScanning ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                Scan URL
              </>
            )}
          </button>
        </form>

        <div className="example-urls">
          <span className="example-label">Try examples:</span>
          <button
            className="example-chip safe"
            onClick={() => handleExampleClick('https://www.google.com')}
          >
            google.com
          </button>
          <button
            className="example-chip danger"
            onClick={() => handleExampleClick('http://192.168.1.1/login-verify-account-secure.xyz')}
          >
            Suspicious IP
          </button>
          <button
            className="example-chip warning"
            onClick={() => handleExampleClick('https://amaz0n-login-verify.tk/account/update')}
          >
            Fake Amazon
          </button>
        </div>
      </div>
    </section>
  );
}

export default UrlScanner;
