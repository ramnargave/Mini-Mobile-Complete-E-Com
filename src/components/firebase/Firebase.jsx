// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5FEERZ6ODPrivoz913To_ADkOBsSs-Sc",
  authDomain: "mini-6.firebaseapp.com",
  projectId: "mini-6",
  storageBucket: "mini-6.appspot.com",
  messagingSenderId: "890863252819",
  appId: "1:890863252819:web:ba3248ced91e25445edda6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);