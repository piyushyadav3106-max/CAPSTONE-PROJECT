import './ResultCard.css';

function ResultCard({ result }) {
  if (!result) return null;

  function getSeverityIcon(severity) {
    if (severity === 'safe') return '✓';
    if (severity === 'low') return '!';
    if (severity === 'medium') return '⚠';
    if (severity === 'high') return '✕';
    return '•';
  }

  function getRiskColor(level) {
    if (level === 'safe') return 'var(--success)';
    if (level === 'low') return 'var(--info)';
    if (level === 'medium') return 'var(--warning)';
    if (level === 'high') return 'var(--danger)';
    return 'var(--text-muted)';
  }

  function getVerdictEmoji(level) {
    if (level === 'safe') return '🛡️';
    if (level === 'low') return '🔵';
    if (level === 'medium') return '⚠️';
    if (level === 'high') return '🚨';
    return '❓';
  }

  const riskColor = getRiskColor(result.level);
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (result.riskScore / 100) * circumference;

  return (
    <section className="result-section animate-fade-in-up" id="result">
      <div className={`result-card result-${result.level}`}>
        <div className="result-top">
          <div className="result-score-ring">
            <svg width="130" height="130" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke={riskColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 60 60)"
                className="score-ring-progress"
              />
            </svg>
            <div className="score-ring-text">
              <span className="score-number" style={{ color: riskColor }}>{result.riskScore}</span>
              <span className="score-label">Risk</span>
            </div>
          </div>

          <div className="result-verdict-info">
            <div className="verdict-badge" style={{ background: riskColor + '20', borderColor: riskColor + '50', color: riskColor }}>
              {getVerdictEmoji(result.level)} {result.verdict}
            </div>
            <p className="result-domain">{result.domain}</p>
            <p className="result-url-full">{result.url}</p>
          </div>
        </div>

        <div className="result-checks">
          <h3 className="checks-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Security Checks ({result.checks.length})
          </h3>
          <div className="checks-list">
            {result.checks.map((check) => (
              <div key={check.id} className={`check-item check-${check.severity}`}>
                <span className="check-icon">{getSeverityIcon(check.severity)}</span>
                <span className="check-label">{check.label}</span>
                <span className="check-points">
                  {check.points > 0 ? `+${check.points}` : check.points === 0 ? '—' : check.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="result-footer">
          <span className="result-time">
            Scanned at {new Date(result.timestamp).toLocaleTimeString()}
          </span>
          <span className="result-engine">PhishGuard AI Engine v1.0</span>
        </div>
      </div>
    </section>
  );
}

export default ResultCard;
