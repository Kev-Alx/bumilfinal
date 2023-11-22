import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Color, Border, FontFamily, FontSize } from "../../../globalstyles";

type Prop = {
  uri: string;
  name: string;
  hospital: string;
  phone: string;
  years: string;
};

const Doctorcard = ({ hospital, name, phone, uri, years }: Prop) => {
  return (
    <View style={[styles.image26Layout]}>
      <Image
        style={[styles.image26Icon, styles.image26IconPosition]}
        contentFit="cover"
        source={{ uri: uri }}
      />
      <View style={[styles.frameChild, styles.frameChildLayout]} />
      <View style={[styles.frameItem, styles.frameLayout]} />
      <Text style={[styles.drBambangS, styles.drBambangSTypo]}>{name}</Text>
      <View style={[styles.frameInner, styles.frameBorder]} />

      <View style={styles.vectorParent}>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../../../assets/doctorReg/vector5.png")}
        />

        <Text style={[styles.suryaHospital, styles.textTypo]}>{hospital}</Text>
        <Text style={[styles.text, styles.textTypo]}>{phone}</Text>
        <Text style={[styles.years, styles.yearsTypo]}>{years} years</Text>
        <Image
          style={[styles.groupItem, styles.iconLayout]}
          contentFit="cover"
          source={require("../../../assets/doctorReg/group-38.png")}
        />
        <Image
          style={[styles.vectorIcon1, styles.iconLayout]}
          contentFit="cover"
          source={require("../../../assets/doctorReg/vector4.png")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon: {
    height: "21.63%",
    top: "0%",
    bottom: "78.37%",
    left: "0%",
    right: "82.86%",
    width: "17.14%",
    maxWidth: "100%",
  },
  vectorParent: {
    height: "48.47%",
    width: "35%",
    top: "42.36%",
    right: "15.33%",
    bottom: "9.17%",
    left: "49.67%",
    position: "absolute",
  },
  frameBorder: {
    height: 1,
    borderTopWidth: 0.5,
    top: 48,
    borderColor: Color.colorGray_500,
    borderStyle: "solid",
  },
  frameInner: {
    width: 164,
    left: 136,
    position: "absolute",
  },
  drBambangSTypo: {
    width: 154,
    color: Color.colorGray_300,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    top: 7,
    textAlign: "left",
    position: "absolute",
  },
  drBambangS: {
    left: 149,
  },
  frameChildLayout: {
    height: 162,
    backgroundColor: Color.colorSnow,
    top: 0,
  },
  frameLayout: {
    height: 48,
    backgroundColor: Color.colorLightblue,
    top: 0,
  },
  frameChild: {
    width: 176,
    left: 136,
    position: "absolute",
  },
  frameItem: {
    width: 163,
    left: 136,
    position: "absolute",
  },

  image26Icon: {
    width: 136,
  },

  image26IconPosition: {
    borderTopLeftRadius: Border.br_5xs,
    height: 144,
    left: 0,
    top: 0,
  },
  image26Layout: {
    height: 144,
    width: 300,
    borderLeftWidth: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.colorGray_300,
    borderRadius: Border.br_5xs,
    borderTopWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
    margin: 10,
  },
  vectorIcon1: {
    height: 18,
    width: 24,
    top: "72.78%",
    right: "81.9%",
    bottom: "-1.43%",
    left: "-0.95%",
  },
  groupItem: {
    height: "25.79%",
    top: "34.1%",
    bottom: "40.11%",
    left: "0%",
    right: "82.86%",
    width: "17.14%",
    maxWidth: "100%",
  },
  yearsTypo: {
    top: 52,
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.size_3xs,
    color: Color.colorGray_300,
  },
  years: {
    width: 64,
    left: 30,
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_3xs,
    color: Color.colorGray_300,
    position: "absolute",
  },
  suryaHospital: {
    width: 74,
    left: 30,
  },
  text: {
    top: 26,
    width: 80,
    height: 13,
    left: 30,
  },
});

export default Doctorcard;
