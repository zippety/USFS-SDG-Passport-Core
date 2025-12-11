import React from 'react';
import { Leaf, Waves, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BiodiversitySanctuary() {
    const navigate = useNavigate();

    const guardians = [
        { emoji: '🐘', name: 'Nana the Elephant', role: 'Guardian of Memory', sdg: 'SDG 15', color: 'bg-emerald-100 text-emerald-800' },
        { emoji: '🐬', name: 'Echo the Dolphin', role: 'Guardian of Frequencies', sdg: 'SDG 14', color: 'bg-cyan-100 text-cyan-800' },
        { emoji: '🐋', name: 'Nova the Whale', role: 'Guardian of Song', sdg: 'SDG 14', color: 'bg-blue-100 text-blue-800' },
        { emoji: '🦍', name: 'Koko the Ape', role: 'Guardian of Empathy', sdg: 'SDG 15', color: 'bg-orange-100 text-orange-800' },
        { emoji: '🦜', name: 'Rio the Parrot', role: 'Guardian of Voice', sdg: 'SDG 15', color: 'bg-red-100 text-red-800' },
        { emoji: '🐙', name: 'Octo the Octopus', role: 'Guardian of Intelligence', sdg: 'SDG 14', color: 'bg-purple-100 text-purple-800' },
        { emoji: '🐦', name: 'Corvid the Crow', role: 'Guardian of Strategy', sdg: 'SDG 15', color: 'bg-slate-200 text-slate-800' },
    ];

    return (
        <div className="min-h-screen bg-emerald-50 dark:bg-slate-900 p-6 font-sans">
            <button
                onClick={() => navigate('/')}
                className="mb-6 flex items-center text-emerald-700 dark:text-emerald-400 font-bold"
            >
                <ArrowLeft className="mr-2" /> Back to Passport
            </button>

            <header className="mb-8">
                <h1 className="text-3xl font-black text-emerald-900 dark:text-emerald-100 flex items-center gap-3">
                    <Heart className="text-red-500 fill-current" />
                    The Sanctuary
                </h1>
                <p className="text-emerald-700 dark:text-emerald-300 mt-2">
                    Your "Operational Efficiency" savings fund their protection.
                    <br />
                    **Say hi to your frens.**
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guardians.map((g, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-emerald-100 dark:border-slate-700 p-6 hover:scale-105 transition-transform cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-6xl filter drop-shadow-lg">{g.emoji}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${g.color}`}>
                                {g.sdg}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                            {g.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-3">
                            {g.role}
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-xs text-slate-600 dark:text-slate-300 italic">
                            "Thanks for auditing the waste! You saved $4.50 today which buys me 2kg of organic feed."
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-emerald-800 rounded-xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
                    <Leaf size={200} />
                </div>
                <h2 className="text-2xl font-bold mb-4 relative z-10">The Bridge: Efficiency = Empathy</h2>
                <p className="relative z-10 max-w-2xl text-emerald-100 leading-relaxed">
                    Every time you complete a "Boring" mission (like checking lights or sorting recycling),
                    you generate operational savings. Those savings are automatically redirected to the
                    **Seneca Biodiversity Fund**, protecting these habitats.
                </p>
            </div>
        </div>
    );
}
