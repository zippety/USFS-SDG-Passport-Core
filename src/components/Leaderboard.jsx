import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award, Users } from 'lucide-react';
import { mockLeaderboard } from '../data/mockLeaderboard';
import { mockUser } from '../data/mockUser';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('individual'); // 'individual' or 'program'

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <Award className="w-6 h-6 text-gray-400" />;
  };

  // Calculate program leaderboard
  const programStats = mockLeaderboard.reduce((acc, user) => {
    if (!acc[user.program]) {
      acc[user.program] = { program: user.program, totalPoints: 0, totalStamps: 0, count: 0 };
    }
    acc[user.program].totalPoints += user.points;
    acc[user.program].totalStamps += user.stamps;
    acc[user.program].count += 1;
    return acc;
  }, {});

  const programLeaderboard = Object.values(programStats)
    .map(prog => ({
      ...prog,
      avgPoints: Math.round(prog.totalPoints / prog.count),
      avgStamps: (prog.totalStamps / prog.count).toFixed(1),
    }))
    .sort((a, b) => b.avgPoints - a.avgPoints);

  const currentUserRank = mockLeaderboard.findIndex(u => u.name === mockUser.name) + 1;

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
              <p className="text-2xl font-bold">#{mockUser.rank}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Your Points</p>
              <p className="text-2xl font-bold">{mockUser.points}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Stamps</p>
              <p className="text-2xl font-bold">{mockUser.stampsCollected.length}</p>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300">
          {viewMode === 'individual' ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockLeaderboard.map((user) => {
                const isCurrentUser = user.name === mockUser.name;
                return (
                  <div
                    key={user.rank}
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
                            {user.name}
                            {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.program}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800 dark:text-white">{user.points} pts</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.stamps} stamps</p>
                      </div>
                    </div>
                  </div>
                );
              })}
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

