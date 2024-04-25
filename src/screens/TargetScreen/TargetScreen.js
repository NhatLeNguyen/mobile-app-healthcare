import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import InputWithHeader from "../../components/InputWithHeader";
import { useContext, useEffect, useState } from "react";
import * as SQLite from "expo-sqlite/next";
import Storage from "expo-storage";
import { useToast } from "react-native-toast-notifications";
import { ThemeContext } from "../MainScreen/ThemeProvider";

const db = SQLite.openDatabaseAsync("health-care.db");

function TargetScreen() {
  // const [isDarkMode, setIsDarkMode] = useState("false");
  const themeValue = useContext(ThemeContext)
  const toast = useToast();
  const [disableButton, setDisableButton] = useState(true);
  const [steps, setSteps] = useState("0");
  const [heartStep, setHeartStep] = useState("0");
  const [weight, setWeight] = useState("0");
  const [height, setHeight] = useState("0");
  const [user_id, setUserId] = useState("1");
  const handleChangeMode = async () => {
    themeValue.setIsDarkMode((prev) => !prev)
    // await Storage.setItem({ key: "isDarkMode", value: check });
    // setIsDarkMode(check);
  };

  // useEffect(() => {
  //   const loading = async () => {
  //     const idm = await Storage.getItem({ key: "isDarkMode" });
  //     setIsDarkMode(idm);
  //   };
  //   loading();
  // }, []);
  useEffect(() => {
    const loading = async () => {
      const steps_target = await Storage.getItem({ key: `steps_target` });
      setSteps(steps_target);
      const heart_target = await Storage.getItem({ key: `heart_target` });
      setHeartStep(heart_target);
      const weight = await Storage.getItem({ key: `weight` });
      setWeight(weight);
      const height = await Storage.getItem({ key: `height` });
      setHeight(height);
      const id = await Storage.getItem({ key: `user_id` });
      setUserId(id);
    };
    loading();
  }, []);
  const saveChanges = async () => {
    if (steps === "" || heartStep === "" || weight === "" || height === "") {
      toast.hideAll();
      toast.show("Vui lòng điền đầy đủ thông tin", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (parseInt(steps) < 100) {
      toast.hideAll();
      toast.show("Số bước không đủ quy định, ít nhất 100", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (parseInt(heartStep) < 30) {
      toast.hideAll();
      toast.show("Số nhịp tim không đủ quy định, ít nhất 30", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (parseInt(weight) < 15) {
      toast.hideAll();
      toast.show("Cân nặng không đủ quy định, ít nhất 15kg", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (parseInt(height) < 100) {
      toast.hideAll();
      toast.show("Chiều cao không đủ quy định, ít nhất 100cm", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    (await db).runSync(
      "UPDATE user SET steps_target = ?,heart_target = ?,weight = ? ,height = ? WHERE user_id = ?",
      [
        parseInt(steps),
        parseInt(heartStep),
        parseInt(weight),
        parseInt(height),
        user_id,
      ]
    );
    await Storage.setItem({
      key: "steps_target",
      value: steps,
    });
    await Storage.setItem({
      key: "heart_target",
      value: heartStep,
    });
    await Storage.setItem({
      key: "weight",
      value: weight,
    });
    await Storage.setItem({
      key: "height",
      value: height,
    });
    setDisableButton(true);
    toast.hideAll();
    toast.show("Thay đổi thành công", {
      type: "success",
      offset: 50,
      animationType: "zoom-in",
    });
  };
  return (
    <ScrollView style={[styles.container, {backgroundColor: themeValue.isDarkMode === false ? 'white' : 'black'}]}>
      <Text
        style={{
          fontSize: 40,
          fontFamily: "Inter_500Medium",
          paddingLeft: 20,
          color: themeValue.isDarkMode === false ? 'black' : '#e2e3e7',
        }}
      >
        Hồ sơ
      </Text>
      <Text style={[styles.headerText, {color: themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}]}>Mục tiêu hoạt động</Text>
      <View style={[styles.lineStyle, {borderBottomColor:themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}]} />
      <View style={{ paddingLeft: 20, flexDirection: "row" }}>
        <InputWithHeader
          width={150}
          header="Bước"
          value={steps}
          headerColor={themeValue.isDarkMode === false ? 'black' : '#727377'}
          color={themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}
          onChange={(value) => {
            setSteps(value);
            setDisableButton(false);
          }}
        />
        <InputWithHeader
          style={{ marginLeft: 40 }}
          width={150}
          header="Điểm nhịp tim"
          value={heartStep}
          headerColor={themeValue.isDarkMode === false ? 'black' : '#727377'}
          color={themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}
          onChange={(value) => {
            setHeartStep(value);
            setDisableButton(false);
          }}
        />
        {/* <InputWithHeader
          isPicker={true}
          value="Nam"
          width={150}
          header="Giới tính"
          items={[
            { label: "Nam", value: "Nam" },
            { label: "Nữ", value: "Nữ" },
          ]}
        /> */}
      </View>
      <Text style={[styles.headerText, {color: themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}]}>Thông tin của bạn</Text>
      <View style={[styles.lineStyle, {borderBottomColor:themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}]} />
      <View style={{ paddingLeft: 20, flexDirection: "row" }}>
        <InputWithHeader
          width={150}
          header="Cân nặng"
          value={weight}
          headerColor={themeValue.isDarkMode === false ? 'black' : '#727377'}
          color={themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}
          onChange={(value) => {
            setWeight(value);
            setDisableButton(false);
          }}
          subText="kg"
        />
        <InputWithHeader
          style={{ marginLeft: 40 }}
          width={150}
          header="Chiều cao"
          value={height}
          headerColor={themeValue.isDarkMode === false ? 'black' : '#727377'}
          color={themeValue.isDarkMode === false ? 'black' : '#e2e3e7'}
          onChange={(value) => {
            setHeight(value);
            setDisableButton(false);
          }}
          subText="cm"
        />
      </View>
      <View
        style={{
          paddingLeft: 20,
          marginTop: 30,
          alignItems: "center",
          flexDirection: "row",
          
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_500Medium",
            color: themeValue.isDarkMode === false ? 'black' : '#e2e3e7'
          }}
        >
          Dark Mode
        </Text>
        <Switch
          trackColor={{ false: "black", true: "#e2e3e7" }}
          thumbColor={themeValue.isDarkMode === false ? "gray" : "#f2f2f2"}
          value={themeValue.isDarkMode}
          onValueChange={() => handleChangeMode()}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: disableButton ? "rgba(0,0,0,0.1)" : "black",
          },
          themeValue.isDarkMode && {
            backgroundColor: disableButton ? "rgba(255,255,255, 0.2)" : "white",
          }
        ]}
        onPress={() => {
          saveChanges();
        }}
        disabled={disableButton}
      >
        <Text
          style={[{
            color: disableButton ? "rgba(255,255,255,0.9)" : "white",
            // color:'black',
            fontFamily: "Inter_500Medium",
            backgroundColor: "transparent",
          }, themeValue.isDarkMode && {
              color: disableButton ? "rgba(255,255,255, 0.3)" : "black",
          }]}
        >
          Lưu thay đổi
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default TargetScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e3e7",
    paddingTop: 80,
    // marginTop: 80,
    flex: 1,
  },
  headerText: {
    color: "black",
    marginTop: 30,
    fontSize: 17,
    fontFamily: "Inter_500Medium",
    paddingLeft: 20,
  },
  lineStyle: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    // position: "absolute",
    // bottom: 50,
    // right: 25,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#1a9be8",
    marginTop: 110,
    marginLeft: 208,
  },
});
