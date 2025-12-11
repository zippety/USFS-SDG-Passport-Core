import { Trophy, Award } from 'lucide-react';

export default function UserProfile({ user }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-usfs-green to-usfs-teal flex items-center justify-center text-3xl overflow-hidden border-2 border-white shadow-md">
            <img src="/dj_face.jpg" alt={user.name} className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user.role ? (
                <span className="font-bold text-purple-600 dark:text-purple-400">{user.role}</span>
              ) : (
                `${user.program || 'Student'} • ${user.campus || 'Newnham'}`
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-900 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-1">
            <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Points</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{user.points}</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-900 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-center space-x-2 mb-1">
            <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Rank</span>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">#{user.rank}</div>
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

