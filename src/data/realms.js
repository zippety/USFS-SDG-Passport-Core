// Realm data for The 17 Realms gamification system
// Each realm corresponds to one SDG and has corrupted/restored states

export const REALMS = {
  6: {
    id: 6,
    name: 'Clean Water',
    subtitle: 'The Crystal Stream',
    sdgNumber: 6,
    description: 'A river canyon realm plagued by toxic pollution',
    
    // Visual theme colors
    colors: {
      corrupted: {
        primary: '#7B2D8E', // Toxic purple
        secondary: '#4A5D23', // Sludge green
        sky: '#6B6B6B', // Grey-brown smog
        accent: '#3D3D3D', // Dark grey
      },
      restored: {
        primary: '#26BDE2', // SDG 6 light blue
        secondary: '#0A97D9', // SDG 6 deep blue
        sky: '#87CEEB', // Clear sky blue
        accent: '#00FFFF', // Cyan accent
      },
      shockwave: '#00FFFF', // Bright cyan
    },
    
    // State descriptions
    states: {
      corrupted: {
        name: 'Corrupted',
        description: 'Toxic sludge chokes the waterway. Fish float lifeless. The realm glitches.',
        elements: {
          water: 'Toxic purple-green sludge with bubbling effects',
          creatures: 'Grey fish floating upside-down with glitch flicker',
          vegetation: 'Dead grey reeds, wilted and broken',
          sky: 'Overcast grey-brown smog',
          atmosphere: 'Dark, oppressive, glitching',
        }
      },
      restoring: {
        name: 'Restoring',
        description: 'Channeling restoration energy...',
      },
      restored: {
        name: 'Restored',
        description: 'Crystal-clear water flows freely. Life thrives. The realm is healed.',
        elements: {
          water: 'Crystal blue water with light refraction',
          creatures: 'Colorful fish swimming upright smoothly',
          vegetation: 'Green reeds swaying, lily pads blooming',
          sky: 'Clear blue sky with white clouds',
          atmosphere: 'Bright, vibrant, alive',
        }
      }
    },
    
    // Interaction settings
    interaction: {
      holdDuration: 2000, // 2 seconds in milliseconds
      shockwaveDuration: 1500, // 1.5 seconds
      instructionText: 'Tap and HOLD to channel restoration',
      completionMessage: '"Physics engine restored. Hydro-mancy successful." — TierZoo',
    },
    
    // Animation settings
    animation: {
      transitionDuration: 1500,
      easing: 'easeOut',
      shockwaveSpeed: 800, // pixels per second
    }
  }
};

// Helper to get realm by ID
export const getRealm = (realmId) => {
  return REALMS[realmId];
};

// Helper to get all realms
export const getAllRealms = () => {
  return Object.values(REALMS);
};
