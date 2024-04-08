import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// Screens
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import MainScreen from "./src/screens/MainScreen/MainScreen";

const db = SQLite.openDatabase("health-care.db");
db.transaction(tx => {
  tx.executeSql(
    "create table if not exists practicehistory (practice_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, start_time TEXT, end_time TEXT, date TEXT, steps INT, distances REAL, practice_time TEXT, caloris REAL, posList TEXT)"
  );
});
db.transaction(tx => {
  tx.executeSql(
    "create table if not exists user (user_id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT, name TEXT, phone TEXT, address TEXT, dobirth TEXT, email TEXT, weight INTERGER, height INTERGER, avatar TEXT)"
  );
});


const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync().then((result) =>
  console.log(`SplashScreen preventAutoHideAsync Success ${result}`)
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const onLayoutRoot = useCallback(async () => {
    if (fontsLoaded) {
      console.log("Load font successfully");
      await SplashScreen.hideAsync();
      setIsAppReady(true);
    }
  }, [fontsLoaded]);
  useEffect(() => {
    async function onLayout() {
      if (fontsLoaded) {
        setTimeout(() => {
          SplashScreen.hideAsync();
          setIsAppReady(true);
        }, 5000);
      }
    }
    onLayout();
  }, [fontsLoaded]);
  console.log(isAppReady);
  if (!isAppReady) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRoot}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: "Màn hình đăng nhập",  headerShown: false}}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ title: "Màn hình đăng ký",  headerShown: false}}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ title: "Màn hình chính",  headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
