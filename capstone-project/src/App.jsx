import usePhishingDetector from './hooks/usePhishingDetector';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import UrlScanner from './components/UrlScanner';
import ResultCard from './components/ResultCard';
import HistoryPanel from './components/HistoryPanel';
import StatsCards from './components/StatsCards';
import Footer from './components/Footer';
import './App.css';

function App() {
  const { result, isScanning, history, scanUrl, clearHistory } = usePhishingDetector();

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <HeroSection />
        <UrlScanner onScan={scanUrl} isScanning={isScanning} />
        {isScanning && (
          <div className="scanning-indicator">
            <div className="scanning-bar"></div>
            <p className="scanning-text">Analyzing URL for threats...</p>
          </div>
        )}
        <ResultCard result={result} />
        <HistoryPanel history={history} onClear={clearHistory} />
        <StatsCards />
      </main>
      <Footer />
    </div>
  );
}

export default App;
