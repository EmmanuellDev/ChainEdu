import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzP6pCRSUgbnd3QLrPG0q3iqO7uSmW2ec",
  authDomain: "chainedu-5d2c6.firebaseapp.com",
  projectId: "chainedu-5d2c6",
  storageBucket: "chainedu-5d2c6.firebasestorage.app",
  messagingSenderId: "604910883296",
  appId: "1:604910883296:web:d935a56caf26cfddc0db85",
  measurementId: "G-SM6GDD2CPD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
