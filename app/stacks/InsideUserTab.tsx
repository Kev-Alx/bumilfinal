import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import useAuthAndData from "../../hooks/use-auth";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Guides from "../screens/Guides";
import Profile from "../screens/Profile";
import ProfileStack from "./ProfileStack";
import { Color } from "../../globalstyles";
import GuideStack from "./GuideStack";
import HomeScreenStack from "./HomeScreenStack";

const Tab = createBottomTabNavigator();
export default function InsideLayout() {
  const auth = useAuthAndData();

  if (!auth.fireUser) {
    return <View></View>;
  }
  return (
    // <InsideStack.Navigator>
    //   <InsideStack.Screen name="My todos" component={List} />
    //   <InsideStack.Screen name="details" component={Details} />
    // </InsideStack.Navigator>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Color.colorCrimson,
        tabBarInactiveTintColor: Color.colorLightpink,
        tabBarActiveBackgroundColor: Color.colorLavenderblush,
        tabBarInactiveBackgroundColor: Color.colorLavenderblush,
      })}
      initialRouteName="Homescreen"
    >
      <Tab.Screen
        name="Homescreen"
        component={HomeScreenStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Guides"
        component={GuideStack}
        options={{
          tabBarLabel: "Guides",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 color={color} size={size} name="book" />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
