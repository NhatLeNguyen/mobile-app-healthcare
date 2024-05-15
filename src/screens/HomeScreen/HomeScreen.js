import React, { Component, useContext } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, RefreshControl } from "react-native";
import CircleWithPercentage from "../../components/CircleWithPercentage";
import HomeHeader from "./HomeHeader";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HomeCircleInfo from "./HomeCircleInfo";
import HomeBody from "./HomeBody";
import { useState,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../MainScreen/ThemeProvider";
const LIST = "ABCDEFGHIJKLMNOPURSTUVWXYZ0123456789"

function HomeScreen() {
  const contextValue = useContext(ThemeContext);
  const isDarkMode = contextValue.isDarkMode
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.navigate('HomeScreen')
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  console.log('Refresh');
  return (
    <ScrollView style={[styles.container, {backgroundColor: isDarkMode ? '#202125': '#f2f2f2'}]} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
    }>
      <HomeHeader isRefresh={refreshing}/>
      <HomeCircleInfo isRefresh={refreshing}/>
      <HomeBody isRefresh={refreshing}/>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#f2f2f2',
    // backgroundColor:'black'
  },
  circleContainer: {
    marginTop: 60,
    alignItems: "center",
  },
});

export default HomeScreen;
