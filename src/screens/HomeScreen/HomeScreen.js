import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import CircleWithPercentage from "../../components/CircleWithPercentage";
import HomeHeader from "./HomeHeader";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HomeCircleInfo from "./HomeCircleInfo";
import HomeBody from "./HomeBody";

export default class HomeScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <HomeHeader />
        <HomeCircleInfo />
        <HomeBody />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {},
  circleContainer: {
    marginTop: 60,
    alignItems: "center",
  },
});
