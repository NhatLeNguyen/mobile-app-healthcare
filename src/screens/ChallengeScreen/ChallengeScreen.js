import Storage from "expo-storage";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-elements";
import ChallengeBlock from "./ChallengeBlock";
import axios from "axios";
import { IP } from "../../constants/Constants";
import { useNavigation } from "@react-navigation/native";

function ChallengeScreen() {
  const navigation = useNavigation()
  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg"
  );
  const [challengeData, setChallengeData] = useState([])
  useEffect(() => {
    const loading = async () => {
      const ava = await Storage.getItem({ key: "avatar" });
      setAvatar(ava);
    };
    loading();
  }, []);
  useEffect(() => {
    const loading =async () => {
    await axios
      .get(`http://${IP}:1510/getChallenge`, {
      })
      .then(function (response) {
        const data = response.data.data;
        console.log(data);
        setChallengeData(data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    loading()
  }, [])
  useEffect(() => {
    const saveInfo = async (key, value) => {
      await Storage.setItem({key: key, value: value})
    }
    const loading =async () => {
    await axios
      .get(`http://${IP}:1510/getChallenge`, {
      })
      .then(function (response) {
        const data = response.data.data;
        setChallengeData(data);
      })
      .catch(function (error) {
        console.log(error);
      });
      await axios
      .get(`http://${IP}:1510/getChallengeMap`, {
      })
      .then(function (response) {
        const data = response.data.data;
        
        for(let i = 0 ; i < data.length ; i++){
          saveInfo(key=`line_map${data[i]['challenge_id']}`, value=JSON.stringify(data[i]["line_map"]))
          saveInfo(key=`url_map${data[i]['challenge_id']}`, value=data[i]["url_map"])
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    loading()
  }, [])
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 60 }}>
        <Text
          style={[
            {
              color: "white",
              fontSize: 25,
              fontFamily: "Inter_600SemiBold",
              paddingLeft: 35,
            },
            styles.whiteColor,
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
              <Text style={styles.whiteColor}>Sơ cấp</Text>
              <Text
                style={[
                  styles.whiteColor,
                  { fontFamily: "Inter_600SemiBold", fontSize: 18 },
                ]}
              >
                Cấp 1
              </Text>
            </View>
            <View style={{ marginLeft: 50, alignItems: "center" }}>
              <Text style={styles.whiteColor}>Bạn bè</Text>
              <Text
                style={[
                  styles.whiteColor,
                  { fontFamily: "Inter_600SemiBold", fontSize: 18 },
                ]}
              >
                0
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#2d2d2f",
              marginLeft: 40,
              marginRight: 40,
              borderRadius: 30,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_500Medium",
                color: "white",
                padding: 10,
              }}
            >
              Tạo thử thách
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        {challengeData.map((data, index) => (
          <ChallengeBlock 
            key={data.id}
            name={data.name}
            steps={500}
            target={data.target}
            image_url={data.url}
            thumbIcon={data.thumbImage}
            onPress={() => navigation.navigate('ChallengeMap', {'challenge_id': data.id})}
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
    </View>
  );
}

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  whiteColor: {
    color: "white",
  },
});
