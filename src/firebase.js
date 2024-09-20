// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAkWYqEkDEcEnSf4dqhgRIF0pSaQcx18vg",
  authDomain: "info-pult.firebaseapp.com",
  databaseURL:
    "https://info-pult-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "info-pult",
  storageBucket: "info-pult.appspot.com",
  messagingSenderId: "985506529664",
  appId: "1:985506529664:web:fc4959665413455290c165",
  measurementId: "G-R1ED2B0YQT",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const firebaseServices = { database, storage };
export default firebaseServices;
