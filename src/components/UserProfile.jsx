import { Trophy, Award } from 'lucide-react';

export default function UserProfile({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-3xl">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.program} • {user.campus}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Points</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{user.points}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-1">
            <Award className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Rank</span>
          </div>
          <div className="text-2xl font-bold text-green-600">#{user.rank}</div>
        </div>
      </div>
      
      {user.badges && user.badges.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Badges:</p>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

