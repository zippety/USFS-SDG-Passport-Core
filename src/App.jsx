import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PassportView from './components/PassportView';
import StampCatalog from './components/StampCatalog';
import QRScanner from './components/QRScanner';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PassportView />} />
        <Route path="/catalog" element={<StampCatalog />} />
        <Route path="/scan" element={<QRScanner />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;

