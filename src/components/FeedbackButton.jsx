import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        try {
            await addDoc(collection(db, "feedback"), {
                text: message,
                uid: auth.currentUser?.uid || 'anonymous',
                displayName: auth.currentUser?.displayName || 'Anonymous',
                createdAt: serverTimestamp(),
                type: 'vibe_check' // Categorization for AI analysis
            });
            setSent(true);
            setMessage('');
            setTimeout(() => {
                setSent(false);
                setIsOpen(false);
            }, 2000);
        } catch (error) {
            console.error("Error sending feedback: ", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-24 right-6 z-40 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-all ${isOpen ? 'hidden' : 'block'}`}
            >
                <MessageSquare size={24} />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <MessageSquare size={16} className="text-emerald-500" />
                            Vibe Check
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {sent ? (
                        <div className="text-center py-8 text-emerald-500 font-bold animate-in zoom-in">
                            <span className="text-4xl block mb-2">✨</span>
                            Feedback Received!
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Share an idea, report a bug, or just say hi..."
                                className="w-full h-32 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white mb-4"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={isSending || !message.trim()}
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                            >
                                {isSending ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        Send <Send size={14} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </>
    );
}
