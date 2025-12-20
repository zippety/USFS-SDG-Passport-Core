# 🏃 PROJECT FLOW: Game Design Document (v0.1)

> **"The World is Body Language."**

## 1. The Core Vision: "Pure Traversal"
Most games treat movement as a *commute*—a way to get to the "real" content (combat, quests).
**PROJECT FLOW** flips this: **Movement IS the content.**

*   **The Hook:** A third-person open-world game where you don't fight enemies; you fight *friction*.
*   **The Stakes:** Maintaining momentum, conquering verticality, and unlocking the map through skill, not keys.
*   **The Emotional Core:** That specific "Flow State" feeling when your inputs perfectly match the environment.

---

## 2. The "Sonic X Mirror's Edge" Mechanic
We are building a **Third-Person** experience to maximize the visual reward of movement.

### A. The "Flow Meter" (The Heartbeat)
*   **Mechanic:** A dynamic UI gauge that fills as you maintain speed and land clean moves.
*   **Rewards:**
    *   **Tier 1 (Flow):** Slightly increased top speed + audio swells.
    *   **Tier 2 (Surge):** Auto-vault small obstacles without losing speed; colors behave more vibrantly.
    *   **Tier 3 (Zen):** "Bullet time" perception for split-second route decisions; gravity feels lighter.
*   **Penalty:** Stopping, stumbling, or taking "boring" paths (walking) drains the meter.

### B. Progression = Affordances
You do not level up "Strength" or "Defense." You unlock **Physics Interactions**:
1.  **Grip Types:** Start with simple ledges. Unlock *Ice Axis* (slide up frozen waterfalls) or *Mag-Glove* (cling to metallic undersides).
2.  **Momentum Tools:**
    *   *Grapple-Chute:* Don't just swing; convert vertical fall speed into horizontal launch speed.
    *   *Kick-Off:* Wall-run into a perpendicular jump to gain height.
3.  **Biomes as Puzzles:**
    *   *The Spire:* Requires vertical stamina management (rest points).
    *   *The Drift:* Low-friction sand/snow zones requiring momentum maintenance.

---

## 3. The World: "Environmental Storytelling"
No cutscenes. No long dialogue trees. The story is in the ruins.

*   **The Setting:** A vertically layered mega-structure (The "User Interface" of a quiet apocalypse?).
*   **Narrative Delivery:**
    *   **"Ghost Lines":** Seeing faint traces of other runners (asynchronous multiplayer data or AI ghosts) showing expert routes.
    *   **The Signal:** A constant, throbbing destination marker that gets louder/clearer as you gain altitude.
*   **Progression Loop:**
    *   See a distant landmark -> Realize you lack the "Wall Run" to reach it -> Explore the "Basin" to find the upgrade tech -> Return and conquer the height.

---

## 4. Technical Pillars (The Build Priorities)
To make this the "Best Parkour Game," the tech stack must prioritize:

1.  **Input Latency:** Zero lag. The character must feel like an extension of the nervous system.
2.  **Animation Blending:** Procedural animation (IK) so feet actually touch uneven ground. No "floating" allowed.
3.  **Readable Level Design:** "Affordances" (what is climbable vs. what is background) must be instantly readable at high speed (Color interaction language: White = Grip, Red = No Grip, Blue = Bounce).

---

## 5. Next Steps: The Prototype
To prove the fun, we need a **"Greybox Gym"**:
1.  A simple flat plane with:
    *   One Wall (Testing Wall Run).
    *   One Gap (Testing Jump curve).
    *   One Rail (Testing Grind/Balance).
2.  **The Character Controller:** Needs to feel good *just moving in a circle*.
