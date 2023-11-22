// import * as React from "react";
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   Text,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { Color, FontSize, FontFamily, Border } from "../../globalstyles";

// const ConsultationDetails = () => {
//   return (
//     <SafeAreaView style={styles.consultationDetails}>
//       <ScrollView
//         style={styles.weeightParent}
//         horizontal={true}
//         indicatorStyle="white"
//         showsVerticalScrollIndicator={true}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.frameScrollViewContent}
//       >
//         <View style={[styles.weeight, styles.weeightFlexBox]}>
//           <View style={styles.frame}>
//             <Image
//               style={[styles.frameChild, styles.iconLayout]}
//               contentFit="cover"
//               source={require("../../assets/consultDetails/group-39.png")}
//             />
//             <Text style={[styles.weight, styles.weightClr]}>Weight</Text>
//           </View>
//           <Text style={[styles.kg, styles.kgTypo]}>
//             <Text style={styles.text}>78</Text>
//             <Text style={styles.kg1}>kg</Text>
//           </Text>
//         </View>
//         <View style={[styles.bloopre, styles.bloopreFlexBox]}>
//           <View style={styles.frame1}>
//             <Image
//               style={[styles.frameItem, styles.photoPosition]}
//               contentFit="cover"
//               source={require("../../assets/homescreen/blood.png")}
//             />
//             <Text style={[styles.bloodPressure, styles.vectorIconPosition]}>
//               Blood Pressure
//             </Text>
//           </View>
//           <Text style={[styles.mmhg, styles.mmhgTypo]}>
//             <Text style={styles.text}>120/80</Text>
//             <Text style={styles.kg1}>mmHg</Text>
//           </Text>
//         </View>
//         <View style={styles.labTestsParent}>
//           <Text style={styles.photoTypo}>Lab Tests</Text>
//           <View style={[styles.frameInner, styles.childBorder]} />
//         </View>
//         <View style={[styles.frameParent, styles.bloopreFlexBox]}>
//           <TouchableOpacity
//             style={[styles.urineTestResultsParent, styles.testParentLayout]}
//             activeOpacity={0.6}
//             onPress={() => {}}
//           >
//             <Text style={[styles.urineTestResults, styles.kgTypo]}>
//               Urine test results
//             </Text>
//             <Image
//               style={styles.arrowUpRightSvgrepocomIcon}
//               contentFit="cover"
//               source={require("../../assets/consultDetails/arrowupright-svgrepocom2.png")}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.bloodTestResultsParent, styles.testParentLayout]}
//             activeOpacity={0.6}
//             onPress={() => {}}
//           >
//             <Text style={[styles.urineTestResults, styles.kgTypo]}>
//               Blood test results
//             </Text>
//             <Image
//               style={styles.arrowUpRightSvgrepocomIcon}
//               contentFit="cover"
//               source={require("../../assets/consultDetails/arrowupright-svgrepocom3.png")}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.photoline}>
//           <Text style={[styles.photo, styles.photoTypo]}>Photo</Text>
//           <View style={[styles.photolineChild, styles.childBorder]} />
//         </View>
//         <View style={styles.photocontent}>
//           <Image
//             style={[styles.image27Icon, styles.iconLayout]}
//             contentFit="cover"
//             source={require("../../assets/consultDetails/image-27.png")}
//           />
//           <Text style={[styles.komenDokterAliquam, styles.weightClr]}>
//             Komen dokter. aliquam felis sed turpis. Gravida pretium pretium
//             lectus commodo consequat ultrices nulla. Montes turpis mattis risus
//             netus fermentum sed at eget eu. Et suscipit sapien lectus hendrerit
//             vitae malesuada venenatis sit feugiat.
//           </Text>
//         </View>
//         <View style={styles.notes}>
//           <View style={styles.weeightFlexBox}>
//             <Text style={styles.photoTypo}>Notes</Text>
//             <View style={[styles.rectangleParent, styles.rectangleLayout]}>
//               <View style={[styles.rectangleView, styles.rectangleLayout]} />
//               <Image
//                 style={[styles.vectorIcon, styles.vectorIconPosition]}
//                 contentFit="cover"
//                 source={require("../../assets/addNewEntry/vector3.png")}
//               />
//             </View>
//           </View>
//           <Image
//             style={styles.groupIcon}
//             contentFit="cover"
//             source={require("../../assets/consultDetails/group.png")}
//           />
//         </View>
//         <Text
//           style={[styles.janinSehatBlablablalbal, styles.mmhgTypo]}
//         >{`Janin sehat blablablalbal
// dfsdfggfdgd
// gfdghj
// fdghfghfjg
// fhfgdffdfdfg`}</Text>
//       </ScrollView>
//       <View style={[styles.consultationDetailsChild, styles.childBorder]} />
//       <Text style={[styles.daysAgo, styles.mmhgTypo]}>62 DAYS AGO</Text>
//       <View style={styles.frame2}>
//         <Text style={[styles.sunday17Jul, styles.sunday17JulPosition]}>
//           Sunday, 17 Jul 2023
//         </Text>
//         <Text style={[styles.yourConsultation, styles.sunday17JulPosition]}>
//           Your consultation
//         </Text>
//         <Image
//           style={[styles.arrowSmLeftSvgrepocomIcon, styles.photoPosition]}
//           contentFit="cover"
//           source={require("../../assets/profile/arrowsmleft-svgrepocom.png")}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   frameScrollViewContent: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//   },
//   weeightFlexBox: {
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexDirection: "row",
//     width: 288,
//   },
//   iconLayout: {
//     maxWidth: "100%",
//     overflow: "hidden",
//   },
//   weightClr: {
//     color: Color.colorDarkslateblue,
//     fontSize: FontSize.size_base,
//   },
//   kgTypo: {
//     color: Color.colorGray_300,
//     fontFamily: FontFamily.interSemiBold,
//     fontWeight: "600",
//   },
//   bloopreFlexBox: {
//     width: 286,
//     marginTop: 11,
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   photoPosition: {
//     left: 0,
//     position: "absolute",
//   },
//   vectorIconPosition: {
//     top: 4,
//     position: "absolute",
//   },
//   mmhgTypo: {
//     fontFamily: FontFamily.interSemiBold,
//     fontWeight: "600",
//     textAlign: "left",
//   },
//   childBorder: {
//     height: 1,
//     borderTopWidth: 1,
//     borderColor: Color.colorMistyrose_100,
//     borderStyle: "solid",
//   },
//   testParentLayout: {
//     height: 57,
//     width: 125,
//     borderBottomWidth: 4,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     backgroundColor: Color.colorWhite,
//     borderRadius: Border.br_5xs,
//     borderTopWidth: 1,
//     borderStyle: "solid",
//     overflow: "hidden",
//   },
//   photoTypo: {
//     fontSize: FontSize.size_xxl,
//     textAlign: "left",
//     color: Color.colorDarkslateblue,
//     fontFamily: FontFamily.interBold,
//     fontWeight: "700",
//   },
//   rectangleLayout: {
//     width: 20,
//     height: 20,
//   },
//   sunday17JulPosition: {
//     left: 44,
//     textAlign: "left",
//     fontWeight: "700",
//     position: "absolute",
//   },
//   frameChild: {
//     height: "85.94%",
//     width: "23.11%",
//     top: "14.06%",
//     right: "76.89%",
//     bottom: "0%",
//     left: "0%",
//     maxHeight: "100%",
//     position: "absolute",
//   },
//   weight: {
//     left: 23,
//     textAlign: "left",
//     fontFamily: FontFamily.interBold,
//     fontWeight: "700",
//     color: Color.colorDarkslateblue,
//     top: 0,
//     position: "absolute",
//   },
//   frame: {
//     width: 79,
//     height: 19,
//     overflow: "hidden",
//   },
//   text: {
//     fontSize: FontSize.size_base,
//   },
//   kg1: {
//     fontSize: FontSize.size_5xs,
//   },
//   kg: {
//     textAlign: "center",
//   },
//   weeight: {
//     paddingHorizontal: 2,
//     paddingVertical: 0,
//     overflow: "hidden",
//   },
//   frameItem: {
//     width: 18,
//     height: 23,
//     top: 0,
//   },
//   bloodPressure: {
//     left: 24,
//     textAlign: "left",
//     color: Color.colorDarkslateblue,
//     fontSize: FontSize.size_base,
//     fontFamily: FontFamily.interBold,
//     fontWeight: "700",
//   },
//   frame1: {
//     width: 143,
//     height: 23,
//     overflow: "hidden",
//   },
//   mmhg: {
//     color: Color.colorSnow,
//   },
//   bloopre: {
//     marginTop: 11,
//     alignItems: "center",
//     width: 286,
//     overflow: "hidden",
//   },
//   frameInner: {
//     marginTop: 4,
//     width: 261,
//     height: 1,
//     borderTopWidth: 1,
//     borderColor: Color.colorMistyrose_100,
//     borderStyle: "solid",
//   },
//   labTestsParent: {
//     alignSelf: "stretch",
//     marginTop: 11,
//   },
//   urineTestResults: {
//     top: 8,
//     left: 12,
//     fontSize: FontSize.size_xs,
//     textAlign: "left",
//     position: "absolute",
//   },
//   arrowUpRightSvgrepocomIcon: {
//     left: 93,
//     width: 22,
//     height: 22,
//     top: 32,
//     position: "absolute",
//     overflow: "hidden",
//   },
//   urineTestResultsParent: {
//     borderColor: Color.colorLightblue,
//   },
//   bloodTestResultsParent: {
//     borderColor: Color.colorCrimson,
//   },
//   frameParent: {
//     marginTop: 11,
//   },
//   photo: {
//     left: 0,
//     position: "absolute",
//     top: 0,
//   },
//   photolineChild: {
//     top: 29,
//     width: 261,
//     height: 1,
//     borderTopWidth: 1,
//     borderColor: Color.colorMistyrose_100,
//     borderStyle: "solid",
//     left: 0,
//     position: "absolute",
//   },
//   photoline: {
//     height: 29,
//     alignSelf: "stretch",
//     marginTop: 11,
//     overflow: "hidden",
//   },
//   image27Icon: {
//     borderRadius: 6,
//     height: 141,
//     alignSelf: "stretch",
//     width: "100%",
//   },
//   komenDokterAliquam: {
//     fontWeight: "500",
//     fontFamily: FontFamily.interMedium,
//     textIndent: 16,
//     marginTop: 8,
//     alignSelf: "stretch",
//     textAlign: "left",
//   },
//   photocontent: {
//     height: 316,
//     padding: 8,
//     backgroundColor: Color.colorWhite,
//     borderRadius: Border.br_5xs,
//     marginTop: 11,
//     width: 288,
//     overflow: "hidden",
//   },
//   rectangleView: {
//     borderRadius: Border.br_9xs,
//     backgroundColor: Color.colorGray_100,
//     borderColor: Color.colorHoneydew,
//     borderBottomWidth: 2,
//     height: 20,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     width: 20,
//     borderTopWidth: 1,
//     borderStyle: "solid",
//     left: 0,
//     top: 0,
//     position: "absolute",
//   },
//   vectorIcon: {
//     width: "60%",
//     right: "20%",
//     left: "20%",
//     height: 10,
//     maxWidth: "100%",
//     overflow: "hidden",
//   },
//   rectangleParent: {
//     height: 20,
//     overflow: "hidden",
//   },
//   groupIcon: {
//     height: 2,
//     marginLeft: 174,
//     width: 288,
//   },
//   notes: {
//     height: 30,
//     flexWrap: "wrap",
//     alignSelf: "stretch",
//     marginTop: 11,
//     flexDirection: "row",
//     overflow: "hidden",
//   },
//   janinSehatBlablablalbal: {
//     width: 260,
//     marginTop: 11,
//     color: Color.colorDarkslateblue,
//     fontSize: FontSize.size_base,
//   },
//   weeightParent: {
//     top: 180,
//     height: 679,
//     maxHeight: 679,
//     left: 35,
//     position: "absolute",
//     width: "100%",
//   },
//   consultationDetailsChild: {
//     top: 156,
//     width: 289,
//     height: 1,
//     borderTopWidth: 1,
//     borderColor: Color.colorMistyrose_100,
//     borderStyle: "solid",
//     left: 35,
//     position: "absolute",
//   },
//   daysAgo: {
//     top: 133,
//     left: 62,
//     fontSize: 14,
//     textTransform: "lowercase",
//     color: "rgba(251, 113, 133, 0.8)",
//     position: "absolute",
//   },
//   sunday17Jul: {
//     fontSize: 32,
//     color: "#fb7185",
//     width: 252,
//     height: 20,
//     top: 32,
//     fontFamily: FontFamily.interBold,
//   },
//   yourConsultation: {
//     top: 12,
//     fontFamily: FontFamily.montserratBold,
//     color: Color.colorLightpink,
//     fontSize: FontSize.size_xs,
//   },
//   arrowSmLeftSvgrepocomIcon: {
//     width: 40,
//     height: 40,
//     top: 0,
//     overflow: "hidden",
//   },
//   frame2: {
//     top: 23,
//     left: 18,
//     width: 296,
//     height: 110,
//     position: "absolute",
//     overflow: "hidden",
//   },
//   consultationDetails: {
//     backgroundColor: "#fff1f2",
//     flex: 1,
//     height: 975,
//     overflow: "hidden",
//     width: "100%",
//   },
// });

// export default ConsultationDetails;
