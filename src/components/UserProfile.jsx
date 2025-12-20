import { useState, useEffect } from 'react';
import { Trophy, Award, Zap, Star, ShieldCheck } from 'lucide-react';

export default function UserProfile({ user }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  // Calculate XP progress percentage
  const xpProgress = user.xp && user.xpToNextLevel
    ? Math.min(100, (user.xp / user.xpToNextLevel) * 100)
    : 10;

  useEffect(() => {
    // Animate fill on load/update
    const timer = setTimeout(() => {
      setAnimatedWidth(xpProgress);
    }, 500);
    return () => clearTimeout(timer);
  }, [xpProgress]);

  const isNearingNextLevel = xpProgress > 80;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-6 transition-all duration-500 border border-gray-100 dark:border-slate-700 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-usfs-green to-usfs-teal p-1 shadow-2xl overflow-hidden group-hover:scale-105 transition-transform">
              <img
                src="/dj_face.jpg"
                alt={user.name}
                className="w-full h-full object-cover object-top rounded-full bg-white dark:bg-slate-900"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-800 animate-bounce-slow">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter leading-none mb-2">{user.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded">
                {user.role || 'Member'}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {user.program || 'Seneca Student'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* XP BAR SECTION */}
      <div className={`bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 mb-6 border border-slate-100 dark:border-slate-800 relative ${isNearingNextLevel ? 'ring-2 ring-emerald-500/20' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-indigo-500/20">
              <Star size={12} fill="currentColor" />
              Level {user.level || 1}
            </div>
            {isNearingNextLevel && (
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">
                Next Level Imminent! 🚀
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs font-black text-slate-800 dark:text-slate-200">
              <Zap size={14} className="text-indigo-500" />
              {user.xp || 0} <span className="text-slate-400 font-bold">/ {user.xpToNextLevel || 1000}</span>
            </div>
          </div>
        </div>

        <div className="relative h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700 shadow-inner">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out relative shadow-lg"
            style={{ width: `${animatedWidth}%` }}
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          </div>

          {/* Milestone Markers */}
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-30">
            <div className="h-full w-[1px] bg-white bg-opacity-50"></div>
            <div className="h-full w-[1px] bg-white bg-opacity-50 ml-[25%]"></div>
            <div className="h-full w-[1px] bg-white bg-opacity-50 ml-[50%]"></div>
            <div className="h-full w-[1px] bg-white bg-opacity-50 ml-[75%]"></div>
            <div className="h-full w-[1px] bg-white bg-opacity-50"></div>
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
          <span className="text-slate-400">Class: Sustainer</span>
          <span className="text-indigo-500">{user.xpToNextLevel - user.xp} XP NEEDED</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm group hover:border-indigo-500/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points</span>
          </div>
          <div className="text-3xl font-black text-slate-800 dark:text-white tabular-nums tracking-tighter">{user.points}</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm group hover:border-emerald-500/50 transition-colors cursor-pointer overflow-hidden relative">
          {/* Shimmer for Rank */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</span>
          </div>
          <div className="text-3xl font-black text-emerald-500 tabular-nums tracking-tighter">#{user.rank || '12'}</div>
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

