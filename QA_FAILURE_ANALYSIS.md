# 🚨 QA FAILURE ANALYSIS: MVP-0.1

**Date:** Jan 4, 2026
**Status:** CRITICAL FAILURE (Non-Functional)

## 🐛 The Critical Bugs
Abacus reported a "Blank Screen" with Headers but no content.

### 1. The "No Routes Match" Error
*   **Symptom:** Console error `No routes matched location '/app'`.
*   **Result:** The main content area is blank. The Header renders (because it's likely outside the router switch), but the Body is empty.
*   **Root Cause Analysis:**
    *   The `App.jsx` was simplified to remove login, BUT the routing logic (React Router `Routes` / `Route`) likely relies on a structure that was broken during the "Revert".
    *   The app is trying to load `/app` or `/app/map` but those routes are not defined in the current `App.jsx` or `main.tsx`.

### 2. The Zombie Login Wall
*   **Symptom:** Login screen still appears on initial load, despite `isGuest = true`.
*   **Result:** User has to "Refresh" to get in.
*   **Root Cause Analysis:**
    *   The state `const [user, setUser]` might be initializing as `null` *before* the `isGuest` logic kicks in, causing a split-second render of `<Login />`.
    *   Or, the `useEffect` on Firebase Auth is overwriting the local state.

---

## 🛠️ Technical Fix Plan (Next Agent Instructions)

### Step 1: Fix Routing (Priority #1)
You must open `src/App.jsx` and `src/main.tsx` and ensure that:
1.  React Router is correctly wrapping the app.
2.  The `/` root path redirects to `/app`.
3.  The `/app` path renders the `<GameDashboard />` or equivalent.
4.  **Action:** Explicitly define the routes:
    ```jsx
    <Routes>
      <Route path="/" element={<Navigate to="/app" />} />
      <Route path="/app" element={<GameDashboard />} />
      <Route path="/app/catalog" element={<QuestCatalog />} />
    </Routes>
    ```

### Step 2: Nuke the Login Wall (Priority #2)
The current "bypass" is flaky.
*   **Action:** Completely comment out or remove the `<Login />` component render block in `App.jsx`.
*   **Action:** Ensure `user` object is mocked if `user` is null, so the app doesn't crash on "Cannot read property of null".

### Step 3: Implement The Missing Views
Abacus noted "Map Dashboard does not render".
*   **Action:** Verify `GameDashboard.tsx` is actually being imported and rendered.

---

**Proceed with Step 1 immediately.**
