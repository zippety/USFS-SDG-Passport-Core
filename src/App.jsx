import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PassportView from './components/PassportView';
import StampCatalog from './components/StampCatalog';
import QRScanner from './components/QRScanner';
import Leaderboard from './components/Leaderboard';
import EventsCalendar from './components/EventsCalendar';
import CommunityHub from './components/CommunityHub';
import TeamDashboard from './components/TeamDashboard';
import OpsDashboard from './components/OpsDashboard';
import BiodiversitySanctuary from './components/BiodiversitySanctuary';
import { Shield, Eye } from 'lucide-react';

function App() {
  // Simple State for Demo Toggle (in a real app, this would be Auth protected)
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <Router>
      <div className="relative">

        {/* DEMO CONTROLS (Hidden Top Right) */}
        <div className="fixed top-4 right-20 z-50 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg font-bold text-xs uppercase tracking-wider transition-all
               ${isAdminMode ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            {isAdminMode ? <Shield size={14} /> : <Eye size={14} />}
            {isAdminMode ? 'Exit CIO Mode' : 'Admin View'}
          </button>
        </div>

        {/* Conditional Rendering for Demo Impact */}
        {isAdminMode ? (
          <OpsDashboard />
        ) : (
          <Routes>
            <Route path="/" element={<PassportView />} />
            <Route path="/catalog" element={<StampCatalog />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/events" element={<EventsCalendar />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/team" element={<TeamDashboard />} />
            <Route path="/sanctuary" element={<BiodiversitySanctuary />} />
          </Routes>
        )}

      </div>
    </Router>
  );
}

export default App;

