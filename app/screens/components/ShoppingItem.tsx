import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";

type Props = {
  id: string;
  title: string;
  isChecked: boolean;
  getShoppingList?: () => void;
};

const ShoppingItem = ({ id, isChecked, title, getShoppingList }: Props) => {
  const [checked, setcChecked] = useState(isChecked);

  const updatIsChecked = async () => {
    const shoppingRef = doc(db, "shopping", id);
    await updateDoc(shoppingRef, {
      isChecked: checked,
    });
  };

  const deleteShoppingItem = async () => {
    await deleteDoc(doc(db, "shopping", id));
    // getShoppingList();
  };

  useEffect(() => {
    updatIsChecked();
  }, [checked]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => setcChecked((state) => !state)}>
        {checked ? (
          <AntDesign name="checkcircle" size={24} color={"black"} />
        ) : (
          <AntDesign name="checkcircleo" size={24} color={"black"} />
        )}
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={deleteShoppingItem}>
        <MaterialIcons name="delete" size={24} color={"black"} />
      </Pressable>
    </SafeAreaView>
  );
};

export default ShoppingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
  },
});
