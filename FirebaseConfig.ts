// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9iUKMEdu0Qea29sigOcOBnsi-5tfQNAg",
  authDomain: "test-fb-2c76e.firebaseapp.com",
  projectId: "test-fb-2c76e",
  storageBucket: "test-fb-2c76e.appspot.com",
  messagingSenderId: "45021471770",
  appId: "1:45021471770:web:3c60343f67069a5fbb1da3",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
export const storage = getStorage(FIREBASE_APP);
