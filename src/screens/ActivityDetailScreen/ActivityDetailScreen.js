import React, { useContext, useState } from "react";
import { View, Text, Dimensions } from "react-native";
// import Slider from '@react-native-community/slider';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BarChartInfo from "./BarChartInfo";
import ActivityWeeklyScreen from "./ActivityWeeklyScreen";
import { ThemeContext } from "../MainScreen/ThemeProvider";

const Tab = createMaterialTopTabNavigator();
const tabIndicatorWidth = 35

const ActivityDetailScreen = ({route}) => {
  const themeValue = useContext(ThemeContext)
  const paddingLeft = (Dimensions.get('screen').width / 2 - tabIndicatorWidth) /2
  return (
    <Tab.Navigator
      initialRouteName={route.params ? route.params.name :'day'}
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'Inter_600SemiBold',
          alignItems:'center'
        },
        tabBarStyle: {
            height: 40,
            elevation: 2,
            // alignItems:'center'
            backgroundColor: themeValue.isDarkMode ? '#202125': 'white'
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
        options={{ title: "Ngày", tabBarActiveTintColor:themeValue.isDarkMode ? '#e2e3e7' : 'black'}}
      
      />
      <Tab.Screen
        name="week"
        component={ActivityWeeklyScreen}
        options={{ title: "Tuần", tabBarActiveTintColor:themeValue.isDarkMode ? '#e2e3e7' : 'black'}}
      />
    </Tab.Navigator>
  );
};

export default ActivityDetailScreen;
