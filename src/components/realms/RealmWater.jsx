import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * RealmWater - Realm 6 (Clean Water) visual representation
 * 
 * Props:
 * - state: 'corrupted' | 'restoring' | 'restored'
 * - realm: realm data object with colors and configuration
 */
export default function RealmWater({ state = 'corrupted', realm }) {
  const [fishPositions, setFishPositions] = useState([]);
  const isCorrupted = state === 'corrupted';
  const isRestored = state === 'restored';
  
  // Initialize fish positions
  useEffect(() => {
    const positions = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + (i * 11) + Math.random() * 5,
      y: 40 + Math.random() * 30,
      size: 20 + Math.random() * 15,
      speed: 2 + Math.random() * 3,
    }));
    setFishPositions(positions);
  }, []);
  
  // Animate fish swimming (for restored state)
  useEffect(() => {
    if (!isRestored) return;
    
    const interval = setInterval(() => {
      setFishPositions(prev => prev.map(fish => ({
        ...fish,
        x: (fish.x + fish.speed * 0.5) % 100,
        y: fish.y + Math.sin(Date.now() / 1000 + fish.id) * 0.3,
      })));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isRestored]);
  
  // Sky gradient
  const skyGradient = isCorrupted
    ? `linear-gradient(to bottom, ${realm.colors.corrupted.sky} 0%, ${realm.colors.corrupted.accent} 100%)`
    : `linear-gradient(to bottom, ${realm.colors.restored.sky} 0%, #B8E6F5 100%)`;
  
  // Water gradient
  const waterGradient = isCorrupted
    ? `linear-gradient(to bottom, ${realm.colors.corrupted.primary} 0%, ${realm.colors.corrupted.secondary} 100%)`
    : `linear-gradient(to bottom, ${realm.colors.restored.primary} 0%, ${realm.colors.restored.secondary} 100%)`;
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky Layer */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          background: skyGradient,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Clouds (only in restored state) */}
        {isRestored && (
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ 
                  x: ['0%', '100%'],
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: 'linear'
                }}
                className="absolute bg-white rounded-full blur-sm"
                style={{
                  top: `${10 + i * 8}%`,
                  width: `${60 + i * 20}px`,
                  height: `${30 + i * 10}px`,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Water Surface Line */}
      <div className="absolute w-full" style={{ top: '35%' }}>
        <motion.div
          className="h-1"
          initial={false}
          animate={{
            background: isCorrupted 
              ? realm.colors.corrupted.accent
              : realm.colors.restored.accent,
            opacity: isCorrupted ? 0.3 : 0.6,
          }}
          transition={{ duration: 1.5 }}
        />
      </div>
      
      {/* Water Layer */}
      <motion.div
        className="absolute w-full"
        style={{ top: '35%', height: '65%' }}
        initial={false}
        animate={{
          background: waterGradient,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Water ripples/bubbles effect */}
        {isRestored && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  bottom: '-10%',
                  left: `${Math.random() * 100}%`,
                  scale: 0 
                }}
                animate={{ 
                  bottom: '110%',
                  scale: [0, 1, 0.8, 0],
                  opacity: [0, 0.3, 0.3, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut'
                }}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${5 + Math.random() * 10}px`,
                  height: `${5 + Math.random() * 10}px`,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Toxic bubbles (corrupted state) */}
        {isCorrupted && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${10 + Math.random() * 20}px`,
                  height: `${10 + Math.random() * 20}px`,
                  background: `${realm.colors.corrupted.secondary}80`,
                  filter: 'blur(4px)',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Fish */}
      <div className="absolute inset-0" style={{ top: '35%' }}>
        {fishPositions.map((fish) => (
          <motion.div
            key={fish.id}
            className="absolute"
            initial={false}
            animate={{
              left: `${fish.x}%`,
              top: `${fish.y}%`,
              rotate: isCorrupted ? [0, 180] : 0,
              scale: isCorrupted ? 1 : [1, 1.1, 1],
            }}
            transition={{ 
              duration: isCorrupted ? 0 : 2,
              repeat: isCorrupted ? 0 : Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: `${fish.size}px`,
              height: `${fish.size}px`,
            }}
          >
            {/* Fish emoji or simple shape */}
            <motion.div
              initial={false}
              animate={{
                filter: isCorrupted 
                  ? 'grayscale(100%) brightness(0.5)' 
                  : 'grayscale(0%) brightness(1)',
              }}
              transition={{ duration: 1.5 }}
              className="text-2xl"
            >
              {isCorrupted ? '🐟' : '🐠'}
            </motion.div>
            
            {/* Glitch effect for corrupted fish */}
            {isCorrupted && (
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 1 + Math.random() * 2,
                }}
                className="absolute inset-0 bg-red-500 mix-blend-difference"
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Reeds/Vegetation on sides */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 flex justify-between">
        {/* Left reeds */}
        <div className="flex gap-2 items-end pl-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`left-${i}`}
              initial={false}
              animate={{
                height: isCorrupted ? '30%' : `${40 + i * 10}%`,
                background: isCorrupted 
                  ? realm.colors.corrupted.accent
                  : '#2D5016',
                rotate: isCorrupted ? 0 : [0, 2, 0, -2, 0],
              }}
              transition={{ 
                height: { duration: 1.5 },
                rotate: { 
                  duration: 3 + i * 0.5, 
                  repeat: isCorrupted ? 0 : Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="w-2 rounded-t-full origin-bottom"
            />
          ))}
        </div>
        
        {/* Right reeds */}
        <div className="flex gap-2 items-end pr-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`right-${i}`}
              initial={false}
              animate={{
                height: isCorrupted ? '30%' : `${40 + i * 10}%`,
                background: isCorrupted 
                  ? realm.colors.corrupted.accent
                  : '#2D5016',
                rotate: isCorrupted ? 0 : [0, -2, 0, 2, 0],
              }}
              transition={{ 
                height: { duration: 1.5 },
                rotate: { 
                  duration: 3 + i * 0.5, 
                  repeat: isCorrupted ? 0 : Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="w-2 rounded-t-full origin-bottom"
            />
          ))}
        </div>
      </div>
      
      {/* Lily pads (restored only) */}
      {isRestored && (
        <div className="absolute" style={{ top: '35%', left: 0, right: 0 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                scale: { duration: 1, delay: i * 0.2 },
                rotate: { duration: 4, repeat: Infinity, delay: i * 0.5 }
              }}
              className="absolute w-8 h-8 rounded-full"
              style={{
                background: '#2D5016',
                left: `${15 + i * 12}%`,
                top: `${10 + (i % 2) * 15}%`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            >
              {/* Lily flower */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.2 }}
                  className="text-xs"
                >
                  🌸
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-20" />
      </div>
    </div>
  );
}
