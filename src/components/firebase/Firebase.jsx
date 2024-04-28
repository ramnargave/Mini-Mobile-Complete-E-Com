// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH5k2zWIHGGi4FOTh1-m-I5cWbf9qUI4A",
  authDomain: "mini-5-17a4d.firebaseapp.com",
  projectId: "mini-5-17a4d",
  storageBucket: "mini-5-17a4d.appspot.com",
  messagingSenderId: "96886258739",
  appId: "1:96886258739:web:c94e424aa821516e813746"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);