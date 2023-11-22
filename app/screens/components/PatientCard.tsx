import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Border, Color, FontFamily, FontSize } from "../../../globalstyles";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useActivePatient } from "../../../lib/store";
import { FireUser } from "../../../hooks/use-auth";

type PatientCardProps = {
  patient: FireUser;
  nav: any;
};

const PatientCard = ({ patient, nav }: PatientCardProps) => {
  const { setActivePatient } = useActivePatient();
  return (
    <View style={styles.patientCard}>
      <View style={styles.whiteBox}>
        {/* bagian atas whitebox */}
        <View style={styles.whiteBoxTop}>
          <View style={styles.whiteBoxLogo}>
            <Image
              style={[styles.groupLayout]}
              contentFit="cover"
              source={require("../../../assets/doctorHome/ellipse-12.png")}
            />
            <Image
              style={[styles.molang1Icon1, styles.groupItemPosition]}
              contentFit="cover"
              source={require("../../../assets/doctorHome/molang-11.png")}
            />
          </View>
          <View>
            <Text style={styles.bumilNo1}>{patient.displayName}</Text>
          </View>
        </View>

        {/* bagian bawah whitebox */}
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => {
              setActivePatient(patient);
              nav.navigate("AddSchedule");
            }}
            style={[styles.scheduleConsultation]}
          >
            <Text style={[styles.addNewEntryTypo]}>
              Schedule a consultation
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActivePatient(patient);
              nav.navigate("AddConsultation");
            }}
            style={[styles.addNewEntry]}
          >
            <Text style={[styles.addNewEntryTypo]}>Add new entry</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* pinkbox */}
      <TouchableOpacity
        style={styles.pinkBox}
        onPress={() => {
          console.log("Oke bisa");
        }}
      >
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../../../assets/doctorHome/vector.png")}
        />
        <Text style={[styles.viewPastConsultations]}>
          View past consultations
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PatientCard;
const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
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
    fontSize: 11.5,
  },
  groupLayout: {
    height: 36,
    width: 36,
    position: "absolute",
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
  },

  viewPastConsultations: {
    top: 24,
    left: 8,
    fontSize: 14,
    color: Color.colorGray_100,
    width: "100%",
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },

  bumilNo1: {
    color: Color.colorGray_300,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    marginTop: 4,
    left: 4,
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
    height: 12,
    width: 21,
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
    marginTop: 30,
  },
  molang1Icon1: {
    top: 3,
    width: 30,
  },
});
