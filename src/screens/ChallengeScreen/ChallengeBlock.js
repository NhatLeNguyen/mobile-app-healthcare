import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getFormatedDate } from "react-native-modern-datepicker";

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
  startDate,
  endDate,
}) {
  let status = 0;
  const today = new Date();
  if (getFormatedDate(today, "YYYY-MM-DD") < startDate) {
    status = 0;
  } else if (getFormatedDate(today, "YYYY-MM-DD") <= endDate) {
    status = 1;
  } else {
    status = 2;
  }
  return (
    <TouchableOpacity
      disabled={status == 0 || status == 2}
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
      <View
        style={{
          padding: 25,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <Text
          style={[
            styles.whiteColor,
            { fontFamily: "Inter_600SemiBold", fontSize: 18 },
            isDarkMode && {
              color: "white",
            },
          ]}
        >
          {name}
        </Text>
        <Text
          style={[
            styles.whiteColor,
            { fontFamily: "Inter_500Medium", fontSize: 15, marginTop: 15 },
            isDarkMode && {
              color: "white",
            },
          ]}
        >
          Tổng số bước
        </Text>
        <Text
          style={[
            styles.whiteColor,
            { fontFamily: "Inter_600SemiBold", fontSize: 22 },
            isDarkMode && {
              color: "white",
            },
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
      {status == 2 && (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_500Medium",
              fontSize: 20,
              color: "#add8e6",
            }}
          >
            Đã kết thúc
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "gray" }}>Rank : </Text>
            { /* top 3 https://cdn-icons-png.flaticon.com/512/1910/1910542.png */}
            {/* top 2 https://cdn-icons-png.flaticon.com/512/1910/1910534.png */}
            {/* https://cdn-icons-png.flaticon.com/512/3239/3239096.png */}
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/256/6394/6394616.png' }}
              style={{
                height: 40,
                width: 40
              }}
            />
            {/* <Text style={{ fontSize: 18, color: "gray" }}>15th</Text> */}
          </View>
          <Text style={{ fontSize: 18, color: "gray" }}>
            Tổng số bước : {steps}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default ChallengeBlock;

const styles = StyleSheet.create({
  whiteColor: {
    color: "gray",
  },
});
