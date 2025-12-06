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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 pb-8">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Passport</span>
        </button>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
            <p className="text-gray-600">Top performers in SDG actions</p>
          </div>
        </div>
        
        {/* View Mode Toggle */}
        <div className="bg-white rounded-lg p-2 mb-6 flex space-x-2 shadow-md">
          <button
            onClick={() => setViewMode('individual')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              viewMode === 'individual'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Trophy className="w-4 h-4 inline mr-2" />
            Individual
          </button>
          <button
            onClick={() => setViewMode('program')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              viewMode === 'program'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {viewMode === 'individual' ? (
            <div className="divide-y divide-gray-200">
              {mockLeaderboard.map((user) => {
                const isCurrentUser = user.name === mockUser.name;
                return (
                  <div
                    key={user.rank}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      isCurrentUser ? 'bg-green-50 border-l-4 border-green-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12">
                          {user.rank <= 3 ? (
                            getRankIcon(user.rank)
                          ) : (
                            <span className="text-lg font-bold text-gray-600">#{user.rank}</span>
                          )}
                        </div>
                        <div>
                          <p className={`font-semibold ${isCurrentUser ? 'text-green-700' : 'text-gray-800'}`}>
                            {user.name}
                            {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                          </p>
                          <p className="text-sm text-gray-600">{user.program}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">{user.points} pts</p>
                        <p className="text-sm text-gray-600">{user.stamps} stamps</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {programLeaderboard.map((prog, idx) => (
                <div key={prog.program} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        <span className="text-lg font-bold text-gray-600">#{idx + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{prog.program}</p>
                        <p className="text-sm text-gray-600">{prog.count} participants</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">{prog.avgPoints} avg pts</p>
                      <p className="text-sm text-gray-600">{prog.avgStamps} avg stamps</p>
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

