import { Image } from "expo-image";
import { Border, Color, FontFamily, FontSize } from "../../../globalstyles";
import { View, Text, StyleSheet } from "react-native";
type CardProps = {
  date: string;
  variant: "BLUE" | "YELLOW" | "GREEN";
  type: string;
};

const colorMap = {
  BLUE: Color.colorLightblue,
  GREEN: Color.colorHoneydew,
  YELLOW: "#fef3c7",
};

export const ScheduleCard = ({ date, type, variant }: CardProps) => {
  return (
    <View
      style={[
        styles.rectangleGroup,
        styles.rectanglePosition,
        {
          backgroundColor: colorMap[variant],
        },
      ]}
    >
      {variant === "BLUE" ? (
        <Image
          style={[styles.molang3dCopy1300x3001]}
          contentFit="cover"
          source={require("../../../assets/homescreen/molang-3d--copy1300x300-1.png")}
        />
      ) : variant === "GREEN" ? (
        <Image
          style={[styles.molang3dCopy1300x3001]}
          contentFit="cover"
          source={require("../../../assets/homescreen/molang-3d--copy4300x300-4-1.png")}
        />
      ) : (
        <Image
          style={[styles.molang3dCopy1300x3001]}
          contentFit="cover"
          source={require("../../../assets/homescreen/molang-3d--copy4300x300-3-1.png")}
        />
      )}
      <Text style={[styles.sunday29Oct, styles.sunday29OctLayout]}>{date}</Text>
      <Text style={[styles.consultation]}>{type.toUpperCase()}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
  frameItemLayout: {
    width: 140,
    position: "absolute",
  },
  molang3dCopy1300x3001: {
    width: 92,
    height: 92,
    left: 0,
    bottom: 0,
    position: "absolute",
  },
  sunday29Oct: {
    top: 7,
    right: 16,
    width: 100,
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base,
    textAlign: "right",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    position: "absolute",
  },
  sunday29OctLayout: {
    position: "absolute",
  },

  consultation: {
    bottom: 10,
    right: 0,
    width: 80,
    color: Color.colorGray_500,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    position: "absolute",
  },
  bloodTestTypo: {
    color: Color.colorGray_500,
    fontSize: FontSize.size_5xs,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  rectangleGroup: {
    overflow: "hidden",
    height: 82,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: Border.br_9xs,
    margin: 7,
  },
  rectanglePosition: {
    left: 2,
    width: 180,
    height: 108,
  },
});
