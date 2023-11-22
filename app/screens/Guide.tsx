import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ParallaxScrollView from "./components/ParallaxScrollView";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Color, FontFamily, FontSize, Border } from "../../globalstyles";

const Guide = ({ route, navigation }: any) => {
  const params = route.params;
  const { content, title, url } = params.guide;
  return (
    <>
      <ParallaxScrollView
        backgroundColor={"#fed2d1"}
        style={{ flex: 1 }}
        parallaxHeaderHeight={220}
        renderBackground={() => (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: url }}
          />
        )}
      >
        <View style={styles.guide}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.kxback}
              source={require("../../assets/back-arrow.png")}
            />
          </TouchableOpacity>
          <Text style={styles.foodsToReduce}>{title}sdadadasdadasdasd</Text>
          <View>
            <Text style={[styles.loremTypo]}>{content}</Text>
            {/* 
            <Text style={[styles.loremTypo]}>
              Lorem ipsum dolor sit amet consectetur. Et ut senectus quisque
              sagittis duis convallis nec. Eget eu diam urna pellentesque. Mollis
              imperdiet quam ut volutpat elementum facilisi sed tincidunt sit.
            </Text>
  
            <Text style={[styles.loremTypo]}>
              Lorem ipsum dolor sit amet consectetur. Donec ac nulla tincidunt
              aliquam felis sed turpis. Gravida pretium pretium lectus commodo
              consequat ultrices nulla. Montes turpis mattis risus netus fermentum
              sed at eget eu. Et suscipit sapien lectus hendrerit vitae malesuada
              venenatis sit feugiat.
            </Text> */}
          </View>
        </View>
      </ParallaxScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  kxback: {
    position: "absolute",
    top: 10,
    left: 16,
  },
  guide: {
    backgroundColor: "#fed2d1",
    width: "100%",
    height: 900,
    // overflow: "hidden",
  },
  foodsToReduce: {
    top: 30,
    fontSize: FontSize.size_xxl,
    color: Color.colorGray_200,
    width: 260,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    left: 58,
  },

  loremTypo: {
    marginTop: 28,
    color: Color.colorDarkslateblue,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    width: 260,
    textAlign: "justify",
    left: 60,
  },
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
});

export default Guide;
