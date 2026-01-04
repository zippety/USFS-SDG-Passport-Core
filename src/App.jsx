import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase';

import PassportView from './components/PassportView';
import StampCatalog from './components/StampCatalog';
import QRScanner from './components/QRScanner';
import Leaderboard from './components/Leaderboard';
import EventsCalendar from './components/EventsCalendar';
import CommunityHub from './components/CommunityHub';
import TeamDashboard from './components/TeamDashboard';
import OpsDashboard from './components/OpsDashboard';
import BiodiversitySanctuary from './components/BiodiversitySanctuary';
import Login from './components/Login';
import FeedbackButton from './components/FeedbackButton';
import { Shield, Eye, LogOut, Zap } from 'lucide-react';
import { useStreak } from './hooks/useStreak';

import ThemeToggle from './components/ThemeToggle';

function App() {
  const [user, setUser] = useState(null);
  const streak = useStreak(user);
  const [loading, setLoading] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Check if user exists in Firestore, if not create them
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || "Anonymous",
            photoURL: currentUser.photoURL,
            points: 0,
            level: 1,
            role: "Student",
            program: "Undecided",
            stampsCollected: [],
            createdAt: new Date()
          });
          console.log("New user profile created!");
        }
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Guest mode removed - direct access for MVP demo

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500">Loading Sustainability...</div>;
  }

  // Login wall removed for MVP demo - direct access enabled

  return (
    <Router>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

        {/* TOAST NOTIFICATION */}
        {toastMsg && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] bg-slate-900 border border-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
            <span className="bg-emerald-500 rounded-full p-1"><Zap size={12} fill="white" /></span>
            <span className="font-bold text-sm">{toastMsg}</span>
          </div>
        )}

        <FeedbackButton />

        {/* TOP CONTROLS BAR */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          {/* Theme Toggle */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full shadow-lg border border-gray-200 dark:border-slate-700">
            <ThemeToggle />
          </div>

          {/* Admin Toggle */}
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg font-bold text-[10px] uppercase tracking-widest transition-all border
                ${isAdminMode
                ? 'bg-red-600 border-red-500 text-white scale-110'
                : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-500 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-emerald-500'}`}
            title={isAdminMode ? "Exit Admin Mode" : "Admin Dashboard"}
          >
            {isAdminMode ? <Shield size={14} /> : <Eye size={14} />}
            <span>{isAdminMode ? 'CIO MODE' : 'Admin'}</span>
          </button>

          {/* Sign Out */}
          <button
            onClick={() => auth.signOut()}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur text-slate-400 p-2 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all shadow-lg"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Streak Counter (Top Left) */}
        {!isAdminMode && (
          <div className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-orange-500 px-4 py-2 rounded-full border border-orange-500/20 shadow-lg group hover:scale-105 transition-transform">
            <div className="text-xl group-hover:animate-bounce">🔥</div>
            <div className="flex flex-col">
              <span className="font-black text-xs leading-none uppercase tracking-tighter">{streak} DAY</span>
              <span className="font-bold text-[10px] leading-none opacity-70">STREAK</span>
            </div>
          </div>
        )}

        {/* Conditional Rendering for Demo Impact */}
        {isAdminMode ? (
          <OpsDashboard showToast={showToast} />
        ) : (
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<PassportView user={user} />} />
            <Route path="/catalog" element={<StampCatalog user={user} />} />
            <Route path="/scan" element={<QRScanner user={user} showToast={showToast} />} />
            <Route path="/leaderboard" element={<Leaderboard user={user} />} />
            <Route path="/events" element={<EventsCalendar user={user} showToast={showToast} />} />
            <Route path="/community" element={<CommunityHub user={user} />} />
            <Route path="/team" element={<TeamDashboard user={user} />} />
            <Route path="/sanctuary" element={<BiodiversitySanctuary user={user} />} />

            {/* Redirect /app routes (QA compatibility) */}
            <Route path="/app" element={<Navigate to="/" replace />} />
            <Route path="/app/map" element={<Navigate to="/" replace />} />
            <Route path="/app/catalog" element={<Navigate to="/catalog" replace />} />

            {/* Catch-all: redirect unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}

      </div>
    </Router>
  );
}

export default App;

