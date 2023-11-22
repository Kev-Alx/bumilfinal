import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import useFireUser from "../../hooks/use-fire-user";
import useAuthAndData, { FireUser } from "../../hooks/use-auth";
import { useActivePatient } from "../../lib/store";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
import { Image } from "expo-image";
import { NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PatientCard from "./components/PatientCard";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const DoctorHome = ({ navigation }: RouterProps) => {
  const { user, fireUser } = useAuthAndData();
  const [refferalCode, setRefferalCode] = useState("");
  const [patients, setPatients] = useState<FireUser[]>([]);
  const { connectRefferal, getPatients } = useFireUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const patients = await getPatients(user);
          setPatients(patients as FireUser[]);
        }
      } catch (error) {
        // console.error("Error fetching patients:", error);
      }
    };
    fetchData();
  }, [user]);
  const handleRef = async () => {
    if (user) {
      await connectRefferal(user, { refferalCode: refferalCode });
      const patients = await getPatients(user);
      setPatients(patients as FireUser[]);
    }
    setRefferalCode("");
  };
  return (
    // <View>
    //   <Text>DoctorHome</Text>
    //   <TextInput
    //     value={refferalCode}
    //     onChangeText={(e) => {
    //       setRefferalCode(e);
    //     }}
    //   />
    //   <Button onPress={handleRef} title="Search" />
    //   {patients.map((pat) => {
    //     return (
    //       <View style={{ flexDirection: "row" }} key={pat.id}>
    //         <Text key={pat.id}>{pat.displayName}</Text>
    //         <Button
    //           title="schedule"
    //           onPress={() => {
    //             setActivePatient(pat);
    //             navigation.navigate("AddSchedule");
    //           }}
    //         />
    //         <Button title="add consult" onPress={() => setActivePatient(pat)} />
    //       </View>
    //     );
    //   })}
    // </View>
    <View style={styles.doctorHomescreen}>
      <Text style={styles.hiBumilsDoctor}>Hi, {fireUser?.displayName}</Text>
      <View style={styles.ikiSisanBTlgChild} />
      <View style={[styles.ellipseParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChildLayout]}
          contentFit="cover"
          source={require("../../assets/doctorHome/ellipse-11.png")}
        />
        <Image
          style={styles.molang1Icon}
          contentFit="cover"
          source={require("../../assets/doctorHome/molang-1.png")}
        />
      </View>

      <Text style={[styles.addAPatientTypo]}>Add a patient</Text>

      {/* search bar */}
      <View style={styles.frameParent}>
        <View style={styles.rectangleParent}>
          <TextInput
            style={[styles.enterAPatient, styles.addTypo]}
            placeholder="Enter a refferal code"
            value={refferalCode}
            onChangeText={(e) => setRefferalCode(e)}
          ></TextInput>
        </View>
        <Image
          style={[styles.groupItem, styles.groupItemPosition]}
          contentFit="cover"
          source={require("../../assets/doctorHome/group-6.png")}
        />
      </View>

      {/* add button */}
      <TouchableOpacity
        onPress={handleRef}
        style={styles.doctorHomescreenChild}
      />
      <Text style={[styles.add, styles.addTypo]}>
        <Ionicons
          name="add-outline"
          size={28}
          color={Color.colorDarkslateblue}
        />
      </Text>
      <TouchableOpacity />

      <Text style={[styles.myPatientsTypo]}>My patients</Text>

      {/* Card */}
      <ScrollView style={styles.scrollContainer}>
        {patients.map((pat) => (
          <PatientCard key={pat.id} patient={pat} nav={navigation} />
        ))}
        {/* <View style={styles.patientCard}>
          <View style={styles.whiteBox}>
            <View style={styles.whiteBoxTop}>
              <View style={styles.whiteBoxLogo}>
                <Image
                  style={[styles.groupLayout]}
                  contentFit="cover"
                  source={require("../../assets/doctorHome/ellipse-12.png")}
                />
                <Image
                  style={[styles.molang1Icon1, styles.groupItemPosition]}
                  contentFit="cover"
                  source={require("../../assets/doctorHome/molang-11.png")}
                />
              </View>
              <View>
                <Text style={styles.bumilNo1}>Bumil no 1</Text>
                <Text style={styles.totalConsultations}>
                  3 TOTAL CONSULTATIONS
                </Text>
              </View>
            </View>

            <View style={styles.containerButton}>
              <TouchableOpacity
                onPress={() => {
                  console.log("halo");
                }}
                style={[styles.scheduleConsultation]}
              >
                <Text style={[styles.addNewEntryTypo]}>
                  Schedule a consultation
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log("Oke bisa");
                }}
                style={[styles.addNewEntry]}
              >
                <Text style={[styles.addNewEntryTypo]}>Add new entry</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.pinkBox}
            onPress={() => {
              console.log("Oke bisa");
            }}
          >
            <Image
              style={[styles.vectorIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../../assets/doctorHome/vector.png")}
            />
            <Text style={[styles.viewPastConsultations]}>
              View past consultations
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default DoctorHome;
const styles = StyleSheet.create({
  ikiSisanBTlgChild: {
    top: 85,
    left: 37,
    borderColor: Color.colorLightcoral,
    width: "60%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Color.colorMistyrose_100,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  groupChildLayout: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  myPatientsTypo: {
    top: 0,
    color: Color.colorGray_200,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    left: 34,
    textAlign: "left",
    marginBottom: 5,
  },
  addTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  groupItemPosition: {
    height: 30,
    left: 3,
  },
  scheduleConsultation: {
    marginRight: 10,
    height: 35,
    width: "40%",
    borderBottomWidth: 2,
    borderColor: Color.colorDarkslateblue,
    backgroundColor: Color.colorLightblue,
    borderRadius: Border.br_9xs,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  addNewEntry: {
    height: 35,
    width: "40%",
    borderBottomWidth: 2,
    borderColor: Color.colorDarkslateblue,
    backgroundColor: Color.colorLightblue,
    borderRadius: Border.br_9xs,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  addNewEntryTypo: {
    top: 0,
    color: Color.colorGray_300,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_3xs,
  },
  groupLayout: {
    height: 36,
    width: 36,
    position: "absolute",
  },
  hiBumilsDoctor: {
    top: 56,
    marginBottom: 95,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.montserratBold,
    color: Color.colorCrimson,
    left: "9.3%",
    textAlign: "left",
  },
  molang1Icon: {
    top: 4,
    left: 4,
    height: 42,
    width: 42,
  },
  ellipseParent: {
    top: 48,
    right: "11%",
  },

  addAPatientTypo: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    left: 34,
    textAlign: "left",
  },
  frameChild: {
    backgroundColor: Color.colorSnow,
    height: 39,
    borderRadius: Border.br_5xs,
    width: 242,
  },
  enterAPatient: {
    left: 35,
    width: "100%",
    height: "100%",
    fontSize: 14,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: "#000000",
  },
  rectangleParent: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: Color.colorLightblue,
    borderRadius: Border.br_5xs,
    backgroundColor: Color.colorSnow,
    width: "100%",
    height: 42,
    borderTopWidth: 1,
    borderStyle: "solid",
    top: 0,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  groupItem: {
    top: 2,
    width: 24,
  },
  frameParent: {
    width: "68%",
    marginTop: 8,
    height: 42,
    left: 34,
    marginBottom: 32,
  },
  doctorHomescreenChild: {
    left: 311,
    backgroundColor: Color.colorGray_100,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: Color.colorLightblue,
    borderRadius: Border.br_5xs,
    top: 151,
    height: 42,
    zIndex: 10,
    width: 42,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  add: {
    top: 156,
    left: 319,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    zIndex: 11,
  },

  viewPastConsultations: {
    top: 24,
    left: 8,
    fontSize: 12,
    color: Color.colorGray_100,
    width: "100%",
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },

  bumilNo1: {
    color: Color.colorGray_300,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    textAlign: "left",
  },
  totalConsultations: {
    fontSize: FontSize.size_5xs,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorGray_500,
    textAlign: "left",
    marginBottom: 30,
  },
  patientCard: {
    marginTop: 5,
    height: 112,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.colorGray_200,
    width: "81%",
    borderRadius: Border.br_5xs,
    left: 34,
    borderStyle: "solid",
    flexDirection: "row",
    marginBottom: 20,
  },
  pinkBox: {
    width: "34%",
    backgroundColor: Color.colorLightpink,
    borderTopRightRadius: Border.br_5xs,
    borderBottomRightRadius: Border.br_5xs,
    height: 109,
  },
  vectorIcon: {
    top: "5%",
    left: "70%",
    height: 14,
    width: 24,
  },
  whiteBox: {
    width: "66%",
    height: 110,
    backgroundColor: Color.colorGray_100,
    borderTopLeftRadius: Border.br_5xs,
    borderBottomLeftRadius: Border.br_5xs,
    top: 0,
    left: 0,
  },
  whiteBoxTop: {
    top: 8,
    left: 8,
    flexDirection: "row",
  },
  whiteBoxLogo: {
    marginRight: 10,
  },
  containerButton: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  molang1Icon1: {
    top: 3,
    width: 30,
  },
  doctorHomescreen: {
    backgroundColor: Color.colorMistyrose_100,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    alignContent: "center",
  },
  buttonClose: {
    left: 270,
    height: 35,
    width: "20%",
    backgroundColor: "#FB7185",
    borderRadius: Border.br_9xs,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  textClose: {
    color: "#FFF1F2",
    width: "30%",
  },
  underline: {
    position: "relative",
    borderTopWidth: 1,
    width: "70%",
  },
  textContainer: {
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
  },
});
