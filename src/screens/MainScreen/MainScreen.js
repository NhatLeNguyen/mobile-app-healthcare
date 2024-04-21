import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  createContext,
} from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";
// Screens
import HomeScreen from "../HomeScreen/HomeScreen";
import HomeNavigator from "../HomeScreen/HomeNavigator";
import StartPracticeScreenNavigator from "../StartPracticeScreen/StartPracticeScreenNavigator";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import TargetScreen from "../TargetScreen/TargetScreen";
import { ThemeContext } from "./ThemeProvider";
import ThemeProvider from "./ThemeProvider";
import ChallengeScreen from "../ChallengeScreen/ChallengeScreen";
import ChallengeMap from "../ChallengeScreen/ChallengeMap";
import ChallengeNavigation from "../ChallengeScreen/ChallengeNavigation";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
   const Screen = (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            color = focused ? "#6495ED" : "gray";
            if (route.name === "Home") {
              iconName = focused ? "information" : "information";
              return <FontAwesome name="home" size={size} color={color} />;
              // return (<Image
              // style ={{width: 30, height:30}}
              // source={{ uri : "https://upload.wikimedia.org/wikipedia/commons/b/bd/Running_animated.gif"}}
              // />)
            } else if (route.name === "Practice") {
              return (
                <MaterialCommunityIcons
                  name="electron-framework"
                  size={size}
                  color={color}
                />
              );
              // return (<Image
              //   style ={{width: 31, height:31}}
              //   source={{ uri : "https://cdn-icons-gif.flaticon.com/8756/8756262.gif"}}
              //   />)
            } else if (route.name === "Together") {
              return (
                <Ionicons name="flag" size={size} color={color} />
              );
            } else if (route.name === "Setting") {
              return <FontAwesome name="user" size={size} color={color} />;
            }
          },
          tabBarLabel: ({ focused, color }) => {
            // Add tabBarLabel
            let label;
            if (route.name === "Home") {
              if (focused) {
                return (
                  <Text
                    style={{
                      color: focused ? "#6495ED" : "gray",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Màn hình chính
                  </Text>
                );
              }
            } else if (route.name === "Practice") {
              if (focused) {
                return (
                  <Text
                    style={{
                      color: focused ? "#6495ED" : "gray",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Practice
                  </Text>
                );
              }
            } else if (route.name === "Together") {
              if (focused) {
                return (
                  <Text
                    style={{
                      color: focused ? "#6495ED" : "gray",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Together
                  </Text>
                );
              }
            } else if (route.name === "Setting") {
              if (focused) {
                return (
                  <Text
                    style={{
                      color: focused ? "#6495ED" : "gray",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Setting
                  </Text>
                );
              }
            }
            return null;
          },
          tabBarStyle: {
            backgroundColor: "#F8F8F8"
            // backgroundColor:themeValue.isDarkMode ? 'black' : "#F8F8F8",
            // borderTopColor:'black'
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Practice"
          component={StartPracticeScreenNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Together" component={ChallengeNavigation} options={{headerShown: false}}/>
        <Tab.Screen
          name="Setting"
          component={TargetScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
  return (<ThemeProvider chidren={Screen}></ThemeProvider>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
