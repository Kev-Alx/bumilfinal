import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

export type FireUser = {
  displayName: string;
  id: string;
  role: "MOM" | "DOCTOR";
  age?: number;
  height?: number;
  refferalCode?: string;
  doctorId?: string;
  hospital?: string;
  phoneNumber?: string;
  profilePicUrl?: string;
  yearsOfExperience?: number;
};

const useAuthAndData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fireUser, setFireUser] = useState<FireUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setIsLoading(true);
      if (authUser) {
        setUser(authUser);
        await fetchData(authUser.uid);
      } else {
        setUser(null);
        setFireUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  const fetchData = async (userId: string) => {
    try {
      // if (!user) {
      //   return;
      // }
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("id", "==", userId))
      );

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setFireUser(userData as FireUser);
        return userData;
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, fireUser, isLoading, fetchData };
};

export default useAuthAndData;
