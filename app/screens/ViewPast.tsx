import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../../globalstyles";
import { NavigationProp } from "@react-navigation/native";
import { useActivePatient } from "../../lib/store";
import useConsultation, { Consultation } from "../../hooks/use-consultation";
import { useEffect, useState } from "react";
import useAuthAndData from "../../hooks/use-auth";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { calculateDaysDifference } from "../../lib/utils";
import ConsultCard from "./components/ConsultCard";
import { Ionicons } from "@expo/vector-icons";
import useFireUser from "../../hooks/use-fire-user";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const ViewPast = ({ navigation }: RouterProps) => {
  const { activePatient, setActivePatient } = useActivePatient();
  const [consultation, setConsultation] = useState<Consultation[]>([]);
  const { getConsultationsPatient, isLoading } = useConsultation();
  const { updateFireUser } = useFireUser();
  useEffect(() => {
    const fetchData = async () => {
      if (activePatient !== null) {
        try {
          // const schedules = await getSchedules(user);
          // setSchedule(schedules as Schedule[]);
          // const consult = await getConsultations(user);
          // setConsultation(consult as Consultation[]);
          const consult = await getConsultationsPatient(activePatient?.id);

          setConsultation(consult as Consultation[]);
          // console.log(activePatient);
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      }
    };
    fetchData();
  }, [activePatient]);

  const deleteDoc = () => {
    updateFireUser(activePatient?.id || "", {
      doctorId: "",
    });
    setActivePatient(null);
    navigation.navigate("DoctorHomeIndex");
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={[styles.homeScreen]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DoctorHomeIndex")}
        style={{
          top: 65,
          left: 24,
          width: 22,
          height: 20,
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <Image
          style={styles.arrowSmLeftSvgrepocomIcon}
          contentFit="cover"
          source={require("../../assets/back-arrow.png")}
        />
      </TouchableOpacity>
      <Text style={styles.yourConsultation}>View past consultations on </Text>
      <Text style={styles.bumil}>{activePatient?.displayName}</Text>
      <TouchableOpacity
        onPress={openModal}
        style={{
          top: 65,
          left: 330,
          width: 24,
          height: 24,
          position: "absolute",
          overflow: "hidden",
        }}
      >
        <Ionicons name="trash-outline" size={24} color={Color.colorCrimson} />
      </TouchableOpacity>
      {/* Garis  */}
      <View style={[styles.addANewEntryItem, styles.addBorder]} />

      <SafeAreaView>
        <ScrollView style={styles.details}>
          <ScrollView alwaysBounceVertical={true} style={styles.container}>
            {isLoading ? (
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
            ) : (
              <Text
                style={{
                  left: 24,
                  // position: "absolute",
                  fontSize: FontSize.size_lg,
                  fontFamily: FontFamily.interBold,
                  color: Color.colorLightcoral,
                  width: "80%",
                }}
              >
                There are no consultations for this patient.
              </Text>
            )}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{
                fontSize: FontSize.size_xxl,
                fontFamily: FontFamily.montserratBold,
                color: Color.colorLightcoral,
              }}
            >
              Finished with patient?
            </Text>
            <View
              style={[styles.addBorder, { width: "102.8%", top: 55, right: 0 }]}
            />
            <Text
              style={{
                fontSize: FontSize.size_base,
                fontFamily: FontFamily.interMedium,
                color: Color.colorDarkslateblue,
                marginTop: 8,
              }}
            >
              Proceed with caution! Actions cannot be undone, deleting will
              remove patient from your patients list.
            </Text>
            <View style={{ flexDirection: "row", width: "92%" }}>
              <TouchableOpacity
                style={[
                  styles.kxcust,
                  {
                    backgroundColor: Color.colorSnow,
                  },
                ]}
                onPress={closeModal}
              >
                <Text
                  style={{
                    fontSize: FontSize.size_base,
                    fontFamily: FontFamily.montserratSemiBold,
                    color: Color.colorDarkslateblue,
                  }}
                >
                  Nevermind
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.kxcust,
                  {
                    backgroundColor: Color.colorLightcoral,
                  },
                ]}
                onPress={deleteDoc}
              >
                <Text
                  style={{
                    fontSize: FontSize.size_base,
                    fontFamily: FontFamily.montserratSemiBold,
                    color: Color.colorSnow,
                  }}
                >
                  Yes, delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  kxcust: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    margin: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.colorDarkSlateBlueOpaque,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  details: {
    top: 150,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 190,
  },
  homeScreen: {
    backgroundColor: Color.colorMistyrose_100,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
  arrowSmLeftSvgrepocomIcon: {
    width: 22,
    height: 18,
  },
  yourConsultation: {
    top: 62,
    fontFamily: FontFamily.montserratBold,
    color: Color.colorCrimson,
    textAlign: "left",
    fontSize: FontSize.size_sm,
    left: 62,
    position: "absolute",
  },
  bumil: {
    top: 80,
    fontSize: 32,
    color: Color.colorCrimson,
    width: 252,
    fontFamily: FontFamily.montserratBold,
    textAlign: "left",
    left: 62,
    position: "absolute",
  },
  addBorder: {
    height: 10,
    borderTopWidth: 1,
    borderColor: Color.colorLightcoral,
    borderStyle: "solid",
    position: "absolute",
  },
  consultationLayout: {
    top: 20,
    height: 3,
    width: 300,
    borderTopWidth: 1,
    borderColor: Color.colorMistyrose_100,
    borderStyle: "solid",
    left: 50,
  },
  addANewEntryItem: {
    top: 125,
    width: "80%",
    left: 47,
  },
});

export default ViewPast;
