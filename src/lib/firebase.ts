// /lib/firebase.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZ3NLa08-ZZqOyK4ViynCYeTFj-s5gF88",
  authDomain: "capture-hub-2566d.firebaseapp.com",
  projectId: "capture-hub-2566d",
  storageBucket: "capture-hub-2566d.firebasestorage.app",
  messagingSenderId: "405110012683",
  appId: "1:405110012683:web:59dd05fe891b8452f1c00e",
  measurementId: "G-JHM7ZR1VWH",
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
