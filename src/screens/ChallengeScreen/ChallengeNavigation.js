import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalContent from "../RegisterScreen/ModelContent";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../MainScreen/ThemeProvider";
import Storage from "expo-storage";
import ChallengeScreen from "./ChallengeScreen";
import ChallengeMap from "./ChallengeMap";

const Stack = createNativeStackNavigator();

function ChallengeNavigation() {
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
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{ title: "Màn hình ", headerShown: false }}
      />
      <Stack.Screen
        name="ChallengeMap"
        component={ChallengeMap}
        options={{ title: "Thử thách" }}
      />
      
    </Stack.Navigator>
  );
}

export default ChallengeNavigation;
