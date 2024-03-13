import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/Constants";
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

function PracticeScreen() {
  const [steps, setSteps] = useState(0);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [accelerationThreshold, setAccelerationThreshold] = useState(1);
  const [isStartPractice, setIsStartPractice] = useState(false);
  const [isPlayed, setIsPlayed] = useState(true);

  const [location, setLocation] = useState({});
  const [curPosition, setCurPosition] = useState({
    latitude: 20.9336737,
    longitude: 105.6472619,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [posList, setPosList] = useState([]);
  const [isFirstLocated, setIsFirstLocated] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);
  const [second, setSecond] = useState(1);
  const [minute, setMinute] = useState(0);

  const navigation = useNavigation();

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  const getCurrentLocation = () => {
    if (isPlayed) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        setCurPosition({
          ...curPosition,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      })();
    }
  };
  useEffect(() => {
    if (isPlayed) {
      let subscription;
      let lastAccValue = 0;

      const handleUpdate = ({ x, y, z }) => {
        let curAccValue = Math.sqrt(x * x + y * y + z * z);
        if (isMovingUp && curAccValue < lastAccValue) {
          setSteps((prevSteps) => prevSteps + 1);
          setIsMovingUp(false);
        } else if (
          !isMovingUp &&
          Math.abs(curAccValue - lastAccValue) > accelerationThreshold
        ) {
          setIsMovingUp(true);
        }
        lastAccValue = curAccValue;
      };

      Accelerometer.setUpdateInterval(100);
      subscription = Accelerometer.addListener(handleUpdate);

      return () => {
        subscription && subscription.remove();
      };
    }
  }, [isMovingUp, isPlayed]);

  useEffect(() => {
    if (isPlayed) {
      if ((posList.length === 0) & (Object.keys(location).length > 0)) {
        if (Object.keys(location.coords).length > 0) {
          console.log("Starting Locate ...");
          setPosList((lastposList) => [
            ...lastposList,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
          ]);
          setIsFirstLocated(true);
        }
      }
      if ((posList.length >= 1) & (Object.keys(location).length > 0)) {
        if (Object.keys(location.coords).length > 0) {
          let distance = getDistanceFromLatLonInKm(
            posList[posList.length - 1].latitude,
            posList[posList.length - 1].longitude,
            location.coords.latitude,
            location.coords.longitude
          );
          console.log(distance);
          if (distance >= 0.03) {
            setTotalDistance((prev) => prev + distance);
            setPosList((lastposList) => [
              ...lastposList,
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
            ]);
          }
        }
      }
    }
  }, [location,isPlayed]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const intervalSecond = setInterval(() => {
      if (isPlayed && isFirstLocated) {
        setSecond((prevSecond) => {
          if (prevSecond < 59) {
            return prevSecond + 1;
          } else {
            // Khi second đạt 59, reset second và tăng minute.
            setMinute((prevMinute) => prevMinute + 1);
            return 0;
          }
        });
      }
    }, 1200);
    return () => clearInterval(intervalSecond);
  }, [isPlayed, isFirstLocated]);

  // console.log(posList.length);
  return (
    <View style={styles.container}>
      <View style={{ height: "50%" }}>
        {!isFirstLocated && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
                color: "white",
              }}
            >
              Waiting to locate ...
            </Text>
            <ActivityIndicator
              size={"large"}
              color="#6495ED"
              style={{ paddingRight: 20 }}
            />
          </View>
        )}
        {isFirstLocated && <MapDraw isFirstLocated={true} posList={posList} />}
      </View>
      <View style={styles.music}>
        <MusicPlayer name={'Đoạn tuyệt nàng đi'} author={'Phát Huy'}/>
      </View>
      <View style={styles.info}>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>AVG Speed</Text>
          <Text style={styles.infoText}>
            {(totalDistance / (minute / 60 + second / 3600)).toFixed(1)}
            <Text style={styles.subText}> km/h</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Distance</Text>
          <Text style={styles.infoText}>
            {Math.ceil(totalDistance * 1000) > 1000
              ? Math.ceil(totalDistance * 1000) / 1000
              : Math.ceil(totalDistance * 1000)}
            <Text style={styles.subText}> m</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Calories</Text>
          <Text style={styles.infoText}>
            580
            <Text style={styles.subText}> kcal</Text>
          </Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Time</Text>
          <Text style={styles.infoText}>
            {minute < 10 && <Text>0{minute}</Text>}
            {minute >= 10 && <Text>{minute}</Text>}:
            {second < 10 && <Text>0{second}</Text>}
            {second >= 10 && <Text>{second}</Text>}
            {/* <Text style={styles.subText}> km/h</Text> */}
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Steps</Text>
          <Text style={styles.infoText}>
            {steps}
            <Text style={styles.subText}> steps</Text>
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.headerText}>Step/second:</Text>
          <Text style={styles.infoText}>
            {Math.ceil(steps / (minute * 60 + second))}
            <Text style={styles.subText}> steps/s</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonList}>
        {/* <AntDesign name="pausecircle" size={70} color="#bfd474" /> */}
        {/* <FontAwesome name="pause-circle" size={70} color="#bfd474" /> */}
        <MaterialIcons name="my-library-music" size={40} color="white" />
        {isPlayed && (
          <Ionicons
            name="pause-circle-sharp"
            size={80}
            color="#bfd474"
            style={{ marginLeft: 40, marginRight: 40 }}
            onPress={() => setIsPlayed(false)}
          />
        )}
        {!isPlayed && (
          <Ionicons
            name="play-circle-sharp"
            size={80}
            color="#0092CC"
            style={{ marginLeft: 40, marginRight: 40 }}
            onPress={() => setIsPlayed(true)}
          />
        )}
        <AntDesign
          name="scan1"
          size={40}
          color="white"
          onPress={() => navigation.navigate("TapLuyen")}
        />
      </View>
    </View>
  );
}

export default PracticeScreen;

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
    // margin: 20,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    marginLeft: 10,
  },
  headerText: {
    color: "white",
    fontSize: 11,
  },
  subText: {
    fontSize: 10,
  },
  infoText: {
    color: "white",
    fontSize: 30,
  },
  buttonList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
