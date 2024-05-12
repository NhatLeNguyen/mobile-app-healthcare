import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Avatar } from "react-native-elements";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

function MusicPlayer({ image, name, author, song, isChanged, setIsChanged ,s ,setS}) {
  const [sound, setSound] = useState(s);
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [onlyOne, setOnlyOne] = useState(0)
  useEffect(() => {
    console.log(song);
    const initAudio = async () => {
      const { sound } = await Audio.Sound.createAsync({uri: 'https://cdns-preview-c.dzcdn.net/stream/c-c674fb656a9ccc637053832c3a1fffca-1.mp3'});
      // const { sound } = await Audio.Sound.createAsync(song);
      setSound(sound);
      setS(sound)
      const { durationMillis } = await sound.getStatusAsync();
      setDuration(durationMillis);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setIsPlaying(status.isPlaying);
        }
      });
      sound.setIsLoopingAsync(true);
      // await sound.playAsync();
    };
    initAudio();
    if (isChanged) {
      setIsChanged(false);
      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [isChanged]);

  const handlePlayPause = async () => {
    setIsPlaying(!isPlaying);
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    if (!sound) return;
    sound.setPositionAsync(value);
    setPosition(value);
  };
  useEffect(() => {
    if (position == duration) {
      setPosition(0);
      setIsComplete(true);
    }
  }, [position]);
  return (
    <View style={styles.container}>
      {/* <Avatar
        rounded
        size={45}
        source={{
          uri: image,
        }}
        containerStyle={{ borderRadius: 20 }}
      /> */}
      <Image
        source={{ uri: image !== '' ? image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bDfU2mvxC6CL_CfyW47bd1ga9OWSHxYbNx6EbwzgtA&s' }}
        style={{ height: 45, width: 45, borderRadius: 15 }}
      />
      <View style={{ paddingTop: 0, marginLeft: 2, width: "65%" }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            paddingLeft: 14,
            fontSize: 14,
          }}
        >
          {name} ({author})
        </Text>
        <Slider
          value={position}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#bfd474"
          maximumTrackTintColor="#182d91"
          thumbTintColor="#bfd474"
          style={{ padding: 0, width: "100%" }}
          //   onSlidingComplete={handleSeek}
          onValueChange={handleSeek}
        />
      </View>
      <View style={{ position: 'absolute', right: 30 }}>
        {isPlaying && (
          <Ionicons
            name="pause-sharp"
            size={25}
            color="white"
            onPress={handlePlayPause}
          />
        )}
        {!isPlaying && (
          <Ionicons
            name="play-sharp"
            size={25}
            color="white"
            onPress={handlePlayPause}
          />
        )}
      </View>
    </View>
  );
}

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
  },
});
