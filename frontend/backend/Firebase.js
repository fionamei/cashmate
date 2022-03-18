// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdxOb6xrqx_F6Bj4K5qUl6QJb1dKDtxc8",
  authDomain: "cashmate-9436a.firebaseapp.com",
  projectId: "cashmate-9436a",
  storageBucket: "cashmate-9436a.appspot.com",
  messagingSenderId: "368227088765",
  appId: "1:368227088765:web:20611d0f9328895405b414",
  measurementId: "G-RPH8RMT6HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};