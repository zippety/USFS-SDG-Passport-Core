// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBeFmT-49wmhPtAGiEMsT1lmvB-ihxKk4Q",
    authDomain: "sdg-passport-mvp.firebaseapp.com",
    projectId: "sdg-passport-mvp",
    storageBucket: "sdg-passport-mvp.firebasestorage.app",
    messagingSenderId: "196142716894",
    appId: "1:196142716894:web:89a8fbf724fe4952326f4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
