import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet , Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
// Screens
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import HomeNavigator from "./src/screens/HomeScreen/HomeNavigator";
import StartPracticeScreenNavigator from "./src/screens/StartPracticeScreen/StartPracticeScreenNavigator";
import SQLite from 'react-native-sqlite-storage'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from "expo-font";
import { Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";

// const db = SQLite.openDatabase('health-care.db')

const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(`SplashScreen preventAutoHideAsync Success ${result}`));

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold
  })
  const onLayoutRoot = useCallback(async() => {
    if(fontsLoaded){
      console.log("Load font successfully");
      await SplashScreen.hideAsync()
      setIsAppReady(true)
    }
  }, [fontsLoaded])
  useEffect(() => {
    async function onLayout(){
      if(fontsLoaded){
        setTimeout(() => {
          SplashScreen.hideAsync()
          setIsAppReady(true)
        }, 5000)
      }
    }
    onLayout()
  }, [fontsLoaded])
  console.log(isAppReady);
  if(!isAppReady){
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRoot}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          color = focused 
              ? '#6495ED'
              : 'gray'
          if(route.name === 'Home'){
            iconName = focused
              ? 'information'
              : 'information'
            return <FontAwesome name="home" size={size} color={color} />
          } else if (route.name === "Practice"){
            return <MaterialCommunityIcons name="electron-framework" size={size} color={color} />
          } else if (route.name === "Empty1"){
            return <FontAwesome name='star-half-empty' size={size} color={color} />
          } else if(route.name === 'User'){
            return <FontAwesome name='user' size={size} color={color} />
          }
        },
        tabBarLabel: ({ focused, color }) => { // Add tabBarLabel
          let label;
          if (route.name === 'Home') {
            if(focused){
              return <Text style={{ color: focused ? '#6495ED' : 'gray', fontSize: 12, fontWeight:'bold'}}>Màn hình chính</Text>
            }
          } else if (route.name === 'Practice') {
            if(focused){
              return <Text style={{ color: focused ? '#6495ED' : 'gray', fontSize: 12, fontWeight:'bold'}}>Practice</Text>;
            }
          } else if (route.name === 'Empty1') {
            if(focused){
              return <Text style={{ color: focused ? '#6495ED' : 'gray', fontSize: 12, fontWeight:'bold'}}>Practice1</Text>;
            }
          } else if (route.name === 'User') {
            if(focused){
              return <Text style={{ color: focused ? '#6495ED' : 'gray', fontSize: 12, fontWeight:'bold'}}>Hồ sơ</Text>;
            }
          }
          return null
        },
        tabBarStyle: {
          backgroundColor: '#F8F8F8', // Màu nền của tabBar
        }
      })}
      >
        <Tab.Screen name='Home' component={HomeNavigator} options={{ headerShown: false}}/>
        <Tab.Screen name='Practice' component={StartPracticeScreenNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name='Empty1' component={HomeScreen} />
        <Tab.Screen name='User' component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
