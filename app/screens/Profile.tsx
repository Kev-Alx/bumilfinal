import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Image } from "expo-image";
import { Border, Color, FontFamily, FontSize } from "../../globalstyles";
import useAuthAndData from "../../hooks/use-auth";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { useLocalProfile } from "../../lib/store";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Profile = ({ navigation }: RouterProps) => {
  const { user, fireUser, fetchData } = useAuthAndData();
  const { age, height, setAge, setHeight } = useLocalProfile();
  // useEffect(() => {
  //   const fetchDataAndSetState = async () => {
  //     if (user) {
  //       try {
  //         const ff = await fetchData(user.uid);
  //         setAge("" + ff?.age);
  //         setHeight("" + ff?.height);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   fetchDataAndSetState();
  // }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataAndSetState = async () => {
        if (user) {
          try {
            const ff = await fetchData(user.uid);
            setAge("" + ff?.age);
            setHeight("" + ff?.height);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };

      fetchDataAndSetState();
    }, [user])
  );
  return (
    <SafeAreaView style={styles.profile}>
      <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
        <View style={[styles.rectangleView, styles.rectangleLayout2]} />
        <Text style={[styles.bumil, styles.emailFlexBox]}>
          {fireUser?.displayName}
        </Text>
        <View style={[styles.ellipseParent, styles.groupItemLayout]}>
          <Image
            style={[styles.groupItem, styles.groupItemLayout]}
            contentFit="cover"
            source={require("../../assets/profile/molangprofile.png")}
          />
          <Image
            style={[styles.molang1Icon, styles.kxcustom]}
            contentFit="cover"
            source={require("../../assets/profile/ellipse.png")}
          />
        </View>
        <View style={styles.vectorParent}>
          {fireUser?.height ? (
            <>
              <Text style={[styles.years, styles.cmTypo]}>{age} years</Text>
              <Image
                style={[styles.vectorIcon3, styles.vectorIconLayout]}
                contentFit="cover"
                source={require("../../assets/profile/vectordotprofile.png")}
              />
              <Text style={[styles.cm, styles.cmTypo]}>{height} cm</Text>
            </>
          ) : null}
          {/* <Image
            style={[styles.vectorIcon4, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../../assets/profile/vectordotprofile.png")}
          /> */}
          {/* <Text style={[styles.kg, styles.cmTypo]}>67 kg</Text> */}
          {/* <Text
            style={[styles.deliveryExpectancy16, styles.cmTypo]}
          >{`Delivery expectancy:
  16 April 2024`}</Text> */}
        </View>
        <Image
          style={[styles.vectorIcon5, styles.vectorIcon5Layout]}
          contentFit="cover"
          source={require("../../assets/profile/vectorcloudprofile.png")}
        />
        <TouchableOpacity
          style={[styles.kxicon]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Image
            style={[styles.groupIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../../assets/profile/pencil.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.rectangleParent, styles.frameChildLayout]}>
        <View style={[styles.frameChild, styles.childLayout]} />
        <Image
          style={[styles.vectorIcon, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../../assets/profile/vectoremailprofile.png")}
        />
        <View style={styles.frameItem} />
        <Text style={[styles.email, styles.emailFlexBox]}>Email</Text>
        <Text style={[styles.bumilgmailcom, styles.bumilgmailcomTypo]}>
          {user?.email}
        </Text>
        <Text style={[styles.refferalCode, styles.emailFlexBox]}>
          Refferal code
        </Text>
        <Text style={[styles.dfsd8ryf94hyfoh, styles.bumilgmailcomTypo]}>
          {fireUser?.refferalCode}
        </Text>
        <View style={styles.frameInner} />
        <Image
          style={[styles.vectorIcon1, styles.vectorIconPosition]}
          contentFit="cover"
          source={require("../../assets/profile/vectorrefferalprofile.png")}
        />
      </View>
      <TouchableOpacity
        style={[styles.rectangleGroup, styles.groupLayout]}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <View style={[styles.groupChild, styles.groupLayout]} />
        <View style={[styles.logoutParent, styles.vectorIcon5Layout]}>
          <Text style={[styles.logout, styles.emailFlexBox]}>Logout</Text>
          <Image
            style={[styles.vectorIcon2, styles.iconLayout]}
            contentFit="cover"
            source={require("../../assets/profile/vectorcodeprofile.png")}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  kxicon: {
    height: 24,
    width: 24,
    left: 295,
    top: 6,
  },
  kxcustom: {
    width: 54,
    height: 54,
  },
  frameChildLayout: {
    height: 124,
    position: "absolute",
  },
  childLayout: {
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    width: "100%",
  },
  vectorIconPosition: {
    maxWidth: "100%",
    right: "87.01%",
    position: "absolute",
    overflow: "hidden",
  },
  emailFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  bumilgmailcomTypo: {
    color: Color.colorGray_500,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    left: 56,
    position: "absolute",
  },
  groupLayout: {
    height: 42,
    position: "absolute",
  },
  vectorIcon5Layout: {
    width: 86,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleLayout: {
    height: 137,
    borderRadius: Border.br_5xs,
    width: "90%",
    position: "absolute",
  },
  rectangleLayout2: {
    height: 137,
    borderRadius: Border.br_5xs,
    width: "100%",
    position: "absolute",
  },
  groupItemLayout: {
    height: 50,
    width: 50,
    position: "absolute",
  },
  vectorIconLayout: {
    height: 4,
    width: 4,
    top: 7,
    position: "absolute",
  },
  cmTypo: {
    color: Color.colorLightcoral,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  footerLayout: {
    height: 56,
    width: 360,
    left: 0,
    position: "absolute",
  },
  svgrepocomIconLayout: {
    width: 32,
    top: 6,
    height: 32,
    position: "absolute",
    overflow: "hidden",
  },
  guidesTypo: {
    color: Color.colorGray_300,
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.size_3xs,
    top: 37,
    textAlign: "left",
    fontWeight: "600",
    height: 9,
    position: "absolute",
  },
  frameChild: {
    backgroundColor: "#fafafa",
    height: 124,
    position: "absolute",
    width: "100%",
  },
  vectorIcon: {
    width: 28,
    top: 26,
    left: "4.87%",
    height: 20,
  },
  frameItem: {
    top: 56,
    borderColor: "#e6e6e6",
    width: "80%",
    height: 9,
    left: 53,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  email: {
    top: 13,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    left: 56,
  },
  refferalCode: {
    top: 66,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    left: 56,
  },
  bumilgmailcom: {
    top: 33,
  },
  dfsd8ryf94hyfoh: {
    top: 86,
  },
  frameInner: {
    top: 18,
    left: 21,
    width: 264,
    height: 32,
    position: "absolute",
  },
  vectorIcon1: {
    width: 24,
    top: 76,
    left: "5.19%",
    height: 24,
  },
  rectangleParent: {
    top: 230,
    width: "90%",
  },
  groupChild: {
    backgroundColor: Color.colorLightcoral,
    borderRadius: Border.br_5xs,
    left: 0,
    top: 0,
    width: 308,
  },
  logout: {
    fontSize: 16,
    color: Color.colorLavenderblush,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    textAlign: "left",
    left: 0,
    top: 0,
  },
  vectorIcon2: {
    height: "102%",
    width: "23.72%",
    top: "-1%",
    right: "-1.4%",
    bottom: "-1%",
    left: "77.67%",
  },
  logoutParent: {
    top: 11,
    left: 111,
    height: 20,
  },
  rectangleGroup: {
    top: 673,
    width: "80%",
  },
  rectangleView: {
    backgroundColor: "#ffe4e6",
    left: 0,
    top: 0,
  },
  bumil: {
    top: 21,
    left: 80,
    fontSize: 24,
    fontFamily: FontFamily.montserratBold,
    color: "#f43f5e",
  },
  groupItem: {
    left: 6,
    top: 6,
  },
  molang1Icon: {
    top: 4,
    left: 4,
    width: 42,
  },
  ellipseParent: {
    top: 14,
    left: 12,
  },
  vectorIcon3: {
    left: 131,
  },
  vectorIcon4: {
    left: 201,
  },
  years: {
    left: 66,
    top: 0,
  },
  deliveryExpectancy16: {
    top: 45,
    left: 0,
  },
  cm: {
    left: 147,
    top: 0,
  },
  kg: {
    top: 1,
    left: 217,
  },
  vectorParent: {
    top: 48,
    left: 16,
    width: 251,
    height: 75,
    position: "absolute",
  },
  vectorIcon5: {
    top: 81,
    right: 0,
    height: 69,
  },
  groupIcon: {
    height: 24,
    width: 24,
    top: "8.83%",
    right: "3.93%",
    bottom: "78.18%",
    left: "90.29%",
  },
  rectangleContainer: {
    top: 66,
    overflow: "hidden",
  },
  footerChild: {
    backgroundColor: Color.colorLavenderblush,
    borderColor: Color.colorLightcoral,
    borderTopWidth: 1,
    borderStyle: "solid",
    height: 56,
    width: 360,
    top: 0,
  },
  userCircleSvgrepocomIcon: {
    left: 257,
  },
  iconBook: {
    height: "42.31%",
    width: "6.11%",
    top: "17.86%",
    right: "46.94%",
    bottom: "39.84%",
    left: "46.94%",
  },
  homeAltSvgrepocomIcon: {
    left: 71,
  },
  home: {
    left: 73,
    color: "#500724",
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.size_3xs,
    top: 37,
    width: 32,
    textAlign: "left",
    fontWeight: "600",
    height: 9,
    position: "absolute",
  },
  guides: {
    left: 163,
    width: 45,
  },
  profile1: {
    left: 257,
    width: 42,
  },
  footer: {
    top: 744,
  },
  profile: {
    backgroundColor: "#fed2d1",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    alignItems: "center",
  },
});
