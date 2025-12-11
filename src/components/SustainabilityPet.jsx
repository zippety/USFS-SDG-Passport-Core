import { useState, useEffect } from 'react';
import { Heart, Zap, Sparkles } from 'lucide-react';
import mascotImg from '../assets/mascot.png';

export default function SustainabilityPet({ userBegan }) {
    // ... (keep state logic)
    const [mood, setMood] = useState('happy'); // happy, hungry, sleep
    const [message, setMessage] = useState("I'm feeling great today!");

    // ... (keep logic)
    const handlePetClick = () => {
        setMood('excited');
        setMessage("Yay! Thanks for the attention!");
        setTimeout(() => {
            setMood('happy');
            setMessage("I'm feeling great today!");
        }, 2000);
    };

    return (
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl p-6 shadow-lg mb-6 flex items-center justify-between relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-green-600 dark:text-green-400" />
            </div>

            <div className="flex-1 z-10">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                        Coming Soon
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Your Eco-Companion
                    </h3>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 max-w-xs shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                        "{message}"
                    </p>
                </div>

                {/* Fake Stats */}
                <div className="mt-4 flex space-x-4">
                    <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400">100% Love</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Level 1</span>
                    </div>
                </div>
            </div>

            {/* The Pet Visual (Image) */}
            <div
                className="relative cursor-pointer transform transition-transform hover:scale-110 active:scale-95 z-10"
                onClick={handlePetClick}
            >
                <div className={`w-36 h-36 rounded-full shadow-xl flex items-center justify-center border-4 border-usfs-green bg-white overflow-hidden relative ${mood === 'excited' ? 'animate-bounce' : ''}`}>
                    <img
                        src={mascotImg}
                        alt="Eco Companion"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Floating Hearts Animation (Visual Cue) */}
                {mood === 'excited' && (
                    <div className="absolute -top-4 -right-4 animate-bounce">
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                    </div>
                )}
            </div>
        </div>
    );
}
