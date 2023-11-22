import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, FontSize, Border } from "../../globalstyles";
import { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { NavigationProp } from "@react-navigation/native";
import useSchedule from "../../hooks/use-schedule";
import useAuthAndData from "../../hooks/use-auth";
import { useActivePatient } from "../../lib/store";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const AddSchedule = ({ navigation }: RouterProps) => {
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());

  const { addSchedule, isLoading } = useSchedule();

  const { user } = useAuthAndData();
  const { activePatient } = useActivePatient();
  const handleSchedule = () => {
    if (!mood) {
      return;
    }
    if (user) {
      addSchedule({
        tanggal: date,
        type: mood as "CONSULT" | "BLOOD" | "URINE",
        notes: notes,
        userId: activePatient?.id,
      }).then(() => navigation.navigate("DoctorHomeIndex"));
    }
  };
  const onChange = (e: any, selectDate: any) => {
    const currentDate = selectDate;
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const formattedDate = format(date, "d - M - yyyy");
  return (
    <View style={styles.consultationScreenAsap}>
      <Text style={[styles.bumilNo1, styles.bumilNo1Typo]}>
        {activePatient?.displayName}
      </Text>
      <Text style={[styles.scheduleAConsultation, styles.bumilNo1Typo]}>
        Schedule a consultation
      </Text>
      <TouchableOpacity
        style={styles.kxback}
        onPress={() => {
          navigation.navigate("DoctorHomeIndex");
        }}
      >
        <Image
          style={styles.arrowSmLeftSvgrepocomIcon}
          contentFit="cover"
          source={require("../../assets/profile/arrowsmleft-svgrepocom.png")}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.consultationScreenAsapChild,
          styles.consultationPosition,
        ]}
      />
      <View
        style={[styles.consultationScreenAsapItem, styles.consultationPosition]}
      />
      <Text style={[styles.date, styles.dateTypo]}>Date</Text>
      <TouchableOpacity
        style={[
          styles.consultationScreenAsapInner,
          styles.rectangleParentLayout,
        ]}
        onPress={showDatepicker}
      >
        <View style={[styles.rectangleParent, styles.rectangleParentBorder]}>
          <View style={[styles.frameChild, styles.frameChildPosition]} />
          <Text style={[styles.text, styles.kxtypo]}>{formattedDate}</Text>
          <Image
            style={styles.vectorIcon}
            contentFit="cover"
            source={require("../../assets/profile/vector4.png")}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.consultationParent}>
        <Text style={[styles.consultation, styles.testTypo]}>Consultation</Text>
        <Text style={[styles.bloodTest, styles.testTypo]}>Blood test</Text>
        <Text style={[styles.urineTest, styles.testTypo]}>Urine test</Text>
      </View>
      <Text style={[styles.about, styles.dateTypo]}>About</Text>

      <View style={styles.wrapper}>
        {["CONSULT", "BLOOD", "URINE"].map((feeling) => (
          <View key={feeling} style={styles.mood}>
            {/* <Text style={[styles.feeling, styles.testTypo]}>{feeling}</Text> */}
            <TouchableOpacity
              style={styles.outter}
              onPress={() => setMood(feeling)}
            >
              {mood === feeling && <View style={styles.inner} />}
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={[styles.groupView, styles.groupViewLayout]}>
        <View style={[styles.addANoteForYourPatientWrapper]}>
          <TextInput
            style={[styles.addANote, styles.textTypo]}
            multiline={true}
            numberOfLines={4}
            value={notes}
            onChangeText={(e) => setNotes(e)}
            placeholder="Add a note for your patient..."
          />
        </View>
      </View>

      {/* <TouchableOpacity>
        <View style={[styles.rectangleGroup, styles.groupLayout]}>
          <View style={styles.scheduleWrapper}>
            <Text>Schedule</Text>
          </View>
        </View>
      </TouchableOpacity> */}
      {isLoading ? (
        <ActivityIndicator size={"large"} color={Color.colorCrimson} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.kxpos, styles.rectangleParentLayout]}
          onPress={handleSchedule}
        >
          <View style={[styles.rectangleParent]}>
            <Text style={[styles.kxtext]}>Schedule</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  kxback: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 52,
    left: 18,
    zIndex: 4,
  },
  kxtypo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    width: "100%",
    height: "100%",
  },
  kxtext: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    width: "100%",
    height: "100%",
    top: 12,
    left: 120,
    color: Color.colorSnow,
  },
  kxpos: {
    top: 500,
  },
  feeling: {
    fontSize: 20,
    textTransform: "capitalize",
    left: 20,
    width: "80%",
  },
  mood: {
    margin: 8,
  },
  wrapper: {
    flexDirection: "column",
    position: "absolute",
    top: 248,
    right: 40,
  },
  inner: {
    backgroundColor: "gray",
    borderRadius: 10,
    width: 15,
    height: 15,
  },
  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bumilNo1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    position: "absolute",
  },
  consultationPosition: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  dateTypo: {
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  rectangleParentLayout: {
    height: 42,
    width: "80%",
    position: "absolute",
  },
  rectangleParentBorder: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderTopWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
  },
  frameChildPosition: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  textTypo: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    width: "100%",
    height: "100%",
  },
  testTypo: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_sm,
    left: 0,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  consultationChildLayout: {
    left: "80.56%",
    right: "13.89%",
    width: "5.56%",
    height: "2.5%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupViewLayout: {
    height: 94,
    width: "80%",
    position: "absolute",
  },
  groupLayout: {
    width: "80%",
    height: 42,
    position: "absolute",
  },
  bumilNo1: {
    top: 52,
    left: 58,
    fontSize: 24,
    color: Color.colorCrimson,
  },
  scheduleAConsultation: {
    top: 35,
    left: 60,
    fontSize: FontSize.size_xs,
    color: Color.colorLightpink,
  },
  arrowSmLeftSvgrepocomIcon: {
    width: 40,
    height: 40,
    left: -8,
    top: -4,
    position: "absolute",
    overflow: "hidden",
  },
  consultationScreenAsapChild: {
    top: 85,
    borderColor: Color.colorLightcoral,
    width: "80%",
  },
  consultationScreenAsapItem: {
    top: 243,
    borderColor: "#e5e5e5",
    width: "100%",
  },
  date: {
    top: 120,
    width: 187,
    left: 49,
  },
  frameChild: {
    height: 39,
    width: "100%",
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  text: {
    left: 43,
    color: "#7dd3fc",
    top: 12,
  },
  vectorIcon: {
    height: 22,
    width: 21,
    top: "22.14%",
    right: "88.38%",
    bottom: "27.14%",
    left: "4.02%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    height: 42,
    width: "100%",
    position: "absolute",
    backgroundColor: Color.colorLightcoral,
  },
  consultationScreenAsapInner: {
    top: 151,
  },
  consultation: {
    top: 0,
    fontSize: FontSize.size_sm,
  },
  bloodTest: {
    top: 36,
  },
  urineTest: {
    top: 72,
  },
  consultationParent: {
    top: 256,
    width: 89,
    height: 75,
    left: 50,
    position: "absolute",
  },
  about: {
    top: 216,
    width: 74,
    left: 50,
  },
  groupIcon: {
    top: "31.63%",
    bottom: "65.88%",
  },
  consultationScreenAsapChild1: {
    top: "35.5%",
    bottom: "62%",
  },
  consultationScreenAsapChild2: {
    top: "39.25%",
    bottom: "58.25%",
  },
  addANote: {
    left: 13,
    width: "100%",
    height: "100%",
  },
  addANoteForYourPatientWrapper: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderTopWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
  },
  groupView: {
    top: 360,
  },
  groupChild: {
    backgroundColor: Color.colorLightcoral,
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
  },
  schedule: {
    fontSize: FontSize.size_base,
    color: "#fff1f2",
    left: 0,
    top: 0,
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    position: "absolute",
  },
  scheduleWrapper: {
    top: 11,
    left: 92,
    width: 78,
    height: 20,
    position: "absolute",
  },
  rectangleGroup: {
    top: 476,
    left: "-30%",
    right: "10%",
    backgroundColor: Color.colorLightcoral,
    borderRadius: Border.br_5xs,
  },
  consultationScreenAsap: {
    backgroundColor: Color.colorSnow,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    alignItems: "center",
  },
});

export default AddSchedule;
