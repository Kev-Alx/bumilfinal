import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Linking,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { NavigationProp } from "@react-navigation/native";
import useAuthAndData, { FireUser } from "../../hooks/use-auth";
import useFireUser from "../../hooks/use-fire-user";
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Chat = ({ navigation }: RouterProps) => {
  const [Pesan, setPesan] = useState("");
  const [doctor, setdoctor] = useState<FireUser>();
  const { fireUser } = useAuthAndData();
  const { getContactDoc } = useFireUser();
  useEffect(() => {
    const fetchData = async () => {
      if (fireUser !== null) {
        try {
          const doc = await getContactDoc(fireUser);
          if (!doc) {
            alert("User tidak punya dokter!");
            return;
          }
          setdoctor(doc[0] as FireUser);
        } catch (error) {
          console.error("Error fetching schedules:", error);
        }
      }
    };
    fetchData();
  }, [fireUser]);
  const kirimPesan = () => {
    let url = "whatsapp://send?text=" + Pesan + "&phone=" + doctor?.phoneNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp terbuka");
      })
      .catch(() => {
        console.log("Pastikan WhatsApp terinstal");
      });
  };
  return (
    <View style={styles.chat}>
      <Image
        style={{
          width: "100%",
          height: "100%",
          bottom: 0,
          position: "absolute",
        }}
        contentFit="cover"
        source={require("../../assets/background-molang.png")}
      />
      <View style={[styles.frame, styles.frameLayout]}>
        <View style={[styles.frame1, styles.frameIconPosition]}>
          <Text style={[styles.bumilNo1, styles.sendFlexBox]}>
            {fireUser?.displayName}
          </Text>
          <Text style={[styles.viewPastConsultations, styles.sendFlexBox]}>
            Contact your doctor
          </Text>
          <Pressable onPress={() => navigation.navigate("HomeScreenIndex")}>
            <Image
              style={[
                styles.arrowSmLeftSvgrepocomIcon,
                styles.frameIconPosition,
                { top: 6 },
              ]}
              contentFit="cover"
              source={require("../../assets/Contact/arrowsmleft-svgrepocom.png")}
            />
          </Pressable>
        </View>
      </View>

      <View style={[styles.frameWrapper, styles.wrapperLayout]}>
        <View style={[styles.frame2, styles.frameIconPosition]}>
          <View style={[styles.frameChild, styles.groupIconLayout]} />

          <View style={[styles.frame3, styles.frame3Layout]}>
            <Text style={[styles.drBambangS, styles.textClr]}>
              {doctor?.displayName}
            </Text>
            <Image
              style={[styles.image26Icon, styles.frame3Layout]}
              contentFit="cover"
              source={{ uri: doctor?.profilePicUrl }}
            />
            <View style={[styles.parent, styles.textLayout]}>
              <Text style={[styles.text, styles.textLayout]}>
                {doctor?.phoneNumber}
              </Text>
              <Image
                style={[styles.frameItem, styles.framePosition]}
                contentFit="cover"
                source={require("../../assets/doctorReg/group-38.png")}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.sendWrapper, styles.wrapperLayout]}>
        <Pressable onPress={kirimPesan}>
          <Text style={[styles.send, styles.sendFlexBox]}>Send</Text>
        </Pressable>
      </View>
      <TextInput
        style={{
          top: 170,
          width: 273,
          left: 65,
          fontSize: 15,
          marginBottom: 15,
          textAlignVertical: "top",
          padding: 8,
        }}
        placeholder="Masukkan Pesan"
        value={Pesan}
        multiline={true}
        numberOfLines={5}
        onChangeText={(Pesan) => setPesan(Pesan)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    height: 58,
    position: "absolute",
    overflow: "hidden",
  },
  frameIconPosition: {
    top: 0,
    left: 0,
  },
  sendFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  wrapperLayout: {
    width: "80%",
    borderRadius: 8,
    alignSelf: "center",
    position: "absolute",
  },
  groupIconLayout: {
    height: 1,
    position: "absolute",
  },
  frame3Layout: {
    height: 34,
    position: "absolute",
  },
  textClr: {
    color: "#020617",
    top: 6,
  },
  textLayout: {
    height: 19,
    position: "absolute",
  },
  framePosition: {
    position: "absolute",
    overflow: "hidden",
  },
  bumilNo1: {
    top: 29,
    left: 40,
    fontSize: 24,
    color: "#f43f5e",
    fontFamily: "Montserrat-Bold",
    fontWeight: "700",
    textAlign: "left",
  },
  viewPastConsultations: {
    top: 12,
    left: 42,
    fontSize: 14,
    color: "#fda4af",
    fontFamily: "Montserrat-Bold",
    fontWeight: "700",
    textAlign: "left",
  },
  arrowSmLeftSvgrepocomIcon: {
    width: 40,
    height: 40,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frame1: {
    width: 194,
    left: 0,
    height: 58,
    position: "absolute",
    overflow: "hidden",
  },
  frame: {
    top: 28,
    left: 18,
    width: "80%",
  },
  frameChild: {
    top: 49,
    borderTopWidth: 0.5,
    width: "100%",
    borderColor: "#3e071d",
    borderStyle: "solid",
    left: 0,
  },
  drBambangS: {
    left: 41,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    width: 138,
    textAlign: "left",
    position: "absolute",
  },
  image26Icon: {
    borderRadius: 50,
    width: 32,
    left: 0,
    top: 0,
  },
  text: {
    left: 8,
    fontSize: 12,
    fontFamily: "Inter-Medium",
    textAlign: "center",
    width: 108,
    color: "#020617",
  },
  frameItem: {
    height: 20,
    width: 20,
    right: "85.87%",
    bottom: "3.85%",
    left: "-10%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  parent: {
    top: 8,
    left: 177,
    width: 92,
  },
  frame3: {
    top: 8,
    left: 13,
    width: "100%",
    overflow: "hidden",
  },
  frame2: {
    backgroundColor: "#fecdd3",
    width: "100%",
    height: 49,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frameWrapper: {
    top: 116,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    height: 208,
    borderColor: "#3e071d",
    borderStyle: "solid",
    overflow: "hidden",
  },
  send: {
    top: 11,
    fontSize: 16,
    color: "#fff1f2",
    width: "100%",
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
  sendWrapper: {
    top: 341,
    backgroundColor: "#fb7185",
    height: 42,
  },
  groupIcon: {
    top: 89,
    left: 50,
    width: 276,
  },
  chat: {
    backgroundColor: "#fff9f9",
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Chat;
