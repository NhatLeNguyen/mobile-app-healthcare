import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to HEALTH CARE !</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#D400FF",
  },
});
