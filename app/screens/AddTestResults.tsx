import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border } from "../../globalstyles";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import useConsultation, { Consultation } from "../../hooks/use-consultation";
import useImageUploader from "../../hooks/use-image-uploader";
import { useActivePatient, useActiveTest } from "../../lib/store";
import { useState } from "react";

interface RouterProps {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const TestResults = ({ route, navigation }: RouterProps) => {
  const { addConsultation } = useConsultation();
  const { activePatient } = useActivePatient();
  const [testNoteBlood, setTestNoteBlood] = useState("");
  const [testNoteUrine, setTestNoteUrine] = useState("");
  const { isCheckblood, isCheckurine } = route.params as any;

  const { pickImage, URL, setURL } = useImageUploader([2, 3]);
  const {
    pickImage: urinePick,
    URL: URLUrine,
    setURL: setUrineURL,
  } = useImageUploader([2, 3]);
  const dateField = route.params?.date as string;
  const dateObject = new Date(dateField);
  const handleReg = async () => {
    if (!URL || !URLUrine) {
      return;
    }
    await addConsultation({
      testNoteBlood,
      testNoteUrine,
      testBlood: URL,
      testUrine: URLUrine,
      ...(route.params as Consultation),
      date: dateObject,
    }).then(() => {
      setURL("");
      setUrineURL("");
      navigation.navigate("DoctorHomeIndex");
    });
  };
  return (
    <SafeAreaView style={styles.testResults}>
      <View style={styles.frame}>
        <Text style={[styles.bumilNo1, styles.addTypo]}>
          {activePatient?.displayName}
        </Text>
        <Text style={[styles.addBloodTest, styles.addBloodTestTypo]}>
          Add test result for
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddConsultation")}
          style={styles.arrowSmLeftSvgrepocom}
        >
          <Image
            style={[styles.vectorIcon, styles.frameItemLayout]}
            contentFit="cover"
            source={require("../../assets/back-arrow.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.testResultsChild} />

      {isCheckblood && (
        <View style={[styles.frame1, styles.frame1Layout]}>
          <TextInput
            style={[styles.frameChild, styles.frameChildBorder]}
            placeholder={`Add some notes for the blood test result...`}
            multiline={true}
            value={testNoteBlood}
            onChangeText={(e) => setTestNoteBlood(e)}
          />
          <TouchableOpacity
            style={[
              styles.uploadAnImageParent,
              styles.frameChildBorder,
              URL ? { backgroundColor: Color.colorHoneydew } : null,
            ]}
            activeOpacity={0.6}
            onPress={pickImage}
          >
            <Text style={[styles.uploadAnImage, styles.addBloodTestTypo]}>
              Upload an image
            </Text>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              contentFit="contain"
              source={require("../../assets/addNewEntry/group-34.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      {isCheckurine && (
        <View style={[styles.frame1, styles.frame1Layout]}>
          <TextInput
            style={[styles.frameChild, styles.frameChildBorder]}
            placeholder={`Add some notes for the urine test result...`}
            multiline={true}
            value={testNoteUrine}
            onChangeText={(e) => setTestNoteUrine(e)}
          />
          <TouchableOpacity
            style={[
              styles.uploadAnImageParent,
              styles.frameChildBorder,
              URLUrine ? { backgroundColor: Color.colorHoneydew } : null,
            ]}
            activeOpacity={0.6}
            onPress={urinePick}
          >
            <Text style={[styles.uploadAnImage, styles.addBloodTestTypo]}>
              Upload an image
            </Text>
            <Image
              style={[styles.frameItem, styles.frameItemLayout]}
              contentFit="contain"
              source={require("../../assets/addNewEntry/group-34.png")}
            />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={[styles.addWrapper, styles.frame1Layout]}
        activeOpacity={0.79}
        onPress={handleReg}
      >
        <Text style={[styles.add, styles.addTypo]}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addTypo: {
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
  },
  addBloodTestTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  frameItemLayout: {},
  frame1Layout: {
    width: "80%",
    marginTop: 16,
  },
  frameChildBorder: {
    borderColor: Color.colorDarkslateblue,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
    overflow: "hidden",
    width: "100%",
  },
  bumilNo1: {
    top: 29,
    marginLeft: 48,
    fontSize: FontSize.size_xxl,
    color: Color.colorCrimson,
    position: "absolute",
    textAlign: "left",
  },
  addBloodTest: {
    top: 12,
    left: 48,
    color: Color.colorLightpink,
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    fontSize: FontSize.size_xs,
  },
  vectorIcon: {
    height: "46.75%",
    width: "55%",
    top: "26.75%",
    right: "22.5%",
    bottom: "26.5%",
    left: "22.5%",
    maxHeight: "100%",
  },
  arrowSmLeftSvgrepocom: {
    width: 40,
    height: 40,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frame: {
    width: "95%",
    height: 58,
    overflow: "hidden",
  },
  testResultsChild: {
    borderColor: Color.colorLightcoral,
    borderTopWidth: 1,
    width: "80%",
    height: 1,
    marginTop: 16,
    borderStyle: "solid",
  },
  frameChild: {
    top: 57,
    borderBottomRightRadius: Border.br_5xs,
    borderBottomLeftRadius: Border.br_5xs,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderLeftWidth: 1,
    height: 118,
    padding: 8,
  },
  uploadAnImage: {
    top: 20,
    left: 13,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGray_300,
  },
  frameItem: {
    width: 32,
    top: 15,
    left: "85%",
    height: 28,
  },
  uploadAnImageParent: {
    borderTopLeftRadius: Border.br_5xs,
    borderTopRightRadius: Border.br_5xs,
    borderWidth: 1,
    height: 57,
    top: 0,
    borderColor: Color.colorDarkslateblue,
    backgroundColor: Color.colorWhite,
  },
  frame1: {
    height: 175,
    alignSelf: "center",
    overflow: "hidden",
  },
  add: {
    fontSize: FontSize.size_base,
    color: Color.colorLavenderblush,
  },
  addWrapper: {
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorLightcoral,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    height: 42,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  testResults: {
    backgroundColor: Color.colorSnow,
    flex: 1,
    height: 800,
    alignItems: "center",
    overflow: "hidden",
    width: "100%",
  },
});

export default TestResults;
