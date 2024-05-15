import Storage from "expo-storage";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-elements";
import ChallengeBlock from "./ChallengeBlock";
import axios from "axios";
import { IP } from "../../constants/Constants";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../MainScreen/ThemeProvider";
import { getFormatedDate } from "react-native-modern-datepicker";

function ChallengeScreen() {
  const themeValue = useContext(ThemeContext);
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg"
  );
  const [challengeData, setChallengeData] = useState([]);
  useEffect(() => {
    const loading = async () => {
      const ava = await Storage.getItem({ key: "avatar" });
      setAvatar(ava);
    };
    loading();
  }, []);
  useEffect(() => {
    const loading = async () => {
      await axios
        .get(`http://${IP}:1510/getChallenge`, {})
        .then(function (response) {
          var data = response.data.data;
          // const today = new Date()
          // for(let i = 0 ; i < data.length ; i++){
            // const startDate = new Date(data['start_date'])
            // const endDate = new Date()
            // 0 : Sap ra mat
            // 1 : Dang dien ra
            // 2 : Da ket thuc
            // if(getFormatedDate(today, 'YYYY-MM-YY') < data[i]['start_date']){
            //   data[i]['status'] = 0
            // }
            // else if(getFormatedDate(today, 'YYYY-MM-YY') <= data[i]['end_date']){
            //   data[i]['status'] = 1
            // }
            // else{
            //   data[i]['status'] = 2
            // }
          // }
          data.sort(function(a, b) {
            return new Date(b.end_date) - new Date(a.end_date);
          });
          // console.log(data);
          setChallengeData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    loading();
  }, []);
  useEffect(() => {
    const saveInfo = async (key, value) => {
      await Storage.setItem({ key: key, value: value });
    };
    const loading = async () => {
      await axios
        .get(`http://${IP}:1510/getChallenge`, {})
        .then(async (response) => {
          const user_id = await Storage.getItem({ key: "user_id" });
          let data = response.data.data;
          for (let i = 0; i < data.length; i++) {
            let challenge_user_step = await Storage.getItem({
              key: `challenge_user_step${data[i].id}`,
            });
            let user_step_obj = JSON.parse(challenge_user_step);
            let totalUserSteps = 0;
            for (let j = 0; j < user_step_obj.length; j++) {
              if (user_step_obj[j]["user_id"] === user_id) {
                totalUserSteps = user_step_obj[j]["totalUserSteps"];
                break;
              }
            }
            data[i]["current_user_step"] = totalUserSteps;
            data[i]["all_user_step"] = user_step_obj;
          }
          data.sort(function(a, b) {
            return new Date(b.end_date) - new Date(a.end_date);
          });
          setChallengeData(data);
        })
        .catch(function (error) {
          console.log(error);
        });
      await axios
        .get(`http://${IP}:1510/getChallengeMap`, {})
        .then(function (response) {
          const data = response.data.data;
          for (let i = 0; i < data.length; i++) {
            saveInfo(
              (key = `line_map${data[i]["challenge_id"]}`),
              (value = JSON.stringify(data[i]["line_map"]))
            );
            saveInfo(
              (key = `url_map${data[i]["challenge_id"]}`),
              (value = data[i]["url_map"])
            );
            saveInfo(
              (key = `line_width_list_map${data[i]["challenge_id"]}`),
              (value = data[i]["line_width_list"])
            );
            saveInfo(
              (key = `total_line_length${data[i]["challenge_id"]}`),
              (value = toString(data[i]["total_line_length"]))
            );
            saveInfo(
              (key = `mile_stone_map${data[i]["challenge_id"]}`),
              (value = JSON.stringify(data[i]["mile_stone_map"]))
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    loading();
  }, []);
  return (
    <ScrollView style={[styles.container,themeValue.isDarkMode && {
      backgroundColor: '#202125'
    }]}>
      <View style={{ paddingTop: 60 }}>
        <Text
          style={[
            {
              color: "white",
              fontSize: 25,
              fontFamily: "Inter_600SemiBold",
              paddingLeft: 35,
            },
            styles.blackColor,
            themeValue.isDarkMode && {
              color: "#e2e3e7",
            },
          ]}
        >
          Together
        </Text>
        <View>
          <View
            style={{
              paddingLeft: 70,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
              paddingRight: 70,
              alignItems: "center",
            }}
          >
            <Avatar
              rounded
              size={50}
              source={{
                uri: avatar,
              }}
            />
            <View style={{ marginLeft: 50, alignItems: "center" }}>
              <Text
                style={[
                  styles.blackColor,
                  themeValue.isDarkMode && {
                    color: "#e2e3e7",
                  },
                ]}
              >
                Sơ cấp
              </Text>
              <Text
                style={[
                  styles.blackColor,
                  { fontFamily: "Inter_600SemiBold", fontSize: 18 },
                  themeValue.isDarkMode && {
                    color: "#e2e3e7",
                  },
                ]}
              >
                Cấp 1
              </Text>
            </View>
            <View style={{ marginLeft: 50, alignItems: "center" }}>
              <Text
                style={[
                  styles.blackColor,
                  themeValue.isDarkMode && {
                    color: "#e2e3e7",
                  },
                ]}
              >
                Bạn bè
              </Text>
              <Text
                style={[
                  styles.blackColor,
                  { fontFamily: "Inter_600SemiBold", fontSize: 18 },
                  themeValue.isDarkMode && {
                    color: "#e2e3e7",
                  },
                ]}
              >
                0
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(255,255,255)",
                marginLeft: 40,
                marginRight: 40,
                borderRadius: 30,
                marginTop: 20,
                elevation: 4
              },
              themeValue.isDarkMode && {
                backgroundColor: '#2d2d2f',
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 16,
                  fontFamily: "Inter_500Medium",
                  color: "black",
                  padding: 10,
                },
                themeValue.isDarkMode && {
                  color: "white",
                },
              ]}
            >
              Tạo thử thách
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {challengeData.map((data, index) => (
          <ChallengeBlock
            isDarkMode={themeValue.isDarkMode}
            key={index}
            name={data.name}
            steps={
              data["current_user_step"]
                ? parseInt(data["current_user_step"])
                : 0
            }
            target={data.target}
            image_url={data.url}
            thumbIcon={data.thumbImage}
            startDate={data['start_date']}
            endDate={data['end_date']}
            onPress={() =>
              navigation.navigate("ChallengeMap", {
                challenge_id: data.id,
                user_step: data["current_user_step"]
                  ? parseInt(data["current_user_step"])
                  : 0,
                target: data.target,
                milestone: data.milestone,
                total_line_length: data.total_line_length,
                all_user_step: data.all_user_step ? data.all_user_step : [],
              })
            }
          />
        ))}
        {/* <ChallengeBlock
          name="Sa mạc, tháng 4"
          target={1000}
          image_url={
            "https://t3.ftcdn.net/jpg/01/44/97/42/360_F_144974295_zwgoD2Z4wl22POM50B5W2045gDVEEDZ4.jpg"
          }
        /> */}
      </View>
    </ScrollView>
  );
}

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    paddingBottom: 30
    // alignItems: 'center'
  },
  blackColor: {
    color: "black",
  },
});
