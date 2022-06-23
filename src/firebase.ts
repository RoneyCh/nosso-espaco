import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "uploadingfile-c987f.firebaseapp.com",
  projectId: "uploadingfile-c987f",
  storageBucket: "uploadingfile-c987f.appspot.com",
  messagingSenderId: "104746154946",
  appId: "1:104746154946:web:5cafb19bd92bf256bcf45b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);