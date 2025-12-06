import { CheckCircle2 } from 'lucide-react';
import { getSDGColor, getSDGName, getSDGIcon } from '../utils/sdgData';

export default function StampCard({ sdgNumber, isCollected, onClick }) {
  const color = getSDGColor(sdgNumber);
  const name = getSDGName(sdgNumber);
  const icon = getSDGIcon(sdgNumber);
  
  return (
    <div
      onClick={onClick}
      className={`stamp-card ${isCollected ? 'stamp-collected' : 'stamp-locked'} cursor-pointer relative overflow-hidden border-2`}
      style={{ 
        backgroundColor: isCollected ? `${color}15` : '#f3f4f6',
        borderColor: isCollected ? color : '#d1d5db',
      }}
    >
      {isCollected && (
        <div 
          className="absolute top-1 right-1"
          style={{ color: color }}
        >
          <CheckCircle2 className="w-5 h-5 fill-current" />
        </div>
      )}
      <div className="text-center">
        <div className={`text-4xl mb-2 ${isCollected ? '' : 'grayscale opacity-50'}`}>{icon}</div>
        <div className="text-xs font-semibold" style={{ color: isCollected ? color : '#9ca3af' }}>
          SDG {sdgNumber}
        </div>
        <div className={`text-xs mt-1 ${isCollected ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{name}</div>
        {isCollected && (
          <div className="mt-2 flex items-center justify-center">
            <span className="text-green-600 text-xs font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Collected</span>
            </span>
          </div>
        )}
        {!isCollected && (
          <div className="mt-2">
            <span className="text-gray-400 text-xs">Locked</span>
          </div>
        )}
      </div>
    </div>
  );
}

