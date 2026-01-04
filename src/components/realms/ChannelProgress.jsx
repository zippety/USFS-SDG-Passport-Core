import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ChannelProgress - Circular progress indicator for hold-to-channel interaction
 * 
 * Props:
 * - progress: 0-100 number indicating completion percentage
 * - position: { x, y } coordinates for the ring
 * - color: hex color for the ring
 * - isActive: boolean to show/hide the ring
 */
export default function ChannelProgress({ progress = 0, position = { x: 0, y: 0 }, color = '#00FFFF', isActive = false }) {
  const [pulseScale, setPulseScale] = useState(1);
  
  // Pulse animation during hold
  useEffect(() => {
    if (isActive && progress < 100) {
      const interval = setInterval(() => {
        setPulseScale(prev => prev === 1 ? 1.1 : 1);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isActive, progress]);
  
  if (!isActive) return null;
  
  // Calculate circle properties
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        scale: isActive ? pulseScale : 0 
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60"
        style={{
          width: `${size + 20}px`,
          height: `${size + 20}px`,
          background: `radial-gradient(circle, ${color}80, transparent)`,
          transform: 'translate(-10px, -10px)',
        }}
      />
      
      {/* Progress ring */}
      <svg 
        width={size} 
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.1 }}
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      
      {/* Center text */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ color }}
      >
        <motion.div
          animate={{ scale: progress < 100 ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3, repeat: progress < 100 ? Infinity : 0 }}
          className="text-center"
        >
          <div className="text-2xl font-bold">
            {Math.round(progress)}%
          </div>
          {progress < 100 && (
            <div className="text-xs opacity-70 uppercase tracking-wider">
              Hold
            </div>
          )}
          {progress >= 100 && (
            <div className="text-xs opacity-70 uppercase tracking-wider">
              ✓ Complete
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Sparkle effects */}
      {progress > 50 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const distance = size / 2 + 20;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: color,
                  left: `${size / 2 + x}px`,
                  top: `${size / 2 + y}px`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
