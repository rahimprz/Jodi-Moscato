import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Jodi Moscato Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW6mXhj6q9o7AcPMBrgn0o30KacdyF0Dk",
  authDomain: "jodi-6c66e.firebaseapp.com",
  projectId: "jodi-6c66e",
  storageBucket: "jodi-6c66e.firebasestorage.app",
  messagingSenderId: "687856313935",
  appId: "1:687856313935:web:1d56e4b73176b18069ac3a",
  measurementId: "G-76BVXLNJX4"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getDatabase(app);

// Initialize Analytics conditionally
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Analytics optional fallback
  });
}

export default app;
