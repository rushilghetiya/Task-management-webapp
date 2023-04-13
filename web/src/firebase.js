// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn-iYDgF8vbsYI9I4MzCReoV-hjjcPrRg",
  authDomain: "taxks-7863c.firebaseapp.com",
  projectId: "taxks-7863c",
  storageBucket: "taxks-7863c.appspot.com",
  messagingSenderId: "280772565982",
  appId: "1:280772565982:web:b5657b390a88d4a4c5db4f",
  measurementId: "G-PQQQVNM2BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);


