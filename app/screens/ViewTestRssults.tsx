import * as React from "react";
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color } from "../../globalstyles";
import { NavigationProp, RouteProp } from "@react-navigation/native";
interface RouterProps {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const ViewTestResults = ({ navigation, route }: RouterProps) => {
  console.log(route.params);
  let imgUrl, note;
  if (route?.params?.type === "Urine") {
    imgUrl = route.params.testUrine;
    note = route.params.testNoteUrine;
  }
  if (route?.params?.type === "Blood") {
    imgUrl = route.params.testBlood;
    note = route.params.testNoteBlood;
  }
  return (
    <View style={[styles.viewTestResults, styles.image29ParentLayout]}>
      <ScrollView
        style={[styles.image29Parent, styles.image29ParentLayout]}
        indicatorStyle="white"
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <ScrollView>
          <ImageBackground
            style={styles.image29Icon}
            resizeMode="cover"
            source={{ uri: imgUrl }}
          />
          <Text style={styles.kxcust}>Doctor notes</Text>
          <Text style={styles.komenDokterAliquam}>{note}</Text>
        </ScrollView>
      </ScrollView>
      <View style={styles.frame}>
        <View style={[styles.frame1, styles.framePosition]}>
          <TouchableOpacity
            style={{
              left: 10,
              top: 24,
              width: 24,
              height: 20,
              position: "absolute",
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={[styles.arrowSmLeftSvgrepocomIcon]}
              contentFit="cover"
              source={require("../../assets/back-arrow.png")}
            />
          </TouchableOpacity>
          <View style={[styles.frame2, styles.frameLayout]}>
            <View style={[styles.frame3, styles.framePosition]}>
              <Text style={[styles.bloodTestResults, styles.bumilNo1Typo]}>
                Blood test results
              </Text>
            </View>
            <View style={[styles.frame4, styles.frameLayout]}>
              <Text style={[styles.bumilNo1, styles.bumilNo1Typo]}>
                Bumil no 1
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.viewTestResultsChild} />
    </View>
  );
};

const styles = StyleSheet.create({
  kxcust: {
    fontSize: FontSize.size_xl,
    color: Color.colorLightcoral,
    marginTop: 12,
    fontFamily: FontFamily.montserratBold,
  },
  frameScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image29ParentLayout: {
    width: "100%",
    flex: 1,
  },
  framePosition: {
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frameLayout: {
    width: 240,
    top: 0,
    height: 58,
    position: "absolute",
    overflow: "hidden",
  },
  bumilNo1Typo: {
    fontFamily: FontFamily.montserratBold,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  image29Icon: {
    width: 360,
    height: 480,
  },
  komenDokterAliquam: {
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorDarkslateblue,
    width: 360,
    marginTop: 4,
    textAlign: "left",
  },
  image29Parent: {
    top: 107,
    maxWidth: "100%",
    left: 0,
    position: "absolute",
    height: 680,
  },
  arrowSmLeftSvgrepocomIcon: {
    width: 24,
    height: 20,

    position: "absolute",
    overflow: "hidden",
  },
  bloodTestResults: {
    top: 12,
    fontSize: FontSize.size_sm,
    color: Color.colorLightpink,
  },
  frame3: {
    left: 2,
    width: 240,
    height: 27,
  },
  bumilNo1: {
    top: 29,
    fontSize: FontSize.size_xxl,
    color: Color.colorCrimson,
  },
  frame4: {
    left: 0,
  },
  frame2: {
    left: 40,
  },
  frame1: {
    width: 280,
    height: 58,
    left: 0,
  },
  frame: {
    top: 23,
    width: "95%",
    height: 58,
    position: "absolute",
    overflow: "hidden",
  },
  viewTestResultsChild: {
    top: 85,
    left: 50,
    borderStyle: "solid",
    borderColor: Color.colorLightcoral,
    borderTopWidth: 1,
    width: "80%",
    height: 1,
    position: "absolute",
  },
  viewTestResults: {
    backgroundColor: Color.colorSnow,
    height: "100%",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default ViewTestResults;
