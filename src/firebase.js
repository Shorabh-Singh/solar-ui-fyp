// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime DB
// import { getFirestore } from "firebase/firestore"; // For Firestore

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  // ...other config
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const firestore = getFirestore(app); // If using Firestore
