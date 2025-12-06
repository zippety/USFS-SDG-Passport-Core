# 🌍 SDG Passport: The Game of Global Good
> *Powered by Hybrid Intelligence (Human + AI + RI)*

**"Gamifying the future of social impact."**

This is the Core MVP for the **SDG Passport Challenge**—a platform designed to turn "volunteering" into "leveling up." By combining mobile technology, gamification, and the 17 Sustainable Development Goals, we are building a tool that empowers students to track their impact in real-time.

**Status**: 🟢 Active Prototype | **Vision**: Open Innovation for the UN Club



## Features

- 📱 **Digital Passport**: View all 17 SDG stamps in a passport-style interface
- 🎯 **Stamp Collection**: Collect stamps by completing SDG-related actions
- 📷 **QR Scanner**: Simulated QR code scanning at campus booths
- 🏆 **Leaderboard**: Individual and program-level rankings
- 📚 **SDG Catalog**: Browse all 17 SDGs with available actions
- ✨ **PWA Ready**: Installable on mobile devices, works offline

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd sdg-passport-mvp
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Demo Flow

1. **Landing Page**: View passport with collected stamps (3 stamps pre-loaded)
2. **Scan Demo**: Click "Scan for Stamp" → Tap to scan → Get new stamp with success animation
3. **Catalog**: Browse all 17 SDGs, see available actions
4. **Leaderboard**: View rankings (individual and by program)

## Project Structure

```
sdg-passport-mvp/
├── src/
│   ├── components/      # React components
│   │   ├── PassportView.jsx
│   │   ├── StampCatalog.jsx
│   │   ├── QRScanner.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── UserProfile.jsx
│   │   └── StampCard.jsx
│   ├── data/            # Mock data
│   │   ├── mockUser.js
│   │   ├── mockStamps.js
│   │   └── mockLeaderboard.js
│   ├── utils/           # Utilities
│   │   └── sdgData.js
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── manifest.json        # PWA manifest
└── index.html          # HTML entry
```

## Mock Data

The app uses mock data for demonstration:
- **User**: Jordan Smith (Business program, 87 points, rank #23)
- **Stamps**: 3 collected (SDG 6, 13, 2)
- **Leaderboard**: Top 20 users with rankings

## PWA Features

- Installable on mobile devices
- Works offline (basic service worker)
- Responsive design
- Fast loading

## Notes for Interview Demo

- All data is mock/local state - perfect for demo
- QR scanner is simulated (tap to scan button)
- Stamps can be collected multiple times in demo
- Leaderboard shows sample data
- Fully functional UI/UX ready for presentation

## Future Enhancements

- Backend integration (Firebase/Supabase)
- Real QR code scanning
- User authentication
- Persistent data storage
- Push notifications
- Social sharing features

## License

MIT

