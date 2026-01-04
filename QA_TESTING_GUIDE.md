# 🧪 QA Mission Briefing for Agent Abacus
**Target:** [https://sdg-passport-mvp.web.app](https://sdg-passport-mvp.web.app)
**Version:** MVP-0.1 (Core Design / Direct Access)

## 🎯 Primary Objective: Direct Access & Navigation
**Context:** We have REMOVED the login wall. The app should feel open and accessible immediately.
1.  **The Test:** Load the URL.
2.  **The Result:** You should land DIRECTLY on the Map Dashboard.
    *   *Pass:* You see the Map and Stamps immediately.
    *   *Fail:* You see a Login screen.

## 💾 Core Loop Verification
1.  **Quest Completion:**
    *   Go to **Catalog**.
    *   Filter by **SDG**.
    *   Click a Quest.
    *   **Verify:** Does it mark as complete? Does the stamp appear?
2.  **Persistence:**
    *   After completing a quest, **Refresh the Page.**
    *   *Pass:* The quest remains completed.
    *   *Fail:* Use progress reset.

## 📱 Responsiveness Verification
1.  **Mobile View:** Check the bottom navigation bar on a phone-sized viewport.
2.  **Touch Targets:** Are the stamp icons easy to click?

## 📝 Report Format
Please provide feedback in this format:
*   **Visual Score (1-10):** How clean is the interface?
*   **Functionality:** Did quests complete correctly?
*   **Bugs:** List any weird behavior.
