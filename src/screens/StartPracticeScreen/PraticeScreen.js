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
import * as SQLite from "expo-sqlite/next";

const db = SQLite.openDatabaseAsync("health-care.db");

const MUSIC_INDEX_DEFAULT = 0;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

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
  const [isMusicModalVisible, setIsMusicModalVisible] = useState(false);
  const [choosenSong, setChoosenSong] = useState();
  const [isChangedMusic, setIsChangedMusic] = useState(false);
  const [sound, setSound] = useState();
  const [musicTextInput, setMusicTextInput] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [isLoadedMusicList, setIsLoadedMusicList] = useState(0);
  const navigation = useNavigation();
  const [musicSearched, setMusicSearched] = useState([]);

  const [date, setDate] = useState(new Date());
  // cosnt [startTime, setStartTime] = useState(new Date())
  // console.log(choosenSong);
  useEffect(() => {
    if (isLoadedMusicList == 0) {
      console.log("vllll");
      NhacCuaTui.getTop100("m3liaiy6vVsF").then(async (response) => {
        for (let i = 0; i < response.playlist.songs.length; i++) {
          let info = response.playlist.songs[i];
          let key = info["key"];
          let name = info["title"];
          let thumbnail = info["thumbnail"];
          let artists = "";
          for (let j = 0; j < info.artists.length; j++) {
            artists += info.artists[j].name;
            if (j < info.artists.length - 1) {
              artists += ", ";
            }
          }
          let song_url = "";
          await NhacCuaTui.getSong(key).then((data) => {
            if (data.song.streamUrls.length > 0) {
              song_url = data.song.streamUrls[0].streamUrl;
            }
          });
          if (song_url !== "") {
            setMusicList((prev) => [
              ...prev,
              {
                key: key,
                name: name,
                thumbnail: thumbnail,
                artists: artists,
                url: song_url,
              },
            ]);
          }
          if( i == 1 & song_url !== ""){
            setChoosenSong(prev => ({key: key,name: name,thumbnail: thumbnail,artists: artists,url: song_url}))
          }
        }
      });
      setIsLoadedMusicList(1);
    }
  }, []);
  const handleCompletePractice = () => {
    if (isFirstLocated) {
      const loading = async () => {
        console.log("Saving...");
        console.log([
          "1",
          getFormatedDate(date, "hh:mm:ss"),
          getFormatedDate(new Date(), "hh:mm:ss"),
          getFormatedDate(date, "YYYY-MM-DD"),
          steps,
          totalDistance,
          minute + ":" + second,
          5.0,
          JSON.stringify(posList)
        ]);
        (await db).runSync(
          "insert into practicehistory(user_id, start_time, end_time, date, steps, distances, practice_time, caloris, posList) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            "1",
            getFormatedDate(date, "hh:mm:ss"),
            getFormatedDate(new Date(), "hh:mm:ss"),
            getFormatedDate(date, "YYYY-MM-DD"),
            steps,
            totalDistance,
            minute + ":" + second,
            5.0,
            JSON.stringify(posList)
          ]
        );
        console.log("Saving successfully");
      };

      loading();
    }
  };
  const handleSearchMusic = () => {
    let list = [];
    if (musicTextInput.length > 0) {
      NhacCuaTui.searchByKeyword(musicTextInput).then(async (response) => {
        console.log(response);
        for (let i = 0; i < response.search.song.song.length; i++) {
          let info = response.search.song.song[i];
          let key = info["key"];
          let name = info["title"];
          let thumbnail = info["thumbnail"];
          let artists = "";
          for (let j = 0; j < info.artists.length; j++) {
            artists += info.artists[j].name;
            if (j < info.artists.length - 1) {
              artists += ", ";
            }
          }
          let song_url = "";
          await NhacCuaTui.getSong(key).then((data) => {
            if (data.status == "success") {
              if (data.song.streamUrls.length > 0) {
                song_url = data.song.streamUrls[0].streamUrl;
              }
            }
          });
          if (song_url !== "") {
            list.push({
              key: key,
              name: name,
              thumbnail: thumbnail,
              artists: artists,
              url: song_url,
            });
          }
        }
      });
      console.log("list: ", list);
      setMusicSearched(list);
    }
  };
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
  }, [location, isPlayed]);

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
      <Modal
        transparent
        animationType="fade"
        visible={isMusicModalVisible}
        // style={{height: 80, flex: 0.5 }}
        onRequestClose={() => setIsMusicModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 50,
            // backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <View
            style={{
              width: "90%",
              height: "70%",
              padding: 20,
              borderRadius: 20,
              backgroundColor: "rgb(6,6,6)",
              borderWidth: 1,
              // borderColor: '#bfd474',
              borderColor: "white",
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 25,
              }}
            >
              <TextInput
                style={{
                  backgroundColor: "white",
                  // marginTop: 20,
                  height: 40,
                  borderRadius: 20,
                  paddingLeft: 20,
                  justifyContent: "center",
                  color: "#0092CC",
                  width: "95%",
                }}
                placeholderTextColor={"#0092CC"}
                value={musicTextInput}
                onChangeText={setMusicTextInput}
                placeholder="Search music ..."
              />
              <MaterialIcons
                name="navigate-next"
                size={30}
                color="#0092CC"
                onPress={() => handleSearchMusic()}
              />
            </View>
            <MusicList
              listMusic={
                musicSearched.length != 0
                  ? musicSearched.slice(0, 25)
                  : musicList.slice(0, 25)
              }
              onChange={setChoosenSong}
              onClose={setIsMusicModalVisible}
              isChanged={setIsChangedMusic}
            />
            <Pressable
              style={{ top: 8, right: 8, position: "absolute" }}
              onPress={() => setIsMusicModalVisible(false)}
            >
              <Ionicons name="close" size={25} color="gray" />
            </Pressable>
          </View>
        </View>
      </Modal>
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
        {/* {!choosenSong && (
    
        )} */}
        {/* {console.log(choosenSong)} */}
        {choosenSong &&
        <MusicPlayer
          image={choosenSong.thumbnail}
          name={capitalizeFirstLetter(choosenSong.name)}
          author={choosenSong.artists}
          song={choosenSong.url}
          isChanged={isChangedMusic}
          setIsChanged={setIsChangedMusic}
          s={sound}
          setS={setSound}
        />
        }
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
          <Text style={styles.headerText}>Step/minute:</Text>
          <Text style={styles.infoText}>
            {Math.ceil(steps / (minute + 1))}
            <Text style={styles.subText}> steps/m</Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonList}>
        {/* <AntDesign name="pausecircle" size={70} color="#bfd474" /> */}
        {/* <FontAwesome name="pause-circle" size={70} color="#bfd474" /> */}
        <MaterialIcons
          name="my-library-music"
          size={40}
          color="white"
          onPress={() => setIsMusicModalVisible(true)}
        />
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
          onPress={() => {
            sound.unloadAsync();
            navigation.navigate("TapLuyen");
            handleCompletePractice();
          }}
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
