// Helper functions for realm state management

// Realm states
export const REALM_STATES = {
  CORRUPTED: 'corrupted',
  RESTORING: 'restoring',
  RESTORED: 'restored',
};

// Get the next state in the progression
export const getNextRealmState = (currentState) => {
  switch (currentState) {
    case REALM_STATES.CORRUPTED:
      return REALM_STATES.RESTORING;
    case REALM_STATES.RESTORING:
      return REALM_STATES.RESTORED;
    case REALM_STATES.RESTORED:
      return REALM_STATES.RESTORED; // Already at final state
    default:
      return REALM_STATES.CORRUPTED;
  }
};

// Check if a realm can be interacted with
export const canInteractWithRealm = (realmState) => {
  return realmState === REALM_STATES.CORRUPTED;
};

// Calculate progress percentage (0-100)
export const calculateProgress = (startTime, currentTime, duration) => {
  const elapsed = currentTime - startTime;
  const progress = Math.min((elapsed / duration) * 100, 100);
  return progress;
};

// Check if hold is complete
export const isHoldComplete = (startTime, currentTime, duration) => {
  return (currentTime - startTime) >= duration;
};

// Get color interpolation between two colors
export const interpolateColor = (color1, color2, progress) => {
  // Convert hex to RGB
  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };
  
  // Convert RGB to hex
  const rgb2hex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };
  
  const c1 = hex2rgb(color1);
  const c2 = hex2rgb(color2);
  
  const r = c1.r + (c2.r - c1.r) * progress;
  const g = c1.g + (c2.g - c1.g) * progress;
  const b = c1.b + (c2.b - c1.b) * progress;
  
  return rgb2hex(r, g, b);
};

// Format time remaining (for display)
export const formatTimeRemaining = (milliseconds) => {
  const seconds = Math.ceil(milliseconds / 1000);
  return `${seconds}s`;
};

// Get realm state emoji indicator
export const getRealmStateEmoji = (state) => {
  switch (state) {
    case REALM_STATES.CORRUPTED:
      return '⚠️';
    case REALM_STATES.RESTORING:
      return '✨';
    case REALM_STATES.RESTORED:
      return '✅';
    default:
      return '❓';
  }
};
