import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import MapDraw from "../../components/DrawedMap/MapDraw";
import { useNavigation } from "@react-navigation/native";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/Constants";
import * as Location from "expo-location";
import { BlurView } from "expo-blur";
import imagePath from "../../constants/imagePath";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../../assets/fonts/Fonts";
import Fact from "../../components/Fact";
import Swiper from "react-native-swiper";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function StartPracticeScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: Fonts.Inter_Regular,
    Inter_Medium: Fonts.Inter_Medium,
    Inter_700Bold: Fonts.Inter_Bold,
    Inter_SemiBold: Fonts.Inter_SemiBold,
  });
  if (!fontsLoaded) {
    console.log("Loading...");
  }

  const [steps, setSteps] = useState(0);
  const [isMovingUp, setIsMovingUp] = useState(false);
  const [accelerationThreshold, setAccelerationThreshold] = useState(1);
  const [isStartPractice, setIsStartPractice] = useState(false);

  const [location, setLocation] = useState({});
  const [curPosition, setCurPosition] = useState({
    latitude: 20.9336737,
    longitude: 105.6472619,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [posList, setPosList] = useState([]);
  const [isFirstLocated, setIsFirstLocated] = useState(false);

  const navigation = useNavigation();

  const handleCompletePractice = () => {
    setIsStartPractice(false);
    setSteps(0);
    setPosList([]);
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
  };

  useEffect(() => {
    if (isStartPractice) {
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
  }, [isMovingUp, isStartPractice]);

  useEffect(() => {
    if (isStartPractice) {
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
          if (distance >= 0.04) {
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
  }, [location, isStartPractice]);

  useEffect(() => {
    if (isStartPractice) {
      const interval = setInterval(() => {
        getCurrentLocation();
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isStartPractice]);
  console.log(posList.length);
  return (
    <View style={styles.container}>
      <ImageBackground
        // source={{
        //   uri: "https://i.pinimg.com/736x/b7/ea/6c/b7ea6c2f7f1a5a1e08ee69f3060d6dfe.jpg",
        // }}
        source={imagePath.practiceBgImage}
        style={styles.bgImage}
      >
        {/* <View style={styles.fact}>
          <Fact text={'Đi bộ là một cách tuyệt vời để cải thiện sức khỏe tim mạch, tăng cường sức chịu đựng, đốt cháy calo và là một hình thức hoạt động aerobic'}/>
          <Fact text={'Một người trưởng thành trung bình sẽ đi bộ 65.000 lần trong đời, tương đương với việc đi bộ 3 lần vòng quanh thế giới!'}/>
        </View> */}
        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={5} showsPagination={false}>
          <View style={styles.slide}>
            <Text style={styles.factText}>
              Đi bộ là một cách tuyệt vời để cải thiện sức khỏe tim mạch, tăng
              cường sức chịu đựng, đốt cháy calo và là một hình thức hoạt động
              aerobic
            </Text>
          </View>
          <View style={styles.slide}>
            <View>
              <Text style={styles.factText}>
                Một người trưởng thành trung bình sẽ đi bộ 65.000 lần trong đời,
                tương đương với việc đi bộ 3 lần vòng quanh thế giới
              </Text>
            </View>
          </View>
          <View style={styles.slide}>
            <View>
              <Text style={styles.factText}>
                Đi bộ nhanh thường có tốc độ 3,5 dặm/giờ và có thể giúp bạn tăng
                cường sức chịu đựng, đốt cháy lượng calo dư thừa và tăng cường
                sức khỏe tim mạch
              </Text>
            </View>
          </View>
        </Swiper>
        <View style={styles.blurViewContainer}>
          {/* <BlurView intensity={80} tint="light" style={styles.blurBackground}> */}
          <View style={styles.content}>
            {!isStartPractice && (
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={() => setIsStartPractice(true)}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Inter_Medium",
                    color: "white",
                  }}
                >
                  Bắt đầu tập luyện
                </Text>
              </TouchableOpacity>
            )}
            {isStartPractice && (
              <View style={{ alignItems: "center", justifyContent: 'center' }}>
                <Text>Number of Steps: {steps}</Text>
                <Button title="Reset Steps" onPress={() => setSteps(0)} />
                <TouchableOpacity onPress={() => handleCompletePractice()}>
                  <Text style={{ fontSize: 20, color: "red", padding: 30 }}>
                    Dừng tập luyện
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("MapRoute", {
                      isFirstLocated,
                      posList,
                    })
                  }
                >
                  <Text style={{ fontSize: 20, color: "black", padding: 20 }}>
                    Xem lộ trình di chuyển
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* </BlurView> */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "rgba(23, 23, 23 , 0.6)",
    // backgroundColor: "rgba(251, 101, 66 , 0.7)",
    borderRadius: 30,
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  blurViewContainer: {
    position: "absolute",
    left: 50,
    right: 50,
    bottom: 50,
    height: 50,
  },
  fact: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 80,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    marginTop: 120,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: "25%",
    backgroundColor: "rgba(251, 101, 66 , 0.1)",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 1,
  },
  factText: {
    fontSize: 20,
    textAlign: "center",
    padding: 20,
    color: "#375E97",
  },
});
