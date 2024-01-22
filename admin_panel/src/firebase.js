import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';

import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

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
export const dbStore = getFirestore(app);
export const db = getDatabase(app)

// Get a list of cities from your database
export async function getData(db, collectionName) {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  const dataArr = snapshot.docs.map(doc => doc.data());
  return dataArr;
}

// Get a list of cities from your database
export async function getDoctors(db) {
  const doctorsCol = collection(db, 'doctors');
  const doctorsSnapshot = await getDocs(doctorsCol);
  const doctorsList = doctorsSnapshot.docs.map(doc => doc.data());
  return doctorsList;
}


