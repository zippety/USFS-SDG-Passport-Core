import { useState, useEffect } from 'react';

export const useStreak = (user) => {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        if (!user) return;

        const checkStreak = () => {
            const today = new Date().toDateString();
            const storageKey = `streak_${user.uid}`;
            const lastVisitKey = `lastVisit_${user.uid}`;

            const savedStreak = parseInt(localStorage.getItem(storageKey) || '0');
            const lastVisit = localStorage.getItem(lastVisitKey);

            if (lastVisit === today) {
                // Already visited today, keep streak
                setStreak(savedStreak);
            } else {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayString = yesterday.toDateString();

                if (lastVisit === yesterdayString) {
                    // Visited yesterday, increment streak
                    const newStreak = savedStreak + 1;
                    localStorage.setItem(storageKey, newStreak.toString());
                    setStreak(newStreak);
                } else {
                    // Missed a day (or first visit), reset to 1
                    localStorage.setItem(storageKey, '1');
                    setStreak(1);
                }
                // Update last visit to today
                localStorage.setItem(lastVisitKey, today);
            }
        };

        checkStreak();
    }, [user]);

    return streak;
};
