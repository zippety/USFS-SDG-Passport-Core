import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { mockStamps } from '../data/mockStamps';
import { mockUser } from '../data/mockUser';
import { getSDGColor, getSDGName, getSDGIcon } from '../utils/sdgData';

export default function StampCatalog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSDG = searchParams.get('sdg') ? parseInt(searchParams.get('sdg')) : null;
  const [user] = useState(mockUser);

  const filteredStamps = selectedSDG
    ? mockStamps.filter(s => s.sdgNumber === selectedSDG)
    : mockStamps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pb-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Passport</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">SDG Catalog</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Explore all 17 Sustainable Development Goals</p>

        <div className="space-y-4">
          {filteredStamps.map((stamp) => {
            const isCollected = user.stampsCollected.includes(stamp.sdgNumber);
            const color = getSDGColor(stamp.sdgNumber);
            const icon = getSDGIcon(stamp.sdgNumber);

            return (
              <div
                key={stamp.sdgNumber}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
                style={{ borderLeft: `8px solid ${color}` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    {icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          SDG {stamp.sdgNumber}: {stamp.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {isCollected ? (
                            <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center space-x-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                              <CheckCircle className="w-4 h-4" />
                              <span>Collected</span>
                            </span>
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center space-x-1 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded">
                              <Lock className="w-4 h-4" />
                              <span>Locked • Complete actions to unlock</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Actions:</p>
                      <div className="space-y-2">
                        {stamp.actions.map((action) => (
                          <div
                            key={action.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
                          >
                            <span className="text-sm text-gray-700 dark:text-gray-200">{action.description}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                +{action.points} pts
                              </span>
                              {action.verified && (
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium border border-green-200 dark:border-green-800">
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

