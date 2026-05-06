import './HistoryPanel.css';

function HistoryPanel({ history, onClear }) {
  if (history.length === 0) return null;

  function getLevelColor(level) {
    if (level === 'safe') return 'var(--success)';
    if (level === 'low') return 'var(--info)';
    if (level === 'medium') return 'var(--warning)';
    if (level === 'high') return 'var(--danger)';
    return 'var(--text-muted)';
  }

  function getLevelIcon(level) {
    if (level === 'safe') return '✓';
    if (level === 'low') return '~';
    if (level === 'medium') return '!';
    if (level === 'high') return '✕';
    return '?';
  }

  return (
    <section className="history-section animate-fade-in" id="history">
      <div className="history-container">
        <div className="history-header">
          <h2 className="history-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Scan History
            <span className="history-count">{history.length}</span>
          </h2>
          <button className="clear-btn" onClick={onClear} id="clear-history-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Clear All
          </button>
        </div>
        <div className="history-list">
          {history.map((item, index) => (
            <div key={item.timestamp + index} className="history-item">
              <div
                className="history-level-dot"
                style={{ background: getLevelColor(item.level), boxShadow: `0 0 8px ${getLevelColor(item.level)}50` }}
              >
                {getLevelIcon(item.level)}
              </div>
              <div className="history-info">
                <span className="history-domain">{item.domain}</span>
                <span className="history-url">{item.url}</span>
              </div>
              <div className="history-meta">
                <span className="history-verdict" style={{ color: getLevelColor(item.level) }}>
                  {item.verdict}
                </span>
                <span className="history-score">{item.riskScore}/100</span>
                <span className="history-time">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HistoryPanel;
