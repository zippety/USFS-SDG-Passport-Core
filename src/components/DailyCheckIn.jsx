import { useState, useEffect } from 'react';
import { Sun, CheckCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

export default function DailyCheckIn({ onPointsEarned }) {
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [streak, setStreak] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let auth, user;
    try {
        auth = getAuth();
        user = auth.currentUser;
    } catch (e) {
        console.log("Auth not available:", e);
    }

    useEffect(() => {
        if (user) {
            checkTodayStatus();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const checkTodayStatus = async () => {
        if (!user) {
            setIsLoading(false);
            return;
        }

        const today = new Date().toDateString();
        const checkInRef = doc(db, "checkins", user.uid);

        try {
            const docSnap = await getDoc(checkInRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStreak(data.streak || 0);
                if (data.lastCheckIn === today) {
                    setHasCheckedIn(true);
                }
            }
        } catch (error) {
            console.log("Check-in status check failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckIn = async () => {
        if (!user || hasCheckedIn) return;

        setIsAnimating(true);

        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const checkInRef = doc(db, "checkins", user.uid);

        try {
            const docSnap = await getDoc(checkInRef);
            let newStreak = 1;

            if (docSnap.exists()) {
                const data = docSnap.data();
                // If checked in yesterday, continue streak
                if (data.lastCheckIn === yesterday) {
                    newStreak = (data.streak || 0) + 1;
                }
            }

            await setDoc(checkInRef, {
                lastCheckIn: today,
                streak: newStreak,
                totalCheckIns: (docSnap.exists() ? docSnap.data().totalCheckIns || 0 : 0) + 1
            });

            setStreak(newStreak);
            setHasCheckedIn(true);

            // Trigger confetti!
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#22c55e', '#eab308', '#06b6d4']
            });

            // Notify parent to add points
            if (onPointsEarned) {
                const points = newStreak >= 7 ? 10 : 5; // Bonus for 7+ day streak
                onPointsEarned(points);
            }

        } catch (error) {
            console.error("Check-in failed:", error);
        }

        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className={`bg-gradient-to-r ${hasCheckedIn
            ? 'from-green-500 to-emerald-600'
            : 'from-amber-500 to-orange-500'} 
      rounded-xl p-4 mb-4 shadow-lg transition-all duration-300 ${isAnimating ? 'scale-105' : ''}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {hasCheckedIn ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                        <Sun className="w-8 h-8 text-white animate-pulse" />
                    )}
                    <div>
                        <h3 className="text-white font-bold">
                            {hasCheckedIn ? "You're checked in! ✨" : "Daily Check-In"}
                        </h3>
                        <p className="text-white/80 text-sm">
                            {hasCheckedIn
                                ? `${streak} day streak! Come back tomorrow 🔥`
                                : "Tap to earn 5 XP + build your streak!"}
                        </p>
                    </div>
                </div>

                {streak > 0 && (
                    <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
                        <Flame className="w-4 h-4 text-yellow-300" />
                        <span className="text-white font-bold">{streak}</span>
                    </div>
                )}

                {!hasCheckedIn && (
                    <button
                        onClick={handleCheckIn}
                        className="bg-white text-amber-600 font-bold px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors shadow-md"
                    >
                        +5 XP
                    </button>
                )}
            </div>
        </div>
    );
}
