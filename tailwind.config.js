/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // USFS Brand Identity
        'seneca-red': '#DA291C',
        'usfs-green': '#006838',
        'usfs-teal': '#009FA1',

        // SDG Color Palette
        sdg1: '#E5243B',   // No Poverty
        sdg2: '#DDA63A',   // Zero Hunger
        sdg3: '#4C9F38',   // Good Health
        sdg4: '#C5192D',   // Quality Education
        sdg5: '#FF3A21',   // Gender Equality
        sdg6: '#26BDE2',   // Clean Water
        sdg7: '#FCC30B',   // Affordable Energy
        sdg8: '#A21942',   // Decent Work
        sdg9: '#FD6925',   // Industry Innovation
        sdg10: '#DD1367',  // Reduced Inequalities
        sdg11: '#FD9D24',  // Sustainable Cities
        sdg12: '#BF8B2E',  // Responsible Consumption
        sdg13: '#3F7E44',  // Climate Action
        sdg14: '#0A97D9',  // Life Below Water
        sdg15: '#56C02B',  // Life on Land
        sdg16: '#00689D',  // Peace & Justice
        sdg17: '#19486A',  // Partnerships
      },
    },
  },
  plugins: [],
}

