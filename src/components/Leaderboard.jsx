import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Users } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [viewMode, setViewMode] = useState('individual'); // 'individual' or 'program'
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Real-time listener for top 50 users
    const q = query(collection(db, "users"), orderBy("points", "desc"), limit(50));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      let rank = 1;
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id, rank: rank++ });
      });
      setLeaderboardData(users);
    });

    return () => unsubscribe();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <Award className="w-6 h-6 text-gray-400" />;
  };

  // Calculate program leaderboard
  const programStats = leaderboardData.reduce((acc, user) => {
    // Normalize placeholder values
    let progName = user.program || "General Studies";
    if (progName === "Undecided" || progName === "Unknown" || progName.includes("Reset")) {
      progName = "General Studies";
    }
    if (!acc[progName]) {
      acc[progName] = { program: progName, totalPoints: 0, totalStamps: 0, count: 0 };
    }
    acc[progName].totalPoints += user.points || 0;
    acc[progName].totalStamps += (user.stampsCollected?.length || 0);
    acc[progName].count += 1;
    return acc;
  }, {});

  const programLeaderboard = Object.values(programStats)
    .map(prog => ({
      ...prog,
      avgPoints: Math.round(prog.totalPoints / prog.count),
      avgStamps: (prog.totalStamps / prog.count).toFixed(1),
    }))
    .sort((a, b) => b.avgPoints - a.avgPoints);

  const currentUserData = leaderboardData.find(u => u.uid === currentUser?.uid) || {
    rank: '-', points: 0, stampsCollected: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pb-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Passport</span>
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Leaderboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Top performers in SDG actions</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-2 mb-6 flex space-x-2 shadow-md transition-colors duration-300">
          <button
            onClick={() => setViewMode('individual')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${viewMode === 'individual'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <Trophy className="w-4 h-4 inline mr-2" />
            Individual
          </button>
          <button
            onClick={() => setViewMode('program')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${viewMode === 'program'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            By Program
          </button>
        </div>

        {/* Current User Card */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Your Rank</p>
              <p className="text-2xl font-bold">#{currentUserData.rank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Your Points</p>
              <p className="text-2xl font-bold">{currentUserData.points || 0}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Stamps</p>
              <p className="text-2xl font-bold">{currentUserData.stampsCollected?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
          {viewMode === 'individual' ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboardData.map((user) => {
                const isCurrentUser = user.uid === currentUser?.uid;
                return (
                  <div
                    key={user.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${isCurrentUser ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : ''
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">
                          {user.rank <= 3 ? (
                            getRankIcon(user.rank)
                          ) : (
                            <span className="text-lg font-bold text-gray-600 dark:text-gray-400">#{user.rank}</span>
                          )}
                        </div>
                        <div>
                          <p className={`font-semibold ${isCurrentUser ? 'text-green-700 dark:text-green-400' : 'text-gray-800 dark:text-white'}`}>
                            {user.displayName || user.email || "Anonymous"}
                            {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{(user.program && user.program !== 'Undecided') ? user.program : "General Studies"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{user.points || 0} pts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.stampsCollected?.length || 0} stamps</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {leaderboardData.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No points recorded yet. Be the first! 🚀
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {programLeaderboard.map((prog, idx) => (
                <div key={prog.program} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        <span className="text-lg font-bold text-gray-600 dark:text-gray-400">#{idx + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{prog.program}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{prog.count} participants</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800 dark:text-white">{prog.avgPoints} avg pts</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{prog.avgStamps} avg stamps</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

