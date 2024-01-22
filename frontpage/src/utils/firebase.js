import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEDAj6MxQT1Z-12KfVTQZrleiIL5IJQNA",
  authDomain: "medicms-5912b.firebaseapp.com",
  projectId: "medicms-5912b",
  storageBucket: "medicms-5912b.appspot.com",
  messagingSenderId: "727352095492",
  appId: "1:727352095492:web:08ea6a7de1f90e0a105651",
  measurementId: "G-VEG7PW0PLC"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);