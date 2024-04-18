import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ActivityDetailScreen from "../ActivityDetailScreen/ActivityDetailScreen";
import ActivityDetail from "../ActivityDetailScreen/ActivityDetail";
import CaloActivityDetailScreen from "../CaloDetailScreen/CaloActivityDetailScreen";
import DistanceActivityDetailScreen from "../DistanceDetailScreen/DistanceActivityDetailScreen";
import TimeActivityDetailScreen from "../TimeDetailScreen/TimeActivityDetailScreen";
import EditProfile from "../Setting/EditProfile";
import ModalContent from "../RegisterScreen/ModelContent";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../MainScreen/ThemeProvider";
import Storage from "expo-storage";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  const themeValue = useContext(ThemeContext);
  const isDarkMode = themeValue.isDarkMode;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode? "#222222" : "white",
        },
        headerTintColor: isDarkMode? "white" : "black",
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Màn hình chính", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ title: "Hoạt động của tôi", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="ActivityDetailPerDay"
        component={ActivityDetail}
        options={{ title: "Chi tiết", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="CaloActivityDetail"
        component={CaloActivityDetailScreen}
        options={{ title: "Năng lượng tiêu thụ", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="DistanceActivityDetailPerDay"
        component={DistanceActivityDetailScreen}
        options={{ title: "Khoảng cách", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="TimeActivityDetailPerDay"
        component={TimeActivityDetailScreen}
        options={{ title: "Phút vận động", headerShadowVisible: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "Thông tin cá nhân", headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
