import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export function SocialMedia(props) {
  return (
    <View style={styles.root} testID={props.testID}>
      <View style={styles.google} testID="615:24">
        <View style={styles.frame1} testID="615:25">
          {/* <Image
            source={require("srcassetssocial_mediagoogle-logo-bold-svgrepo-com.svg")}
          /> */}
          <AntDesign name="google" size={20} color="black" />
        </View>
      </View>
      <View style={styles.facebook} testID="615:28">
        <View style={styles.frame12} testID="615:29">
          {/* <Image
            source={require("srcassetssocial_media\facebook-svgrepo-com.svg")}
          /> */}
          <Entypo name="facebook-with-circle" size={20} color="black" />
        </View>
      </View>
      <View style={styles.apple} testID="615:32">
        {/* <View style={styles.frame13} testID="615:33">
          <Image source={require("srcassetssocial_media\baseline-apple.svg")} />
        </View> */}
        <AntDesign name="apple1" size={20} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginVertical: 10,
    marginRight: 10,
  },
  google: {
    marginRight: 10,
    width: 60,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(236, 236, 236, 1)",
  },
  frame1: {
    flexDirection: "row",
    alignItems: "center",
  },
  facebook: {
    marginRight: 10,
    width: 60,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(236, 236, 236, 1)",
  },
  frame12: {
    flexDirection: "row",
    alignItems: "center",
  },
  apple: {
    width: 60,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(236, 236, 236, 1)",
  },
  frame13: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SocialMedia;
