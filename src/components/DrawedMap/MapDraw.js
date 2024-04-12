import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import { GOOGLE_MAP_KEY } from "./GOOGLE_MAP_KEY";
import * as Location from "expo-location";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../constants/Constants";
import Route from "./Route";

export default function MapDraw({isFirstLocated, posList}) {
//   const [location, setLocation] = useState({});
//   const [curPosition, setCurPosition] = useState({
//     latitude: 20.9336737,
//     longitude: 105.6472619,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   });
//   const [posList_, setPosList] = useState([]);
//   const [isFirstLocated_, setIsFirstLocated] = useState(false);
// const {isFirstLocated, posList} = route.params

//   const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => {
//       return deg * (Math.PI / 180);
//     };

//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1); // deg2rad below
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) *
//         Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const d = R * c; // Distance in km
//     return d;
//   };
//   const getCurrentLocation = () => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc);
//       setCurPosition({
//         ...curPosition,
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//       });
//     })();
//   };
//   useEffect(() => {
//     if ((posList.length === 0) & (Object.keys(location).length > 0)) {
//       if (Object.keys(location.coords).length > 0) {
//         console.log("Starting Locate ...");
//         setPosList((lastposList) => [
//           ...lastposList,
//           {
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           },
//         ]);
//         setIsFirstLocated(true);
//       }
//     }
//     if ((posList.length >= 1) & (Object.keys(location).length > 0)) {
//       if (Object.keys(location.coords).length > 0) {
//         let distance = getDistanceFromLatLonInKm(
//           posList[posList.length - 1].latitude,
//           posList[posList.length - 1].longitude,
//           location.coords.latitude,
//           location.coords.longitude
//         );
//         console.log(distance);
//         if (distance >= 0.04) {
//           setPosList((lastposList) => [
//             ...lastposList,
//             {
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//               latitudeDelta: LATITUDE_DELTA,
//               longitudeDelta: LONGITUDE_DELTA,
//             },
//           ]);
//         }
//       }
//     }
//   }, [location]);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       getCurrentLocation();
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);
  return (
    <View style={styles.container}>
      {!isFirstLocated && (
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 50}}>
          <Text style={{ fontSize: 20, fontWeight:'bold'}}>Waiting to locate ...</Text>
        </View>
      )}
      {isFirstLocated && (
        <MapView mapPadding={100} style={[StyleSheet.absoluteFill,{flex: 1}]} initialRegion={posList[0]}>
          <Route posList={posList} />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    // height: '50%',
    // borderRadius: 100
  },
});
