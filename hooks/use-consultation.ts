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

export type Consultation = {
  date: Date;
  notes?: string;
  bloodPressure: string;
  type: string;
  photoDesc?: string;
  weight: string;
  urineTest?: JSON;
  bloodTest?: JSON;
  userId?: string;
  createdAt?: Date;
  testNoteBlood?: string;
  testNoteUrine?: string;
  testBlood?: string;
  testUrine?: string;
};

const useConsultation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addConsultation = async (consul: Consultation) => {
    setIsLoading(true);
    // console.log("hi", user);
    try {
      await addDoc(collection(db, "consultation"), {
        ...consul,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getConsultations = async (user: User) => {
    setIsLoading(true);
    // console.log(user?.uid);
    if (!user) {
      return [];
    }
    try {
      const qs = await getDocs(
        query(collection(db, "users"), where("id", "==", user.uid))
      );
      if (!qs.empty) {
        const userData = qs.docs[0].data();
        // console.log(userData);
        const querySnapshot = await getDocs(
          query(
            collection(db, "consultation"),
            where("userId", "==", userData.id),
            orderBy("createdAt")
          )
        );
        const newList: Consultation[] = querySnapshot.docs.map(
          (doc) => doc.data() as Consultation
        );
        // console.log("copium", newList.length);

        return newList;
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    getConsultations,
    addConsultation,
    isLoading,
  };
};

export default useConsultation;
