import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
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
import SettingScreen from "../Setting/SettingScreen";
import EditProfile from "../Setting/EditProfile";
import TargetScreen from "../TargetScreen/TargetScreen";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
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
            } else if (route.name === "Empty1") {
              return (
                <FontAwesome name="star-half-empty" size={size} color={color} />
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
            } else if (route.name === "Empty1") {
              if (focused) {
                return (
                  <Text
                    style={{
                      color: focused ? "#6495ED" : "gray",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Practice1
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
            backgroundColor: "#F8F8F8", // Màu nền của tabBar
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
        <Tab.Screen name="Empty1" component={HomeScreen} />
        <Tab.Screen name="Setting" component={TargetScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
