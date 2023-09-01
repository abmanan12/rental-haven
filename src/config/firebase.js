// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD7aMcVgtYb5M1Ji1IphrJEVe3zFmezL0c",
    authDomain: "rental-haven.firebaseapp.com",
    projectId: "rental-haven",
    storageBucket: "rental-haven.appspot.com",
    messagingSenderId: "679226530293",
    appId: "1:679226530293:web:96c3dda3b92130a5e1a8bc",
    measurementId: "G-3EDQE6LPPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }