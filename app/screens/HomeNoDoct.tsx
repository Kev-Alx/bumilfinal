import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import Doctorcard from "./components/DoctorCard";
import useAuthAndData, { FireUser } from "../../hooks/use-auth";
import useFireUser from "../../hooks/use-fire-user";

const HomeNoDoct = () => {
  const { fireUser, user } = useAuthAndData();
  const { getDoctor } = useFireUser();
  const [doctors, setDoctors] = useState<FireUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const patients = await getDoctor(user);
          // console.log(patients);
          setDoctors(patients as FireUser[]);
        }
      } catch (error) {
        // console.error("Error fetching patients:", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <View style={styles.hhnd}>
      <Text style={[styles.hiBumil, styles.hiBumilTypo]}>
        Hi, {fireUser?.displayName}
      </Text>
      <View style={[styles.ellipseParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChild, styles.groupChildPosition]}
          contentFit="cover"
          source={require("../../assets/homescreen/ellipse-1.png")}
        />
        <Image
          style={[styles.molang1Icon, styles.molang1IconLayout]}
          contentFit="cover"
          source={require("../../assets/homescreen/molang-1.png")}
        />
      </View>

      <View style={[styles.frameParent]}>
        <View style={[styles.rectangleParent, styles.hhndItemBorder]}>
          <View style={styles.frameChild5} />
          <TextInput
            style={styles.searchForA}
            placeholder="Search for a doctor"
          ></TextInput>
        </View>
        <Image
          style={styles.groupInner}
          contentFit="cover"
          source={require("../../assets/group-6.png")}
        />
      </View>

      <Text style={[styles.oopsItSeems, styles.hiBumilTypo]}>
        Oops, it seems like you are not with a doctor yet.
      </Text>
      <View style={styles.hhndChild} />
      <Text style={[styles.ourTopReccomendations, styles.hiBumilTypo]}>
        Our top recomendations
      </Text>
      <ScrollView style={styles.lebar}>
        <View>
          <ScrollView alwaysBounceVertical={true} style={styles.container}>
            {doctors.map((doct) => (
              <Doctorcard
                key={doct.id}
                hospital={doct.hospital || ""}
                phone={doct.phoneNumber || ""}
                name={doct.displayName}
                years={"" + doct.yearsOfExperience || ""}
                uri={doct.profilePicUrl || "../assets/defDoc.png"}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 24,
    marginBottom: 400,
  },
  lebar: {
    top: 290,
  },
  hiBumilTypo: {
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  groupChildPosition: {
    left: 0,
    top: 0,
  },
  molang1IconLayout: {
    height: 42,
    position: "absolute",
  },
  image26Layout: {
    height: 144,
    width: 300,
    borderLeftWidth: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_5xs,
    borderTopWidth: 1,
    borderStyle: "solid",
    left: 34,
    position: "absolute",
    overflow: "hidden",
  },
  image26IconPosition: {
    borderTopLeftRadius: Border.br_5xs,
    height: 144,
    left: 0,
    top: 0,
    position: "absolute",
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
  drBambangSTypo: {
    width: 154,
    color: Color.colorGray_100,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    top: 7,
    textAlign: "left",
    position: "absolute",
  },
  frameBorder: {
    height: 1,
    borderTopWidth: 0.5,
    top: 48,
    borderColor: Color.colorGray_500,
    borderStyle: "solid",
  },
  iconLayout: {
    top: 215,
    position: "absolute",
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_3xs,
    color: Color.colorGray_100,
    position: "absolute",
  },
  yearsTypo: {
    height: 7,
    top: 55,
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_3xs,
    color: Color.colorGray_100,
    position: "absolute",
  },
  frameChildPosition: {
    left: 135,
    position: "absolute",
  },
  footerLayout: {
    height: 56,
    width: 360,
    left: 0,
    position: "absolute",
  },
  svgrepocomIconLayout: {
    height: 32,
    width: 32,
    top: 5,
    position: "absolute",
    overflow: "hidden",
  },
  guidesTypo: {
    color: Color.colorGray_700,
    height: 9,
    top: 36,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  hhndItemBorder: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderColor: Color.colorLightblue,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    height: 52,
  },
  hiBumil: {
    top: 56,
    color: Color.colorCrimson,
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    fontSize: FontSize.size_xl,
    left: 34,
  },
  groupChild: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  molang1Icon: {
    width: 42,
    left: 4,
    top: 4,
  },
  ellipseParent: {
    top: 40,
    left: 300,
  },
  hhndChild: {
    top: 274,
    borderTopLeftRadius: Border.br_xs,
    borderTopRightRadius: Border.br_xs,
    backgroundColor: Color.colorMistyrose_200,
    borderColor: Color.colorWhite,
    borderTopWidth: 4,
    height: 521,
    width: "100%",
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  ourTopReccomendations: {
    top: 308,
    color: Color.colorCrimson,
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    fontSize: FontSize.size_xl,
    left: 34,
  },
  image26Icon: {
    width: 136,
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
  drBambangS: {
    left: 149,
  },
  frameInner: {
    width: 164,
    left: 136,
    position: "absolute",
  },
  image26Parent: {
    top: 352,
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
  suryaHospital: {
    width: 74,
    left: 2,
    top: 4,
  },
  text: {
    top: 29,
    width: 80,
    height: 13,
    left: 25,
  },
  years: {
    width: 48,
    left: 25,
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
  vectorIcon1: {
    height: "28.65%",
    width: "19.05%",
    top: "72.78%",
    right: "81.9%",
    bottom: "-1.43%",
    left: "-0.95%",
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
  image26Group: {
    top: 350,
  },
  image26Icon2: {
    width: 135,
  },
  frameChild2: {
    width: 177,
    height: 162,
    backgroundColor: Color.colorSnow,
    top: 0,
  },
  frameChild3: {
    width: 164,
    height: 48,
    backgroundColor: Color.colorLightblue,
    top: 0,
  },
  drShellynS: {
    left: 140,
  },
  frameChild4: {
    width: 165,
    height: 1,
    borderTopWidth: 0.5,
    top: 48,
    borderColor: Color.colorGray_500,
    borderStyle: "solid",
  },
  vectorIcon2: {
    height: "10.49%",
    width: "6%",
    top: "41.67%",
    right: "44%",
    bottom: "47.85%",
    left: "50%",
  },
  image26Container: {
    top: 680,
  },
  footerChild: {
    backgroundColor: Color.colorLavenderblush,
    borderColor: Color.colorLightcoral,
    borderTopWidth: 1,
    height: 56,
    borderStyle: "solid",
    top: 0,
  },
  userCircleSvgrepocomIcon: {
    left: 257,
  },
  iconBook: {
    height: "42.32%",
    width: "6.11%",
    top: "16.07%",
    right: "46.94%",
    bottom: "41.61%",
    left: "46.94%",
  },
  homeAltSvgrepocomIcon: {
    left: 71,
  },
  home: {
    left: 73,
    color: Color.colorGray_400,
    height: 9,
    top: 36,
    width: 32,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  guides: {
    left: 163,
    width: 45,
  },
  profile: {
    left: 257,
    width: 42,
  },
  footer: {
    top: 745,
  },
  frameChild5: {
    height: 52,
    backgroundColor: Color.colorSnow,
    width: "100%",
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  searchForA: {
    left: 35,
    color: "#d9d9d9",
    width: "100%",
    height: "100%",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent: {
    width: "100%",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  groupInner: {
    top: 6,
    width: 32,
    height: 32,
    left: 4,
    position: "absolute",
  },
  frameParent: {
    width: "80%",
    top: 200,
    left: 34,
    height: 52,
  },
  oopsItSeems: {
    top: 104,
    left: 38,
    color: Color.colorLightcoral,
    width: 292,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.size_xl,
  },
  years1: {
    width: 41,
    left: 28,
  },
  vectorGroup: {
    height: "8.73%",
    width: "29.17%",
    top: "52.03%",
    right: "20%",
    bottom: "39.25%",
    left: "50.83%",
    position: "absolute",
  },
  hhndItem: {
    left: 288,
    backgroundColor: Color.colorGray_300,
    top: 209,
    width: 42,
    position: "absolute",
  },
  vectorIcon5: {
    width: "6.47%",
    top: "27%",
    right: "10.67%",
    bottom: "69.75%",
    left: "82.86%",
    position: "absolute",
  },
  hhnd: {
    backgroundColor: Color.colorMistyrose_100,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});
export default HomeNoDoct;
