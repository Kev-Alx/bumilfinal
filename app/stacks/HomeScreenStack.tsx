import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfile from "../screens/EditProfile";
import HomeScreen from "../screens/HomeScreen";
import useAuthAndData from "../../hooks/use-auth";
import HomeNoDoct from "../screens/HomeNoDoct";
import Contact from "../screens/Contact";
// import ConsultationDetails from "../screens/ConsultationDetails";

const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
  const { fireUser, isLoading } = useAuthAndData();
  if (isLoading) {
    return null;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="HomeScreenIndex"
        component={fireUser?.doctorId ? HomeScreen : HomeNoDoct}
      />
      {/* <Stack.Screen name="HomeNoDoct" component={HomeNoDoct} /> */}
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}
