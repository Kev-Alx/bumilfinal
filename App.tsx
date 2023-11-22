import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";

import Register from "./app/screens/Register";
import useAuthAndData from "./hooks/use-auth";
import DoctorInsideLayout from "./app/stacks/InsideDoctorTab";
import InsideLayout from "./app/stacks/InsideUserTab";
import { useFonts } from "expo-font";
const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

export default function App() {
  const auth = useAuthAndData();
  const isDoctor = auth.fireUser?.role === "DOCTOR";
  const [fontsLoaded, error] = useFonts({
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {auth.user ? (
          isDoctor ? (
            <Stack.Screen
              name="DoctorLayout"
              component={DoctorInsideLayout}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="UserLayout"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          )
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
