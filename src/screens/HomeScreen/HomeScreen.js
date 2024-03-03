import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CircleWithPercentage from "../../components/CircleWithPercentage";
import HomeHeader from "./HomeHeader";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeHeader />
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
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "red",
                padding: 15,
              }}
              onPress={() => console.log("Hehe")}
            >
              <FontAwesome name="heartbeat" size={17} color={"green"} />
              <Text style={{ marginLeft: 5, fontSize: 18 }}>Điểm nhịp tim</Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 6,
                padding: 15,
              }}
              onPress={() => console.log("Hehe")}
            >
              <Ionicons name="footsteps" size={18} color={"blue"} />
              <Text style={{ marginLeft: 5, fontSize: 18 }}>Bước</Text>
            </Pressable>
          </View>

          <View style={{flexDirection: "row" }}>
            <Pressable
              style={styles.pressAble}
              onPress={() => console.log("Hehe")}
            >
              <Text style={styles.number}>{1226/1000}</Text>
              <Text style={styles.subText}>Calo</Text>
            </Pressable>

            <Pressable
              style={styles.pressAble}
              onPress={() => console.log("Hehe")}
            >
              <Text style={styles.number}>{0.68}</Text>
              <Text style={styles.subText}>Km</Text>
            </Pressable>
            
            <Pressable
              style={styles.pressAble}
              onPress={() => console.log("Hehe")}
            >
              <Text style={styles.number}>23</Text>
              <Text style={styles.subText}>Phút vận động</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
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
    fontSize: 18,
    color: '#3c4043',
    textAlign: 'center'
  }
});
