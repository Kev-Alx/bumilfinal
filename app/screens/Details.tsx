import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ProgressBarAndroidComponent,
} from "react-native";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
} from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../FirebaseConfig";
const Details = () => {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri);
    }
  };
  //upload file
  const uploadImage = async (uri: string) => {
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

          await saveRecord(downloadURL, new Date().toISOString());
          setImage("");
        });
      }
    );
  };

  async function saveRecord(url: string, createdAt: string) {
    try {
      const docRef = await addDoc(collection(db, "guides"), {
        url,
        createdAt,
        title: "Test",
        category: "apa sih",
        content: "Nunggu eric",
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <Text>Details</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text>Pick an image</Text>
      </TouchableOpacity>
      {/* <ProgressBarAndroidComponent /> */}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {/* <TouchableOpacity onPress={uploadImage}>
        <Text>Upload the image</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
});
