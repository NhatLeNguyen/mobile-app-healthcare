import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import Calendar from "../../components/Calender";
import moment, { min } from "moment";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { useFonts } from "@expo-google-fonts/inter";
import Fonts from "../../constants/Fonts";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import StepDetail from "../ActivityDetailScreen/StepDetail";
import axios from "axios";
import { IP } from "../../constants/Constants";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
import * as SQLite from "expo-sqlite/next";
import DistanceDetail from "./DistanceDetail";
import Storage from "expo-storage";
import { ThemeContext } from "../MainScreen/ThemeProvider";

const db = SQLite.openDatabaseAsync("health-care.db");

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);


function DistanceBarChartInfo({ route }) {
  const themeValue = useContext(ThemeContext);
  const chartConfig = {
    backgroundGradientFrom:themeValue.isDarkMode ? "black" : "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo:themeValue.isDarkMode ? "black" : "white",
    backgroundGradientToOpacity: 0.5,
    //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    color: () => "#ff4a73",
    strokeWidth: 1, // optional, default 3
    decimalPlaces: 0,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const choosedDate = route.params ? route.params.prop : undefined;
  const navigation = useNavigation();
  const today = new Date();
  const currentDate = getFormatedDate(today, "YYYY/MM/DD");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  useEffect(() => {
    if (choosedDate) {
      setSelectedDate((prev) => choosedDate);
    }
  }, [choosedDate]);
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

  const [stepData, setStepData] = useState({
    labels: ["0:00"],
    datasets: [
      {
        data: [0],
      },
    ],
  });
  const [detailData, setDetailData] = useState([]);
  const [sumSteps, setSumSteps] = useState(0);
  useEffect(() => {
    const loading = async () => {
      let id = await Storage.getItem({key : 'user_id'})
      // Change format
      let parts = selectedDate.split("/");
      console.log(parts.join("-"));
      // Getting data
      const results = (await db).getAllSync(
        "select * from practicehistory where user_id = ? and date = ?",
        [id, parts.join("-")]
      );

      let stepDataReturned = { labels: ["0:00"], datasets: [{ data: [0] }] };
      let sumStepsReturned = 0;
      let detailDataReturned = [];
      for (var i = 0; i < results.length; i++) {
        stepDataReturned.labels.push(results[i].start_time.slice(0, 5));
        stepDataReturned.datasets[0].data.push(results[i].distances);
        sumStepsReturned += results[i].distances;
        detailDataReturned.push({
          start_time: results[i].start_time.slice(0, 5),
          practice_time: results[i].practice_time,
          steps: results[i].steps,
          posList: results[i].posList,
          calories: results[i].caloris,
          totalDistance: results[i].distances.toFixed(2),
        });
      }
      stepDataReturned.labels.push("24:00");
      stepDataReturned.datasets[0].data.push(0);
      setStepData(stepDataReturned);
      setSumSteps(sumStepsReturned.toFixed(2));
      setDetailData(detailDataReturned);
    };
    loading();
  }, [selectedDate]);

  const handleChooseDate = (propDate) => {
    setSelectedDate(propDate);
    setOpenChooseDate(false);
  };

  const handleGetDetailActivity = (data) => {
    let [minute, second] = data.practice_time.split(":");
    minute = parseInt(minute);
    second = parseInt(second);
    data.minute = minute;
    data.second = second;
    let jsonObject = data.posList;
    if (typeof data.posList !== "object") {
      jsonObject = JSON.parse(data.posList);
    }
    // let posList = Object.keys(jsonObject).map(key => jsonObject[key]);
    data.posList = jsonObject;
    navigation.navigate("ActivityDetailPerDay", { data });
  };
  return (
    <ScrollView style={[styles.container, themeValue.isDarkMode && {backgroundColor: '#202125', marginTop: 0}]}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => setOpenChooseDate(true)}>
        <Text style={[styles.dateTimeText,themeValue.isDarkMode && {color:'#e2e3e7'}]}>
            {dayOfWeek}, {day} tháng {month}
          </Text>
        </TouchableOpacity>
        <Text style={[{ fontSize: 13, marginTop: 5}, themeValue.isDarkMode && {color: '#e2e3e7'}]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6194/6194839.png",
            }}
            style={{ width: 18, height: 18 }}
          />
          {"  "}
          {sumSteps > 1000 ? sumSteps / 1000 : sumSteps} km
        </Text>
      </View>
      <BarChart
        style={{ marginTop: 20 }}
        data={stepData}
        width={Dimensions.get("screen").width}
        height={220}
        // yAxisLabel="$"
        chartConfig={chartConfig}
        // verticalLabelRotation={30}
        showBarTops={true}
        withInnerLines={false}
        fromZero={true}
      />
      <Text style={{ color: "#777B7E", margin: 25 , fontSize: 15 }}>
        Việc đo quãng đường là một cách hữu ích để theo dõi thành tích của bạn
        trong các hoạt động như đạp xe, chạy bộ và bơi lội
      </Text>
      <Modal
        animationType="fade"
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
      <View
        style={{
          borderColor: "gray",
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          marginBottom: 0,
        }}
      >
        {detailData.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handleGetDetailActivity(item)}
          >
            <DistanceDetail
              startTime={item.start_time}
              totalTime={item.practice_time}
              stepCount={item.totalDistance}
              titleColor={themeValue.isDarkMode ? '#e2e3e7' : 'black'}
            />
          </TouchableOpacity>
        ))}

        {/* <StepDetail startTime="19:09" totalTime="8ph 18giây" stepCount="757"/> */}
      </View>
    </ScrollView>
  );
}
export default DistanceBarChartInfo;

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
    fontFamily: "Inter_500Medium",
  },
});
