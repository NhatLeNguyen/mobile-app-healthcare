import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function CountStep({setStepChange}) {
  const [steps, setSteps] = useState(0);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [accelerationThreshold, setAccelerationThreshold] = useState(1);


  useEffect(() => {
    let subscription;
    let lastAccValue = 0;
    
    const handleUpdate = ({x, y , z}) => {
      let curAccValue  = Math.sqrt(x*x + y*y + z*z)
      if (isMovingUp && curAccValue < lastAccValue) {
        setSteps(prevSteps => prevSteps + 1);
        setStepChange(prevSteps => prevSteps + 1)
        setIsMovingUp(false);
      } else if (!isMovingUp && Math.abs(curAccValue-lastAccValue) > accelerationThreshold) {
        setIsMovingUp(true);
      }
      // console.log(Math.abs(curAccValue - lastAccValue));
      lastAccValue = curAccValue;
    };
    
    Accelerometer.setUpdateInterval(100);
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
