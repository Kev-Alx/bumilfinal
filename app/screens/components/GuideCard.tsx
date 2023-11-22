import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color } from "../../../globalstyles";

type GuideProps = {
  title: string;
  url: string;
  category: string;
  onPress: () => void;
};

const GuideCard = ({ category, title, url, onPress }: GuideProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.frameGroupLayout]}
      onPress={onPress}
    >
      <Image
        style={[styles.image25Icon, styles.iconPosition]}
        contentFit="cover"
        source={{ uri: url }}
      />
      <View style={[styles.maskGroupChild, styles.frameInnerPosition]} />
      <Text style={[styles.food, styles.foodTypo]}>{category}</Text>
      <Text style={[styles.foodsToReduce, styles.foodTypo]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  frameGroupLayout: {
    height: 150,
    width: 300,
  },

  iconPosition: {
    height: 130,
    left: 0,
    top: 0,
    position: "absolute",
  },
  image25Icon: {
    width: 300,
    height: 162,
    borderRadius: 12,
  },
  maskGroupChild: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
  },
  frameInnerPosition: {
    height: 47,
    top: 83,
    left: 0,
    width: 300,
    position: "absolute",
  },
  foodTypo: {
    left: 17,
    height: 21,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  food: {
    top: 89,
    fontSize: FontSize.size_xs,
    color: Color.colorGray_250,
    width: 83,
  },
  foodsToReduce: {
    top: 104,
    width: 275,
    fontSize: FontSize.size_base,
    color: Color.colorWhite,
  },
});

export default GuideCard;
