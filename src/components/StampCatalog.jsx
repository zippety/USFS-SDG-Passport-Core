import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { mockStamps } from '../data/mockStamps';
import { mockUser } from '../data/mockUser';
import { getSDGColor, getSDGName } from '../utils/sdgData';

// Official UN SDG Tile Image URLs
const SDG_TILE_URLS = {
  1: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg',
  2: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg',
  3: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg',
  4: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg',
  5: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg',
  6: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg',
  7: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg',
  8: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg',
  9: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg',
  10: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg',
  11: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg',
  12: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg',
  13: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg',
  14: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg',
  15: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg',
  16: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg',
  17: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg',
};

export default function StampCatalog({ user }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSDG = searchParams.get('sdg') ? parseInt(searchParams.get('sdg')) : null;
  const [expandedSDG, setExpandedSDG] = useState(selectedSDG);

  const filteredStamps = selectedSDG
    ? mockStamps.filter(s => s.sdgNumber === selectedSDG)
    : mockStamps;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12 transition-colors duration-300 font-sans">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center space-x-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-all bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Passport</span>
        </button>

        <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tighter">SDG Catalog</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Master the 17 Sustainable Development Goals to earn your global certification.</p>

        <div className="space-y-6">
          {filteredStamps.map((stamp) => {
            const isCollected = user.stampsCollected?.includes(stamp.sdgNumber);
            const isExpanded = expandedSDG === stamp.sdgNumber;
            const color = getSDGColor(stamp.sdgNumber);
            const tileUrl = SDG_TILE_URLS[stamp.sdgNumber];

            return (
              <div
                key={stamp.sdgNumber}
                className={`bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl overflow-hidden transition-all duration-500 border-2 ${isExpanded ? 'border-emerald-500/50' : 'border-transparent'}`}
              >
                <div
                  className="p-6 cursor-pointer group"
                  onClick={() => setExpandedSDG(isExpanded ? null : stamp.sdgNumber)}
                >
                  <div className="flex items-center space-x-6">
                    {/* Official UN SDG Tile */}
                    <img
                      src={tileUrl}
                      alt={`SDG ${stamp.sdgNumber}`}
                      className="w-20 h-20 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Goal {stamp.sdgNumber}</span>
                            {stamp.prerequisites && (
                              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                                <Lock size={10} />
                                Req: {stamp.prerequisites.map(p => `SDG ${p}`).join(', ')}
                              </div>
                            )}
                          </div>
                          <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                            {stamp.name}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3">
                          {isCollected ? (
                            <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full uppercase tracking-widest">
                              <CheckCircle className="w-4 h-4" />
                              Collected
                            </span>
                          ) : (
                            <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors">
                              View Missions
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-8 pb-8 pt-0 animate-fadeIn bg-slate-50/50 dark:bg-black/10 border-t dark:border-slate-700/50">
                    <div className="py-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Missions</h4>
                        <span className="text-[10px] font-bold text-slate-500 italic">Complete any to earn stamp</span>
                      </div>

                      <div className="grid gap-3">
                        {stamp.actions.map((action) => (
                          <div
                            key={action.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/30 transition-all shadow-sm group/action"
                          >
                            <div className="flex-1 mb-3 md:mb-0">
                              <p className="text-slate-800 dark:text-slate-200 font-bold mb-1">{action.description}</p>
                              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-indigo-500 flex items-center gap-1">
                                  ⌛ {action.estimatedTime || '30 mins'}
                                </span>
                                {action.verified && (
                                  <span className="text-emerald-500 flex items-center gap-1">
                                    ✓ Instant Result
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6">
                              <div className="text-right">
                                <span className="block text-lg font-black text-indigo-500 leading-none">+{action.points}</span>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">SDG Points</span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate('/scan');
                                }}
                                className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
                              >
                                Start Mission
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

