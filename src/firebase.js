// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJYZ418JPeYbICaQYuAlHg5ap6FJOHs_M",
  authDomain: "validasicertificate.firebaseapp.com",
  projectId: "validasicertificate",
  storageBucket: "validasicertificate.firebasestorage.app",
  messagingSenderId: "87789893081",
  appId: "1:87789893081:web:973e5afe5107a70a8155c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;