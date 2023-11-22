import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import Guides from "../screens/Guides";
import List from "../screens/List";
import Details from "../screens/Details";
import Guide from "../screens/Guide";

const Stack = createNativeStackNavigator();

export default function GuideStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuidesIndex" component={Guides} />
      <Stack.Screen name="Guide" component={Guide} />
    </Stack.Navigator>
  );
}
