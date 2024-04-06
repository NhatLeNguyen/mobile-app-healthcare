import { View, StyleSheet, Text, Pressable, TouchableOpacity } from "react-native";
import {Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../../constants/Fonts";
import { getFormatedDate } from "react-native-modern-datepicker";

function DistanceDailyDetail({ date, stepCount}) {
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const day = daysOfWeek[date.getDay()]
  const dayInMonth = date.getDate()
  const month = date.getMonth() + 1;
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.time}>{day}, {dayInMonth} tháng {month}</Text>
      </View>
      <View>
        <Text style={{fontFamily:'Inter_500Medium', fontSize: 15, marginTop: 6}}>{stepCount} km</Text>
      </View>
    </View>
  );
}

export default DistanceDailyDetail;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15
  },
  time: {
    fontSize: 15,
    // fontFamily: 'Inter_600SemiBold',
    color:'gray'
  },
});
