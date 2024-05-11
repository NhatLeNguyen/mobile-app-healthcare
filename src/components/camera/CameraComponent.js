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
import { CameraView } from "expo-camera/next";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
// import { RNCamera } from "react-native-camera";

// // Function to compute brightness from video frames
// function computeBrightness(videoFrames) {
//   const brightnessValues = [];
//   videoFrames.forEach(frame => {
//       let totalBrightness = 0;
//       for (let i = 0; i < frame.length; i += 4) {
//           // Assuming frame is in RGBA format, summing up red channel values
//           totalBrightness += frame[i];
//       }
//       // Computing average brightness for the frame
//       const averageBrightness = totalBrightness / (frame.length / 4);
//       brightnessValues.push(averageBrightness);
//   });
//   return brightnessValues;
// }

// // Function to apply band-pass filter
// function applyBandPassFilter(brightnessSignal, sampleRate, lowFreq, highFreq) {
//   const bandPassFilteredSignal = [];
//   // Butterworth filter coefficients calculation
//   const b = []; // Numerator coefficients
//   const a = []; // Denominator coefficients
//   // Filter initialization
//   // Filtering the brightness signal
//   for (let i = 0; i < brightnessSignal.length; i++) {
//       let filteredValue = 0;
//       // Applying the filter equation
//       // Collecting filtered values
//       bandPassFilteredSignal.push(filteredValue);
//   }
//   return bandPassFilteredSignal;
// }

// // Function to compute FFT
// function computeFFT(signal) {
//   const fftResult = [];
//   // FFT computation logic
//   return fftResult;
// }

// // Function to detect peaks
// function detectPeaks(fftMagnitude, freqRange) {
//   const peaks = [];
//   // Peak detection logic
//   return peaks;
// }

// // Function to smooth heart rate
// function smoothHeartRate(fftPeaks, fftResolution, bpmRange) {
//   let smoothedHeartRate = null;
//   // Smoothing logic
//   return smoothedHeartRate;
// }

// // Example usage
// const videoFrames = []; // Video frames as RGBA arrays
// const sampleRate = 30; // Sample rate (frames per second)
// const lowFreq = 40 / 60; // Low frequency limit (in Hz)
// const highFreq = 230 / 60; // High frequency limit (in Hz)
// const fftResolution = 1; // FFT resolution (in Hz)
// const bpmRange = [40, 230]; // Heart rate range (in BPM)

// // Compute brightness from video frames
// const brightnessSignal = computeBrightness(videoFrames);

// // Apply band-pass filter
// const bandPassFilteredSignal = applyBandPassFilter(brightnessSignal, sampleRate, lowFreq, highFreq);

// // Compute FFT
// const fftResult = computeFFT(bandPassFilteredSignal);

// // Detect peaks in FFT
// const fftPeaks = detectPeaks(fftResult, bpmRange);

// // Smooth heart rate
// const smoothedHeartRate = smoothHeartRate(fftPeaks, fftResolution, bpmRange);

// console.log('Smoothed Heart Rate:', smoothedHeartRate);

function CameraComponent() {
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

  const processFrame = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: "720p",
          maxDuration: 5, // Ghi tối đa 5 giây
          mute: true,
        };
        const { uri } = await cameraRef.current.recordAsync(options);
        console.log("Video recorded at:", uri);

        await cameraRef.current.stopRecording();
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  };

  const processFrames = async (videoUri) => {
    try {

      const url = await VideoThumbnails.getThumbnailAsync(videoUri, { time: 4500 });
      setImageUrl(url["uri"])
    } catch (err) {
      console.error("Failed to exact frames:", err);
    }
  };

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
        <Image 
          source={{uri: imageUrl ? imageUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnEy2t0mwIlSoVaza9Tm0MLYRK29oihDYWdzQOwGTR2A&s'}}
          style={{height: 100, width: 100}}
        />
        <Camera
          ref={cameraRef}
          type={Camera.Constants.Type.back}
          style={{height: 100, width: 100}}
          flashMode={flash}
          onCameraReady={handleCameraReady}
        />
        {/* <RNCamera
          ref={cameraRef}
          // style={{ flex: 1 }}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
        /> */}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15
        }}
        onPress={() => processFrame()}
      >
        <Text>Record</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => processFrames('file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FDemoRN-45abfef4-1c02-4d7e-b05f-a6aaec65f549/Camera/8bf4c205-6f72-4ae6-ac51-f1072a1d937a.mp4')}
      >
        <Text>Caculate heart rate</Text>
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
