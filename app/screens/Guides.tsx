import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Border } from "../../globalstyles";
import { useState, useEffect } from "react";
import GuideCard from "./components/GuideCard";
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { NavigationProp } from "@react-navigation/native";
// import Card from "../components/Card";
// import Card2 from "../components/Card2";
// import Card3 from "../components/Card3";

type Guide = {
  content: string;
  title: string;
  url: string;
  category: string;
};
interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const GuideHome = ({ navigation }: RouterProps) => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredGuides, setfilteredGuides] = useState<Guide[]>([]);

  useEffect(() => {
    setfilteredGuides(
      guides.filter((guide) =>
        guide.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, guides]);

  const getGuides = async () => {
    setisLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "guides"), orderBy("title"))
      );
      const newList = querySnapshot.docs.map((doc) => doc.data());
      setGuides(newList as Guide[]);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setisLoading(false);
    }
  };
  // useEffect(() => {
  //   const filteredGuides = filterGuides(guides, search);
  //   setGuides(filteredGuides);
  // }, [search]);

  useEffect(() => {
    getGuides();
  }, []);
  return (
    <View style={styles.guideHome}>
      <Text style={[styles.guides1, styles.guides1FlexBox]}>Guides</Text>
      {/* search */}
      <View style={styles.frameParent}>
        <View style={[styles.rectangleParent2, styles.frameChild4Position]}>
          <View style={[styles.frameChild4, styles.frameChild4Position]} />
          <TextInput
            style={styles.searchForGuides}
            placeholder="Search for guides"
            onChangeText={(e) => setSearch(e)}
          />
        </View>
        <Image
          style={styles.groupItem}
          contentFit="cover"
          source={require("../../assets/group-6.png")}
        />
      </View>
      <View style={[styles.guideHomeChild, styles.childBorder]} />

      <ScrollView alwaysBounceVertical={true} style={styles.container}>
        <ScrollView style={{ paddingHorizontal: 16 }}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            filteredGuides.map((guide) => (
              <GuideCard
                key={guide.url}
                category={guide.category}
                title={guide.title}
                url={guide.url}
                onPress={() =>
                  navigation.navigate("Guide", {
                    guide,
                  })
                }
              />
            ))
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 560,
    flexDirection: "row",
    padding: 10,
    top: 180,
    position: "absolute",
  },
  scrollContainer: {
    flexDirection: "column",
    marginTop: -100,
    marginBottom: 200,
    paddingTop: 32,
  },
  scroll: {
    top: 180,
    width: "100%",
    paddingLeft: 16,
  },
  guides1FlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  childBorder: {
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  frameChild4Position: {
    borderRadius: Border.br_5xs,
    width: "100%",
    position: "absolute",
  },
  guides1: {
    top: 62,
    fontSize: 24,
    fontFamily: FontFamily.montserratBold,
    color: Color.colorCrimson,
  },
  frameChild4: {
    backgroundColor: Color.colorSnow,
    height: 39,
  },
  searchForGuides: {
    left: 40,
    width: "100%",
    height: "100%",
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    paddingTop: 4,
    position: "absolute",
    zIndex: 10,
  },
  rectangleParent2: {
    borderColor: Color.colorLightblue,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderLeftWidth: 1,
    height: 42,
    borderTopWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
  },
  groupItem: {
    top: 2,
    left: 4,
    width: 30,
    height: 30,
    position: "absolute",
  },
  frameParent: {
    top: 126,
    height: 42,
    width: "80%",
    position: "absolute",
  },
  guideHomeChild: {
    top: 91,
    borderColor: "#fb7185",
    width: "80%",
    height: 1,
    position: "absolute",
  },
  guideHome: {
    backgroundColor: Color.colorMistyrose_100,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
    alignItems: "center",
  },
});

export default GuideHome;
