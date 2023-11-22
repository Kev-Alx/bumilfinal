// useShoppingItem.js
import { useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { User } from "firebase/auth";

export type Schedule = {
  tanggal: Date;
  notes?: string;
  type: "CONSULT" | "BLOOD" | "URINE";
  userId?: string;
  createdAt?: Date;
};

const useSchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addSchedule = async (schedule: Schedule) => {
    setIsLoading(true);
    try {
      await addDoc(collection(db, "schedule"), {
        ...schedule,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getSchedules = async (user: User) => {
    setIsLoading(true);
    // console.log(user?.uid);
    if (!user) {
      return [];
    }
    // console.log("user: ", user.uid);
    try {
      const qs = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );
      if (!qs.empty) {
        const userData = qs.docs[0].data();
        // console.log(userData);
        const querySnapshot = await getDocs(
          query(
            collection(db, "schedule"),
            where("userId", "==", userData.id),
            orderBy("createdAt")
          )
        );
        const newList: Schedule[] = querySnapshot.docs.map(
          (doc) => doc.data() as Schedule
        );
        return newList;
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getSchedules,
    addSchedule,
    isLoading,
  };
};

export default useSchedule;
