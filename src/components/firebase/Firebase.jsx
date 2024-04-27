// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeoLKCpfcmWCoieLMOGTY9eK3INzMS8Hg",
  authDomain: "mini-4-a312f.firebaseapp.com",
  projectId: "mini-4-a312f",
  storageBucket: "mini-4-a312f.appspot.com",
  messagingSenderId: "658705889012",
  appId: "1:658705889012:web:afbe7eca6193b569cc50a1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);