import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ActivityDetailScreen from "../ActivityDetailScreen/ActivityDetailScreen";
import ActivityDetail from "../ActivityDetailScreen/ActivityDetail";
// import ActivityWeeklyScreen from "../ActivityDetailScreen/ActivityWeeklyScreen";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Màn hình chính",  headerShadowVisible: false}}
      />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ title: "Hoạt động của tôi", headerShadowVisible: false}}
      />
      <Stack.Screen
        name="ActivityDetailPerDay"
        component={ActivityDetail}
        options={{ title: "Chi tiết", headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
