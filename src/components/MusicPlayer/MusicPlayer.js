import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Avatar } from "react-native-elements";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

function MusicPlayer({ image, song, name, author }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  //   async function playSound() {
  //     console.log("Loading Sound");
  //     const { sound } = await Audio.Sound.createAsync(
  //       require("../../assets/musics/doantuyetnangdi.mp3")
  //     );
  //     setSound(sound);

  //     console.log("Playing Sound");
  //     await sound.playAsync();
  //   }

  //   useEffect(() => {
  //     return sound
  //       ? () => {
  //           console.log("Unloading Sound");
  //           sound.unloadAsync();
  //         }
  //       : undefined;
  //   }, [sound]);
  //   useEffect(() => {
  //     playSound()
  //   },[])
  useEffect(() => {
    const initAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        // { uri: 'https://example.com/audio.mp3' },
        require("../../assets/musics/doantuyetnangdi.mp3")
        // { shouldPlay: false }
      );
      setSound(sound);
      const { durationMillis } = await sound.getStatusAsync();
      setDuration(durationMillis);
    //   sound.playAsync();
    };
    initAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
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

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size={45}
        source={{
          uri: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=sph",
        }}
        containerStyle={{ borderRadius: 20 }}
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
          onSlidingComplete={handleSeek}
          //   onValueChange={handleSeek}
        />
      </View>
      <View style={{ marginLeft: 25 }}>
        <Ionicons name="pause-sharp" size={25} color="white"  onPress={() => handlePlayPause}/>
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
