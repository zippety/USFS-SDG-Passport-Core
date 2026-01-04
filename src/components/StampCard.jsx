import { Lock, CheckCircle2 } from 'lucide-react';

// Official UN SDG Tile Image URLs (from UN website)
const SDG_TILE_URLS = {
  1: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg',
  2: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg',
  3: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg',
  4: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg',
  5: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg',
  6: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg',
  7: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg',
  8: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg',
  9: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg',
  10: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg',
  11: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg',
  12: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg',
  13: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg',
  14: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg',
  15: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg',
  16: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg',
  17: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg',
};

export default function StampCard({ sdgNumber, isCollected, onClick }) {
  const tileUrl = SDG_TILE_URLS[sdgNumber];

  return (
    <div
      onClick={onClick}
      className={`
        relative aspect-square rounded-md overflow-hidden cursor-pointer 
        transition-all duration-300 hover:scale-105 active:scale-95
        ${isCollected ? 'shadow-lg hover:shadow-xl' : 'grayscale opacity-50 hover:opacity-75 hover:grayscale-[50%]'}
      `}
    >
      {/* Official UN SDG Tile Image */}
      <img
        src={tileUrl}
        alt={`SDG ${sdgNumber}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Collection Badge Overlay */}
      {isCollected ? (
        <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
      ) : (
        <div className="absolute top-1 right-1 bg-black/40 rounded-full p-0.5">
          <Lock className="w-3 h-3 text-white/80" />
        </div>
      )}

      {/* Shine effect for collected */}
      {isCollected && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}


