import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditProfile from "../screens/EditProfile";
import HomeScreen from "../screens/HomeScreen";
import useAuthAndData from "../../hooks/use-auth";
import HomeNoDoct from "../screens/HomeNoDoct";
import Contact from "../screens/Contact";
import ConsultationDetails from "../screens/ConsultationDetails";
import ViewTestResults from "../screens/ViewTestRssults";
import Masak from "../screens/Emergency";

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
      <Stack.Screen
        name="ConsultationDetails"
        component={ConsultationDetails}
      />
      <Stack.Screen name="ViewTestResults" component={ViewTestResults} />
      <Stack.Screen name="Emergency" component={Masak} />
    </Stack.Navigator>
  );
}
