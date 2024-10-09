// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUTtAXEqYcquZ6JjKHGaiNPcR4IDVhhds",
  authDomain: "broucher-a0d2f.firebaseapp.com",
  projectId: "broucher-a0d2f",
  storageBucket: "broucher-a0d2f.appspot.com",
  messagingSenderId: "932109588648",
  appId: "1:932109588648:web:88e9545e7393362d3e0a9d",
  measurementId: "G-2N8DFXG2QN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
