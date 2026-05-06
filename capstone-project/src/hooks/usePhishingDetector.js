import { useState, useCallback } from 'react';

const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'verify', 'account', 'update', 'secure',
  'banking', 'confirm', 'password', 'credential', 'suspend',
  'unusual', 'alert', 'urgent', 'immediately', 'expire',
  'wallet', 'paypal', 'netflix', 'apple', 'microsoft',
  'amazon', 'facebook', 'instagram', 'whatsapp', 'telegram'
];

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.club', '.work', '.buzz', '.tk', '.ml',
  '.ga', '.cf', '.gq', '.pw', '.cc', '.icu', '.cam',
  '.rest', '.surf', '.monster', '.click', '.link'
];

const LEGITIMATE_DOMAINS = [
  'google.com', 'facebook.com', 'amazon.com', 'apple.com',
  'microsoft.com', 'github.com', 'stackoverflow.com',
  'wikipedia.org', 'youtube.com', 'twitter.com', 'x.com',
  'linkedin.com', 'instagram.com', 'netflix.com',
  'paypal.com', 'chase.com', 'bankofamerica.com',
  'reddit.com', 'yahoo.com', 'outlook.com', 'gmail.com'
];

function extractDomain(url) {
  try {
    let cleaned = url.trim();
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = 'https://' + cleaned;
    }
    const urlObj = new URL(cleaned);
    return urlObj.hostname.toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

function analyzeUrl(url) {
  const checks = [];
  let riskScore = 0;
  const cleaned = url.trim().toLowerCase();

  // Check 1: HTTPS usage
  if (cleaned.startsWith('http://')) {
    checks.push({ id: 'no-https', label: 'No HTTPS encryption', severity: 'high', points: 20 });
    riskScore += 20;
  } else {
    checks.push({ id: 'has-https', label: 'Uses HTTPS encryption', severity: 'safe', points: 0 });
  }

  const domain = extractDomain(url);

  // Check 2: Known legitimate domain
  const isLegitimate = LEGITIMATE_DOMAINS.some(d => domain === d || domain === 'www.' + d);
  if (isLegitimate) {
    checks.push({ id: 'legit-domain', label: 'Known legitimate domain', severity: 'safe', points: -30 });
    riskScore -= 30;
  }

  // Check 3: IP address instead of domain
  const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (ipPattern.test(domain)) {
    checks.push({ id: 'ip-address', label: 'Uses IP address instead of domain name', severity: 'high', points: 25 });
    riskScore += 25;
  }

  // Check 4: Suspicious TLD
  const hasSuspiciousTld = SUSPICIOUS_TLDS.some(tld => domain.endsWith(tld));
  if (hasSuspiciousTld) {
    checks.push({ id: 'sus-tld', label: 'Suspicious top-level domain detected', severity: 'medium', points: 15 });
    riskScore += 15;
  }

  // Check 5: URL length
  if (cleaned.length > 75) {
    checks.push({ id: 'long-url', label: 'Unusually long URL', severity: 'medium', points: 10 });
    riskScore += 10;
  }

  // Check 6: Suspicious keywords
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter(kw => cleaned.includes(kw));
  if (foundKeywords.length >= 3) {
    checks.push({ id: 'many-keywords', label: `Multiple suspicious keywords: ${foundKeywords.slice(0, 3).join(', ')}`, severity: 'high', points: 20 });
    riskScore += 20;
  } else if (foundKeywords.length > 0) {
    checks.push({ id: 'some-keywords', label: `Suspicious keyword found: ${foundKeywords[0]}`, severity: 'low', points: 8 });
    riskScore += 8;
  }

  // Check 7: Too many subdomains
  const subdomainCount = domain.split('.').length - 2;
  if (subdomainCount > 2) {
    checks.push({ id: 'many-subdomains', label: `Excessive subdomains (${subdomainCount} found)`, severity: 'medium', points: 15 });
    riskScore += 15;
  }

  // Check 8: Special characters
  const specialChars = (cleaned.match(/[@!#$%^&*]/g) || []).length;
  if (specialChars > 2) {
    checks.push({ id: 'special-chars', label: 'Contains unusual special characters', severity: 'medium', points: 12 });
    riskScore += 12;
  }

  // Check 9: Numbers in domain
  const domainWithoutTld = domain.split('.').slice(0, -1).join('.');
  const numberCount = (domainWithoutTld.match(/\d/g) || []).length;
  if (numberCount > 4) {
    checks.push({ id: 'many-numbers', label: 'Excessive numbers in domain name', severity: 'medium', points: 10 });
    riskScore += 10;
  }

  // Check 10: Hyphen abuse
  const hyphenCount = (domain.match(/-/g) || []).length;
  if (hyphenCount > 2) {
    checks.push({ id: 'many-hyphens', label: 'Excessive hyphens in domain', severity: 'low', points: 8 });
    riskScore += 8;
  }

  // Check 11: URL shortener
  const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'is.gd', 'buff.ly'];
  if (shorteners.some(s => domain.includes(s))) {
    checks.push({ id: 'shortener', label: 'URL shortener detected — destination unknown', severity: 'medium', points: 12 });
    riskScore += 12;
  }

  // Check 12: Homograph / typosquatting
  const typoPatterns = ['g00gle', 'faceb00k', 'amaz0n', 'paypa1', 'micr0soft', 'appl3'];
  if (typoPatterns.some(p => domain.includes(p))) {
    checks.push({ id: 'typosquat', label: 'Possible typosquatting / homograph attack', severity: 'high', points: 25 });
    riskScore += 25;
  }

  // Normalize score
  riskScore = Math.max(0, Math.min(100, riskScore));

  let verdict, level;
  if (riskScore <= 15) {
    verdict = 'Safe';
    level = 'safe';
  } else if (riskScore <= 40) {
    verdict = 'Low Risk';
    level = 'low';
  } else if (riskScore <= 65) {
    verdict = 'Suspicious';
    level = 'medium';
  } else {
    verdict = 'Dangerous';
    level = 'high';
  }

  return {
    url: url.trim(),
    domain,
    riskScore,
    verdict,
    level,
    checks,
    timestamp: new Date().toISOString()
  };
}

function usePhishingDetector() {
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [history, setHistory] = useState([]);

  const scanUrl = useCallback((url) => {
    if (!url || !url.trim()) return;

    setIsScanning(true);
    setResult(null);

    // Simulate AI processing delay for realistic feel
    setTimeout(() => {
      const analysisResult = analyzeUrl(url);
      setResult(analysisResult);
      setHistory(prev => [analysisResult, ...prev].slice(0, 20));
      setIsScanning(false);
    }, 1500);
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    result,
    isScanning,
    history,
    scanUrl,
    clearResult,
    clearHistory
  };
}

export default usePhishingDetector;
