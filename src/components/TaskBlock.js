import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Link,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Fonts from "../assets/fonts/Fonts";

function TaskBlock({
  heading,
  time,
  target,
  subTextTarget,
  text,
  imageRightBot,
  targetColor,
  tutorialText,
  link,
  linkText,
  imageTimeLink,
}) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: Fonts.Inter_Regular,
    Inter_Medium: Fonts.Inter_Medium,
    Inter_700Bold: Fonts.Inter_Bold,
  });
  if (!fontsLoaded) {
    console.log("Loading...");
  }
  return (
    <Pressable style={styles.container}>
      <Ionicons
        name="arrow-redo-outline"
        size={20}
        style={{ top: 15, right: 10, position: "absolute" }}
      />
      <Text style={styles.heading}>{heading}</Text>
      {(time || imageTimeLink)&& (
        <Text style={styles.time}>
          {imageTimeLink && (
            <Image style={styles.imageTime} source={{ uri: imageTimeLink }} />
          )}
          {time && <Text style={styles.timeText}>{time}</Text>}
        </Text>
      )}
      {target && (
        <Text style={[styles.target, { color: targetColor }]}>
          {target}
          <Text style={[styles.subTextTarget, { color: targetColor }]}>
            {subTextTarget}
          </Text>
        </Text>
      )}

      {text && <Text style={styles.lastText}>{text}</Text>}
      {imageRightBot && (
        <Image
          source={{
            uri: imageRightBot,
          }}
          style={styles.image}
        />
      )}
      {tutorialText && (
        <Text
          style={[
            styles.tutorialText,
            { paddingRight: imageRightBot ? 80 : 0 },
          ]}
        >
          {tutorialText}
        </Text>
      )}

      {linkText && (
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
          <Text style={styles.linkText}>{linkText}</Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    elevation: 1,
    padding: 12,
    marginBottom: 20,
    // position:'relative',
    width: "100%",
  },
  heading: {
    fontSize: 15,
    fontFamily: "Inter_Medium",
  },
  time: {
    marginTop: 4,
    // fontSize: 11,
    flexDirection: "row",
  },
  timeText: {
    fontSize: 12,
    color: "gray",
  },
  target: {
    fontSize: 22,
    marginTop: 25,
    fontWeight: "bold",
  },
  subTextTarget: {
    fontSize: 14,
    fontWeight: "normal",
  },
  lastText: {
    color: "gray",
    paddingRight: 80,
  },
  image: {
    position: "absolute",
    width: 70,
    height: 70,
    bottom: 12,
    right: 12,
  },
  tutorialText: {
    color: "gray",
    marginTop: 20,
    fontSize: 15,
  },
  imageTime: {
    width: 20,
    height: 20,
    backgroundColor: "red",
  },
  linkText: {
    color: "#1a9be8",
    marginTop: 20,
    fontSize: 14,
    fontFamily: "Inter_Medium",
  },
});

export default TaskBlock;
