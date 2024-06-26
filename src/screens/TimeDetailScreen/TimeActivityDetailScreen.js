import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
// import Slider from '@react-native-community/slider';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DistanceBarChartInfo from "./TimeBarChartInfo";
import DistanceActivityWeeklyScreen from "./TimeActivityWeeklyScreen";

const Tab = createMaterialTopTabNavigator();
const tabIndicatorWidth = 35

const TimeActivityDetailScreen = ({route}) => {
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
        name="time_day"
        component={DistanceBarChartInfo}
        options={{ title: "Ngày" }}
      />
      <Tab.Screen
        name="time_week"
        component={DistanceActivityWeeklyScreen}
        options={{ title: "Tuần" }}
      />
    </Tab.Navigator>
  );
};

export default TimeActivityDetailScreen;
