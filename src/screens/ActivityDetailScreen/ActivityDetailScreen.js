import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
// import Slider from '@react-native-community/slider';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BarChartInfo from "../../components/BarChartInfo";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../../assets/fonts/Fonts";
import ActivityWeeklyScreen from "./ActivityWeeklyScreen";

const Tab = createMaterialTopTabNavigator();
const tabIndicatorWidth = 35

const ActivityDetailScreen = () => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: Fonts.Inter_Regular,
    Inter_Medium: Fonts.Inter_Medium,
    Inter_700Bold: Fonts.Inter_Bold,
    Inter_SemiBold: Fonts.Inter_SemiBold
  });
  if (!fontsLoaded) {
    console.log("Loading...");
  }
  const paddingLeft = (Dimensions.get('screen').width / 2 - tabIndicatorWidth) /2
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'Inter_SemiBold',
          alignItems:'center'
        },
        tabBarStyle: {
            height: 40,
            elevation: 2,
            // alignItems:'center'
            // backgroundColor:'white'
        },
        tabBarIndicatorContainerStyle: {
          
        },
        tabBarIndicatorStyle: {
            height:3,
            width:tabIndicatorWidth,
            borderRadius: 5,
            // left: ((Dimensions.get('window')/2 - 50) / 2)
            left: paddingLeft
        }
      })}
    >
      <Tab.Screen
        name="day"
        component={BarChartInfo}
        options={{ title: "Ngày" }}
      />
      <Tab.Screen
        name="week"
        component={ActivityWeeklyScreen}
        options={{ title: "Tuần" }}
      />
    </Tab.Navigator>
  );
};

export default ActivityDetailScreen;
