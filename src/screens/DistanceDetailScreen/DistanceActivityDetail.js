import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { IP, LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/Constants";
// import Route from "../../components/DrawedMap/Route";
import MapDraw from "../../components/DrawedMap/MapDraw";
import { Accelerometer } from "expo-sensors";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import MusicList from "../../components/MusicList/MusicList";
import { musicData } from "../../components/MusicList/MusicData";
import NhacCuaTui from "nhaccuatui-api-full";
import axios from "axios";
import { getFormatedDate } from "react-native-modern-datepicker";
const MUSIC_INDEX_DEFAULT = 0;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function DistanceDailyDetail({ route }) {
  const data = route.params.data;
  return (
    <View style={styles.container}>
      <View style={{ height: "50%" }}>
        <MapDraw isFirstLocated={true} posList={data.posList} />
      </View>
      
      <View style={[{marginTop: 50},styles.info]}>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>AVG Speed</Text>
          <Text style={styles.infoText}>
            {(data.totalDistance / (data.minute / 60 + data.second / 3600)).toFixed(1)}
            <Text style={styles.subText}> km/h</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Distance</Text>
          <Text style={styles.infoText}>
            {Math.ceil(data.totalDistance * 1000) > 1000
              ? Math.ceil(data.totalDistance * 1000) / 1000
              : Math.ceil(data.totalDistance * 1000)}
            <Text style={styles.subText}> m</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Calories</Text>
          <Text style={styles.infoText}>
            {data.calories}
            <Text style={styles.subText}> kcal</Text>
          </Text>
        </View>
      </View>
      <View style={[{marginTop: 10},styles.info]}>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Time</Text>
          <Text style={styles.infoText}>
            {data.minute < 10 && <Text>0{data.minute}</Text>}
            {data.minute >= 10 && <Text>{data.minute}</Text>}:
            {data.second < 10 && <Text>0{data.second}</Text>}
            {data.second >= 10 && <Text>{data.second}</Text>}
            {/* <Text style={styles.subText}> km/h</Text> */}
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Steps</Text>
          <Text style={styles.infoText}>
            {data.steps}
            <Text style={styles.subText}> steps</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Step/minute:</Text>
          <Text style={styles.infoText}>
            {Math.ceil(data.steps / (data.minute * 60 + data.second))}
            <Text style={styles.subText}> steps/s</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DistanceDailyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // justifyContent: 'center'
    // alignItems: 'center'
  },
  music: {
    backgroundColor: "#171717",
    height: "8%",
    margin: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flexDirection: "row",
    padding: 10,
  },
  infoBlock: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    marginLeft: 10,
  },
  headerText: {
    color: "white",
    fontSize: 13,
  },
  subText: {
    fontSize: 12,
  },
  infoText: {
    color: "green",
    fontSize: 32,
  },
  buttonList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
