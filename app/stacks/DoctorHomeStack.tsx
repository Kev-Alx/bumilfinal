import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorHome from "../screens/DoctorHome";
import AddSchedule from "../screens/AddSchedule";
import AddNewEntry from "../screens/AddNewEntry";
import TestResults from "../screens/AddTestResults";
import ViewPast from "../screens/ViewPast";
import ConsultationDetails from "../screens/ConsultationDetails";
import ViewTestResults from "../screens/ViewTestRssults";

const Stack = createNativeStackNavigator();

export default function DoctorHomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorHomeIndex" component={DoctorHome} />
      <Stack.Screen name="AddSchedule" component={AddSchedule} />
      <Stack.Screen name="AddConsultation" component={AddNewEntry} />
      <Stack.Screen name="AddTestResult" component={TestResults} />
      <Stack.Screen name="ViewPast" component={ViewPast} />
      <Stack.Screen
        name="ConsultationDetails"
        component={ConsultationDetails}
      />
      <Stack.Screen name="ViewTestResults" component={ViewTestResults} />
    </Stack.Navigator>
  );
}
