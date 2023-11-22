import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { ScheduleCard } from "./components/ScheduleCard";
import ConsultCard from "./components/ConsultCard";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
import { Image } from "expo-image";
import useAuthAndData from "../../hooks/use-auth";
import useSchedule, { Schedule } from "../../hooks/use-schedule";
import { format } from "date-fns";
import useConsultation, { Consultation } from "../../hooks/use-consultation";
import { Timestamp } from "firebase/firestore";
import { calculateDaysDifference } from "../../lib/utils";
import { NavigationProp } from "@react-navigation/native";
const variantMap = {
  CONSULT: "BLUE",
  URINE: "GREEN",
  BLOOD: "YELLOW",
} as const;

const typeMap = {
  CONSULT: "Consultation",
  URINE: "Urine Test",
  BLOOD: "Blood Test",
} as const;
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const HomeScreen = ({ navigation }: RouterProps) => {
  const { user, fireUser } = useAuthAndData();
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [consultation, setConsultation] = useState<Consultation[]>([]);
  const { getSchedules, isLoading } = useSchedule();
  const { getConsultations, isLoading: constLoading } = useConsultation();

  useEffect(() => {
    const fetchData = async () => {
      if (user !== null) {
        try {
          // const schedules = await getSchedules(user);
          // setSchedule(schedules as Schedule[]);
          // const consult = await getConsultations(user);
          // setConsultation(consult as Consultation[]);
          const [schedules, consult] = await Promise.all([
            getSchedules(user),
            getConsultations(user),
          ]);
          setSchedule(schedules as Schedule[]);
          setConsultation(consult as Consultation[]);
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <View style={styles.homeScreen}>
      <View style={styles.homeScreenChild} />
      <Text style={[styles.hiBumil, styles.hiBumilTypo]}>
        Hi, {fireUser?.displayName}
      </Text>
      <View style={[styles.ellipseParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          contentFit="cover"
          source={require("../../assets/homescreen/ellipse-1.png")}
        />
        <Image
          style={styles.molang1Icon}
          contentFit="cover"
          source={require("../../assets/homescreen/molang-1.png")}
        />
      </View>
      <Text style={[styles.upcomingSchedules, styles.actionsTypo]}>
        Upcoming Schedules
      </Text>
      {/* schedule cards */}
      <ScrollView>
        <View>
          <ScrollView horizontal={true} style={styles.containersch}>
            {isLoading ? (
              <ActivityIndicator
                size={"large"}
                color={Color.colorCrimson}
                style={{ marginTop: 24, marginLeft: 12 }}
              />
            ) : schedule.length > 0 ? (
              schedule.map((schedule) => {
                const unknownType: unknown = schedule.tanggal;
                const tanggalTimestamp = unknownType as Timestamp;
                const dateObjectz = tanggalTimestamp.toDate();
                const formatDate = format(dateObjectz, "EEEE, dd MMM yyyy");
                // console.log(formatDate);
                return (
                  <ScheduleCard
                    date={"" + formatDate}
                    variant={variantMap[schedule.type]}
                    type={typeMap[schedule.type]}
                    key={"" + schedule.createdAt}
                  />
                );
              })
            ) : (
              <Text style={styles.kxno}>
                You have no upcoming schedule activities.
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <Text style={[styles.actions, styles.actionsTypo]}>Actions</Text>

      <View style={[styles.frameView, styles.frameViewLayout]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Contact")}
        >
          <View style={[styles.rectangleView, styles.frameChild1Position]} />
          <Image
            style={[styles.vectorIcon1, styles.vectorIconPosition]}
            contentFit="cover"
            source={require("../../assets/homescreen/vector1.png")}
          />
          <View style={styles.frameChild1Position} />
          <Text
            style={[styles.contactYourDoctor, styles.contactYourDoctorPosition]}
          >
            Contact Your Doctor
          </Text>
          <Image
            style={[
              styles.arrowUpRightSvgrepocomIcon,
              styles.arrowIconPosition,
            ]}
            contentFit="cover"
            source={require("../../assets/homescreen/arrowupright-svgrepocom.png")}
          />
        </TouchableOpacity>
      </View>

      {/* emergency */}
      <View style={[styles.rectangleParent1, styles.frameViewLayout]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Emergency")}
          activeOpacity={0.6}
        >
          <View style={[styles.frameChild2, styles.frameChildBorder]} />
          <Image
            style={[styles.vectorIcon2, styles.vectorIconPosition]}
            contentFit="cover"
            source={require("../../assets/homescreen/vector2.png")}
          />
          <View style={styles.frameChildBorder} />
          <Text
            style={[styles.contactYourDoctor, styles.contactYourDoctorPosition]}
          >
            Emergency
          </Text>
          <Image
            style={[
              styles.arrowUpRightSvgrepocomIcon1,
              styles.arrowIconPosition,
            ]}
            contentFit="cover"
            source={require("../../assets/homescreen/arrowupright-svgrepocom1.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.myConsultations, styles.hiBumilTypo]}>
        My Consultations
      </Text>
      <ScrollView alwaysBounceVertical={true} style={styles.container}>
        <ScrollView>
          {constLoading ? (
            <ActivityIndicator
              size={"large"}
              color={Color.colorCrimson}
              style={{ marginTop: 24, marginLeft: 150 }}
            />
          ) : consultation.length > 0 ? (
            consultation.map((con) => {
              const unknownType: unknown = con.date;
              const tanggalTimestamp = unknownType as Timestamp;
              const dateObjectz = tanggalTimestamp.toDate();
              const formatDate = format(dateObjectz, "EEEE, dd MMM yyyy");
              const diff = calculateDaysDifference(dateObjectz, new Date());
              // console.log(diff);
              return (
                <ConsultCard
                  bloodPressure={con.bloodPressure}
                  weight={con.weight}
                  date={formatDate + ""}
                  key={"" + con.createdAt}
                  diff={diff}
                  type={con.type as "WARN" | "GOOD" | "NOTE"}
                  consultation={con}
                  nav={navigation}
                />
              );
            })
          ) : null}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  kxno: {
    marginLeft: 10,
    marginTop: 32,
    fontSize: FontSize.size_xl,
    color: Color.colorLightcoral,
    fontFamily: FontFamily.interBold,
    width: "90%",
    height: 90,
  },
  container: {
    height: 410,
    flexDirection: "row",
    padding: 10,
    marginLeft: 16,
    top: 360,
    position: "absolute",
  },
  containersch: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    marginTop: 94,
    marginRight: 32,
    marginLeft: 15,
  },
  frame: {
    backgroundColor: "blue",
  },
  halo: {
    borderColor: Color.colorCrimson,
    borderBottomWidth: 1,
    height: 57,
    width: 140,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: Border.br_5xs,
  },
  hili: {
    borderLeftWidth: 1,
    borderBottomWidth: 2,
    borderColor: Color.colorLightblue,
    height: 57,
    width: 139,
    top: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    left: 0,
  },
  panjang: {
    top: 150,
  },
  button: {
    backgroundColor: "yellow",
  },
  consultsLayout: {
    height: 108,
    width: 291,
    borderLeftWidth: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: Color.colorGray_500,
    left: 34,
    borderTopWidth: 1,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    position: "absolute",
    overflow: "hidden",
  },
  daysAgoPosition: {
    textAlign: "left",
    left: 18,
    position: "absolute",
  },
  mmhgTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  consultsInnerLayout: {
    height: 16,
    width: 16,
    left: 200,
    position: "absolute",
  },
  actionsTypo: {
    width: 187,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    left: 34,
    position: "absolute",
  },
  frameShadowBox: {
    height: 82,
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
  frameItemLayout: {
    width: 140,
    position: "absolute",
  },
  contactYourDoctorPosition: {
    top: 8,
    position: "absolute",
    zIndex: 2,
  },
  sunday29OctLayout: {
    position: "absolute",
  },
  bloodTestTypo: {
    color: Color.colorGray_500,
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  rectanglePosition: {
    left: 186,
    width: 140,
  },
  molang3dPosition: {
    top: 11,
    left: 0,
    position: "absolute",
  },
  bloodTestLayout: {
    height: 9,
    position: "absolute",
  },
  frameInnerShadowBox: {
    width: 129,
    height: 82,
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
  hiBumilTypo: {
    color: Color.colorCrimson,
    fontSize: FontSize.size_xxl,
    textAlign: "left",
    left: 34,
    position: "absolute",
  },
  groupChildLayout: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  groupLayout: {
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
    fontSize: FontSize.size_3xs,
    top: 36,
    height: 9,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  frameViewLayout: {
    height: 57,
    top: 252,
    borderRadius: Border.br_5xs,
    position: "absolute",
    overflow: "hidden",
  },
  frameChild1Position: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderColor: Color.colorLightblue,
    height: 57,
    width: 139,
    top: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    left: 0,
  },
  vectorIconPosition: {
    left: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  arrowIconPosition: {
    left: 113,
    height: 22,
    width: 22,
    position: "absolute",
    overflow: "hidden",
    zIndex: 2,
  },
  frameChildBorder: {
    backgroundColor: "#fda6d5",
    borderColor: Color.colorCrimson,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    height: 57,
    width: 140,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    zIndex: 1,
  },
  consultsChildPosition: {
    top: 1,
    height: 109,
    backgroundColor: Color.colorLightpink,
    position: "absolute",
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
  homeScreenChild: {
    top: 323,
    borderTopLeftRadius: Border.br_xs,
    borderTopRightRadius: Border.br_xs,
    backgroundColor: Color.colorMistyrose_200,
    borderColor: Color.colorWhite,
    borderTopWidth: 4,
    height: "70%",
    width: "100%",
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  consultsChild: {
    height: 110,
    backgroundColor: Color.colorGray_300,
    top: 0,
    width: 291,
    borderRadius: Border.br_5xs,
    left: 0,
    position: "absolute",
  },
  tuesday8Sep: {
    top: 10,
    width: 171,
    height: 20,
    color: Color.colorGray_100,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_base,
    left: 18,
  },
  daysAgo: {
    top: 29,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorGray_400,
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    left: 18,
  },
  consultsItem: {
    height: 109,
    backgroundColor: Color.colorLightpink,
    width: 99,
    left: 192,
    top: 0,
    position: "absolute",
  },
  text: {
    fontSize: FontSize.size_base,
  },
  mmhg1: {
    fontSize: FontSize.size_5xs,
  },
  mmhg: {
    top: 75,
    left: 45,
    color: Color.colorSnow,
    position: "absolute",
  },
  uhOhBad: {
    top: 41,
    color: Color.colorGray_300,
    width: 77,
    left: 200,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    position: "absolute",
  },
  kg: {
    left: 22,
    textAlign: "center",
    top: 51,
    width: 77,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorGray_100,
    position: "absolute",
  },
  bloodIcon: {
    height: "20.93%",
    width: "6.25%",
    top: "68.24%",
    right: "86.91%",
    bottom: "10.83%",
    left: "6.84%",
  },
  scaleLightSvgrepocomIcon: {
    height: 22,
    width: 22,
    top: 51,
    left: 18,
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon: {
    height: "8.8%",
    width: "5.7%",
    top: "12.78%",
    right: "4.02%",
    bottom: "78.43%",
    left: "90.27%",
  },
  consultsInner: {
    top: 21,
  },
  consults: {
    top: 642,
  },
  upcomingSchedules: {
    top: 80,
    color: Color.colorGray_200,
    width: 187,
    fontSize: FontSize.size_base,
  },
  actions: {
    top: 227,
    color: Color.colorGray_200,
    fontSize: FontSize.size_base,
  },
  frameChild: {
    backgroundColor: Color.colorLightblue,
    height: 82,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
    top: 0,
    left: 0,
  },
  molang3dCopy1300x3001: {
    width: 74,
    height: 74,
    left: 0,
  },
  sunday29Oct: {
    top: 7,
    left: 13,
    width: 83,
    color: Color.colorGray_500,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    position: "absolute",
  },
  consultation: {
    top: 68,
    left: 70,
    width: 79,
    height: 10,
    position: "absolute",
  },
  rectangleParent: {
    top: 122,
    width: 139,
    left: 35,
    position: "absolute",
    overflow: "hidden",
  },
  frameItem: {
    backgroundColor: "#fef3c7",
    height: 82,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_9xs,
    top: 0,
    left: 0,
  },
  molang3dCopy4300x3003: {
    width: 73,
    height: 73,
  },
  friday30Nov: {
    top: 6,
    left: 9,
    width: 83,

    color: Color.colorGray_500,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  bloodTest: {
    top: 67,
    left: 82,
    width: 51,
    color: Color.colorGray_500,
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  rectangleGroup: {
    top: 125,
    overflow: "hidden",
    height: 82,
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
  frameInner: {
    backgroundColor: Color.colorHoneydew,
    top: 0,
    left: 0,
  },
  molang3dCopy4300x3004: {
    width: 71,
    height: 71,
  },
  rectangleContainer: {
    left: 337,
    top: 125,
    overflow: "hidden",
  },
  hiBumil: {
    top: 48,
    fontFamily: FontFamily.montserratBold,
  },
  homeScreenItem: {
    top: 297,
    left: 24,
    borderTopRightRadius: Border.br_5xs,
    borderBottomLeftRadius: Border.br_5xs,
    height: 155,
  },
  groupChild: {
    top: 0,
    left: 0,
  },
  molang1Icon: {
    top: 4,
    left: 4,
    height: 42,
    width: 42,
    position: "absolute",
  },
  ellipseParent: {
    top: 40,
    right: 32,
  },
  groupItem: {
    backgroundColor: Color.colorLavenderblush,
    borderColor: Color.colorLightcoral,
    top: 0,
    borderTopWidth: 1,
    height: 56,
    borderStyle: "solid",
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
    fontSize: FontSize.size_3xs,
    top: 36,
    width: 32,
    height: 9,
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
  groupView: {
    top: 745,
  },
  homeScreenInner: {
    top: 435,
    left: 175,
    width: 159,
    height: 148,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  myConsultations: {
    top: 332,
    width: 240,
    fontFamily: FontFamily.montserratBold,
  },
  rectangleView: {
    backgroundColor: Color.colorGray_250,
  },
  vectorIcon1: {
    height: 32,
    width: 48,
    top: 24,
    left: 0,
    bottom: 0,
  },
  contactYourDoctor: {
    left: 12,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.colorGray_300,
  },
  arrowUpRightSvgrepocomIcon: {
    top: 32,
  },
  frameView: {
    width: 139,
    left: 35,
  },
  frameChild2: {
    backgroundColor: "#fda6d5",
  },
  vectorIcon2: {
    height: 40,
    width: 56,
    top: 12,
    right: "60.93%",
    zIndex: 1,
  },
  arrowUpRightSvgrepocomIcon1: {
    top: 33,
  },
  rectangleParent1: {
    left: 186,
    width: 140,
  },
  consultsChild2: {
    left: 191,
    width: 100,
  },
  groupInner: {
    borderColor: Color.colorHoneydew,
  },
  vectorIcon4: {
    height: "46.88%",
    width: "62.5%",
    top: "25%",
    right: "18.75%",
    bottom: "28.13%",
    left: "18.75%",
  },
  consults1: {
    top: 394,
    left: 35,
    height: 108,
    width: 291,
    borderLeftWidth: 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.colorGray_500,
    borderRadius: Border.br_5xs,
    borderStyle: "solid",
    position: "absolute",
    overflow: "hidden",
  },
  consultsChild4: {
    width: 99,
    left: 192,
    top: 1,
  },
  groupChild1: {
    borderColor: Color.colorLightblue,
    borderBottomWidth: 2,
  },
  noteTextSvgrepocomIcon: {
    top: 3,
    left: 3,
    width: 9,
    overflow: "hidden",
  },
  rectangleParent3: {
    top: 23,
  },
  consults2: {
    top: 518,
  },
  homeScreen: {
    backgroundColor: Color.colorMistyrose_100,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});
