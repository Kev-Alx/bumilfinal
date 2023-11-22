import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { Color, Border, FontFamily, FontSize } from "../../../globalstyles";
type ConsultCardProps = {
  date: string;
  weight: string;
  bloodPressure: string;
  diff: number;
  type: "WARN" | "GOOD" | "NOTE";
};

const textMap = {
  WARN: "Uh oh, bad symptoms recorded!",
  GOOD: "No problems this week. Keep it up!",
  NOTE: "Doctor left a note for you. Check it out!",
} as const;

const ConsultCard = ({
  bloodPressure,
  weight,
  date,
  diff,
  type,
}: ConsultCardProps) => {
  return (
    <View style={styles.consults1}>
      <View style={styles.consultsChild} />
      <Text style={[styles.tuesday8Sep, styles.daysAgoPosition]}>{date}</Text>
      <Text style={[styles.daysAgo, styles.daysAgoPosition]}>
        {diff} DAYS AGO
      </Text>
      <View style={[styles.consultsChild2, styles.consultsChildPosition]} />
      <Text style={[styles.mmhg, styles.mmhgTypo]}>
        <Text style={styles.text}>{bloodPressure}</Text>
        <Text style={styles.mmhg1}>mmHg</Text>
      </Text>
      <Text style={styles.uhOhBad}>{textMap[type]}</Text>
      <Text style={styles.kg}>
        <Text style={styles.text}>{weight} </Text>
        <Text style={styles.mmhg1}>kg</Text>
      </Text>
      <Image
        style={[styles.bloodIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../../../assets/homescreen/blood.png")}
      />
      <Image
        style={styles.scaleLightSvgrepocomIcon}
        contentFit="cover"
        source={require("../../../assets/homescreen/scalelight-svgrepocom.png")}
      />
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../../../assets/homescreen/vector.png")}
      />

      <Image
        contentFit="cover"
        source={
          type === "GOOD"
            ? require("../../../assets/addNewEntry/Group36.png")
            : type === "WARN"
            ? require("../../../assets/addNewEntry/group-16.png")
            : type === "NOTE"
            ? require("../../../assets/addNewEntry/notetext-svgrepocom.png")
            : null
        }
        style={styles.kxcust}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  kxcust: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 16,
    left: 200,
  },
  vectorIcon: {
    height: "8.8%",
    width: "5.7%",
    top: "12.78%",
    right: "4.02%",
    bottom: "78.43%",
    left: "90.27%",
  },
  consults1: {
    borderLeftWidth: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    overflow: "hidden",
    margin: 8,
  },
  vectorIcon4: {
    height: "46.88%",
    width: "62.5%",
    top: "25%",
    right: "18.75%",
    bottom: "28.13%",
    left: "18.75%",
  },
  groupPosition: {
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRadius: Border.br_9xs,
    height: 16,
    width: 16,
    backgroundColor: Color.colorGray_300,
    top: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  groupInner: {
    borderColor: Color.colorHoneydew,
  },
  consultsInner: {
    top: 21,
  },
  vectorIcon2: {
    height: "94.04%",
    width: "39.07%",
    top: "4.56%",
    right: "60.93%",
    bottom: "1.4%",
  },
  scaleLightSvgrepocomIcon: {
    height: 20,
    width: 20,
    top: 51,
    left: 18,
    position: "absolute",
    overflow: "hidden",
  },
  iconLayout: {
    position: "absolute",
  },
  bloodIcon: {
    height: 20,
    width: 20,
    top: "68.24%",
    left: 16,
  },
  uhOhBad: {
    top: 41,
    color: Color.colorGray_100,
    width: 77,
    left: 200,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  kg: {
    left: 45,
    top: 51,
    width: 77,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorGray_300,
    position: "absolute",
  },
  text: {
    fontSize: FontSize.size_base,
  },
  mmhgTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  mmhg1: {
    fontSize: FontSize.size_5xs,
  },
  mmhg: {
    top: 75,
    left: 45,
    position: "absolute",
  },
  consultsChildPosition: {
    height: "100%",
    backgroundColor: Color.colorLightpink,
    position: "absolute",
  },
  consultsChild2: {
    right: 0,
    width: 120,
  },
  daysAgo: {
    top: 28,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorGray_400,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    left: 18,
  },
  daysAgoPosition: {
    textAlign: "left",
    left: 18,
    position: "absolute",
  },

  consultsChild: {
    height: 110,
    backgroundColor: Color.colorGray_100,
    top: 0,
    width: 312,
    borderRadius: Border.br_5xs,
    left: 0,
  },
  tuesday8Sep: {
    top: 10,
    width: 171,
    height: 20,
    color: Color.colorGray_300,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_base,
    left: 18,
  },
});

export default ConsultCard;
