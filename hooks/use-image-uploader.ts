// useImageUploader.js
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { storage, db } from "../FirebaseConfig";

const useImageUploader = (aspect: [number, number]) => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState("");
  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  };

  //upload file
  const uploadImage = async (uri: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(uri);
      const blob = await res.blob();
      const storageRef = ref(storage, "images/" + new Date().getTime());
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress.toFixed());
        },
        (error) => {
          // handle error
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            // await saveRecord(downloadURL);
            setURL(downloadURL);
            setImage("");
          });
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // async function saveRecord(url: string) {
  //   try {
  //     const docRef = await updateDoc(collection(db, coll), {
  //       url,
  //       createdAt: serverTimestamp(),
  //     });
  //     console.log("document saved correctly", docRef.id);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return {
    image,
    URL,
    progress,
    setURL,
    isLoading,
    pickImage,
  };
};

export default useImageUploader;
