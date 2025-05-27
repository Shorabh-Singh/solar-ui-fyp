import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXflt8Gmg9-ypxZhZjdgNNIIZGI2NVqMI",
  authDomain: "esp32-391de.firebaseapp.com",
  databaseURL: "https://esp32-391de-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-391de",
  storageBucket: "esp32-391de.appspot.com", // <-- fixed here
  messagingSenderId: "976800371903",
  appId: "1:976800371903:web:17fdd7403481b07338620a",
  measurementId: "G-6M0WTBMGYP"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
