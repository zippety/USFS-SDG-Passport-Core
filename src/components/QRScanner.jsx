import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scan, CheckCircle, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockStamps } from '../data/mockStamps';
import { getSDGColor, getSDGName, getSDGIcon } from '../utils/sdgData';
import SurveyModal from './SurveyModal';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';

export default function QRScanner({ user, showToast }) {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedStamp, setScannedStamp] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [hasShownSurvey, setHasShownSurvey] = useState(false);
  const [inputCode, setInputCode] = useState("");

  // Get available stamps (not yet collected)
  const availableStamps = mockStamps.filter(
    stamp => !user.stampsCollected?.includes(stamp.sdgNumber)
  );

  const handleScan = async (code = null) => {
    // Check if stamps are available BEFORE scanning
    if (availableStamps.length === 0) {
      if (showToast) showToast('All stamps collected! 🎉');
      return;
    }

    setIsScanning(true);

    // Determine which stamp to award based on code or random
    const randomStamp = code === "12345"
      ? availableStamps[0] // Award first available for demo code
      : availableStamps[Math.floor(Math.random() * availableStamps.length)];

    const action = randomStamp.actions[0];

    // Simulate scanning delay 
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Update Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        stampsCollected: arrayUnion(randomStamp.sdgNumber),
        points: increment(action.points)
      });

      setScannedStamp(randomStamp);
      setIsScanning(false);
      setShowSuccess(true);
      if (showToast) showToast(`Stamp Collected: ${randomStamp.name}!`);

      // 🎉 CONFETTI CELEBRATION!
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#006838', '#009FA1', '#FFD700', '#22c55e', '#ef4444']
      });

      // Hide success after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setScannedStamp(null);

        // Show survey after first stamp collection (only once)
        if (!hasShownSurvey && user.stampsCollected?.length === 0) {
          setShowSurvey(true);
          setHasShownSurvey(true);
        }
      }, 3000);

    } catch (err) {
      console.error("Scan error:", err);
      setIsScanning(false);
      if (showToast) showToast("Error saving stamp. Try again.");
    }
  };

  const handleCodeSubmit = (e) => {
    if (e.key === 'Enter' || inputCode === "12345") {
      if (inputCode === "12345") {
        setInputCode("");
        handleScan("12345");
      } else if (inputCode.length > 0) {
        if (showToast) showToast("Invalid Demo Code");
        setInputCode("");
      }
    }
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

        {/* Secret Code Input (For Demo) */}
        <div className="mb-6">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 ml-2">Hardware Bypass (Demo Code)</p>
          <input
            type="text"
            value={inputCode}
            onKeyDown={handleCodeSubmit}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="ENTER BOOTH CODE"
            className="w-full bg-gray-800 text-white rounded-xl p-6 text-center text-2xl font-black tracking-widest border border-gray-700 focus:border-emerald-500 focus:outline-none placeholder-gray-700 transition-all"
            disabled={isScanning}
          />
        </div>

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Scan className="w-6 h-6" />
          <span>{isScanning ? 'Verifying Code...' : 'Simulate Camera Scan'}</span>
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

        {/* Partner Location: Responsible Cafes */}
        <div className="mt-6 bg-gradient-to-r from-amber-900/50 to-amber-800/50 rounded-lg p-4 border border-amber-700/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">☕</span>
            <h3 className="text-white font-semibold">Responsible Cafes Partner</h3>
          </div>
          <div className="flex gap-4">
            <img
              src="/table_tent_example.png"
              alt="Look for this table tent at partner cafés"
              className="w-32 h-32 object-cover rounded-lg border-2 border-amber-600/50"
            />
            <div className="flex-1">
              <p className="text-amber-100 text-sm mb-2">Look for this table tent at partner cafés!</p>
              <ul className="text-amber-200 text-xs space-y-1">
                <li>✓ Bring your reusable cup</li>
                <li>✓ Buy your drink</li>
                <li>✓ Scan the QR on the table tent</li>
                <li>✓ Earn 20 SDG points!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-2">How to use:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Visit a pop-up booth or partner café</li>
            <li>• Complete the SDG action</li>
            <li>• Scan the QR code</li>
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

