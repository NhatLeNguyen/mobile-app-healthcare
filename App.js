import React, { useState, useEffect } from "react";
import { View, StyleSheet , Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
// Screens
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import HomeNavigator from "./src/screens/HomeScreen/HomeNavigator";
import UserNavigator from "./src/screens/User/UserNavigator";

import { createNavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/screens/LoginScreen/LoginPage";
import RegisterPage from "./src/screens/RegisterScreen/RegisterPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
  });
  const onLayoutRoot = useCallback(async () => {
    if (fontsLoaded) {
      console.log("Load font successfully");
      await SplashScreen.hideAsync();
      setIsAppReady(true);
    }
  }, [fontsLoaded]);
  useEffect(() => {
    async function onLayout() {
      if (fontsLoaded) {
        setTimeout(() => {
          SplashScreen.hideAsync();
          setIsAppReady(true);
        }, 5000);
      }
    }
    onLayout();
  }, [fontsLoaded]);
  console.log(isAppReady);
  if (!isAppReady) {
    return null;
  }
  return (
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
          } else if (route.name === "Empty"){
            return <FontAwesome name='star-half-empty' size={size} color={color} />
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
          } else if (route.name === 'Empty') {
            if(focused){
              return <Text style={{ color: focused ? '#6495ED' : 'gray', fontSize: 12, fontWeight:'bold'}}>Empty</Text>;
            }
          } else if (route.name === 'Empty1') {
            if(focused){
              return <Text style={{ color: focused ? '#6495ED' : 'gray', fontSize: 12, fontWeight:'bold'}}>Empty1</Text>;
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
        <Tab.Screen name='Home' component={HomeNavigator} options={{ headerShown: false }}/>
        <Tab.Screen name='Empty' component={HomeScreen} />
        <Tab.Screen name='Empty1' component={HomeScreen} />
        <Tab.Screen name='User' component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
