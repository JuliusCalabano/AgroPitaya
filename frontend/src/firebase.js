import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmMTdWM5cSTybtgQ5q2stil_AMlwLY9zE",
  authDomain: "agropitaya-5b65e.firebaseapp.com",
  projectId: "agropitaya-5b65e",
  storageBucket: "agropitaya-5b65e.firebasestorage.app",
  messagingSenderId: "502395229471",
  appId: "1:502395229471:web:219b00af85afe1ab370c2a",
  measurementId: "G-8391YT8TLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;