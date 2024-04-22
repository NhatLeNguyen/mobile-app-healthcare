import Storage from "expo-storage";
import { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import DrawAvatar from "./DrawAvatar";
import DrawMileStone from "./DrawMileStone";

const LINE_HEIGHT = 20;

const LINE_MAP = [
  { width: 270, height: LINE_HEIGHT, top: 40, left: 0 },
  {
    width: LINE_HEIGHT,
    height: 100,
    top: 40,
    left: 270,
    borderTopRightRadius: 30,
  },
  {
    width: 200,
    height: LINE_HEIGHT,
    top: 140,
    left: 70 + LINE_HEIGHT,
    borderBottomRightRadius: 30,
  },
  {
    width: LINE_HEIGHT,
    height: 250,
    top: 140,
    left: 70,
    borderTopLeftRadius: 30,
  },
  {
    width: 100,
    height: LINE_HEIGHT,
    top: 390,
    left: 70,
    borderBottomLeftRadius: 30,
  },
  {
    width: LINE_HEIGHT,
    height: 120,
    top: 390 - 120 + LINE_HEIGHT,
    left: 170,
    borderBottomRightRadius: 30,
  },
  {
    width: 250,
    height: LINE_HEIGHT,
    top: 390 - 119,
    left: 170,
    borderTopLeftRadius: 30,
  },
];

function ChallengeMap({ route }) {
  const [line_map, setMapInfo] = useState([]);
  const [url_map, setUrlMap] = useState();
  const [mileStoneMap, setMileStoneMap] = useState([])
  const [lineWidthList, setLineWidthList] = useState([]);
  const [mile, setMile] = useState(0)
  const [steps, setSteps] = useState(0);
  const [target, setTarget] = useState(1);
  const [totalLineLength, setTotalLineLength] = useState(0);
  const [processLineMap, setProcessLineMap] = useState([]);
  const [topAvatar, setTopAvatar] = useState(0);
  const [leftAvatar, setLeftAvatar] = useState(0);
  const [isOddStop, setIsOddStop] = useState(true);
  const [avatarList, setAvatarList] = useState([]);
  const [rank , setRank] = useState(1)
  let iter = 0;
  useEffect(() => {
    const loading = async () => {
      const linMap = await Storage.getItem({
        key: `line_map${route.params["challenge_id"]}`,
      });
      const url = await Storage.getItem({
        key: `url_map${route.params["challenge_id"]}`,
      });
      const lineList = await Storage.getItem({
        key: `line_width_list_map${route.params["challenge_id"]}`,
      });
      const user_id = await Storage.getItem({
        key: `user_id`,
      });
      let linMapClean = linMap.replace(/\\/g, "");
      linMapClean = linMapClean.slice(1, -1);
      let linMapParse = JSON.parse(linMapClean);
      setMapInfo(linMapParse);
      setUrlMap(url);
      const lineListParse = JSON.parse(lineList);
      setLineWidthList(lineListParse);
      setSteps(route.params["user_step"]);
      setTarget(route.params["target"]);
      setTotalLineLength(route.params["total_line_length"]);

      let curPos = Math.floor(
        (route.params["user_step"] / route.params["target"]) *
          route.params["total_line_length"]
      );
      let processMap = [];
      for (let i = 0; i < lineListParse.length; i++) {
        if (lineListParse[i] >= curPos) {
          if (i % 2 == 0) {
            processMap.push({ ...linMapParse[i], width: curPos });
            setTopAvatar(linMapParse[i].top);
            setLeftAvatar(linMapParse[i].left + curPos);
            setIsOddStop(0);
            break;
          } else {
            processMap.push({ ...linMapParse[i], height: curPos });
            setTopAvatar(linMapParse[i].top + curPos);
            setLeftAvatar(linMapParse[i].left);
            setIsOddStop(1);
            break;
          }
        } else {
          processMap.push(linMapParse[i]);
          curPos -= lineListParse[i];
        }
      }

      let all_user_step = route.params["all_user_step"];
      let avtList = [];
      for (let i = 0; i < all_user_step.length; i++) {
        if(all_user_step[i]['user_id'] === user_id){
          setRank(i + 1)
        }
        let curPos = Math.floor(
          (all_user_step[i]['totalUserSteps'] / route.params["target"]) *
            route.params["total_line_length"]
        );
        let top = 0;
        let left = 0;
        let isOdd = 1;
        for (let i = 0; i < lineListParse.length; i++) {
          if (lineListParse[i] >= curPos) {
            if (i % 2 == 0) {
              top = linMapParse[i].top;
              left = linMapParse[i].left + curPos
              isOdd = 0
              break;
            } else {
              top = linMapParse[i].top + curPos;
              left = linMapParse[i].left
              isOdd = 1
              break;
            }
          } else {
            curPos -= lineListParse[i];
          }
        }
        avtList.push({top: top, left: left, avatar: all_user_step[i]['avatar'], isOddStop: isOdd})
      }
      const mileMap = await Storage.getItem({
        key: `mile_stone_map${route.params["challenge_id"]}`,
      });
      let mileMapClean = mileMap.replace(/\\/g, "");
      mileMapClean = mileMapClean.slice(1, -1);
      let mileMapParse = JSON.parse(mileMapClean);
      setMileStoneMap(mileMapParse)
      setAvatarList(avtList)
      setProcessLineMap(processMap);
    };
    loading();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ marginTop: 0 }}>
        <Image
          source={{
            uri: url_map,
          }}
          style={{ width: "100%", height: 450, borderRadius: 30 }}
        />
        {line_map.map((props, index) => (
          <View key={index} style={[styles.line, props]}></View>
        ))}
        {processLineMap.map((props, index) => (
          <View key={index} style={[styles.process_line, props]}></View>
        ))}
        {mileStoneMap.map((props, index) => (
          <DrawMileStone key={index} top={props.top} left={props.left} isOddStop={props.isOddStop} number={props.number}/>
        ))}
        {avatarList.map((props, index) => (
          <DrawAvatar key={index} topAvatar={props.top} leftAvatar={props.left} isOddStop={props.isOddStop} avatar={props.avatar}/>
        ))} 
        {/* <View style={{backgroundColor:'red', position:'absolute', left: 100, top: 40, width: 5, height: LINE_HEIGHT}}/> */}
      </View>
      <View
        style={{
          backgroundColor: "#171719",
          flex: 1,
          marginTop: 20,
          borderRadius: 30,
          flexDirection: "row",
        }}
      >
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Thành tích</Text>
          <Text>{}</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1246/1246381.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={{ color: "gray" }}>Tổng số bước</Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
            }}
          >
            {steps > 1000 ? steps / 1000 : steps}
          </Text>
        </View>
        <View
          style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>Xếp hạng</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.freepik.com/256/6020/6020401.png",
            }}
            style={{ width: 50, height: 50 }}
          />

          <Text style={{ color: "gray" }}>Thứ hạng của bạn</Text>
          <Text
            style={{
              color: "white",
              fontFamily: "Inter_600SemiBold",
              fontSize: 18,
            }}
          >
            {rank}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ChallengeMap;

const styles = StyleSheet.create({
  line: {
    backgroundColor: "#fafcfb",
    position: "absolute",
  },
  process_line: {
    backgroundColor: "#ffcd2c",
    position: "absolute",
  },
});
