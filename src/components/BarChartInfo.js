import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Calendar from "./Calender";
import moment from "moment";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../assets/fonts/Fonts";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import StepDetail from "./StepDetail";
import axios from "axios";

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  color: () => "#1a9be8",
  strokeWidth: 1, // optional, default 3
  decimalPlaces: 0,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

function BarChartInfo() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular: Fonts.Inter_Regular,
    Inter_Medium: Fonts.Inter_Medium,
    Inter_700Bold: Fonts.Inter_Bold,
    Inter_SemiBold: Fonts.Inter_SemiBold,
  });
  if (!fontsLoaded) {
    console.log("Loading...");
  }
  const today = new Date();
  const currentDate = getFormatedDate(today, "YYYY/MM/DD");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [openChooseDate, setOpenChooseDate] = useState(false);

  const [year, month, day] = selectedDate.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const data = {
    labels: ["0:00", "15:00", "24:00"],
    datasets: [
      {
        data: [0, 45, 0],
      },
    ],
  };
  useEffect(() => {
    console.log("Getting data...");
      axios
        .post(`http://192.168.1.110:1510/savePracticeHistory`, {
          id: "1",
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  },[selectedDate])

  const handleChooseDate = (propDate) => {
    setSelectedDate(propDate);
    setOpenChooseDate(false);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => setOpenChooseDate(true)}>
          <Text style={styles.dateTimeText}>
            {dayOfWeek}, {day} tháng {month}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 13, marginTop: 5 }}>
          <Ionicons name="footsteps" size={16} color={"blue"} /> {1234 / 1000}{" "}
          bước
        </Text>
      </View>
      <BarChart
        style={{ marginTop: 20 }}
        data={data}
        width={Dimensions.get("screen").width}
        height={220}
        // yAxisLabel="$"
        chartConfig={chartConfig}
        // verticalLabelRotation={30}
        showBarTops={true}
        withInnerLines={false}
        fromZero={true}
      />
      <Text style={{ color: "#777B7E", margin: 20, fontSize: 15 }}>
        Số bước là một chỉ số hữu ích đo lường mức độ vận động của bạn. Chỉ số
        này có thể giúp bạn phát hiện những thay đổi về mức độ hoạt động của
        mình.
      </Text>
      <Modal
        animationType='fade'
        transparent={true}
        visible={openChooseDate}
        onRequestClose={() => setOpenChooseDate(false)}
        style={styles.dateModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modelView}>
            <DatePicker
              mode="calendar"
              selected={selectedDate}
              maximumDate={currentDate}
              onDateChange={handleChooseDate}
            />
            <TouchableOpacity onPress={() => setOpenChooseDate(false)}>
              <Text>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{borderColor: 'gray', borderTopWidth: 0.5, borderBottomWidth: 0.5, marginBottom: 0}}>
        <StepDetail startTime="17:19" totalTime="5ph 22giây" stepCount="154"/>
        <StepDetail startTime="19:09" totalTime="8ph 18giây" stepCount="757"/>
      </View>
    </ScrollView>
  );
}
export default BarChartInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // alignItems: "center",
    marginTop: 30,
    backgroundColor: "transparent",
  },
  dateModal: {
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modelView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateTimeText: {
    fontSize: 15,
    fontFamily: "Inter_Medium",
  },
});
