import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [steps, setSteps] = useState(0);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [accelerationThreshold, setAccelerationThreshold] = useState(1.5);

  useEffect(() => {
    let subscription;
    let lastY = 0;

    const handleUpdate = ({ y }) => {
      if (isMovingUp && y < lastY) {
        setSteps((prevSteps) => prevSteps + 1);
        setIsMovingUp(false);
      } else if (!isMovingUp && y > lastY + accelerationThreshold) {
        setIsMovingUp(true);
      }

      lastY = y;
    };

    Accelerometer.setUpdateInterval(100); // Đặt khoảng thời gian cập nhật
    subscription = Accelerometer.addListener(handleUpdate);

    return () => {
      subscription && subscription.remove();
    };
  }, [isMovingUp]);

  return (
    <View style={styles.container}>
      <Text>Number of Steps: {steps}</Text>
      <Button title="Reset Steps" onPress={() => setSteps(0)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
