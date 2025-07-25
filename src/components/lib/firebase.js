// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
// import { onSchedule } from "firebase-functions/v2/scheduler";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCga2ChVR0jZ6fLoeXIPCN8ozyt2XO1IIw",
  authDomain: "sas-marketplace.firebaseapp.com",
  databaseURL: "https://sas-marketplace-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sas-marketplace",
  storageBucket: "sas-marketplace.firebasestorage.app",
  messagingSenderId: "332132025771",
  appId: "1:332132025771:web:1d299c30236543ff4bfeee",
  measurementId: "G-H5WCVF94VS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimedb = getDatabase(app);
export const storage = getStorage(app);

// exports.changeItemAvailability = onSchedule("every day 08:00", async (event) => {
//   console.log("It is 08:00");
// });