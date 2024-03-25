import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import CircleWithPercentage from "../../components/CircleWithPercentage";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import Fonts from "../../constants/Fonts";
import { useNavigation } from "@react-navigation/native";
import * as SQLite from "expo-sqlite/next";
const db = SQLite.openDatabaseAsync("health-care.db");

function HomeCircleInfo() {
  const [isPressedHeart, setIsPressHeart] = useState(false);
  const [isPressedStep, setIsPressStep] = useState(false);
  const [isPressedCalo, setIsPressCalo] = useState(false);
  const [isPressedDistance, setIsPressDistance] = useState(false);
  const [isPressedTime, setIsPressTime] = useState(false);
  const useDatabase =async () => {
    // console.log("Inserting ...");
    // (await db).runSync('insert into practicehistory(user_id, start_time, end_time, date, steps, distances, practice_time, caloris, posList) values(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // ['1', '00:01:23', '00:01:23', '2024-03-19', '50', '0', '1:49', '1', '[{\"latitude\":20.9336862,\"longitude\":105.6472441,\"latitudeDelta\":0.01,\"longitudeDelta\":0.01}]'])
    // console.log("Inserting success!!");
  };
  const checkDB =async () => {
    console.log("Checking ...");
    const allRows = (await db).getAllSync('select * from practicehistory');
    for (const row of allRows){
      console.log(row);
    }
    console.log(allRows.length);
  };
  const deleteRow = async () => {
    // console.log("Delete row ...");
    // (await db).runSync('delete from practicehistory');
  }

  const navigation = useNavigation();
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
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              padding: 15,
            },
            isPressedHeart && styles.pressedButton,
          ]}
          onPress={() => console.log("Hehe")}
          onPressIn={() => setIsPressHeart(true)}
          onPressOut={() => setIsPressHeart(false)}
        >
          <FontAwesome name="heartbeat" size={16} color={"green"} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              fontFamily: "Inter_500Medium",
            }}
          >
            Điểm nhịp tim
          </Text>
        </Pressable>

        <Pressable
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 6,
              padding: 15,
            },
            isPressedStep && styles.pressedButton,
          ]}
          onPress={() => navigation.navigate("ActivityDetail")}
          onPressIn={() => setIsPressStep(true)}
          onPressOut={() => setIsPressStep(false)}
        >
          <Ionicons name="footsteps" size={16} color={"blue"} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              fontFamily: "Inter_500Medium",
            }}
          >
            Bước
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={[styles.pressAble, isPressedCalo && styles.pressedButton]}
          onPress={() => useDatabase()}
          onPressIn={() => setIsPressCalo(true)}
          onPressOut={() => setIsPressCalo(false)}
        >
          <Text style={styles.number}>{1226 / 1000}</Text>
          <Text style={styles.subText}>Calo</Text>
        </Pressable>

        <Pressable
          style={[styles.pressAble, isPressedDistance && styles.pressedButton]}
          onPress={() => checkDB()}
          onPressIn={() => setIsPressDistance(true)}
          onPressOut={() => setIsPressDistance(false)}
        >
          <Text style={styles.number}>{0.68}</Text>
          <Text style={styles.subText}>Km</Text>
        </Pressable>

        <Pressable
          style={[styles.pressAble, isPressedTime && styles.pressedButton]}
          onPress={() => deleteRow()}
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
    color: "#1a9be8",
    fontWeight: "bold",
  },
  pressAble: {
    alignItems: "center",
    padding: 15,
    // backgroundColor: 'red',
    width: 105,
  },
  subText: {
    fontSize: 16,
    color: "#3c4043",
    textAlign: "center",
  },
  pressedButton: {
    backgroundColor: "#ECECEC",
  },
});
export default HomeCircleInfo;
