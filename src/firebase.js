// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime DB
// import { getFirestore } from "firebase/firestore"; // For Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCXflt8Gmg9-ypxZhZjdgNNIIZGI2NVqMI",
  authDomain: "jMfbLCOz0Xa2ScZWnkRzdtEkZHR8WIlYIHinotMU",
  databaseURL: "https://esp32-391de-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "esp32-391de",
  // ...other config
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const firestore = getFirestore(app); // If using Firestore
