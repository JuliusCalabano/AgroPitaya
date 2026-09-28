import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

const sensorsCollection = collection(db, "sensors");

// REAL-TIME SENSOR LISTENER
export const listenToSensors = (callback, onError) => {
  return onSnapshot(
    sensorsCollection,
    (snapshot) => {
      const sensors = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name || "Unknown Sensor",
          type: data.type || "unknown",
          value: data.value ?? 0,
          unit: data.unit || "",
          farmId: data.farmId || null,
          status: data.status || "offline",
          lastUpdate: data.lastUpdate?.toDate
            ? data.lastUpdate.toDate()
            : new Date(),
        };
      });

      callback(sensors);
    },
    onError
  );
};