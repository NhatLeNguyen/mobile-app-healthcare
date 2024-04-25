import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const THUMB_IMAGE_SIZE = 25;
const SLIDER_WIDTH = 150;

function ChallengeBlock({
  isDarkMode,
  name,
  steps,
  target,
  image_url,
  thumbIcon,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        height: 170,
        backgroundColor: "#171719",
        marginTop: 25,
        // padding: 25,
        borderRadius: 25,
      }}
      onPress={onPress}
    >
      {/* <BlurView intensity={100} tint="light" style={{overflow:'hidden'}}> */}
      <Image
        source={{ uri: image_url }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: 20,
        }}
      />
      {/* </BlurView> */}
      <View style={{ padding: 25 }}>
        <Text
          style={[
            styles.whiteColor,
            { fontFamily: "Inter_600SemiBold", fontSize: 18 },
          ]}
        >
          {name}
        </Text>
        <Text
          style={[
            styles.whiteColor,
            { fontFamily: "Inter_500Medium", fontSize: 15, marginTop: 15 },
          ]}
        >
          Tổng số bước
        </Text>
        <Text
          style={[
            styles.whiteColor,
            { fontFamily: "Inter_600SemiBold", fontSize: 22 },
          ]}
        >
          {steps > 1000 ? Math.floor(steps / 1000) : steps}
        </Text>
        <View style={{ justifyContent: "center", marginTop: 15 }}>
          {/* <Slider style={{ width: 150 }} maximumValue={50} value={25} /> */}
          <View
            style={{ width: SLIDER_WIDTH, height: 15, flexDirection: "row" }}
          >
            <View
              style={{
                width: (steps / target) * SLIDER_WIDTH,
                height: "100%",
                backgroundColor: "#39e75f",
                borderRadius: 20,
              }}
            ></View>
            <View
              style={{
                flex: 1,
                height: "100%",
                backgroundColor: "#3c3c46",
                borderRadius: 20,
              }}
            ></View>
          </View>
          <Image
            source={{
              uri: thumbIcon,
            }}
            style={{
              position: "absolute",
              width: THUMB_IMAGE_SIZE,
              height: THUMB_IMAGE_SIZE,
              left: Math.ceil(
                (steps / target) * SLIDER_WIDTH - THUMB_IMAGE_SIZE / 2
              ),
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ChallengeBlock;

const styles = StyleSheet.create({
  whiteColor: {
    color: "white",
  },
});
