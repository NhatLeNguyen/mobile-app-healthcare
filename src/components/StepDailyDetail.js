import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import {Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../assets/fonts/Fonts";

function StepDailyDetail({ day, date, month, stepCount}) {
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
      <View>
        <Text style={styles.time}>{day}, {date} tháng {month}</Text>
      </View>
      <View>
        <Text style={{fontFamily:'Inter_Medium', fontSize: 15, marginTop: 6}}>{stepCount} bước</Text>
      </View>
    </TouchableOpacity>
  );
}

export default StepDailyDetail;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15
  },
  time: {
    fontSize: 15,
    // fontFamily: 'Inter_SemiBold',
    color:'gray'
  },
});
