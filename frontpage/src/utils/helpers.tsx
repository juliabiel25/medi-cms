import { Firestore, collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { dbStore } from "./firebase";

async function getReferencedDocData(referencePath: string) {
  try {
    const documentRef = doc(dbStore, referencePath);
    const docSnapshot = await getDoc(documentRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      // console.error("Referenced document does not exist");
      return {};
    }
  } catch (error) {
    console.error("Error fetching referenced document:", error);
    throw error;
  }
}

async function embedReferences(db: any, data: { ref?: { path: any; }; data: any; }) {
  const mergedData = data.data;
  const keys = Object.keys(data.data);

  let wasRefNested = false;
  await Promise.all(
    keys.map(async key => {
      if (mergedData[key]?.path) {
        const refData = await getReferencedDocData(mergedData[key].path).catch(
          error => {
            console.error(
              "Error while fetching reference document data:",
              error
            );
          }
        );
        mergedData[key] = { data: refData, ref: mergedData[key].path };
        wasRefNested = true;
      }
    })
  );

  return wasRefNested ? mergedData : false;
}

async function getDocWithReferences(db: any, docRef: { path: any; }) {
  const snapshotData = await getReferencedDocData(docRef.path);
  const data = { ref: docRef, data: snapshotData };

  const embedResult = await embedReferences(db, data);
  if (embedResult) {
    return { ref: docRef, data: embedResult };
  } else {
    return data;
  }
}

export async function getDataWithReferences(db: Firestore, collectionName: string) {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);

  const snapshotData = snapshot.docs.map(doc => (
    {
      ref: doc.ref,
      data: {
        id: doc.id,
        ...doc.data()
      }
    }
  ));

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