import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../../globalstyles";

const ViewPast = () => {
  return (
    <View style={[styles.homeScreen]}>
      <TouchableOpacity>
        <Image
          style={styles.arrowSmLeftSvgrepocomIcon}
          contentFit="cover"
          source={require("../../assets/back-arrow.png")}
        />
      </TouchableOpacity>
      <Text style={styles.yourConsultation}>Your consultation</Text>
      <Text style={styles.bumil}>Bumil No 1</Text>

      {/* Garis  */}
      <View style={[styles.addANewEntryItem, styles.addBorder]} />
      <SafeAreaView>
        <ScrollView style={styles.details}>
          <Text style={{ height: 40, width: 200, backgroundColor: "red" }}>
            hihihi
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    top: 150,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    top: 50,
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
    top: 50,
    left: 18,
    width: 40,
    height: 40,
    position: "absolute",
    overflow: "hidden",
  },
  yourConsultation: {
    top: 62,
    fontFamily: FontFamily.montserratBold,
    color: Color.colorLightpink,
    textAlign: "left",
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    left: 62,
    position: "absolute",
  },
  bumil: {
    top: 80,
    fontSize: 32,
    color: Color.colorLightcoral,
    width: 252,
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    fontWeight: "700",
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
    top: 135,
    width: 280,
    left: 47,
  },
});

export default ViewPast;
