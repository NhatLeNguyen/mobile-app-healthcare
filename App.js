import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppNavigator from "./src/screens/AppNavigator";
export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
