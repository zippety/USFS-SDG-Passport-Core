import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Trophy, BookOpen, Scan, MessageSquare, Calendar, Users, Zap, Trash2, Leaf, Heart, Instagram, ExternalLink } from 'lucide-react';
import { doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../firebase';
import UserProfile from './UserProfile';
import StampCard from './StampCard';
import SurveyModal from './SurveyModal';
import SustainabilityPet from './SustainabilityPet';
import DailyCheckIn from './DailyCheckIn';
import ErrorBoundary from './ErrorBoundary';
import { mockUser } from '../data/mockUser';
import { getSDGName } from '../utils/sdgData';
import ThemeToggle from './ThemeToggle';

// Array of all 17 SDG numbers
const allSDGs = Array.from({ length: 17 }, (_, i) => i + 1);

export default function PassportView() {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUser); // Default to mock, then update
  const [showSurvey, setShowSurvey] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          // Map Firestore fields to local state shape if needed, or just use as is
          setUser(prev => ({
            ...prev,
            ...userData,
            name: userData.displayName || prev.name,
            xp: userData.points, // Map points to xp if UserProfile expects xp
            xpToNextLevel: userData.level * 1000,
            stampsCollected: userData.stampsCollected || []
          }));
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleStampClick = (sdgNumber) => {
    navigate(`/catalog?sdg=${sdgNumber}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-usfs-green/10 via-white to-usfs-teal/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pb-8 transition-colors duration-300 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="USFS Logo" className="w-16 h-16 object-cover rounded-full drop-shadow-md" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">SDG Passport</h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Collect stamps for Sustainable Development</p>
            </div>
          </div>
        </div>

        <UserProfile user={user} />
        <DailyCheckIn onPointsEarned={(pts) => console.log(`Earned ${pts} XP from check-in!`)} />
        <SustainabilityPet />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">My Stamps</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {allSDGs.map((sdgNumber) => (
              <div key={sdgNumber} className="group relative" title={user.stampsCollected.includes(sdgNumber) ? `SDG ${sdgNumber}: Collected` : `Click to view requirements for SDG ${sdgNumber}`}>
                <StampCard
                  sdgNumber={sdgNumber}
                  isCollected={user.stampsCollected.includes(sdgNumber)}
                  onClick={() => handleStampClick(sdgNumber)}
                />
                {!user.stampsCollected.includes(sdgNumber) && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl border border-white/10 uppercase tracking-tighter">
                    Tap to unlock
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


        {/* ACTIVE MISSIONS SECTION (The "Workforce" Logic) */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg shadow-lg p-6 mb-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Scan size={100} />
          </div>

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap className="text-yellow-400" fill="currentColor" />
                Active Mission
              </h2>
              <p className="text-indigo-200 text-sm">Help Seneca reach Net Zero today.</p>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded border border-white/30 animate-pulse">
              +50 PTS
            </span>
          </div>

          {/* Quick Info Bar */}
          <div className="flex items-center gap-3 mb-3 text-xs text-indigo-200">
            <span className="flex items-center gap-1">⏱️ 5-10 min</span>
            <span className="flex items-center gap-1">⭐ Easy</span>
            <span className="flex items-center gap-1">📍 2 min walk</span>
          </div>

          <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10 mb-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-500 p-2 rounded text-white"><Trash2 size={20} /></div>
              <div>
                <h3 className="font-bold text-sm">Audit the Cafeteria</h3>
                <p className="text-xs text-indigo-200">Newnham Campus • Building A</p>
              </div>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed mb-3">
              We need to verify if the recycling bins are contaminated. Snap a photo of the "Blue Bin" contents.
            </p>
            <div className="w-full bg-indigo-900/50 h-1.5 rounded-full overflow-hidden">
              <div className="bg-yellow-400 w-[65%] h-full"></div>
            </div>
            <div className="flex justify-between text-[10px] mt-1 text-indigo-300">
              <span>65% Complete</span>
              <span>Target: 100 Audits</span>
            </div>
          </div>

          {/* Social Proof & Urgency */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-indigo-200">👥 23 students completed today</span>
            <span className="text-yellow-300 font-bold animate-pulse">🔥 35 more needed!</span>
          </div>

          <button
            onClick={() => navigate('/scan')}
            className="w-full bg-white text-indigo-900 font-bold py-3 rounded-lg hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2 relative z-10"
          >
            <Scan size={18} />
            📸 Start Audit
          </button>
        </div>

        {/* NEW: BIODIVERSITY MISSION (The "Passion" Logic) */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg shadow-lg p-6 mb-6 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Leaf size={100} />
          </div>

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="text-emerald-200" fill="currentColor" />
                Nature Mission
              </h2>
              <p className="text-emerald-100 text-sm">Protect Life on Land (SDG 15).</p>
            </div>
            <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-2 py-1 rounded animate-bounce">
              +100 PTS
            </span>
          </div>

          {/* Quick Info Bar */}
          <div className="flex items-center gap-3 mb-3 text-xs text-emerald-200">
            <span className="flex items-center gap-1">⏱️ 15-20 min</span>
            <span className="flex items-center gap-1">⭐⭐ Medium</span>
            <span className="flex items-center gap-1">📍 King Campus</span>
          </div>

          <div className="bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10 mb-4 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-emerald-500 p-2 rounded text-white"><Leaf size={20} /></div>
              <div>
                <h3 className="font-bold text-sm">Monitor the Beehives</h3>
                <p className="text-xs text-emerald-200">King Campus • Apiary</p>
              </div>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed mb-3">
              Check the health of our pollinator colonies. Upload a photo of activity levels.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-emerald-100 bg-emerald-900/40 p-2 rounded">
              <div className="flex items-center gap-1">🐘 Supports Wildlife</div>
              <div className="flex items-center gap-1">🐬 Protects Habitats</div>
            </div>
          </div>

          {/* Reward Preview */}
          <div className="bg-emerald-900/40 rounded-lg p-2 mb-3 text-xs text-emerald-100 border border-emerald-400/20">
            <p className="font-semibold mb-1">✨ Complete to unlock:</p>
            <div className="flex items-center gap-3">
              <span>🏆 +100 XP</span>
              <span>🌳 SDG 15 Stamp</span>
              <span>🦋 New Sanctuary Friend!</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-emerald-200">🌿 12 students checked in this week</span>
            <span className="text-amber-300 font-bold">☀️ Great weather today!</span>
          </div>

          <button
            onClick={() => navigate('/sanctuary')}
            className="w-full bg-white text-emerald-900 font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors shadow-lg flex items-center justify-center gap-2 relative z-10"
          >
            <Heart size={18} fill="currentColor" />
            🐝 Start Nature Mission
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/scan')}
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2 border border-gray-100 dark:border-gray-700"
          >
            <QrCode className="w-6 h-6 text-seneca-red" />
            <span className="font-semibold text-sm">Scan QR</span>
          </button>

          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-gradient-to-r from-usfs-green to-green-700 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
          >
            <Trophy className="w-6 h-6" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => navigate('/events')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
          >
            <Calendar className="w-6 h-6" />
            <span>Events</span>
          </button>

          <button
            onClick={() => navigate('/community')}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
          >
            <Users className="w-6 h-6" />
            <span>Community</span>
          </button>
        </div>

        <button
          onClick={() => navigate('/catalog')}
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
        >
          <BookOpen className="w-6 h-6" />
          <span>View All SDGs</span>
        </button>

        {/* USFS Instagram Section */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl shadow-lg p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm">@USFSOFFICIAL</h3>
                <p className="text-white/80 text-xs">Follow for live updates!</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/usfsofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-1 hover:bg-purple-50 transition-colors shadow-md"
            >
              <span>Follow</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Recent Activity Teaser */}
          <div className="mt-3 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <p className="text-xs text-white/90">
              📸 Latest: "Amazing turnout at the Sustainability Mixer! 🌱"
            </p>
            <p className="text-[10px] text-white/60 mt-1">2 hours ago • View on Instagram →</p>
          </div>
        </div>

        {/* Optional Survey Button */}
        <button
          onClick={() => setShowSurvey(true)}
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 text-gray-700 rounded-lg p-3 shadow transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Share Your Feedback (Optional)</span>
        </button>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/team')}
            className="text-xs text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-500 transition-colors uppercase tracking-widest font-bold"
          >
            Staff Access
          </button>
        </div>
      </div>

      {/* Survey Modal */}
      <ErrorBoundary fallback={null}>
        <SurveyModal
          isOpen={showSurvey}
          onClose={() => setShowSurvey(false)}
          trigger="dashboard"
        />
      </ErrorBoundary>
    </div>
  );
}

