import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc
} from "firebase/firestore/lite";

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

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
export const db = getDatabase(app);

export async function getData(db, collectionName) {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  const dataArr = snapshot.docs.map(doc => ({
    data: doc.data(),
    ref: doc.ref
  }));
  return dataArr;
}

async function getReferencedDocData(referencePath) {
  try {
    const documentRef = doc(dbStore, referencePath);
    const docSnapshot = await getDoc(documentRef);

    if (docSnapshot.exists()) {
      return {...docSnapshot.data(), id: docSnapshot.id};
    } else {
      console.error("Referenced document does not exist");
      return {};
    }
  } catch (error) {
    console.error("Error fetching referenced document:", error);
    throw error;
  }
}

// returns false if at least 1 element of the array doesnt have a path property
function checkArrayForPath(arr) {
  arr.forEach(el => {
    if (!el.path) return false;
  })
  return true;
}

// returns false if there was no nested references in the supplied data
// otherwise, returns the data object with the referenced document embedded
async function embedReferences(db, data) {
  const mergedData = data.data;
  const keys = Object.keys(data.data);

  let wasRefNested = false;
  await Promise.all(
    keys.map(async key => {
      // assuming: if there is a path then it's a reference and not just a regular value
      if (mergedData[key]?.path) {
        // fetch doc ref data
        const refData = await getReferencedDocData(mergedData[key].path).catch(
          error => {
            console.error(
              "Error while fetching reference document data:",
              error
            );
          }
        );
        // replace the reference in the original data object with the fetched referenced data
        mergedData[key] = { data: refData, ref: mergedData[key].path };
        wasRefNested = true;
      }
      // alternatively, check for an array of references
      else if(Array.isArray(mergedData[key]) && checkArrayForPath(mergedData[key])) {
        // HMM: promise.all within promise.all????? sounds like a bad idea
        const refArrData = []
        await Promise.all(
          mergedData[key].map(async el => {
            const refData = await getReferencedDocData(el.path).catch(
              error => {
                console.error(
                  'Error while fetching reference document data (embedded array of references)',
                  error
                )
              }
            );
            refArrData.push({ data: refData, ref: el })
          })
        )
        mergedData[key] = {data: refArrData}
        wasRefNested = true;
      }
    })
  );

  return wasRefNested ? mergedData : false;
}

// Get all documents together with referenced documents
export async function getDataWithReferences(db, collectionName) {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);

  const snapshotData = snapshot.docs.map(doc => ({
    ref: doc.ref,
    data: {
      id: doc.id,
      ...doc.data()
    }
  }));

  // fetch references with Promise.all
  const dataArr = await Promise.all(
    snapshotData.map(async service => {
      const embedResult = await embedReferences(db, service);
      // if data was embedded -> update embeddedService
      if (embedResult) {
        return { ref: service.ref, data: embedResult };
        // else -> finish embedding
      } else {
        return service;
      }
    })
  );
  return dataArr;
}
// Get 1 document together with referenced documents
// only goes 1 level deep (no recurrency)
export async function getDocWithReferences(db, docRef) {
  const snapshotData = await getReferencedDocData(docRef.path);
  const data = { ref: docRef, data: snapshotData };

  // fetch referenced data
  // if there were no references in the object -> returns false
  const embedResult = await embedReferences(db, data);
  
  // if data was embedded -> return the result
  if (embedResult) {
    return { ref: docRef, data: embedResult };
  // else -> finish return the OG
  } else {
    return data;
  }
}

export async function deleteDocument(db, ref) {
  const docRef = doc(db, ref.path);
  return await deleteDoc(docRef).catch(err => console.error(err));
}

export async function updateDocument(db, ref, data) {
  const docRef = doc(db, ref.path);
  await updateDoc(docRef, data).catch(err => console.error(err));
}

export async function createDocument(db, collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), data);
}
