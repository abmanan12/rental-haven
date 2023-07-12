// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDZ84XYh5aS8zkBvpNd21VqR4cU6YWsJqg",
    authDomain: "rental-haven-a82b8.firebaseapp.com",
    projectId: "rental-haven-a82b8",
    storageBucket: "rental-haven-a82b8.appspot.com",
    messagingSenderId: "222242276625",
    appId: "1:222242276625:web:5e40d1247c10262ab1f8b0",
    measurementId: "G-7YKFFJWFBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }