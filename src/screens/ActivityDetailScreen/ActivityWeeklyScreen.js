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
} from "react-native";
import moment from "moment";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import StepDailyDetail from "./StepDailyDetail";
import axios from "axios";
import { IP } from "../../constants/Constants";
import { useNavigation } from "@react-navigation/native";
// import * as SQLite from "expo-sqlite/next";
import * as SQLite from "expo-sqlite";
import Storage from "expo-storage";
import { ThemeContext } from "../MainScreen/ThemeProvider";

const db = SQLite.openDatabaseAsync("health-care.db");

function ActivityWeeklyScreen() {
  const themeValue = useContext(ThemeContext);
  const chartConfig = {
    backgroundGradientFrom:themeValue.isDarkMode ? "black" : "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo:themeValue.isDarkMode ? "black" : "white",
    backgroundGradientToOpacity: 0.5,
    //   color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    color: () => "#1a9be8",
    strokeWidth: 1, // optional, default 3
    decimalPlaces: 0,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };
  const navigation = useNavigation();
  const today = new Date();
  const currentDate = getFormatedDate(today, "YYYY/MM/DD");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [openChooseDate, setOpenChooseDate] = useState(false);
  const [totalSteps , setTotalSteps ]= useState(0);
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

  const [chartData, setChartData] = useState({
    labels: ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"],
    datasets: [
      {
        data: [0, 45, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [detailData, setDetailData] = useState([]);
  const startDate = new Date(date);
  while (startDate.getDay() !== 1) {
    startDate.setDate(startDate.getDate() - 1);
  }
  const endDate = new Date(date);
  while (endDate.getDay() !== 0) {
    endDate.setDate(endDate.getDate() + 1);
  }
  if(getFormatedDate(endDate,'YYYY-MM-DD') > currentDate){
    endDate = new Date()
  }
  useEffect(() => {
    const loading = async () => {
      const parts = currentDate.split("/");
      const id = await Storage.getItem({key: 'user_id'})
      const results = (await db).getAllSync(
        "SELECT date,sum(steps) as steps FROM `practicehistory` WHERE user_id = ? and date BETWEEN ? AND ? GROUP BY date",
        [id, getFormatedDate(startDate, "YYYY-MM-DD"),currentDate < endDate ? parts.join("-") : getFormatedDate(endDate, "YYYY-MM-DD")]
      );
      console.log(getFormatedDate(startDate, "YYYY-MM-DD"));
      console.log("Results: ",results);
      let chartDataReturned = {
        labels: ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      };
      let detailDataReturned = [];
      let ttSteps = 0;
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        let cur_date = new Date(results[i].date);
        chartDataReturned.datasets[0].data[
          cur_date.getDay() == 0 ? 6 : cur_date.getDay() - 1
        ] = parseInt(results[i].steps);
        ttSteps += parseInt(results[i].steps)
      }
      setChartData(chartDataReturned);
      setTotalSteps(ttSteps)
      let dateRange = new Date(endDate - startDate).getDate()
      if(endDate > today){
        dateRange = new Date(today - startDate).getDate()
      }
      for (var j = 0; j < dateRange; j++) {
        let d = new Date(startDate);
        d.setDate(d.getDate() + j);
        detailDataReturned.push({
          date: d,
          steps: chartDataReturned.datasets[0].data[j],
        });
      }
      setDetailData(detailDataReturned);
    };
    loading();
  }, [selectedDate]);
  // useEffect(() => {
  //   axios
  //     .get(`http://${IP}:1510/getWeeklyPracticeDetail`, {
  //       params: {
  //         startDate: getFormatedDate(startDate, 'YYYY-MM-DD'),
  //         endDate: currentDate,
  //       },
  //     })
  //     .then(function (response) {
  //       let detail = response.data.data;
  //       // console.log(detail);
  //       let chartDataReturned = {
  //         labels: ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"],
  //         datasets: [
  //           {
  //             data: [0, 0, 0, 0, 0, 0, 0],
  //           },
  //         ],
  //       }
  //       let detailDataReturned = []
  //       for(var i = 0 ; i< detail.length; i++){
  //         let cur_date = new Date(detail[i].date)
  //         chartDataReturned.datasets[0].data[cur_date.getDay() == 0 ? 6 : cur_date.getDay() - 1] = parseInt(detail[i].steps)
  //       }
  //       setChartData(chartDataReturned)
  //       for(var j = 0 ; j < new Date(today - startDate).getDate() ; j++){
  //         let d = new Date(startDate)
  //         d.setDate(d.getDate() + j)
  //         detailDataReturned.push({date: d, steps: chartDataReturned.datasets[0].data[j]})
  //       }
  //       setDetailData(detailDataReturned)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [selectedDate])
  const handleChooseDate = (propDate) => {
    setSelectedDate(propDate);
    setOpenChooseDate(false);
  };

  return (
    <ScrollView style={[styles.container, themeValue.isDarkMode && {backgroundColor: '#202125', marginTop: 0}]}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={() => setOpenChooseDate(true)}>
          <Text style={[styles.dateTimeText, themeValue.isDarkMode && {color:'#e2e3e7'}]}>
            Ngày {startDate.getDate()}
            {startDate.getMonth() !== endDate.getMonth() && (
              <Text> tháng {startDate.getMonth() + 1}</Text>
            )}
            <Text> - </Text>
            <Text>
              Ngày {endDate.getDate()} tháng {endDate.getMonth() + 1}
            </Text>
          </Text>
        </TouchableOpacity>
        <Text style={[{ fontSize: 13, marginTop: 5 }, themeValue.isDarkMode && {color:'#e2e3e7'}]}>
          <Ionicons name="footsteps" size={16} color={themeValue.isDarkMode ? "#68a0f3" : "#1a9be8"} /> {totalSteps > 1000 ? totalSteps / 1000 : totalSteps}{" "}
          bước
        </Text>
      </View>
      <BarChart
        style={{ marginTop: 20 }}
        data={chartData}
        width={Dimensions.get("screen").width}
        height={220}
        chartConfig={chartConfig}
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
        {detailData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("day", {
                  prop: getFormatedDate(item.date, "YYYY/MM/DD"),
                })
              }
            >
              <StepDailyDetail date={item.date} stepCount={item.steps} stepColor={themeValue.isDarkMode ? '#e2e3e7' : 'black'}/>
            </TouchableOpacity>
          );
        })}
        {/* <StepDailyDetail day={"Thứ Hai"} date={4} month={3} stepCount="154"/> */}
        {/* <StepDailyDetail day={"Thứ Ba"} date={5} month={3} stepCount="757"/> */}
      </View>
    </ScrollView>
  );
}
export default ActivityWeeklyScreen;

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
    flexDirection: "row",
  },
});
