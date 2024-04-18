import React, { useState, useEffect, useCallback, createContext, useMemo} from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// Screens
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import * as SQLite from "expo-sqlite";
import MainScreen from "./src/screens/MainScreen/MainScreen";
import InitialScreen from "./src/screens/InitialScreen/InitialScreen";
import { ToastProvider } from "react-native-toast-notifications";
import messaging from '@react-native-firebase/messaging';

// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const db = SQLite.openDatabase("health-care.db");
db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists practicehistory (practice_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, start_time TEXT, end_time TEXT, date TEXT, steps INT, distances REAL, practice_time TEXT, caloris REAL, posList TEXT)"
  );
});
// db.transaction((tx) => {
//   tx.executeSql(
//     "drop table user"
//   );
// });
db.transaction((tx) => {
  tx.executeSql(
    "create table if not exists user (user_id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT, name TEXT, phone TEXT, address TEXT, dobirth TEXT, email TEXT, weight INTERGER, height INTERGER, avatar TEXT, steps_target INTERGER, heart_target INTERGER, sex TEXT)"
  );
});

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync().then((result) =>
  console.log(`SplashScreen preventAutoHideAsync Success ${result}`)
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
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
    <ToastProvider
      placement="top"
      successIcon={
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri: "https://cdn-icons-png.freepik.com/512/7518/7518748.png",
          }}
        />
      }
      warningIcon={<FontAwesome name="warning" size={24} color="#f9e154" />}
      dangerIcon={<FontAwesome name="warning" size={24} color="#f9e154" />}
      offsetTop={30}
      duration={3000}
      textStyle={{ fontSize: 13 }}
    >
      <View style={styles.container} onLayout={onLayoutRoot}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="InitialScreen"
              component={InitialScreen}
              options={{ title: "Màn hình ban đầu", headerShown: false }}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ title: "Màn hình chính", headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
