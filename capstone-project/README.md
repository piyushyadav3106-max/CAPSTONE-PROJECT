# PhishGuard AI — Phishing Detection System

An AI-powered phishing detection web application built with **React + Vite** using beginner-friendly **functional components** and **React Hooks**.

---

## What This Project Does

PhishGuard AI analyzes URLs in real-time to detect phishing threats. When a user enters a URL, the system runs **12+ security checks** and returns a **risk score (0-100)** along with a detailed breakdown of findings.

### Key Features

- **URL Scanner** — Paste any URL and get instant analysis
- **Risk Score Ring** — Visual circular gauge showing threat level (0-100)
- **12+ Security Checks** — Each check explained with severity levels
- **Scan History** — Keeps track of previously scanned URLs
- **Example URLs** — Quick-test buttons for safe, suspicious, and dangerous URLs
- **Fully Client-Side** — No data sent to any server, everything runs in the browser

---

## Project Structure

```
src/
├── main.jsx                        # App entry point
├── App.jsx                         # Main component (assembles everything)
├── App.css                         # App-level styles
├── index.css                       # Global CSS variables, reset, animations
│
├── hooks/
│   └── usePhishingDetector.js      # Custom hook with ALL detection logic
│
└── components/
    ├── Navbar.jsx / .css           # Top navigation bar
    ├── HeroSection.jsx / .css      # Landing hero with gradient effects
    ├── UrlScanner.jsx / .css       # URL input form with scan button
    ├── ResultCard.jsx / .css       # Displays scan results + risk ring
    ├── HistoryPanel.jsx / .css     # Shows past scan history
    ├── StatsCards.jsx / .css       # "How It Works" feature cards
    └── Footer.jsx / .css           # Page footer
```

---

## React Concepts Used (Beginner-Friendly)

### Hooks Used

| Hook | Where | Purpose |
|------|-------|---------|
| `useState` | `usePhishingDetector.js`, `UrlScanner.jsx` | Store and update data (URL input, scan results, history) |
| `useCallback` | `usePhishingDetector.js` | Prevent unnecessary re-creation of functions |

### Component Pattern

Every component is a **functional component** (no class components):

```jsx
function ComponentName({ prop1, prop2 }) {
  // logic here
  return (
    <div>JSX here</div>
  );
}
export default ComponentName;
```

### Custom Hook Pattern

The `usePhishingDetector` hook encapsulates all business logic:

```jsx
function usePhishingDetector() {
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [history, setHistory] = useState([]);

  const scanUrl = useCallback((url) => {
    // analysis logic
  }, []);

  return { result, isScanning, history, scanUrl, clearHistory };
}
```

### Props Flow

```
App (uses usePhishingDetector hook)
├── Navbar              (no props)
├── HeroSection         (no props)
├── UrlScanner          (onScan, isScanning)
├── ResultCard          (result)
├── HistoryPanel        (history, onClear)
├── StatsCards          (no props)
└── Footer              (no props)
```

---

## Security Checks Performed

| # | Check | Risk Points | Severity |
|---|-------|-------------|----------|
| 1 | HTTPS vs HTTP | +20 | High |
| 2 | Known legitimate domain | -30 | Safe |
| 3 | IP address instead of domain | +25 | High |
| 4 | Suspicious TLD (.xyz, .tk, etc.) | +15 | Medium |
| 5 | URL length > 75 chars | +10 | Medium |
| 6 | Suspicious keywords (login, verify) | +8 to +20 | Low/High |
| 7 | Excessive subdomains | +15 | Medium |
| 8 | Special characters in URL | +12 | Medium |
| 9 | Numbers in domain name | +10 | Medium |
| 10 | Hyphen abuse | +8 | Low |
| 11 | URL shortener detection | +12 | Medium |
| 12 | Typosquatting patterns | +25 | High |

### Risk Score Levels

| Score Range | Verdict | Color |
|-------------|---------|-------|
| 0 – 15 | Safe | Green |
| 16 – 40 | Low Risk | Blue |
| 41 – 65 | Suspicious | Yellow |
| 66 – 100 | Dangerous | Red |

---

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Technologies

- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **Vanilla CSS** — Custom styling (no frameworks)
- **Google Fonts (Inter)** — Typography

---

## Disclaimer

This tool uses heuristic pattern matching for educational purposes. It does not guarantee 100% phishing detection accuracy. Always exercise caution with unknown URLs.
