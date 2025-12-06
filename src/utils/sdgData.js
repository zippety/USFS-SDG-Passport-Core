// SDG Data: Icons, colors, descriptions (Official UN SDG names and colors)
export const SDG_DATA = {
  1: { name: 'No Poverty', color: '#E5243B', icon: '🌍' },
  2: { name: 'Zero Hunger', color: '#DDA63A', icon: '🍽️' },
  3: { name: 'Good Health and Well-being', color: '#4C9F38', icon: '❤️' },
  4: { name: 'Quality Education', color: '#C5192D', icon: '📚' },
  5: { name: 'Gender Equality', color: '#FF3A21', icon: '⚖️' },
  6: { name: 'Clean Water and Sanitation', color: '#26BDE2', icon: '💧' },
  7: { name: 'Affordable and Clean Energy', color: '#FCC30B', icon: '⚡' },
  8: { name: 'Decent Work and Economic Growth', color: '#A21942', icon: '💼' },
  9: { name: 'Industry, Innovation and Infrastructure', color: '#FD6925', icon: '🏭' },
  10: { name: 'Reduced Inequalities', color: '#DD1367', icon: '🤝' },
  11: { name: 'Sustainable Cities and Communities', color: '#FD9D24', icon: '🏙️' },
  12: { name: 'Responsible Consumption and Production', color: '#BF8B2E', icon: '♻️' },
  13: { name: 'Climate Action', color: '#3F7E44', icon: '🌱' },
  14: { name: 'Life Below Water', color: '#0A97D9', icon: '🌊' },
  15: { name: 'Life on Land', color: '#56C02B', icon: '🌳' },
  16: { name: 'Peace, Justice and Strong Institutions', color: '#00689D', icon: '🕊️' },
  17: { name: 'Partnerships for the Goals', color: '#19486A', icon: '🤝' },
};

export const getSDGColor = (sdgNumber) => {
  return SDG_DATA[sdgNumber]?.color || '#666666';
};

export const getSDGName = (sdgNumber) => {
  return SDG_DATA[sdgNumber]?.name || `SDG ${sdgNumber}`;
};

export const getSDGIcon = (sdgNumber) => {
  return SDG_DATA[sdgNumber]?.icon || '🎯';
};

