import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

function CaloDetail({ startTime, totalTime, stepCount, titleColor }) {
  const [hourStart, minuteStart] = startTime.split(":");
  const title =
    parseInt(hourStart) <= 10
      ? "Đi bộ buổi sáng"
      : parseInt(hourStart) <= 18
      ? "Đi bộ buổi chiều"
      : "Đi bộ buổi tối";
  const [minutePractice, secondPractice] = totalTime.split(":");
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <FontAwesome5 name="walking" size={16} color="gray" />
        <Text style={{ paddingLeft: 10, color: "gray" }}>{startTime}</Text>
      </View>
      <View>
      <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
      </View>
      <View
        style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ color: "gray" }}>
          {minutePractice}ph {secondPractice}giây |{" "}
        </Text>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4812/4812918.png",
          }}
          style={{ width: 20, height: 20 }}
        />
        <Text style={{ color: "gray", marginLeft: 2 }}>{stepCount} calo</Text>
      </View>
    </View>
  );
}

export default CaloDetail;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
    // flexDirection:'row'
    // flex: 1,
    // alignItems:'center'
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
