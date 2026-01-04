import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Info } from 'lucide-react';
import RealmWater from './RealmWater';
import ChannelProgress from './ChannelProgress';
import ShockwaveEffect from './ShockwaveEffect';
import { getRealm } from '../../data/realms';
import { REALM_STATES } from '../../utils/realmHelpers';

/**
 * RealmView - Main realm container and orchestrator
 * 
 * Props:
 * - realmId: number (e.g., 6 for Clean Water)
 */
export default function RealmView({ realmId = 6 }) {
  const navigate = useNavigate();
  const realm = getRealm(realmId);
  
  // State management
  const [realmState, setRealmState] = useState(REALM_STATES.CORRUPTED);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const [showShockwave, setShowShockwave] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Refs
  const holdStartTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isHoldingRef = useRef(false);
  
  // Handle hold start (mouse/touch)
  const handleHoldStart = (e) => {
    // Only allow interaction in corrupted state
    if (realmState !== REALM_STATES.CORRUPTED) return;
    
    // Get position
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    
    setTouchPosition({ x: clientX, y: clientY });
    setIsHolding(true);
    isHoldingRef.current = true;
    setShowInstructions(false);
    holdStartTimeRef.current = Date.now();
    
    // Start progress animation
    const updateProgress = () => {
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min((elapsed / realm.interaction.holdDuration) * 100, 100);
      
      setHoldProgress(progress);
      
      if (progress >= 100) {
        // Hold complete!
        handleHoldComplete();
      } else if (isHoldingRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  };
  
  // Handle hold end (mouse/touch)
  const handleHoldEnd = () => {
    if (!isHolding) return;
    
    setIsHolding(false);
    isHoldingRef.current = false;
    
    // Cancel animation if not complete
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Reset if released early
    if (holdProgress < 100) {
      setHoldProgress(0);
      holdStartTimeRef.current = null;
      // Show instructions again if released early
      setTimeout(() => setShowInstructions(true), 500);
    }
  };
  
  // Handle hold complete
  const handleHoldComplete = () => {
    setIsHolding(false);
    isHoldingRef.current = false;
    setRealmState(REALM_STATES.RESTORING);
    
    // Trigger shockwave
    setTimeout(() => {
      setShowShockwave(true);
    }, 100);
  };
  
  // Handle shockwave complete
  const handleShockwaveComplete = () => {
    setShowShockwave(false);
    setRealmState(REALM_STATES.RESTORED);
    setHoldProgress(0);
    holdStartTimeRef.current = null;
    
    // Show completion toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Auto-hide instructions after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!realm) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Realm Not Found</h1>
          <p className="text-slate-400">Realm {realmId} does not exist.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="relative w-full h-screen overflow-hidden select-none"
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      style={{ 
        cursor: realmState === REALM_STATES.CORRUPTED ? 'pointer' : 'default',
        touchAction: 'none' // Prevent scroll on mobile
      }}
    >
      {/* Realm Visual Layer */}
      <RealmWater state={realmState} realm={realm} />
      
      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          {/* Realm Info */}
          <div className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-sm text-white rounded-full">
            <div className="text-2xl">💧</div>
            <div>
              <div className="text-sm font-bold leading-tight">{realm.name}</div>
              <div className="text-xs opacity-70 leading-tight">{realm.subtitle}</div>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              realmState === REALM_STATES.CORRUPTED ? 'bg-red-500 animate-pulse' :
              realmState === REALM_STATES.RESTORING ? 'bg-yellow-500 animate-pulse' :
              'bg-emerald-500'
            }`} />
          </div>
        </div>
        
        {/* Instructions (center, fades out) */}
        <AnimatePresence>
          {showInstructions && realmState === REALM_STATES.CORRUPTED && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <div className="bg-black/60 backdrop-blur-md text-white px-8 py-6 rounded-2xl text-center border border-white/20 shadow-2xl">
                <div className="text-4xl mb-3">✋</div>
                <div className="text-lg font-bold mb-1">
                  {realm.interaction.instructionText}
                </div>
                <div className="text-sm opacity-70">
                  Hold for {realm.interaction.holdDuration / 1000} seconds to begin restoration
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* State Description (bottom) */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full text-center border border-white/20 max-w-md"
          >
            <div className="text-xs font-medium opacity-70 uppercase tracking-wider mb-1">
              {realm.states[realmState].name}
            </div>
            <div className="text-sm">
              {realm.states[realmState].description}
            </div>
          </motion.div>
        </div>
        
        {/* Completion Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 15 }}
              className="absolute top-24 left-1/2 transform -translate-x-1/2 pointer-events-auto"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">✨</div>
                  <div>
                    <div className="font-bold text-sm mb-1">Realm Restored!</div>
                    <div className="text-xs opacity-90 italic">
                      {realm.interaction.completionMessage}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Channel Progress Ring */}
      <ChannelProgress
        progress={holdProgress}
        position={touchPosition}
        color={realm.colors.shockwave}
        isActive={isHolding}
      />
      
      {/* Shockwave Effect */}
      <ShockwaveEffect
        isActive={showShockwave}
        origin={touchPosition}
        color={realm.colors.shockwave}
        duration={realm.interaction.shockwaveDuration}
        onComplete={handleShockwaveComplete}
      />
      
      {/* Subtle ambient glow during hold */}
      {isHolding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${touchPosition.x}px ${touchPosition.y}px, ${realm.colors.shockwave}40, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
