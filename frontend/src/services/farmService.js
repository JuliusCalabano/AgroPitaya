import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

const farmsCollection = collection(db, "farms");

// ===============================
// CREATE FARM
// ===============================
export const addFarm = async (farmData) => {
  const docRef = await addDoc(farmsCollection, farmData);

  return {
    id: docRef.id,
    ...farmData,
  };
};

// ===============================
// UPDATE FARM
// ===============================
export const updateFarm = async (id, farmData) => {
  const farmRef = doc(db, "farms", id);

  await updateDoc(farmRef, farmData);
};

// ===============================
// DELETE FARM
// ===============================
export const deleteFarm = async (id) => {
  const farmRef = doc(db, "farms", id);

  await deleteDoc(farmRef);
};

// ===============================
// REAL-TIME FARM LISTENER
// ===============================
export const listenToFarms = (onData, onError) => {
  return onSnapshot(
    farmsCollection,
    (snapshot) => {
      const farms = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name || "Unnamed Farm",
          location: data.location || "",
          status: data.status || "inactive",
        };
      });

      onData(farms);
    },
    onError
  );
};