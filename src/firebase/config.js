// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2cWXXQY7YmCMOkErbl9pBz50Q6-UN73E",
  authDomain: "react-firebase-bdadd.firebaseapp.com",
  projectId: "react-firebase-bdadd",
  storageBucket: "react-firebase-bdadd.appspot.com",
  messagingSenderId: "84305480975",
  appId: "1:84305480975:web:fa645dc99a030f1e80027a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
