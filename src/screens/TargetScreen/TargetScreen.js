import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputWithHeader from "../../components/InputWithHeader";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite/next";
import Storage from "expo-storage";

const db = SQLite.openDatabaseAsync("health-care.db");

function TargetScreen() {
    const [disableButton, setDisableButton] = useState(true)
    const [steps, setSteps] = useState('0')
    const [heartStep, setHeartStep] = useState('0')
    const [weight, setWeight] = useState('0')
    const [height, setHeight] = useState('0')
    useEffect(() => {
      const loading = async () => {
        const steps_target = await Storage.getItem({ key: `steps_target` });
        setSteps(steps_target);
        const heart_target = await Storage.getItem({ key: `heart_target` });
        setHeartStep(heart_target);
      }
      loading()
    },[])
    const saveChanges = async () => {
      (await db).runSync('UPDATE user SET steps_target = ?,heart_target = ? WHERE user = ?', [500, 50, '1'])
    }
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 30, fontFamily: "Inter_500Medium", paddingLeft: 20 }}
      >
        Hồ sơ
      </Text>
      <Text style={styles.headerText}>Mục tiêu hoạt động</Text>
      <View style={styles.lineStyle} />
      <View style={{ paddingLeft: 20, flexDirection: "row" }}>
        <InputWithHeader
          width={150}
          header="Bước"
          value={steps}
          color="#1a9be8"
          onChange={setSteps}
        />
        <InputWithHeader
          style={{ marginLeft: 40 }}
          width={150}
          header="Điểm nhịp tim"
          value={heartStep}
          color="green"
          onChange={setHeartStep}
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
      <Text style={styles.headerText}>Thông tin của bạn</Text>
      <View style={styles.lineStyle} />
      <View style={{ paddingLeft: 20, flexDirection: "row" }}>
        <InputWithHeader
          width={150}
          header="Cân nặng"
          value={weight}
          color="#1a9be8"
          onChange={setWeight}
        />
        <InputWithHeader
          style={{ marginLeft: 40 }}
          width={150}
          header="Chiều cao"
          value={height}
          color="green"
          onChange={setHeight}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button,{backgroundColor: disableButton ? '#7a7e82' : "#1a9be8"}]}
        onPress={() => {
          // setDisableButton(true);
          // saveChanges()
        }}
        // disabled={enableButton}
      >
        {/* <FontAwesome
          name="exchange"
          size={18}
          color="#90D5EC"
          style={{
            position: "absolute",
            // left: 10,
            left: 0,
            borderRightWidth: 2,
            borderRightColor: "white",
            padding: 10,
          }}
        /> */}
        <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>
          Lưu thay đổi
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TargetScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1
    // paddingLeft: 20,
  },
  headerText: {
    marginTop: 30,
    fontSize: 14,
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
    position:'absolute',
    bottom: 50,
    right: 25,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#1a9be8",

  },
});
