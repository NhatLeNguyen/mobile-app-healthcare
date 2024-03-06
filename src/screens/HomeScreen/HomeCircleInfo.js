import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import CircleWithPercentage from "../../components/CircleWithPercentage";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../../assets/fonts/Fonts";
import { useNavigation } from "@react-navigation/native";

function HomeCircleInfo() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: Fonts.Inter_Regular,
    Inter_Medium: Fonts.Inter_Medium,
    Inter_700Bold: Fonts.Inter_Bold,
  });
  if (!fontsLoaded) {
    console.log("Loading...");
  }
  const [isPressedHeart , setIsPressHeart] = useState(false)
  const [isPressedStep , setIsPressStep] = useState(false)
  const [isPressedCalo , setIsPressCalo] = useState(false)
  const [isPressedDistance , setIsPressDistance] = useState(false)
  const [isPressedTime , setIsPressTime] = useState(false)

  const navigation = useNavigation()
    return ( 
        <View style={styles.circleContainer}>
          <CircleWithPercentage
            diameter={220}
            color="#00c3a6"
            restColor="#c8f2ec"
            value={50}
            MAX_VALUE={1000}
            paddingCircle={0}
            paddingText={60}
            textSize={45}
          />
          <CircleWithPercentage
            diameter={180}
            color="#184ea6"
            restColor="#dfe7f3"
            value={500}
            MAX_VALUE={1000}
            paddingCircle={20}
            paddingText={90}
            textSize={30}
          />
          <View style={{ paddingTop: 220, flexDirection: "row" }}>
            <Pressable
              style={[{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }, isPressedHeart && styles.pressedButton]}
              onPress={() => console.log("Hehe")}
              onPressIn={() => setIsPressHeart(true)}
              onPressOut={() => setIsPressHeart(false)}
            >
              <FontAwesome name="heartbeat" size={16} color={"green"} />
              <Text style={{ marginLeft: 5, fontSize: 16, fontFamily:'Inter_Medium'}}>Điểm nhịp tim</Text>
            </Pressable>

            <Pressable
              style={[{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 6,
                padding: 15,
              }, isPressedStep && styles.pressedButton]}
              onPress={() => navigation.navigate('ActivityDetail')}
              onPressIn={() => setIsPressStep(true)}
              onPressOut={() => setIsPressStep(false)}
            >
              <Ionicons name="footsteps" size={16} color={"blue"} />
              <Text style={{ marginLeft: 5, fontSize: 16, fontFamily:'Inter_Medium'}}>Bước</Text>
            </Pressable>
          </View>

          <View style={{flexDirection: "row" }}>
            <Pressable
              style={[styles.pressAble,isPressedCalo && styles.pressedButton]}
              onPress={() => console.log("Hehe")}
              onPressIn={() => setIsPressCalo(true)}
              onPressOut={() => setIsPressCalo(false)}
            >
              <Text style={styles.number}>{1226/1000}</Text>
              <Text style={styles.subText}>Calo</Text>
            </Pressable>

            <Pressable
              style={[styles.pressAble,isPressedDistance && styles.pressedButton]}
              onPress={() => console.log("Hehe")}
              onPressIn={() => setIsPressDistance(true)}
              onPressOut={() => setIsPressDistance(false)}
            >
              <Text style={styles.number}>{0.68}</Text>
              <Text style={styles.subText}>Km</Text>
            </Pressable>
            
            <Pressable
              style={[styles.pressAble, isPressedTime && styles.pressedButton]}
              onPress={() => console.log("Hehe")}
              onPressIn={() => setIsPressTime(true)}
              onPressOut={() => setIsPressTime(false)}
            >
              <Text style={styles.number}>23</Text>
              <Text style={styles.subText}>Phút vận động</Text>
            </Pressable>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    circleContainer: {
      marginTop: 60,
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      color: "#D400FF",
    },
    number: {
      fontSize: 18,
      color: '#1a9be8',
      fontWeight: 'bold'
    },
    pressAble: {
      alignItems: "center",
      padding: 15,
      // backgroundColor: 'red',
      width: 105
    },
    subText: {
      fontSize: 16,
      color: '#3c4043',
      textAlign: 'center'
    },
    pressedButton: {
      backgroundColor: '#ECECEC'
    }
  });
export default HomeCircleInfo;