import React, { Component, useEffect, useState } from "react";
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
import { getFormatedDate } from "react-native-modern-datepicker";
const db = SQLite.openDatabaseAsync("health-care.db");

function HomeCircleInfo({isRefresh}) {
  const [isPressedHeart, setIsPressHeart] = useState(false);
  const [isPressedStep, setIsPressStep] = useState(false);
  const [isPressedCalo, setIsPressCalo] = useState(false);
  const [isPressedDistance, setIsPressDistance] = useState(false);
  const [isPressedTime, setIsPressTime] = useState(false);
  const [today, setToday] = useState(new Date());
  const [stepsToday, setStepsToday] = useState(0);
  const [distanceToday, setDistanceToday] = useState(0);
  const [calorisToday, setCalorisToday] = useState(0);
  const [practiceTime, setPracticeTime] = useState(0);

  const deleteRow = async () => {
    // console.log("Delete row ...");
    // (await db).runSync('delete from practicehistory');
  };
  useEffect(() => {
    const loading = async () => {
      let secondTime = 0;
      const results = (await db).getAllSync(
        "SELECT sum(steps) as steps, sum(distances) as distances,sum(caloris) as caloris FROM `practicehistory` WHERE date = ? GROUP BY DATE",
        [getFormatedDate(today, "YYYY-MM-DD")]
      );
      const results1 = (await db).getAllSync(
        "SELECT practice_time FROM `practicehistory` WHERE date = ?",
        [getFormatedDate(today, "YYYY-MM-DD")]
      );
      // console.log(results1);
      for (const row of results1){
        let [minute, second] = row.practice_time.split(':')
        secondTime += parseInt(minute) * 60 + parseInt(second)
      }
      if(results.length != 0){
        setPracticeTime(parseInt(secondTime / 60))
        setStepsToday(results[0].steps);
        setDistanceToday(results[0].distances)
        setCalorisToday(results[0].caloris)
      }
    };
    loading();
  }, [today, isRefresh]);

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
        textSize={40}
      />
      <CircleWithPercentage
        diameter={180}
        color="#184ea6"
        restColor="#dfe7f3"
        value={stepsToday}
        MAX_VALUE={500}
        paddingCircle={20}
        paddingText={95}
        textSize={28}
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
          onPress={() => navigation.navigate('CaloActivityDetailPerDay')}
          onPressIn={() => setIsPressCalo(true)}
          onPressOut={() => setIsPressCalo(false)}
        >
          <Text style={styles.number}>{calorisToday > 1000 ? calorisToday / 1000 : calorisToday}</Text>
          <Text style={styles.subText}>Calo</Text>
        </Pressable>

        <Pressable
          style={[styles.pressAble, isPressedDistance && styles.pressedButton]}
          onPress={() => navigation.navigate('DistanceActivityDetailPerDay')}
          onPressIn={() => setIsPressDistance(true)}
          onPressOut={() => setIsPressDistance(false)}
        >
          <Text style={styles.number}>{distanceToday.toFixed(2)}</Text>
          <Text style={styles.subText}>Km</Text>
        </Pressable>

        <Pressable
          style={[styles.pressAble, isPressedTime && styles.pressedButton]}
          onPress={() => deleteRow()}
          onPressIn={() => setIsPressTime(true)}
          onPressOut={() => setIsPressTime(false)}
        >
          <Text style={styles.number}>{practiceTime}</Text>
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
