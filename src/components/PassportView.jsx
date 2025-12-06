import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Trophy, BookOpen, Scan, MessageSquare } from 'lucide-react';
import UserProfile from './UserProfile';
import StampCard from './StampCard';
import SurveyModal from './SurveyModal';
import { mockUser } from '../data/mockUser';
import { getSDGName } from '../utils/sdgData';

export default function PassportView() {
  const navigate = useNavigate();
  const [user] = useState(mockUser);
  const [showSurvey, setShowSurvey] = useState(false);
  
  // Generate all 17 SDG numbers
  const allSDGs = Array.from({ length: 17 }, (_, i) => i + 1);
  
  const handleStampClick = (sdgNumber) => {
    navigate(`/catalog?sdg=${sdgNumber}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pb-8">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SDG Passport</h1>
          <p className="text-gray-600">Collect stamps for Sustainable Development Goals</p>
        </div>
        
        <UserProfile user={user} />
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Stamps</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {allSDGs.map((sdgNumber) => (
              <StampCard
                key={sdgNumber}
                sdgNumber={sdgNumber}
                isCollected={user.stampsCollected.includes(sdgNumber)}
                onClick={() => handleStampClick(sdgNumber)}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/scan')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
          >
            <Scan className="w-6 h-6" />
            <span>Scan for Stamp</span>
          </button>
          
          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
          >
            <Trophy className="w-6 h-6" />
            <span>Leaderboard</span>
          </button>
        </div>
        
        <button
          onClick={() => navigate('/catalog')}
          className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
        >
          <BookOpen className="w-6 h-6" />
          <span>View All SDGs</span>
        </button>
        
        {/* Optional Survey Button */}
        <button
          onClick={() => setShowSurvey(true)}
          className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 shadow transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-medium"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Share Your Feedback (Optional)</span>
        </button>
      </div>
      
      {/* Survey Modal */}
      <SurveyModal 
        isOpen={showSurvey} 
        onClose={() => setShowSurvey(false)}
        trigger="dashboard"
      />
    </div>
  );
}

