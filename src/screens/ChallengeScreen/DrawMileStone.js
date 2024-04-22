import { Image, View, Text } from "react-native";
const LINE_HEIGHT = 20;

function DrawMileStone({ top, left, isOddStop, number }) {
  return (
    <View style={{ position: "absolute" }}>
      {/* <View
        style={{
          backgroundColor: "red",
          position: "absolute",
          left: left,
          top: top,
          width: isOddStop === 0 ? 5 : LINE_HEIGHT,
          height: isOddStop === 0 ? LINE_HEIGHT : 5,
        }}
      /> */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1246/1246381.png",
        }}
        style={{
          width: 30,
          height: 30,
          position: "absolute",
          left: left - 10,
          top: top - 10,
        }}
      />

      <Text
        style={{
          fontSize: 15,
          fontFamily: "Inter_600SemiBold",
          color: "#444444",
          // borderWidth: 1,
          position: "absolute",
          left: left - 5,
          top: top + 20,
        }}
      >
        {number ? number : 0}
      </Text>
    </View>
  );
}

export default DrawMileStone;
