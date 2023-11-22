import { TouchableOpacity, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { Color, FontFamily, FontSize, Border } from "../../globalstyles";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import useImageUploader from "../../hooks/use-image-uploader";
import { useActivePatient, useActiveTest } from "../../lib/store";
import useConsultation from "../../hooks/use-consultation";
import useAuthAndData from "../../hooks/use-auth";
// import ParallaxScrollView from "../Components/ParallaxScrollView";

const Coba = ({ navigation }) => {
  const { user } = useAuthAndData();
  const [isCheckblood, setCheckblood] = useState(false);
  const [isCheckurine, setCheckurine] = useState(false);
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const { pickImage, URL, setURL } = useImageUploader([4, 3]);
  const { activePatient } = useActivePatient();
  const { addConsultation } = useConsultation();
  const [type, setType] = useState("GOOD");
  const handleReg = async () => {
    if (!weight || !bloodPressure || !description || !URL || !user) {
      // console.log("no");
      alert("Make sure all the fields are filled!")
      return;
    }
    let wodeType = type;
    if (notes && wodeType !== "WARN") {
      wodeType = "NOTE";
    }
    if (!notes) {
      wodeType = "GOOD";
    }
    if (isCheckblood || isCheckurine) {
      navigation.navigate("AddTestResult", {
        weight,
        bloodPressure,
        description,
        notes,
        date: date.toISOString(),
        url: URL,
        type: wodeType,
        isCheckblood,
        isCheckurine,
        userId: activePatient?.id,
      });
      return;
    }
    await addConsultation({
      weight,
      bloodPressure,
      description,
      notes,
      date,
      url: URL,
      type: wodeType,
      isCheckblood,
      isCheckurine,
      userId: activePatient?.id,
    }).then(() => {
      setURL("");
      navigation.navigate("DoctorHomeIndex");
    });
  };
  const onChange = (e, selectDate) => {
    const currentDate = selectDate;
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
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
    <ScrollView>
      <View style={styles.Container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DoctorHomeIndex")}
          style={{ top: 50, left: -165 }}
        >
          <Image
            style={styles.arrowSmLeftSvgrepocomIcon}
            contentFit="cover"
            source={require("../../assets/profile/arrowsmleft-svgrepocom.png")}
          />
        </TouchableOpacity>
        <Text style={styles.addAConsultation}>
          Add a consultation entry for
        </Text>

        <Text style={[styles.bumilNo1]}>{activePatient.displayName}</Text>

        <View style={[styles.addANewEntryChild, styles.addBorder]} />

        <Text style={[styles.dateTypo, { top: 130, left: 44 }]}>Date</Text>

        <TouchableOpacity
          style={[
            styles.consultationScreenAsapInner,
            styles.rectangleParentLayout,
          ]}
          onPress={showDatepicker}
        >
          <View style={[styles.rectangleParentBorder]}>
            <View style={[styles.frameChild]} />
            <Text style={[styles.kxtypo]}>{formattedDate}</Text>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require("../../assets/profile/vector4.png")}
            />
          </View>
        </TouchableOpacity>

        <View style={[styles.addANewEntryItem, styles.addBorder]} />

        {/* WEIGHT */}
        <Text style={[styles.weight, styles.weightTypo]}>Weight</Text>
        <View style={[styles.addANewEntryInner3, styles.rectangleParentLayout]}>
          <View style={[styles.rectangleParent4, styles.rectangleParentLayout]}>
            <TextInput
              value={weight}
              onChangeText={(e) => setWeight(e)}
              style={[styles.frameChild2]}
              placeholder="70kg..."
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* BLOOD PRESSURE */}
        <Text style={[styles.weight1, styles.weightTypo]}>Blood pressure</Text>
        <View style={[styles.addANewEntrybld, styles.rectangleParentLayout]}>
          <View
            style={[styles.rectangleParenbld, styles.rectangleParentLayout]}
          >
            <TextInput
              style={[styles.frameChild2]}
              placeholder="120/80mmhg..."
              value={bloodPressure}
              onChangeText={(e) => setBloodPressure(e)}
            />
          </View>
        </View>

        {/* LAB TEST */}
        <Text style={[styles.labTests, styles.dateTypo]}>Lab Tests</Text>
        <View style={[styles.rectangleParent, styles.frameLayout]}>
          <View onPress={() => console.log("Blood Test")}>
            <View style={[styles.frameChild, styles.frameBorder]} />
            <Text style={styles.bloodTest}>Blood test</Text>
            <Checkbox
              style={styles.checkbox2}
              color={Color.colorDarkslateblue}
              value={isCheckblood}
              onValueChange={setCheckblood}
            />
          </View>
        </View>
        <View style={[styles.rectangleGroup, styles.frameItemLayout]}>
          <View onPress={() => console.log("Urine Test")}>
            <View style={[styles.frameItem, styles.frameItemLayout]} />
            <Text style={styles.bloodTest}>Urine test</Text>
            <Checkbox
              style={styles.checkbox}
              color={Color.colorDarkslateblue}
              value={isCheckurine}
              onValueChange={setCheckurine}
            />
          </View>
        </View>

        {/* PHOTO */}
        <Text style={[styles.photo, styles.dateTypo]}>Photo</Text>
        <TouchableOpacity
          style={[
            styles.rectangleContainer,
            styles.frameLayout1,
            styles.frameBorder,
            {
              borderBottomWidth: 1,
              borderBottomEndRadius: 0,
              borderBottomStartRadius: 0,
            },
            URL ? { backgroundColor: Color.colorHoneydew } : null,
          ]}
          onPress={pickImage}
        >
          <Text style={styles.bloodTest}>Upload an image</Text>
          <Image
            style={[styles.groupIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../../assets/addNewEntry/group-34.png")}
          />
        </TouchableOpacity>
        <View style={[styles.kxcustom]}>
          <TextInput
            style={[
              styles.frameChild3,
              { borderTopLeftRadius: 0, borderTopStartRadius: 0 },
            ]}
            multiline
            numberOfLines={3}
            placeholder="Write a description for the photo..."
            value={description}
            onChangeText={(e) => setDescription(e)}
          ></TextInput>
        </View>
        {/* NOTES */}

        <Text style={[styles.notes, styles.dateTypo]}>Notes</Text>
        <View style={[styles.frameViewLayout]}>
          <View style={[styles.frameView]}>
            <TextInput
              style={[styles.frameChild3]}
              placeholder="Special notes for this week's consultation..."
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={(e) => setNotes(e)}
            ></TextInput>
          </View>

          <Image
            style={styles.groupChild}
            contentFit="cover"
            source={require("../../assets/addNewEntry/group-61.png")}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log("good");
            setType("GOOD");
          }}
          style={[styles.kxnyoba, { top: 549, left: 55 }]}
        >
          <Image
            style={[
              styles.noteLayout,
              type === "GOOD"
                ? { backgroundColor: Color.colorDarkslateblue }
                : null,
            ]}
            contentFit="cover"
            source={require("../../assets/addNewEntry/Group36.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("note");
            setType("NOTE");
          }}
          style={[styles.kxnyoba, { top: 520, left: 140 }]}
        >
          <Image
            style={[
              styles.noteLayout,
              type === "NOTE"
                ? { backgroundColor: Color.colorDarkslateblue }
                : null,
            ]}
            contentFit="cover"
            source={require("../../assets/addNewEntry/notetext-svgrepocom.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("warn");
            setType("WARN");
          }}
          style={[styles.kxnyoba, { top: 492, left: 98 }]}
        >
          <Image
            style={[
              styles.groupViewLayout,
              type === "WARN"
                ? { backgroundColor: Color.colorDarkslateblue }
                : null,
            ]}
            contentFit="cover"
            source={require("../../assets/addNewEntry/group-16.png")}
          />
        </TouchableOpacity>

        {/* ADD */}
        <TouchableOpacity style={[styles.rectangleParent2]} onPress={handleReg}>
          <View style={[styles.groupChild1Layout]}>
            <View style={[styles.groupChild1, { width: "100%", height: 42 }]} />
            <View style={[styles.addWrapper, styles.addLayout]}>
              <Text style={[styles.add, styles.addLayout]}>Add</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Coba;
const styles = StyleSheet.create({
  kxnyoba: {
    height: 28,
    width: 28,
    zIndex: 2,
  },
  kxcustom: {
    width: "80%",
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: "#172554",
    top: 539,
    height: 110,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    borderTopLeftRadius: 0,
    borderTopEndRadius: 0,
    overflow: "hidden",
  },
  kxtypo: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    width: "100%",
    top: 12,
    left: 42,
    height: "100%",
  },
  consultationScreenAsapItem: {
    top: 243,
    borderColor: "#e5e5e5",
    width: "100%",
  },
  rectangleParentBorder: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: Color.colorDarkslateblue,
    borderTopWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
    borderRadius: Border.br_5xs,
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
  addANewEntryInner3: {
    top: 300,
    width: 290,
    left: 43,
  },
  addANewEntrybld: {
    top: 390,
    width: 20,
    left: 43,
  },
  addANewEntrybld1: {
    top: 510,
    width: 20,
    left: -146,
  },
  rectangleParentLayout: {
    height: 42,
    position: "absolute",
  },
  rectangleParent4: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderColor: Color.colorDarkslateblue,
    top: 0,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    width: 310,
    left: 0,
    overflow: "hidden",
  },

  rectangleParenbld: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderColor: Color.colorDarkslateblue,
    top: 0,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    width: 310,
    left: 0,
    overflow: "hidden",
  },
  rectangleParenbld1: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 2,
    borderColor: Color.colorDarkslateblue,
    top: 0,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    width: 300,
    left: 0,
    overflow: "hidden",
  },

  frameChild2: {
    height: "100%",
    paddingLeft: 12,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xs,
    width: "100%",
  },
  frameChild3: {
    height: "100%",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_5xs,
    width: "100%",
    padding: 8,
    position: "absolute",
  },
  consultationScreenAsapInner: {
    backgroundColor: Color.colorWhite,
    top: 170,
    width: "80%",
    borderRadius: 8,
  },
  addBorder: {
    top: 100,
    height: 10,
    borderTopWidth: 1,
    borderColor: Color.colorLightcoral,
    borderStyle: "solid",
    position: "absolute",
  },
  Container: {
    flex: 1,
    backgroundColor: "#FFF1F2",
    height: 1000,
    alignItems: "center",
    overflow: "hidden",
    // justifyContent: 'center',
  },

  notes: {
    top: 755,
    left: 40,
    width: 100,
    height: 30,
  },
  addLayout: {
    width: 88,
    position: "absolute",
  },
  addWrapper: {
    top: 11,
    left: 110,
    height: 20,
  },
  groupChild1: {
    backgroundColor: Color.colorLightcoral,
    borderRadius: Border.br_5xs,
  },
  groupChild1Layout: {
    height: 42,
    width: "100%",
    position: "absolute",
  },
  rectangleParent2: {
    top: 900,
    height: 42,
    width: "80%",
    position: "absolute",
  },
  add: {
    fontFamily: FontFamily.montserratSemiBold,
    color: Color.colorLavenderblush,
    fontWeight: "600",
    width: 88,
    textAlign: "center",
    fontSize: FontSize.size_base,
    top: 0,
    left: 0,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon5: {
    height: 24,
    width: 24,
    top: "26.5%",
    right: "20%",
    bottom: "29%",
    left: "20%",
  },

  noteLayout: {
    height: 28,
    width: 28,
    position: "absolute",
  },
  noteTextSvgrepocomIcon: {
    width: 16,
    overflow: "hidden",
  },

  groupInner: {
    borderColor: Color.colorLightblue,
  },
  rectangleParent1: {
    top: 573,
    left: 317,
    height: 20,
  },
  groupPosition: {
    borderBottomWidth: 2,
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_9xs,
    height: 20,
    width: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    top: 0,
    left: -42,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  addANewEntryInner: {
    left: 275,
    height: 20,
    top: 572,
    width: 20,
  },
  groupInner: {
    borderColor: Color.colorLightblue,
  },
  groupViewLayout: {
    width: 28,
    height: 28,

    position: "absolute",
  },
  groupView: {
    height: 20,
    top: 16,
    width: 20,
    left: 100,
  },
  groupChild: {
    top: 2,
    width: 31,
    height: 30,
    left: 0,
    position: "absolute",
  },
  frameViewLayout: {
    height: 96,
    position: "absolute",
    width: "80%",
  },
  frameView: {
    width: "100%",
    position: "absolute",
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: "#172554",
    top: 788,
    height: "100%",
    borderTopWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    overflow: "hidden",
  },
  bayiSudahAda: {
    fontSize: 14,
    width: 109,
    height: 21,
    left: 45,
    color: Color.colorGray_200,
    top: 490,
    fontFamily: FontFamily.interRegular,
  },
  descriptionPosition: {
    top: 514,
    textAlign: "left",
    position: "absolute",
  },
  description: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    letterSpacing: -0.5,
    fontSize: FontSize.size_base,
    color: Color.colorDarkslateblue,
    left: -133,
  },

  groupIcon: {
    height: 24,
    width: 28,
    top: "25.96%",
    right: "5.26%",
    bottom: "27.72%",
    left: "84.33%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },

  frameInner: {
    height: 57,
    borderRadius: 40,
    position: "absolute",
    width: 320,
    left: 0,
  },
  frameInner1: {
    height: 30,
    borderRadius: Border.br_5xs,
    position: "absolute",
    width: 316,
    left: 0,
  },

  rectangleContainer: {
    top: 578,
    backgroundColor: Color.colorWhite,
    width: "80%",
    overflow: "hidden",
    position: "absolute",
    zIndex: 2,
  },
  rectangleContainer1: {
    top: 500,
    backgroundColor: Color.colorWhite,

    width: 290,
    left: -150,
    overflow: "hidden",
  },
  frameLayout: {
    height: 40,
    borderRadius: 30,
    position: "absolute",
  },
  frameLayout1: {
    height: 57,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  photo: {
    top: 548,
    left: 46,
  },
  frameItem: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: "#172554",
    top: 0,
    borderTopWidth: 1,
    borderStyle: "solid",
    left: 0,
  },

  frameLayout: {
    height: 57,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  rectangleParent: {
    width: 142,
    height: 57,
    backgroundColor: Color.colorWhite,
    top: 480,
    overflow: "hidden",
    left: 45,
  },
  frameBorder: {
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: "#172554",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  bloodTest: {
    top: 20,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: 13,
    color: Color.colorGray_200,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  desc: {
    top: 13,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: 13,
    color: Color.colorGray_200,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  desc1: {
    top: 13,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: 175,
    color: Color.colorGray_200,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  rectangleGroup: {
    left: 210,
    backgroundColor: Color.colorWhite,
    top: 481,
  },
  frameItemLayout: {
    width: 140,
    height: 57,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  checkbox2: {
    margin: 20,
    left: 85,
  },

  labTests: {
    top: 445,
    left: 45,
  },
  blood: {
    top: 0,
    left: 0,
    textAlign: "left",
    position: "absolute",
  },
  bloodPressureParent: {
    top: 340,
    position: "absolute",
    left: 58,
    position: "absolute",
  },

  frameChild: {
    height: 57,
    borderRadius: Border.br_5xs,
    position: "absolute",
    width: 139,
    left: 0,
  },
  checkbox: {
    left: 85,
    margin: 20,
  },

  weightParent: {
    top: 100,
    left: 100,
  },

  weightTypo: {
    fontFamily: FontFamily.interSemiBold,
    letterSpacing: -0.5,
    fontSize: 20,
    color: Color.colorDarkslateblue,
  },

  parentLayout: {
    height: 30,
    width: 291,
    // left: 40,
    position: "absolute",
  },
  weight: {
    top: 265,
    left: 42,
    textAlign: "left",
    position: "absolute",
  },
  weight1: {
    top: 355,
    left: 42,
    position: "absolute",
  },

  addANewEntryItem: {
    top: 240,
    width: "100%",
    left: 0,
    borderStyle: "solid",
  },

  tuldate: {
    top: 70,
    left: 96,
    // position: "absolute",
  },

  tombol: {
    top: 96,
    left: -88,
    // position: "absolute",
    backgroundColor: "#172554",
  },

  arrowSmLeftSvgrepocomIcon: {
    width: 40,
    height: 40,
    // position: "absolute",
  },

  addAConsultation: {
    top: 10,
    left: -40,
    color: "#FDA4AF",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.montserratBold,
    // position: "absolute",
  },
  bumilNo1: {
    top: 12,
    fontSize: FontSize.size_xxl,
    color: Color.colorCrimson,
    fontFamily: FontFamily.montserratBold,
    textAlign: "left",
    width: "75%",
  },
  addANewEntryChild: {
    top: 110,
    width: "80%",
  },
  addBorder: {
    height: 10,
    borderTopWidth: 1,
    borderColor: Color.colorLightcoral,
    borderStyle: "solid",
    position: "absolute",
  },
  date: {
    top: 135,
    left: 47,
    width: 187,
  },
  dateTypo: {
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interSemiBold,
    letterSpacing: -0.4,
    fontSize: 20,
    textAlign: "left",
    position: "absolute",
  },
});
