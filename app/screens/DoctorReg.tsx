import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuthAndData from "../../hooks/use-auth";
import useFireUser from "../../hooks/use-fire-user";
import { Link, NavigationProp } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
import { Image } from "expo-image";
import useImageUploader from "../../hooks/use-image-uploader";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const DoctorReg = ({ navigation }: RouterProps) => {
  // console.log("hireg");
  const { user, fireUser } = useAuthAndData();
  const [hospital, setHospital] = useState("RS Darmo");
  const [phoneNo, setPhoneNo] = useState("6281233734356");
  const [yearsExp, setYearsExp] = useState("4");
  const { updateFireUser } = useFireUser();
  const { pickImage, URL } = useImageUploader([3, 4]);

  const handleReg = () => {
    if (hospital.length < 1 || phoneNo.length < 1 || yearsExp === "") {
      return;
    }
    updateFireUser(user?.uid || "", {
      hospital,
      phoneNumber: phoneNo,
      yearsOfExperience: +yearsExp,
      profilePicUrl: URL ? URL : undefined,
    }).then(() => {
      navigation.navigate("CompletedLayout");
    });
  };

  return (
    <View style={styles.doctorRegComplete}>
      <Image
        style={styles.molang3dCopy11080x19201}
        contentFit="cover"
        source={require("../../assets/doctorReg/molang-3d--copy11080x1920-1.png")}
      />
      <Text style={styles.title}>Let's complete your registration</Text>

      <Text style={[styles.hospitalYoureAffiliated, styles.phoneNumberTypo]}>
        Hospital you’re affiliated at
      </Text>
      <View style={[styles.frameView, styles.rectangleLayout]}>
        <TextInput
          style={[styles.xxXxxXxx, styles.xxxTypo]}
          placeholder="Hospital"
          autoCapitalize="none"
          onChangeText={(text) => setHospital(text)}
          value={hospital}
        ></TextInput>
        <Image
          style={[styles.frameChild1, styles.vectorIcon1Layout]}
          contentFit="cover"
          source={require("../../assets/doctorReg/vector5.png")}
        />
      </View>

      <Text style={[styles.phoneNumber, styles.phoneNumberTypo]}>
        Phone number
      </Text>
      <View style={[styles.rectangleParent1, styles.rectangleLayout]}>
        <TextInput
          style={[styles.xxXxxXxx, styles.xxxTypo]}
          placeholder="+62xx xxx xxx"
          autoCapitalize="none"
          onChangeText={(text) => setPhoneNo(text)}
          value={phoneNo}
          keyboardType="number-pad"
        ></TextInput>
        <Image
          style={[styles.frameChild1, styles.vectorIcon1Layout]}
          contentFit="cover"
          source={require("../../assets/doctorReg/group-38.png")}
        />
      </View>

      <Text style={[styles.yearsOfExperience, styles.phoneNumberTypo]}>
        Years of experience
      </Text>
      <View style={[styles.rectangleParent1, styles.rectangleLayout]}>
        <TextInput
          style={[styles.xxXxxXxx, styles.xxxTypo]}
          placeholder="ex. 8 years"
          autoCapitalize="none"
          onChangeText={(text) => setYearsExp(text)}
          value={yearsExp}
          keyboardType="number-pad"
        ></TextInput>
        <Image
          style={[styles.vectorIcon2, styles.iconLayout]}
          contentFit="cover"
          source={require("../../assets/doctorReg/vector6.png")}
        />
      </View>
      <Text style={[styles.yearsOfExperience, styles.phoneNumberTypo]}>
        Your profile image
      </Text>
      <TouchableOpacity
        style={[
          styles.kxrect,
          URL ? { backgroundColor: Color.colorHoneydew } : null,
        ]}
        onPress={pickImage}
      >
        <Text style={styles.kxuplaod}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReg} style={styles.rectangleParent}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorReg;

const styles = StyleSheet.create({
  kxrect: {
    marginTop: 8,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    height: 52,
    width: "80%",
    left: "10%",
    borderRadius: Border.br_5xs,
  },
  kxuplaod: {
    top: 6,
    height: 32,
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    color: Color.colorGray_300,
    textAlign: "center",
    lineHeight: 32,
  },
  title: {
    marginTop: 90,
    marginBottom: 64,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.montserratBold,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    zIndex: 1,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleLayout: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    left: "10%",
    borderColor: Color.colorDarkslateblue,
    borderStyle: "solid",
    height: 52,
    width: "80%",
    borderRadius: Border.br_5xs,
    overflow: "hidden",
  },
  xxxTypo: {
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
    width: "88%",
    height: "100%",
  },
  vectorIcon1Layout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  phoneNumberTypo: {
    height: 19,
    width: 195,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    left: 50,
    textAlign: "left",
  },
  molang3dCopy11080x19201: {
    width: "100%",
    height: "80%",
    bottom: 0,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorDarkslateblue,
    borderRadius: Border.br_5xs,
    top: 0,
    height: 42,
    width: 261,
    left: 0,
    position: "absolute",
  },
  finish: {
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: "#fff1f2",
    textAlign: "left",
    top: 0,
    left: 0,
    position: "absolute",
  },
  finishWrapper: {
    top: 9,
    left: 101,
    width: 59,
    height: 24,
    position: "absolute",
  },
  rectangleParent: {
    marginTop: 32,
    left: "10%",
    paddingVertical: 8,
    width: "80%",
    borderRadius: 8,
    backgroundColor: Color.colorDarkslateblue,
  },
  buttonText: {
    height: 35,
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    color: Color.colorWhite,
    textAlign: "center",
    lineHeight: 32,
  },
  groupIcon: {
    height: "12.28%",
    width: "18.44%",
    top: "77.88%",
    right: "81.56%",
    bottom: "9.85%",
    left: "0%",
  },
  frameChild: {
    backgroundColor: Color.colorWhite,
    height: 56,
    width: 259,
    borderRadius: Border.br_5xs,
    top: 0,
    left: 0,
    position: "absolute",
  },
  email: {
    top: 20,
    left: 44,
  },
  vectorIcon: {
    width: "10.46%",
    top: 19,
    right: "85.29%",
    left: "4.25%",
    height: 20,
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleGroup: {
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderStyle: "solid",
    top: 0,
    left: 0,
  },
  hospital: {
    width: 190,
    top: 10,
    left: 50,
  },
  vectorIcon1: {
    height: "50%",
    top: "19.23%",
    right: "84.56%",
    bottom: "28.85%",
    left: "4.63%",
  },
  frameParent: {
    height: 52,
    width: "80%",
    left: 50,
  },
  xxXxxXxx: {
    width: 190,
    left: 50,
  },
  frameChild1: {
    height: 24,
    width: 24,
    right: "83.78%",
    bottom: "19.23%",
    left: "5.41%",
  },
  frameView: {
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  vectorIcon2: {
    height: 24,
    width: 24,
    right: "83.59%",
    bottom: "20.19%",
    left: "4.44%",
  },
  rectangleParent1: {
    marginTop: 8,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
  },
  hospitalYoureAffiliated: {
    marginTop: -12,
    marginBottom: 8,
  },
  phoneNumber: {
    marginTop: 16,
  },
  yearsOfExperience: {
    marginTop: 16,
  },
  doctorRegComplete: {
    backgroundColor: Color.colorMistyrose_100,
    flex: 1,
    width: "100%",
    height: 800,
    alignContent: "center",
  },
});
