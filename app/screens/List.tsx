import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, db } from "../../FirebaseConfig";
import ShoppingItem from "./components/ShoppingItem";
import { MaterialIcons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import useAuth from "../../hooks/use-auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
  const [title, setTitle] = useState("");
  const [displayname, setDisplayName] = useState("");
  const [shoppingList, setShoppingList] = useState<
    {
      id: string;
      title: string;
      isChecked: boolean;
    }[]
  >([]);
  const user = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (user !== null) {
      unsubscribe = onSnapshot(
        query(
          collection(db, "shopping"),
          orderBy("createdAt"),
          where("userId", "==", user?.user?.uid)
        ),
        (snapshot) => {
          const newList = snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            isChecked: doc.data().isChecked,
          }));
          setShoppingList(newList);
        }
      );
      // fetchData();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user]);

  const addShoppingItem = async () => {
    try {
      await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
        createdAt: serverTimestamp(),
        userId: user?.user?.uid,
      });
      // console.log("Success", docRef.id);
      setTitle("");
    } catch (error: any) {
      console.error(error);
    }
    // getShoppingList();
  };

  // const getShoppingList = async () => {
  //   console.log(user);
  //   const queryRes = await getDocs(
  //     query(
  //       collection(db, "shopping"),
  //       orderBy("createdAt"),
  //       where("userId", "==", user?.uid)
  //     )
  //   );
  //   const newList = queryRes.docs.map((doc) => ({
  //     id: doc.id,
  //     title: doc.data().title,
  //     isChecked: doc.data().isChecked,
  //   }));
  //   setShoppingList(newList);
  // };

  const deleteShoppingList = async () => {
    const queryRes = await getDocs(
      query(collection(db, "shopping"), orderBy("createdAt"))
    );
    queryRes.docs.map((item) => {
      deleteDoc(doc(db, "shopping", item.id));
    });
    // getShoppingList();
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text>Shopping List {displayname}</Text>
        <Text>{shoppingList.length}</Text>
        <Pressable onPress={deleteShoppingList}>
          <MaterialIcons name="delete" size={30} color={"black"} />
        </Pressable>
      </View>
      <Button title="Details" onPress={() => navigation.navigate("details")} />
      <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => (
            <ShoppingItem
              title={item.title}
              isChecked={item.isChecked}
              id={item.id}
              // getShoppingList={getShoppingList}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter a shopping list"
        value={title}
        onChangeText={(e) => setTitle(e)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
};

export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "90%",
  },
  input: {
    backgroundColor: "lightgray",
    padding: 10,
    marginTop: "auto",
    borderRadius: 10,
  },
});
