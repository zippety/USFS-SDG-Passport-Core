import { CheckCircle2 } from 'lucide-react';
import { getSDGColor, getSDGName, getSDGIcon } from '../utils/sdgData';

export default function StampCard({ sdgNumber, isCollected, onClick }) {
  const color = getSDGColor(sdgNumber);
  const name = getSDGName(sdgNumber);
  const icon = getSDGIcon(sdgNumber);

  return (
    <div
      onClick={onClick}
      className={`stamp-card group ${isCollected ? 'stamp-collected' : 'stamp-locked'} cursor-pointer relative overflow-hidden border-2 dark:border-gray-700 transition-all duration-300 hover:scale-105 active:scale-95`}
      style={{
        backgroundColor: isCollected ? `${color}15` : undefined,
        borderColor: isCollected ? color : undefined,
      }}
    >
      <div className={`absolute inset-0 -z-10 ${isCollected ? '' : 'bg-gray-100 dark:bg-gray-700/50 transition-colors group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}`} />

      {/* Collector Glow */}
      {isCollected && (
        <div
          className="absolute -inset-4 opacity-20 group-hover:opacity-40 transition-opacity blur-xl rounded-full"
          style={{ backgroundColor: color }}
        />
      )}

      {isCollected && (
        <div
          className="absolute top-1 right-1 z-10"
          style={{ color: color }}
        >
          <CheckCircle2 className="w-5 h-5 fill-current" />
        </div>
      )}

      <div className="text-center relative z-10 pt-2 pb-1">
        <div className={`text-4xl mb-2 transition-all duration-300 ${isCollected ? 'scale-110' : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}`}>
          {icon}
        </div>
        <div className="text-[10px] font-black uppercase tracking-tighter" style={{ color: isCollected ? color : '#9ca3af' }}>
          SDG {sdgNumber}
        </div>

        {isCollected ? (
          <div className="mt-1 flex items-center justify-center">
            <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black flex items-center gap-1 uppercase">
              Collected
            </span>
          </div>
        ) : (
          <div className="mt-1 overflow-hidden h-4 relative">
            <div className="text-[9px] text-gray-500 dark:text-gray-400 transition-transform duration-300 group-hover:-translate-y-full">
              Locked
            </div>
            <div className="absolute inset-0 text-[9px] font-bold text-emerald-500 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              Requirements
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

