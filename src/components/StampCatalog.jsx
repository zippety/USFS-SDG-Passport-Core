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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-8">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Passport</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">SDG Catalog</h1>
        <p className="text-gray-600 mb-6">Explore all 17 Sustainable Development Goals</p>
        
        <div className="space-y-4">
          {filteredStamps.map((stamp) => {
            const isCollected = user.stampsCollected.includes(stamp.sdgNumber);
            const color = getSDGColor(stamp.sdgNumber);
            const icon = getSDGIcon(stamp.sdgNumber);
            
            return (
              <div
                key={stamp.sdgNumber}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    {icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          SDG {stamp.sdgNumber}: {stamp.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {isCollected ? (
                            <span className="text-green-600 text-sm font-medium flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>Collected</span>
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm font-medium flex items-center space-x-1">
                              <Lock className="w-4 h-4" />
                              <span>Not Collected</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Available Actions:</p>
                      <div className="space-y-2">
                        {stamp.actions.map((action) => (
                          <div
                            key={action.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">{action.description}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-semibold text-gray-600">
                                +{action.points} pts
                              </span>
                              {action.verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
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

