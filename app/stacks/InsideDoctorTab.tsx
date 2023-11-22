import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DoctorHome from "../screens/DoctorHome";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import useAuthAndData from "../../hooks/use-auth";
import DoctorReg from "../screens/DoctorReg";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Color } from "../../globalstyles";
import AddNewEntry from "../screens/AddNewEntry";
import DoctorHomeStack from "./DoctorHomeStack";
import Coba from "../screens/AddNewEntry";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function DoctorInsideLayout() {
  const { fireUser, isLoading } = useAuthAndData();
  if (isLoading) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName="DoctorReg"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="DoctorReg"
        component={fireUser?.hospital ? CompletedLayout : DoctorReg}
      />
      <Stack.Screen name="CompletedLayout" component={CompletedLayout} />
    </Stack.Navigator>
  );
}

export function CompletedLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.colorCrimson,
        tabBarInactiveTintColor: Color.colorLightpink,
        tabBarActiveBackgroundColor: Color.colorLavenderblush,
        tabBarInactiveBackgroundColor: Color.colorLavenderblush,
      }}
    >
      <Tab.Screen
        name="DoctorHome"
        component={DoctorHomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person" />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Profdile"
        component={Coba}
        options={{
          tabBarLabel: "Entry",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person" />
          ),
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
}
