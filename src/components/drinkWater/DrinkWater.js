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
import { useContext, useState } from "react";
import { ThemeContext } from "../../screens/MainScreen/ThemeProvider";
import imagePath from "../../constants/imagePath";

function DrinkWater({ currentMl, pressedFunction }) {
  const themeValue = useContext(ThemeContext);
  const [isPressed, setIsPress] = useState(false);
  const [image1, setImage1] = useState(imagePath.drinkWater);
  const [image2, setImage2] = useState(imagePath.drinkWater);
  return (
    <Pressable
      style={[
        styles.container,
        isPressed && styles.pressedContainer,
        themeValue.isDarkMode && { backgroundColor: "#2a2b2f" },
      ]}
      onPress={() => {
        setIsPress(true);
        pressedFunction();
      }}
      onPressOut={() => setIsPress(false)}
    >
      <Text
        style={[styles.heading, themeValue.isDarkMode && { color: "#e2e3e7" }]}
      >
        {currentMl} / 2.000 ml
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={image1}
          style={styles.image}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={image2}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "gray",
          width: 100,
          alignItems: "center",
          height: 40,
          justifyContent: "center",
          marginTop: 10,
          borderRadius: 15,
        }}
        onPress={() => {
          setImage2(imagePath.drinkWaterGif);
          setTimeout(() => {
            setImage2(imagePath.drinkWater)
          },6600)
          
        }}
      >
        <Text> +250 ml</Text>
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressedContainer: {
    backgroundColor: "#ECECEC",
  },
  container: {
    borderRadius: 15,
    elevation: 1,
    padding: 12,
    marginBottom: 20,
    // position:'relative',
    width: "100%",
    backgroundColor: "white",
    height: 100,
  },
  heading: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
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
  // image: {
  //   position: "absolute",
  //   width: 70,
  //   height: 70,
  //   bottom: 15,
  //   right: 20,
  //   borderRadius: 5,
  // },
  imageContainer: {
    position: "absolute",
    width: 70,
    height: 70,
    bottom: 15,
    right: 20,
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    fontFamily: "Inter_500Medium",
  },
});

export default DrinkWater;
