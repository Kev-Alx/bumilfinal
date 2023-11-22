import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  orderBy,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import useAuthAndData, { FireUser } from "./use-auth";
import { db } from "../FirebaseConfig";
import { User } from "firebase/auth";

type FireuserReqRef = {
  refferalCode: string;
};
type FireuserReqProfile = {
  age: number;
  displayName: string;
  height: number;
};
type FireuserReqDoc = {
  hospital: string;
  phoneNumber: string;
  yearsOfExperience: number;
  profilePicUrl?: string;
};

type FireUserReq = FireuserReqProfile | FireuserReqDoc;

const useFireUser = () => {
  const { user } = useAuthAndData();
  const [isLoading, setIsLoading] = useState(false);

  const updateFireUser = async (id: string, payload: FireUserReq) => {
    setIsLoading(true);
    // console.log(id, payload);
    const queryRes = await getDocs(
      query(collection(db, "users"), where("id", "==", id))
    );
    const shoppingRef = doc(db, "users", queryRes.docs[0].id);
    await updateDoc(shoppingRef, payload).finally(() => setIsLoading(false));
  };

  const connectRefferal = async (user: User, payload: FireuserReqRef) => {
    try {
      setIsLoading(true);
      // console.log(payload.refferalCode);
      const queryRes = await getDocs(
        query(
          collection(db, "users"),
          where("refferalCode", "==", payload.refferalCode)
        )
      );
      if (queryRes.docs.length > 0) {
        const userRef = doc(db, "users", queryRes.docs[0].id);
        await updateDoc(userRef, { doctorId: user?.uid });
      } else {
        console.error("No user found with the referral code");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getPatients = async (user: User) => {
    setIsLoading(true);
    // console.log(user?.uid);
    if (!user) {
      // Handle the case where user is undefined or null
      return [];
    }

    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("doctorId", "==", user.uid),
          orderBy("displayName")
        )
      );

      const newList: FireUser[] = querySnapshot.docs.map(
        (doc) => doc.data() as FireUser
      );
      return newList;
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getContactDoc = async (user: FireUser) => {
    setIsLoading(true);
    // console.log(user?.uid);
    if (!user) {
      // Handle the case where user is undefined or null
      return [];
    }

    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "users"),
          where("id", "==", user.doctorId),
          orderBy("displayName")
        )
      );

      const newList: FireUser[] = querySnapshot.docs.map(
        (doc) => doc.data() as FireUser
      );
      return newList;
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDoctor = async (user: User) => {
    setIsLoading(true);
    // console.log(user?.uid);
    if (!user) {
      // Handle the case where user is undefined or null
      return [];
    }
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("role", "==", "DOCTOR"))
      );

      const newList: FireUser[] = querySnapshot.docs.map(
        (doc) => doc.data() as FireUser
      );
      return newList;
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateFireUser,
    connectRefferal,
    getDoctor,
    getPatients,
    getContactDoc,
  };
};

export default useFireUser;
// S6Gh9hyK
