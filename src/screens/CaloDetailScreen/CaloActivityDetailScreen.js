import React, { useContext, useState } from "react";
import { View, Text, Dimensions } from "react-native";
// import Slider from '@react-native-community/slider';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CaloActivityWeeklyScreen from "./CaloActivityWeeklyScreen";
import CaloBarChartInfo from "./CaloBarChartInfo";
import { ThemeContext } from "../MainScreen/ThemeProvider";

const Tab = createMaterialTopTabNavigator();
const tabIndicatorWidth = 35

const CaloActivityDetailScreen = ({route}) => {
  const themeValue = useContext(ThemeContext)
  const paddingLeft = (Dimensions.get('screen').width / 2 - tabIndicatorWidth) /2
  return (
    <Tab.Navigator
      initialRouteName={route.params ? route.params.name :'calo_day'}
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
            // backgroundColor:'white'
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
        name="calo_day"
        component={CaloBarChartInfo}
        options={{ title: "Ngày", tabBarActiveTintColor:themeValue.isDarkMode ? '#e2e3e7' : 'black' }}
      />
      <Tab.Screen
        name="calo_week"
        component={CaloActivityWeeklyScreen}
        options={{ title: "Tuần", tabBarActiveTintColor:themeValue.isDarkMode ? '#e2e3e7' : 'black' }}
      />
    </Tab.Navigator>
  );
};

export default CaloActivityDetailScreen;
