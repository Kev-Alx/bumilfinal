import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import useFireUser from "../../hooks/use-fire-user";
import useAuthAndData from "../../hooks/use-auth";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
import { Image } from "expo-image";
import { NavigationProp } from "@react-navigation/native";
import { useLocalProfile } from "../../lib/store";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const EditProfile = ({ navigation }: RouterProps) => {
  const { user, fireUser } = useAuthAndData();
  const [age, setAge] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [height, setHeight] = useState("");
  const { updateFireUser } = useFireUser();
  const { setAge: sa, setHeight: sh } = useLocalProfile();
  useEffect(() => {
    if (fireUser) {
      setAge(fireUser?.age ? "" + fireUser?.age : "");
      setHeight(fireUser?.height ? "" + fireUser?.height : "");
      setDisplayName(fireUser?.displayName ? "" + fireUser?.displayName : "");
    }
  }, [fireUser]);
  const handleSave = () => {
    sa(age);
    sh(height);
    if (!displayName) {
      alert("Username must be filled!");
    }
    updateFireUser(user?.uid || "", {
      age: +age,
      height: +height,
      displayName,
    }).then(() => navigation.navigate("Profile"));
  };

  return (
    // <View>
    //   <Text>EditProfile</Text>
    //   <TextInput
    //     placeholder="Age"
    //     autoCapitalize="none"
    //     onChangeText={(text) => setAge(text)}
    //     value={age}
    //     keyboardType="number-pad"
    //   ></TextInput>
    //   <TextInput
    //     placeholder="Height"
    //     autoCapitalize="none"
    //     onChangeText={(text) => setHeight(text)}
    //     value={height}
    //     keyboardType="number-pad"
    //   ></TextInput>
    //   <Button onPress={handleSave} title="Save" />
    // </View>
    <View style={styles.ikiSisanBTlg}>
      <TouchableOpacity
        style={{
          width: 24,
          height: 24,
          zIndex: 4,
          top: 32,
          left: 8,
          position: "absolute",
        }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Image
          style={[styles.arrowSmLeftSvgrepocomIcon]}
          contentFit="cover"
          source={require("../../assets/profile/arrowsmleft-svgrepocom.png")}
        />
      </TouchableOpacity>
      <View style={styles.ikiSisanBTlgChild} />
      <Text style={[styles.displayName, styles.ageTypo]}>Display name</Text>
      <Text style={[styles.height, styles.ageTypo]}>Height</Text>
      <View style={[styles.rectangleParent, styles.rectangleLayout]}>
        <View style={[styles.frameChild, styles.viewPosition]} />
        <TextInput
          placeholder="Age..."
          autoCapitalize="none"
          onChangeText={(text) => setAge(text)}
          value={age}
          keyboardType="number-pad"
          style={styles.kxinput}
        />
      </View>
      <View style={[styles.rectangleGroup, styles.rectangleLayout]}>
        <View style={[styles.frameChild, styles.viewPosition]} />
        <TextInput
          placeholder="Display name..."
          autoCapitalize="none"
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          keyboardType="number-pad"
          style={styles.kxinput}
        />
      </View>
      <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
        <View style={[styles.frameChild, styles.viewPosition]} />
        <TextInput
          placeholder="Height..."
          autoCapitalize="none"
          onChangeText={(text) => setHeight(text)}
          value={height}
          keyboardType="number-pad"
          style={styles.kxinput}
        />
      </View>

      <View style={[styles.frame, styles.framePosition]}>
        <Text style={[styles.editProfile, styles.editTypo]}>Edit profile</Text>
        <Text style={[styles.editYourProfile, styles.editTypo]}>
          Edit your profile
        </Text>
      </View>
      <View style={[styles.frame1, styles.framePosition]}>
        <View style={[styles.lineView, styles.viewPosition]} />
        <Text style={[styles.age3, styles.ageTypo]}>Age</Text>
      </View>
      <TouchableOpacity onPress={handleSave} style={[styles.kxpar]}>
        <Text style={[styles.schedule, styles.editTypo]}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  kxinput: {
    paddingHorizontal: 8,
    width: "100%",
    height: "100%",
  },
  kxpar: {
    height: 48,
    top: 400,
    backgroundColor: Color.colorLightcoral,
    borderRadius: Border.br_5xs,
    width: "80%",
    borderStyle: "solid",
    alignSelf: "center",
    position: "absolute",
    overflow: "hidden",
  },
  lineViewLayout: {
    height: 5,
    width: 270,
    borderColor: Color.colorGainsboro_100,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  ageTypo: {
    textAlign: "left",
    fontWeight: "600",
    position: "absolute",
  },
  rectangleLayout: {
    height: 42,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 1,
    borderColor: Color.colorDarkslateblue,
    width: "80%",
    borderRadius: Border.br_5xs,
    borderTopWidth: 1,
    borderStyle: "solid",
    alignSelf: "center",
    position: "absolute",
    overflow: "hidden",
  },
  viewPosition: {},
  viewLayout: {
    width: "88%",
    height: 42,
    position: "absolute",
  },
  editTypo: {
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    position: "absolute",
  },
  framePosition: {
    position: "absolute",
    overflow: "hidden",
  },
  ikiSisanBTlgChild: {
    top: 85,
    left: 50,
    borderColor: Color.colorLightcoral,
    width: "80%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  ikiSisanBTlgItem: {
    top: 284,
  },
  displayName: {
    top: 104,
    color: Color.colorGray_300,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontWeight: "600",
    left: 47,
  },
  height: {
    top: 289,
    color: Color.colorGray_300,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontWeight: "600",
    left: 47,
  },
  frameChild: {
    backgroundColor: Color.colorWhite,
    height: 39,
    left: 0,
    width: "100%",
    top: 0,
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  age: {
    top: 14,
    left: 12,
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorGainsboro_100,
    textAlign: "left",
    fontWeight: "600",
  },
  rectangleParent: {
    top: 229,
  },
  rectangleGroup: {
    top: 137,
  },
  rectangleContainer: {
    top: 322,
  },
  rectangleView: {
    backgroundColor: Color.colorLightcoral,
    left: 0,
    top: 0,
    borderRadius: Border.br_5xs,
    width: "100%",
  },
  schedule: {
    top: 11,
    textAlign: "center",
    fontSize: FontSize.size_base,
    color: "#fff1f2",
    width: "100%",
    alignSelf: "center",
  },
  frameView: {
    top: 412,
    left: 48,
  },
  editProfile: {
    top: 29,
    left: 40,
    fontSize: 24,
    color: Color.colorCrimson,
  },
  editYourProfile: {
    top: 16,
    left: 42,
    fontSize: FontSize.size_xs,
    color: Color.colorLightpink,
  },
  arrowSmLeftSvgrepocomIcon: {
    width: 40,
    height: 40,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frame: {
    top: 23,
    left: 18,
    width: 179,
    height: 58,
  },
  lineView: {
    left: 0,
    height: 5,
    width: 270,
    borderColor: Color.colorGainsboro_100,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  age3: {
    top: 4,
    left: 0,
    color: Color.colorGray_300,
    fontFamily: FontFamily.montserratSemiBold,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontWeight: "600",
  },
  frame1: {
    top: 192,
    width: 269,
    height: 21,
    left: 47,
  },
  ikiSisanBTlg: {
    backgroundColor: Color.colorSnow,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    alignContent: "center",
    top: 16,
  },
});
