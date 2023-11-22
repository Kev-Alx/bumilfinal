import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontSize, FontFamily } from "../../globalstyles";
import React, { useState } from "react";
import { FIREBASE_AUTH, db } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  // setPersistence(auth, browserSessionPersistence);
  const signIn = async () => {
    setisLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // console.log(error);
      alert("Login failed: " + error.message);
    } finally {
      setisLoading(false);
    }
  };
  return (
    // <View style={styles.container}>
    //   <Text style={styles.loginText}>Login</Text>
    //   <KeyboardAvoidingView behavior="padding">
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Email"
    //       autoCapitalize="none"
    //       onChangeText={(text) => setEmail(text)}
    //       value={email}
    //     ></TextInput>

    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       autoCapitalize="none"
    //       onChangeText={(text) => setPassword(text)}
    //       value={password}
    //       secureTextEntry={true}
    //     ></TextInput>

    //     {isLoading ? (
    //       <ActivityIndicator size={"large"} color="#0000ff" />
    //     ) : (
    //       <>
    //         <Button title="Login" onPress={signIn} />
    //       </>
    //     )}
    //     <Link to={"/Register"}>Register</Link>
    //   </KeyboardAvoidingView>
    // </View>
    <View style={styles.login}>
      <Image
        style={styles.molang3dCopy4360x8001}
        source={require("../../assets/Molang.png")}
        contentFit="cover"
      />
      <Text style={[styles.bumil, styles.bumilFlexBox]}>BUMIL</Text>

      <View style={[styles.frameViewLayout, styles.kxemail]}>
        <View style={styles.frameChild} />
        <TextInput
          style={[styles.email1, styles.emailTypo]}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <Image
          style={[styles.vectorIcon, styles.vectorIconLayout]}
          source={require("../../assets/Vector.png")}
          contentFit="cover"
        />
      </View>
      <View style={[styles.frameViewLayout]}>
        <View style={styles.frameChild} />
        <TextInput
          style={[styles.email1, styles.emailTypo]}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <Image
          style={[styles.vectorIcon1, styles.vectorIconLayout]}
          source={require("../../assets/Vector2.png")}
          contentFit="cover"
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={Color.colorLightcoral}
          style={{ marginTop: 12 }}
        />
      ) : (
        <TouchableOpacity style={styles.rectangleParent} onPress={signIn}>
          <Text style={[styles.login1, styles.bumilFlexBox]}>Login</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.dontHaveAnContainer}>
        <Text style={styles.dontHaveAn}>{`Don’t have an account? `}</Text>
        <Link style={styles.signUp} to={"/Register"}>
          Sign up
        </Link>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  kxemail: {
    marginBottom: 24,
    marginTop: 280,
  },
  bumilFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameViewLayout: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderStyle: "solid",
    height: 52,
    width: "80%",
    borderRadius: Border.br_5xs,
    overflow: "hidden",
  },
  emailTypo: {
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  vectorIconLayout: {
    height: 20,
    left: "4.25%",
    right: "85.31%",
    width: 28,
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  molang3dCopy4360x8001: {
    left: 1,
    width: "100%",
    top: 0,
    position: "absolute",
    height: "100%",
  },
  groupChild: {
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_5xs,
    width: "100%",
    left: 0,
    height: 42,

    top: 0,
    position: "absolute",
  },
  login1: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: "#fff1f2",
  },
  loginWrapper: {
    top: 8,
    left: 103,
    width: "80%",
    height: 24,
    position: "absolute",
  },
  rectangleParent: {
    top: 650,
    height: 42,
    width: "80%",
    position: "absolute",
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_5xs,
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveAn: {
    color: Color.colorDarkslateblue,
  },
  signUp: {
    color: Color.colorLightcoral,
  },
  dontHaveAnContainer: {
    top: 705,

    fontSize: 12,
    height: 19,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  groupIcon: {
    height: "12.29%",
    width: "18.54%",
    top: "77.88%",
    right: "81.46%",
    bottom: "9.83%",
    left: "0%",
  },
  loginChild: {
    top: 113,
    backgroundColor: "rgba(217, 217, 217, 0.1)",
    width: 260,
    height: 89,
    left: 50,
    position: "absolute",
  },
  bumil: {
    top: 123,
    left: 84,
    fontSize: 56,
    fontFamily: FontFamily.montserratBold,
    width: 203,
    height: 70,
    color: Color.colorLightcoral,
  },
  frameChild: {
    backgroundColor: Color.colorWhite,
    height: 56,
    width: "100%",
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    position: "absolute",
  },
  email: {
    top: 16,
    left: 44,
  },
  vectorIcon: {
    top: 16,
  },
  rectangleGroup: {
    left: 0,
    top: 0,
  },
  email1: {
    top: 0,
    left: 49,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_sm,
    width: "100%",
    height: "100%",
  },
  vectorIcon1: {
    top: 16,
  },
  frameParent: {
    top: 520,
    height: 52,
    width: 259,
    left: 50,
    position: "absolute",
  },
  password: {
    top: 18,
    left: 50,
  },
  vectorIcon2: {
    height: "35.71%",
    width: "9.8%",
    top: "30.77%",
    right: "85.57%",
    bottom: "33.52%",
    left: "4.63%",
  },
  frameView: {
    top: 585,
    left: 50,
  },
  login: {
    backgroundColor: "#fed2d1",
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 800,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
