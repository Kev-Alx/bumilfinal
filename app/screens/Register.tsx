import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";
import { FIREBASE_AUTH, db } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "@react-navigation/native";
import { generateRandomString } from "../../lib/utils";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [role, setRole] = useState("MOM");

  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setisLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        id: res.user.uid,
        role: role,
        displayName: username,
        refferalCode: generateRandomString(username.substring(4)),
      });
      // alert("Check your emails!");
    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    // <View style={styles.container}>
    //   <Text>Register</Text>
    //   <View style={styles.flex}>
    //     <Button onPress={() => setRole("DOCTOR")} title="Doctor" />
    //     <Button title="Mom" onPress={() => setRole("MOM")} />
    //   </View>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Email"
    //     autoCapitalize="none"
    //     onChangeText={(text) => setEmail(text)}
    //     value={email}
    //   ></TextInput>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Username"
    //     autoCapitalize="none"
    //     onChangeText={(text) => setUsername(text)}
    //     value={username}
    //   ></TextInput>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Password"
    //     autoCapitalize="none"
    //     onChangeText={(text) => setPassword(text)}
    //     value={password}
    //     secureTextEntry={true}
    //   ></TextInput>
    //   {isLoading ? (
    //     <ActivityIndicator size={"large"} color="#0000ff" />
    //   ) : (
    //     <>
    //       <Button title="Sign up" onPress={signUp} />
    //     </>
    //   )}
    //   <Link to={"/Login"}>Login</Link>
    // </View>
    <View style={styles.signUp}>
      <Image
        style={[styles.molang3dCopy1360x8006, styles.signUpItemLayout]}
        contentFit="cover"
        source={require("../../assets/MolangSignUp.png")}
      />
      <Text style={styles.imSigningUp}>I’m signing up as a...</Text>

      <View style={styles.kxwrap}>
        <TouchableOpacity
          style={[styles.signUpInner, styles.groupLayout]}
          onPress={() => setRole("MOM")}
        >
          <View style={[styles.rectangleParent, styles.groupLayout]}>
            <View
              style={[
                styles.groupChild,
                styles.frameViewPosition,
                role === "MOM" ? styles.activeButton : null,
              ]}
            />
            <Text style={[styles.mom, styles.momTypo]}>Mom</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.groupView, styles.groupLayout]}
          onPress={() => setRole("DOCTOR")}
        >
          <View style={[styles.rectangleParent, styles.groupLayout]}>
            <View
              style={[
                styles.groupItem,
                role === "DOCTOR" ? styles.activeButton : null,
              ]}
            />
            <Text style={[styles.doctor, styles.momTypo]}>Doctor</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.signUpInner1, styles.signInnerLayout]}>
        <View style={[styles.frameView]}>
          <TextInput
            placeholder="Username"
            style={[styles.email1]}
            autoCapitalize="none"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../../assets/vectorUsernameSignUp.png")}
          />
        </View>
      </View>
      <View style={[styles.signUpInner2, styles.signInnerLayout]}>
        <View style={[styles.frameView]}>
          <TextInput
            placeholder="Email"
            style={[styles.email1]}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
          <Image
            style={[styles.vectorIcon1, styles.vectorIconPosition]}
            contentFit="cover"
            source={require("../../assets/vectorEmailSignUp.png")}
          />
        </View>
      </View>
      <View style={[styles.signUpInner3, styles.signInnerLayout]}>
        <View style={[styles.frameView]}>
          <TextInput
            placeholder="Password"
            style={[styles.email1]}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <Image
            style={[styles.vectorIcon2, styles.vectorIconPosition]}
            contentFit="cover"
            source={require("../../assets/vectorPasswordSignUp.png")}
          />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 16, marginBottom: 0 }}
          size={"large"}
          color={Color.colorLightcoral}
        />
      ) : (
        <TouchableOpacity
          style={[styles.rectangleParent3, styles.groupChild8Layout]}
          onPress={signUp}
        >
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.alreadyHaveAnContainer]}>
        <Text style={styles.alreadyHaveAn}>{`Already have an account? `}</Text>
        <Link style={styles.logIn} to={"/Login"}>
          Log in
        </Link>
      </Text>
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  kxwrap: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    left: 12,
    marginTop: 8,
  },
  activeButton: {
    backgroundColor: "#fda6d5",
    borderColor: Color.colorLightcoral,
  },
  email1: {
    top: 0,
    left: 56,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_sm,
    width: "100%",
    height: "100%",
  },
  signUpItemLayout: {
    width: "100%",
    position: "absolute",
  },
  groupLayout: {
    width: "40%",
    height: 56,
    position: "absolute",
  },
  frameViewPosition: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  momTypo: {
    height: 15,
    textAlign: "center",
    fontSize: 14,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "bold",
    position: "absolute",
  },
  groupChildShadowBox1: {
    height: 28,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  groupChildShadowBox: {
    top: 37,
    height: 28,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  signInnerLayout: {
    height: 48,
    width: "88%",
  },
  usernameTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  vectorIconPosition: {
    left: "4.25%",
    right: "86.87%",
    width: "8.88%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupChild8Layout: {
    height: 42,
    width: "88%",
  },
  molang3dCopy1360x8006: {
    left: 0,
    top: 300,
    bottom: 80,
    height: 800,
  },
  signUpChild: {
    top: 512,
    backgroundColor: "rgba(217, 217, 217, 0.01)",
    height: 56,
    width: 360,
    left: 0,
    position: "absolute",
  },
  signUpItem: {
    top: 409,
    height: 427,
    backgroundColor: "transparent",
  },
  alreadyHaveAn: {
    color: Color.colorDarkslateblue,
    fontWeight: "bold",
  },
  logIn: {
    color: Color.colorLightcoral,
    fontWeight: "bold",
    fontFamily: FontFamily.montserratBold,
  },
  alreadyHaveAnContainer: {
    marginTop: 12,
    fontSize: FontSize.size_lg,
    width: "80%",
    textAlign: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  imSigningUp: {
    marginTop: 140,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "bold",
  },
  groupChild: {
    width: 124,
    height: 56,
    position: "absolute",
    borderColor: Color.colorLightblue,
    backgroundColor: Color.colorWhite,
  },
  mom: {
    top: 16,
    left: 40,
    width: 44,
  },
  rectangleParent: {
    left: 0,
    top: 0,
  },
  signUpInner: {
    left: 186,
    width: "40%",
  },
  groupItem: {
    borderColor: Color.colorLightblue,
    backgroundColor: Color.colorWhite,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    width: 124,
    height: 56,
    left: 0,
    top: 0,
    position: "absolute",
  },
  doctor: {
    top: 15,
    left: 31,
    width: 60,
  },
  groupView: {
    left: 50,
    width: 124,
  },
  groupInner: {
    backgroundColor: "#7dd3fc",
    left: 45,
    top: 77,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
  },
  rectangleView: {
    backgroundColor: "#fff5e1",
    top: 77,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
    left: 0,
  },
  groupChild1: {
    backgroundColor: Color.colorLightblue,
    left: 130,
    top: 77,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
  },
  groupChild2: {
    backgroundColor: "#f1f5f9",
    left: 0,
  },
  groupChild3: {
    backgroundColor: Color.colorLightcoral,
    left: 45,
  },
  groupChild4: {
    left: 170,
    backgroundColor: "#fbcfe8",
    top: 77,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
  },
  groupChild5: {
    backgroundColor: "#fce7f3",
    left: 130,
    top: 0,
  },
  groupChild6: {
    left: 90,
    backgroundColor: "#ffe4e6",
    top: 77,
    width: 28,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
  },
  groupChild7: {
    backgroundColor: Color.colorDarkslateblue,
    left: 130,
  },
  rectangleContainer: {
    top: -538,
    left: -50,
    width: 198,
    height: 105,
    position: "absolute",
  },
  frameChild: {
    height: 39,
    width: 259,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    position: "absolute",
  },
  username: {
    top: 14,
    left: 43,
    fontSize: FontSize.size_3xs,
    color: Color.colorLightblue,
    textAlign: "left",
    position: "absolute",
  },
  vectorIcon: {
    height: 29,
    width: 22,
    top: "21.43%",
    right: "89.08%",
    bottom: "26.19%",
    left: 20,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameView: {
    borderColor: Color.colorDarkslateblue,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    overflow: "hidden",
    height: 52,
    backgroundColor: Color.colorWhite,
  },
  signUpInner1: {
    marginTop: 64,
    marginBottom: 0,
  },
  vectorIcon1: {
    height: 22,
    top: "28.57%",
    bottom: "30.95%",
  },
  signUpInner2: {
    marginTop: 16,
    marginBottom: 0,
  },
  vectorIcon2: {
    height: "43.15%",
    top: "26.19%",
    bottom: "30.66%",
  },
  signUpInner3: {
    marginTop: 16,
  },
  groupChild8: {
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_5xs,
    width: 261,
    left: 0,
    top: 0,
  },
  register: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: "#fff1f2",
    textAlign: "center",
  },
  registerWrapper: {
    top: 8,
    left: 98,
    width: 66,
  },
  rectangleParent3: {
    marginTop: 16,
    marginBottom: 0,
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_5xs,
    justifyContent: "center",
  },
  signUp: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    height: 800,
    backgroundColor: "#fed2d1",
  },
});
