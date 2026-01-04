# SDG Passport MVP - QA Testing Guide

> **Version:** MVP-0.2 (Official UN SDG Design)
> **Last Updated:** January 4, 2026
> **Test Environment:** Local Development (`npm run dev`)

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/zippety/USFS-SDG-Passport-Core.git

# Install dependencies
cd USFS-SDG-Passport-Core
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:5173
```

---

## ✅ Test Checklist

### 1. DIRECT ACCESS TEST
**Objective:** App should load WITHOUT login screen

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Navigate to `http://localhost:5173` | PassportView loads immediately | ⬜ |
| No login wall appears | Direct access to content | ⬜ |
| Header shows streak counter | "🔥 X DAY STREAK" visible | ⬜ |
| Admin button visible | Top-right corner | ⬜ |

---

### 2. PASSPORT VIEW (Home Page)
**Objective:** Main dashboard renders all elements

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| "SDG Passport" title visible | Top of page | ⬜ |
| User profile section | Shows "DJ Bromfield" mock user | ⬜ |
| **My Stamps grid** | 17 SDG tiles with official UN images | ⬜ |
| Stamps show official colors | Not emojis - actual UN tile images | ⬜ |
| Collected stamps have ✓ badge | Green checkmark | ⬜ |
| Locked stamps have 🔒 badge | Lock icon | ⬜ |
| Uncollected stamps are grayscale | Visual distinction | ⬜ |
| "Active Mission" card visible | Cafeteria audit mission | ⬜ |
| "Nature Mission" card visible | Beehive monitoring | ⬜ |
| Navigation buttons | Scan QR, Leaderboard, Events, Community | ⬜ |

---

### 3. CATALOG TEST
**Objective:** Navigate to catalog and verify SDG filtering

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Click any SDG stamp tile | Navigates to `/catalog?sdg=X` | ⬜ |
| Catalog page renders | Shows SDG cards with official UN images | ⬜ |
| "Back to Passport" button works | Returns to home | ⬜ |
| Click "View Missions" | Expands to show available missions | ⬜ |
| Mission cards have "Start Mission" button | Navigates to `/scan` | ⬜ |
| Direct URL `/catalog` works | Shows all 17 SDGs | ⬜ |

---

### 4. SDG STAMP DESIGN TEST
**Objective:** Stamps match official UN SDG materials

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Goal numbers visible | Top-left of each tile | ⬜ |
| Goal titles visible | "NO POVERTY", "ZERO HUNGER", etc. | ⬜ |
| Official icons displayed | People, bowl, heartbeat, etc. (NOT emojis) | ⬜ |
| Colors match UN palette | See color guide below | ⬜ |

---

### 5. NAVIGATION TEST
**Objective:** All routes work correctly

| Route | Expected Result | Pass/Fail |
|-------|-----------------|-----------|
| `/` | PassportView (home) | ⬜ |
| `/catalog` | SDG Catalog | ⬜ |
| `/catalog?sdg=1` | Filtered to Goal 1 | ⬜ |
| `/scan` | QR Scanner | ⬜ |
| `/leaderboard` | Leaderboard | ⬜ |
| `/events` | Events Calendar | ⬜ |
| `/community` | Community Hub | ⬜ |
| `/app` | Redirects to `/` | ⬜ |
| `/app/catalog` | Redirects to `/catalog` | ⬜ |
| `/random-path` | Redirects to `/` | ⬜ |

---

### 6. ADMIN PANEL TEST
**Objective:** Admin mode accessible and functional

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Click "ADMIN" button | Opens Operations Command dashboard | ⬜ |
| Stats cards visible | Auditors, Audits, Savings, etc. | ⬜ |
| Live audit feed | Map visualization | ⬜ |
| Gamification console | Level/XP buttons | ⬜ |
| Click "ADMIN" again | Returns to PassportView | ⬜ |

---

### 7. MOBILE RESPONSIVENESS TEST
**Objective:** App works on mobile viewport

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Resize to 375px width | Layout adjusts | ⬜ |
| SDG stamps grid responsive | Smaller tiles, readable | ⬜ |
| Navigation accessible | All buttons reachable | ⬜ |
| Text readable | No overflow issues | ⬜ |

---

### 8. DARK MODE TEST
**Objective:** Theme toggle works

| Test | Expected | Pass/Fail |
|------|----------|-----------|
| Click moon/sun icon | Theme changes | ⬜ |
| Background changes | Light ↔ Dark | ⬜ |
| Text remains readable | Good contrast | ⬜ |
| Persists on refresh | LocalStorage saves | ⬜ |

---

## 🎨 Official UN SDG Color Reference

| Goal | Expected Color |
|------|----------------|
| 1 | Red `#E5243B` |
| 2 | Mustard `#DDA63A` |
| 3 | Green `#4C9F38` |
| 4 | Dark Red `#C5192D` |
| 5 | Red-Orange `#FF3A21` |
| 6 | Light Blue `#26BDE2` |
| 7 | Yellow `#FCC30B` |
| 8 | Burgundy `#A21942` |
| 9 | Orange `#FD6925` |
| 10 | Magenta `#DD1367` |
| 11 | Orange-Yellow `#FD9D24` |
| 12 | Dark Mustard `#BF8B2E` |
| 13 | Dark Green `#3F7E44` |
| 14 | Blue `#0A97D9` |
| 15 | Bright Green `#56C02B` |
| 16 | Royal Blue `#00689D` |
| 17 | Navy Blue `#19486A` |

---

## 🐛 Known Issues (Fixed in This Version)

- ~~Login wall appears on initial load~~ ✅ Fixed
- ~~"No routes matched" error~~ ✅ Fixed  
- ~~Blank screen after load~~ ✅ Fixed
- ~~Emojis instead of official icons~~ ✅ Fixed

---

## 📸 Expected Visual Reference

The stamps should look like the official UN SDG tiles:
- Solid colored blocks
- Large goal number in top-left
- Goal title text (e.g., "NO POVERTY")
- Official icon at bottom

Reference: https://sdgs.un.org/goals

---

## 📝 Report Template

```markdown
## SDG Passport QA Report

**Tester:** [Name]
**Date:** [Date]
**Browser:** [Browser/Version]
**Environment:** Local Dev / Production

### Summary
- **Direct Access:** ✅/❌
- **Passport View:** ✅/❌
- **Catalog:** ✅/❌
- **Navigation:** ✅/❌
- **Admin Panel:** ✅/❌
- **Mobile:** ✅/❌
- **Dark Mode:** ✅/❌

### Issues Found
1. [Description]
2. [Description]

### Screenshots
[Attach any relevant screenshots]
```

---

*Happy Testing! 🎉*
