import { useState, useEffect } from 'react';
import { Heart, Zap, Sparkles, MessageCircle } from 'lucide-react';
import mascotImg from '../assets/mascot.png';

export default function SustainabilityPet() {
    const [mood, setMood] = useState('happy'); // happy, hungry, sleep, excited
    const [message, setMessage] = useState("I'm feeling great today! Have you scanned any SDGs yet?");
    const [isHovered, setIsHovered] = useState(false);

    const messages = [
        "Yay! Thanks for the attention!",
        "Did you know Seneca uses renewable energy?",
        "I'm so proud of your SDG progress!",
        "Don't forget to check the cafeteria audits!",
        "Nature is healing, thanks to you!",
        "Can we go to the King Campus apiary?",
        "I love sustainability! You're doing great!",
        "The SDG Passport is looking sharp!",
        "Let's win that leaderboard prize together!"
    ];

    const handlePetClick = () => {
        setMood('excited');
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMsg);

        setTimeout(() => {
            setMood('happy');
        }, 2000);
    };

    return (
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-3xl p-6 shadow-[0_10px_30px_rgba(16,185,129,0.1)] mb-6 flex items-center justify-between relative overflow-hidden transition-all duration-300 border border-white dark:border-green-800/30">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-green-600 dark:text-green-400" />
            </div>

            <div className="flex-1 z-10 mr-4">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Alpha v0.1
                    </span>
                    <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 uppercase tracking-tighter">
                        Helix Companion
                    </h3>
                </div>

                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 max-w-xs shadow-sm shadow-emerald-500/10 relative">
                    {/* Speech Bubble Tail */}
                    <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-white/90 dark:bg-gray-800/90 rotate-45" />

                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-relaxed">
                        "{message}"
                    </p>
                </div>

                {/* Companion Stats */}
                <div className="mt-4 flex space-x-4">
                    <div className="flex items-center space-x-1.5 bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full">
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                        <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase">100% Core</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                        <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase">LVL 1</span>
                    </div>
                </div>
            </div>

            {/* The Pet Visual (Image) */}
            <div
                className="relative cursor-pointer transition-all duration-500 hover:scale-110 active:scale-90 z-20 group"
                onClick={handlePetClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                title="Click me for feedback!"
            >
                {/* Visual Cue: Click Me Tooltip */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest transition-all duration-300 pointer-events-none z-30 shadow-2xl border border-white/10 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    Click Me!
                </div>

                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl flex items-center justify-center border-4 border-white dark:border-gray-700 bg-white overflow-hidden relative transition-all duration-300 group-hover:border-emerald-500 ${mood === 'excited' ? 'animate-bounce' : 'animate-float'}`}>
                    <img
                        src={mascotImg}
                        alt="Eco Companion"
                        className="w-full h-full object-cover"
                    />

                    {/* Glowing Aura */}
                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Floating Hearts Animation */}
                {mood === 'excited' && (
                    <div className="absolute -top-4 -right-4 animate-ping">
                        <Heart className="w-8 h-8 text-red-500 fill-current" />
                    </div>
                )}

                {/* Pulse Ring */}
                <div className="absolute inset-0 border-4 border-emerald-400 rounded-full animate-ping opacity-0 group-hover:opacity-20 pointer-events-none" />
            </div>
        </div>
    );
}
