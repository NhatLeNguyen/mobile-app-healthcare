import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from 'expo-camera';
import {
  Camera,
  CameraType,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";
import { CameraView } from "expo-camera/next";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";

function CameraHeart() {
  const cameraRef = useRef(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [capturedFrames, setCapturedFrames] = useState([]);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [heartRate, setHeartRate] = useState(0);
    const [imageUrl, setImageUrl] = useState();
    const [frames, setFrames] = useState([]);
    const [rgbMatrix, setRgbMatrix] = useState(null);
  // useEffect(() => {
  //   const loading =async () => {
  //     await requestCameraPermissionsAsync()
  //     const granted = await getCameraPermissionsAsync();
  //     console.log(granted);
  //   }
  //   loading()
  // },[])
  const takePicture = async () => {};

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  //   const processFrames = async (videoUri) => {
  //     try {

  //       const url = await VideoThumbnails.getThumbnailAsync(videoUri, { time: 4500 });
  //       setImageUrl(url["uri"])
  //     } catch (err) {
  //       console.error("Failed to exact frames:", err);
  //     }
  //   };
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    if (frame.pixelFormat === 'rgb') {
      const buffer = frame.toArrayBuffer()
      const data = new Uint8Array(buffer)
      console.log("???");
      console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
    }
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 120,
          overflow: "hidden",
        }}
      >
        <Camera
          ref={cameraRef}
          device={device}
          style={{ height: 50, width: 50 }}
            frameProcessor={frameProcessor}
          isActive={true}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
        onPress={() => processFrame()}
      >
        <Text>Lưu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          processFrames(
            "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FDemoRN-45abfef4-1c02-4d7e-b05f-a6aaec65f549/Camera/8bf4c205-6f72-4ae6-ac51-f1072a1d937a.mp4"
          )
        }
      >
        <Text>Caculate heart rate</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CameraHeart;

const styles = StyleSheet.create({
  camera: {
    // flex: 1,
    // borderRadius: 50,
    height: 50,
    width: 50,
  },
});
