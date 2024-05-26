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
// import { Camera } from 'expo-camera';
import {
  Camera,
  CameraType,
  getCameraPermissionsAsync,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";
// import { Camera } from "react-native-vision-camera";
import { CameraView } from "expo-camera/next";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library'
import {firebase,storage } from '../../../firebaseConfig.js';
import axios from "axios";

function CameraComponent() {
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);
  const [capturedFrames, setCapturedFrames] = useState([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [frames, setFrames] = useState([]);
  const [rgbMatrix, setRgbMatrix] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [heartRate, setHeartRate] = useState(70);
  const [isCompleteMeasure, setIsCompleteMeasure] = useState(false)
  const [isImageGifVisiable, setIsImageGifVisiable] = useState(false)

  // Hàm tải video từ bộ nhớ đệm
  const uploadVideoFromCache = async (cacheUri) => {
    setUploading(true);
    const response = await fetch(cacheUri);
    const blob = await response.blob();
    const ref = storage.ref().child(`videos/${Date.now()}_${cacheUri.split('/').pop()}`);
    const snapshot = ref.put(blob);

    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      'next': (snapshot) => {
        console.log(snapshot);
      },
      'error': (error) => {
        console.log(error);
        setUploading(false);
      },
      'complete': () => {
        ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at:', downloadURL);
          // setVideoUrl(downloadURL)
          caculateHeartRate(downloadURL)
          setUploading(false);
        });
      }
    });
  };

  // Giả sử URI của video trong bộ nhớ đệm là "file:///path/to/cached/video.mp4"
  // useEffect(() => {
  //   const loading =async () => {
  //     await requestCameraPermissionsAsync()
  //     const granted = await getCameraPermissionsAsync();
  //     console.log(granted);
  //   }
  //   loading()
  // },[])
    useEffect(() => {
        (async () => {
            const cameraPermission = await requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
        })()
    },[])

  const caculateHeartRate = async (video_url) => {
    axios
      .get('http://192.168.1.13:5000/api?query=' + video_url, {
      })
      .then(function (response) {
        console.log('Nhịp tim: ', response.data['avg_bpm'])
        setHeartRate(response.data['avg_bpm'])
        setIsImageGifVisiable(false);
        setIsCompleteMeasure(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const takePicture = async () => {
    let options = {
        quality: 1, 
        base64: true,
        exif: false
    }
    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const processFrame = async () => {
    setIsCompleteMeasure(false)
    setIsImageGifVisiable(true)
    if (cameraRef.current) {
      try {
        const options = {
          videoStabilizationMode: Camera.Constants.VideoStabilization.cinematic,
          quality: "480p",
          maxDuration: 18, // Ghi tối đa 5 giây
          mute: true,
        };
        const { uri } = await cameraRef.current.recordAsync(options);
        console.log("Video recorded at:", uri);
        await cameraRef.current.stopRecording();
        uploadVideoFromCache(uri)
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  };

  // const processFrames = async (videoUri) => {
  //   try {

  //     const url = await VideoThumbnails.getThumbnailAsync(videoUri, { time: 4500 });
  //     setImageUrl(url["uri"])
  //   } catch (err) {
  //     console.error("Failed to exact frames:", err);
  //   }
  // };

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
          type={Camera.Constants.Type.back}
          style={{height: 100, width: 100}}
          flashMode={flash}
          onCameraReady={handleCameraReady}
        />
        {isImageGifVisiable && 
          <Image 
            source={{uri: 'https://media4.giphy.com/media/VGK2WUT3amXjG/200w.gif?cid=6c09b952aiaxr3lb8m0bgp7kgb0mh9mmrsnda3hz6piw9of3'}}
            style={{height: 100, width: '100%', marginTop: 50}}
          />
        }
        {isCompleteMeasure && <Text style={{color:'white', fontSize: 20, marginTop: 30}}>Nhịp tim</Text>}
        {isCompleteMeasure && <Text style={{color:'white', fontSize: 50, color:'lime'}}>{Math.floor(heartRate)}</Text>}
      </View>
      
      <TouchableOpacity
        style={{
          backgroundColor: isImageGifVisiable ? "rgba(255,255,255, 0.2)" : "white",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
          padding: 5,
          borderRadius: 10
          }
        }
        onPress={() => processFrame()}
        disabled={isImageGifVisiable ? true : false}
      >
        <Text style={{fontSize: 18, color: isImageGifVisiable ? "rgba(255,255,255, 0.3)" : "black",fontFamily:'Inter_500Medium'}}>Đo nhịp tim</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CameraComponent;

const styles = StyleSheet.create({
  camera: {
    // flex: 1,
    // borderRadius: 50,
    height: 50,
    width: 50,
  },
});
