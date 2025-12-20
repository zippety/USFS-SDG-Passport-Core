import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { LogIn } from 'lucide-react';

const Login = () => {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("User signed in: ", result.user);
            })
            .catch((error) => {
                console.error("Error signing in: ", error);
            });
    };

    const signInWithMicrosoft = () => {
        const provider = new OAuthProvider('microsoft.com');
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("User signed in: ", result.user);
            })
            .catch((error) => {
                console.error("Error signing in: ", error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full border border-slate-700">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                    <LogIn size={32} className="text-white ml-1" />
                </div>

                <h1 className="text-2xl font-bold mb-2 font-display">SDG Passport</h1>
                <p className="text-slate-400 mb-8 text-sm">Sign in to track your impact and join the movement.</p>

                <div className="space-y-3">
                    <button
                        onClick={signInWithMicrosoft}
                        className="w-full bg-[#2F2F2F] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#3F3F3F] transition-all active:scale-95 shadow-lg border border-slate-600"
                    >
                        <img src="https://learn.microsoft.com/en-us/entra/identity-platform/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.svg" alt="Microsoft" className="w-5 h-5" />
                        Sign in with Microsoft
                    </button>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">or</div>
                    <button
                        onClick={signInWithGoogle}
                        className="w-full bg-white text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all active:scale-95 shadow-lg"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
