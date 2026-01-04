import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ShockwaveEffect - Radiating transformation wave animation
 * 
 * Props:
 * - isActive: boolean to trigger the shockwave
 * - origin: { x, y } coordinates for the shockwave origin
 * - color: hex color for the shockwave (default: cyan)
 * - duration: duration in milliseconds (default: 1500)
 * - onComplete: callback when animation completes
 */
export default function ShockwaveEffect({ 
  isActive = false, 
  origin = { x: 0, y: 0 }, 
  color = '#00FFFF', 
  duration = 1500,
  onComplete = () => {} 
}) {
  const [showEffect, setShowEffect] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      setShowEffect(true);
      const timer = setTimeout(() => {
        setShowEffect(false);
        onComplete();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete]);
  
  if (!showEffect) return null;
  
  // Calculate maximum radius needed to cover entire screen
  const maxRadius = Math.max(
    Math.sqrt(origin.x ** 2 + origin.y ** 2),
    Math.sqrt((window.innerWidth - origin.x) ** 2 + origin.y ** 2),
    Math.sqrt(origin.x ** 2 + (window.innerHeight - origin.y) ** 2),
    Math.sqrt((window.innerWidth - origin.x) ** 2 + (window.innerHeight - origin.y) ** 2)
  ) + 100; // Add buffer
  
  return (
    <AnimatePresence>
      {showEffect && (
        <div 
          className="fixed inset-0 pointer-events-none z-40"
          style={{ overflow: 'hidden' }}
        >
          {/* Primary shockwave */}
          <motion.div
            initial={{ 
              width: 0, 
              height: 0,
              opacity: 1 
            }}
            animate={{ 
              width: maxRadius * 2, 
              height: maxRadius * 2,
              opacity: 0
            }}
            transition={{ 
              duration: duration / 1000,
              ease: [0.4, 0, 0.2, 1] // ease-out
            }}
            className="absolute rounded-full"
            style={{
              left: `${origin.x}px`,
              top: `${origin.y}px`,
              transform: 'translate(-50%, -50%)',
              border: `4px solid ${color}`,
              boxShadow: `0 0 30px ${color}, inset 0 0 30px ${color}`,
            }}
          />
          
          {/* Secondary shockwave (delayed) */}
          <motion.div
            initial={{ 
              width: 0, 
              height: 0,
              opacity: 0.7 
            }}
            animate={{ 
              width: maxRadius * 2, 
              height: maxRadius * 2,
              opacity: 0
            }}
            transition={{ 
              duration: duration / 1000,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1
            }}
            className="absolute rounded-full"
            style={{
              left: `${origin.x}px`,
              top: `${origin.y}px`,
              transform: 'translate(-50%, -50%)',
              border: `6px solid ${color}`,
              boxShadow: `0 0 40px ${color}`,
            }}
          />
          
          {/* Radial gradient fill */}
          <motion.div
            initial={{ 
              width: 0, 
              height: 0,
              opacity: 0.4 
            }}
            animate={{ 
              width: maxRadius * 2, 
              height: maxRadius * 2,
              opacity: 0
            }}
            transition={{ 
              duration: duration / 1000,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute rounded-full"
            style={{
              left: `${origin.x}px`,
              top: `${origin.y}px`,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color}40, transparent 70%)`,
            }}
          />
          
          {/* Particle burst effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              duration: duration / 1000,
              times: [0, 0.3, 1]
            }}
            className="absolute"
            style={{
              left: `${origin.x}px`,
              top: `${origin.y}px`,
            }}
          >
            {[...Array(12)].map((_, i) => {
              const angle = (i * 360) / 12;
              const distance = 150;
              
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    x: 0, 
                    y: 0,
                    scale: 1,
                    opacity: 1
                  }}
                  animate={{ 
                    x: Math.cos((angle * Math.PI) / 180) * distance,
                    y: Math.sin((angle * Math.PI) / 180) * distance,
                    scale: 0,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: duration / 1000,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: color,
                    boxShadow: `0 0 15px ${color}`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}
          </motion.div>
          
          {/* Flash effect at origin */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 2]
            }}
            transition={{ 
              duration: 0.5,
              times: [0, 0.3, 1]
            }}
            className="absolute rounded-full"
            style={{
              left: `${origin.x}px`,
              top: `${origin.y}px`,
              width: '100px',
              height: '100px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color}, transparent)`,
              filter: 'blur(20px)',
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
