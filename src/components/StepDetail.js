import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import {Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../assets/fonts/Fonts";

function StepDetail({ startTime, totalTime, stepCount }) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: Fonts.Inter_Regular,
    Inter_Medium: Fonts.Inter_Medium,
    Inter_700Bold: Fonts.Inter_Bold,
    Inter_SemiBold: Fonts.Inter_SemiBold,
  });
  if (!fontsLoaded) {
    console.log("Loading...");
  }
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome5 name="walking" size={16} color="gray" />
        <Text style={{ paddingLeft: 10, color: "gray" }}>{startTime}</Text>
      </View>
      <View>
        <Text style={styles.title}>Đi bộ buổi chiều</Text>
      </View>
      <View style={{marginTop: 5, flexDirection: 'row', alignItems:'center'}}>
        <Text style={{color:'gray'}}>{totalTime}   |   </Text>
        <Ionicons name="footsteps" size={15} color={"blue"} />
        <Text style={{color:'gray', marginLeft: 5}}>{stepCount} bước</Text>
      </View>
    </TouchableOpacity>
  );
}

export default StepDetail;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15
    // flexDirection:'row'
    // flex: 1,
    // alignItems:'center'
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_SemiBold'
  },
});
