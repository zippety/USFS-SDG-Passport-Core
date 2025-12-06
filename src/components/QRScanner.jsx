import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scan, CheckCircle, Sparkles } from 'lucide-react';
import { mockUser } from '../data/mockUser';
import { mockStamps } from '../data/mockStamps';
import { getSDGColor, getSDGName, getSDGIcon } from '../utils/sdgData';
import SurveyModal from './SurveyModal';

export default function QRScanner() {
  const navigate = useNavigate();
  const [user, setUser] = useState(mockUser);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedStamp, setScannedStamp] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [hasShownSurvey, setHasShownSurvey] = useState(false);
  
  // Get available stamps (not yet collected)
  const availableStamps = mockStamps.filter(
    stamp => !user.stampsCollected.includes(stamp.sdgNumber)
  );
  
  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      if (availableStamps.length > 0) {
        // Randomly select an available stamp
        const randomStamp = availableStamps[Math.floor(Math.random() * availableStamps.length)];
        const action = randomStamp.actions[0]; // Get first action
        
        // Update user state
        const newStamps = [...user.stampsCollected, randomStamp.sdgNumber];
        const newPoints = user.points + action.points;
        
        setUser({
          ...user,
          stampsCollected: newStamps,
          points: newPoints,
        });
        
        setScannedStamp(randomStamp);
        setIsScanning(false);
        setShowSuccess(true);
        
        // Hide success after 3 seconds, then show survey if first stamp
        setTimeout(() => {
          setShowSuccess(false);
          setScannedStamp(null);
          
          // Show survey after first stamp collection (only once)
          if (!hasShownSurvey && user.stampsCollected.length === 0) {
            setTimeout(() => {
              setShowSurvey(true);
              setHasShownSurvey(true);
            }, 500);
          }
        }, 3000);
      } else {
        setIsScanning(false);
        alert('All stamps collected! 🎉');
      }
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Passport</span>
        </button>
        
        <h1 className="text-3xl font-bold text-white mb-2">Scan QR Code</h1>
        <p className="text-gray-300 mb-6">Point your camera at the booth QR code</p>
        
        {/* Scanner View */}
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl mb-6 relative">
          <div className="aspect-square relative">
            {/* Simulated camera view */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
                  <p className="text-white text-lg font-medium">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Scan className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Ready to scan</p>
                </div>
              )}
            </div>
            
            {/* Scanner overlay frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-green-500 rounded-lg relative">
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Scan className="w-6 h-6" />
          <span>{isScanning ? 'Scanning...' : 'Tap to Scan QR Code'}</span>
        </button>
        
        {/* Success Animation */}
        {showSuccess && scannedStamp && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center animate-scaleIn">
              <div className="mb-4">
                <div
                  className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-4"
                  style={{ backgroundColor: `${getSDGColor(scannedStamp.sdgNumber)}20` }}
                >
                  {getSDGIcon(scannedStamp.sdgNumber)}
                </div>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Stamp Collected!</h2>
                <p className="text-lg font-semibold" style={{ color: getSDGColor(scannedStamp.sdgNumber) }}>
                  SDG {scannedStamp.sdgNumber}: {getSDGName(scannedStamp.sdgNumber)}
                </p>
                <p className="text-gray-600 mt-2">
                  +{scannedStamp.actions[0].points} points
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-gray-600">Total: {user.points} points</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Instructions */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">How to use:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Visit a pop-up booth on campus</li>
            <li>• Complete the SDG action</li>
            <li>• Scan the QR code at the booth</li>
            <li>• Get instant stamp and points!</li>
          </ul>
        </div>
      </div>
      
      {/* Survey Modal */}
      <SurveyModal 
        isOpen={showSurvey} 
        onClose={() => setShowSurvey(false)}
        trigger="stamp_collection"
      />
    </div>
  );
}

