import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapDraw from "../../components/DrawedMap/MapDraw";
import StartPracticeScreen from "./StartPracticeScreen";
import PracticeScreen from "./PraticeScreen";

const Stack = createNativeStackNavigator();

function StartPracticeScreenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TapLuyen"
        component={StartPracticeScreen}
        options={{headerShown: false }}
      />
      <Stack.Screen
        name="MapRoute"
        component={MapDraw}
        options={{ title: "Lộ trình di chuyển"}}
      />
      <Stack.Screen
        name="PracticeScreen"
        component={PracticeScreen}
        options={{ title: "Tập luyện", headerShown: false, headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
}

export default StartPracticeScreenNavigator;
