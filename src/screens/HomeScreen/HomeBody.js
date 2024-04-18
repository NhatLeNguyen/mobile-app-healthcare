import {
  View,
  Button,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import TaskBlock from "../../components/TaskBlock";
import { Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import Fonts from "../../constants/Fonts";
import * as SQLite from 'expo-sqlite/next'
import { getFormatedDate } from "react-native-modern-datepicker";
import { useNavigation } from "@react-navigation/native";
import Storage from "expo-storage";
import { ThemeContext } from "../MainScreen/ThemeProvider";

const db = SQLite.openDatabaseAsync('health-care.db')

function HomeBody({isRefresh}) {
  const themeValue = useContext(ThemeContext);
  const [isPressed, setIsPress] = useState(false)
  const navigation = useNavigation()
  const [dayCompleteGoal, setDayCompleteGoal] = useState(0);
  const [steps_target, setStepsTarget] = useState(50)
  const [today, setToday] = useState(new Date());
  const [calo, setCalo] = useState(0)

  useEffect(() => {
    const loading = async () => {
      const st = await Storage.getItem({ key: `steps_target` });
      setStepsTarget(parseInt(st));
      let day_complete = 0;
      const [year, month, day] = getFormatedDate(today, "YYYY/MM/DD")
        .split("/")
        .map(Number);
      const date = new Date(year, month - 1, day);
      const startDate = new Date();
      startDate.setDate(
        date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)
      );

      // const results = (await db).getAllSync(
      //   "SELECT sum(steps) as steps FROM `practicehistory` WHERE date BETWEEN ? AND ? GROUP BY date",
      //   [
      //     getFormatedDate(startDate, "YYYY-MM-DD"),
      //     getFormatedDate(today, "YYYY-MM-DD"),
      //   ]
      // );
      const id = await Storage.getItem({key: 'user_id'})
      const results = (await db).getAllSync(
        "SELECT sum(steps) as steps, sum(caloris) as caloris FROM `practicehistory` WHERE user_id = ? and date BETWEEN ? AND ? GROUP BY date",
        [
          id,
          getFormatedDate(startDate, "YYYY-MM-DD"),
          getFormatedDate(today, "YYYY-MM-DD"),
        ]
      );
      let totalCalo = 0;
      for (const row of results){
        if(row.steps >= st){
          day_complete = day_complete + 1;
        }
        totalCalo = row.caloris
      }
      // console.log('Day: ',day_complete);
      setDayCompleteGoal(day_complete+'/7')
      setCalo(totalCalo)
    };
    loading();
  }, [today, isRefresh]);


  return (
    <View style={styles.container}>
      <TaskBlock
        heading="Mục tiêu hằng ngày của bạn"
        time="7 ngày qua"
        target={dayCompleteGoal}
        text="Đã đạt được"
        targetColor="#1a9be8"
        pressedFunction={() => {navigation.navigate('ActivityDetail', {name: 'week'})}}
      />
      <TaskBlock
        heading="Mục tiêu hằng tuần"
        time="Ngày 04 - Ngày 10 tháng 3"
        target="0/150"
        text="Khi đạt 150 điểm nhịp tim mỗi tuần, bạn có thể ngủ ngon hơn, có tinh thần sảng khoái hơn và kéo dài tuổi thọ"
        targetColor="#03806d"
        imageRightBot='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/1991px-WHO_logo.svg.png'
        pressedFunction={() => {console.log("Hehe");}}
      />
      <Text style={[styles.heading, themeValue.isDarkMode && {color: '#e2e3e7'}]}>
        XU HƯỚNG
      </Text>
      <TaskBlock
        heading="Năng lượng tiêu thụ"
        time="7 ngày qua"
        target={calo}
        subTextTarget=" calo"
        text="Hôm nay"
        targetColor="#fdbd40"
        pressedFunction={() => {navigation.navigate('CaloActivityDetail', {name: 'calo_week'})}}
      />
      <Text style={[styles.heading, themeValue.isDarkMode && {color: '#e2e3e7'}]}>
        KHÁM PHÁ
      </Text>
      <TaskBlock
        heading="Một cách đơn giản để sống khỏe"
        time=" Chào mừng bạn đến với LK"
        // imageTimeLink="https://gstatic.com/images/branding/product/1x/gfit_512dp.png"
        tutorialText="Điểm nhịp tim cho biết hoạt động nào phù hợp nhất với sức khỏe của bạn và bạn đang hoạt động ở mức độ nào theo khuyến nghị của World Health Organization"
        link="https://www.who.int/initiatives/behealthy/physical-activity"
        linkText="Xem khuyến nghị"
        pressedFunction={() => {console.log("Hehe");}}
      />
      <TaskBlock
        heading="Thời gian ngủ bạn cần"
        imageTimeLink="https://lifestylemedicine.org/wp-content/uploads/2023/09/2017_aasm_logo_v-1024x512.jpg"
        tutorialText="Tìm hiểu về các yếu tố ảnh hưởng đến nhu cầu ngủ và cách tìm thời gian ngủ phù hợp với bạn"
        imageRightBot="https://cdn-icons-png.flaticon.com/512/3657/3657555.png"
        pressedFunction={() => {console.log("Hehe");}}
      />

      <TaskBlock
        heading="Đặt tốc độ đi bộ"
        tutorialText="Sải bước theo điệu nhạc để biến những bước đi bộ thành một cách tập thể dục đơn giản mà hiệu quả."
        link="https://www.who.int/initiatives/behealthy/physical-activity"
        linkText="Thử đi bộ nhanh"
        imageRightBot="https://cdn-icons-png.freepik.com/512/1173/1173414.png"
        pressedFunction={() => {console.log("Hehe");}}
      />

      <TaskBlock
        heading="Dữ liệu giấc ngủ của bạn trong LK"
        tutorialText="Sau khi kết nối thiết bị hoặc ứng dụng theo dõi giấc ngủ, bạn sẽ bắt đầu thấy dữ liệu giấc ngủ sau đêm đầu tiên"
        link="https://www.who.int/initiatives/behealthy/physical-activity"
        linkText="Tìm hiểu thêm"
        imageRightBot="https://cdn-icons-png.flaticon.com/512/1251/1251835.png"
        pressedFunction={() => {console.log("Hehe");}}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 8,
    fontFamily: 'Inter_500Medium',
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Màu của bóng chữ
    textShadowRadius: 2, // Độ mờ của bóng chữ
  }
});

export default HomeBody;
