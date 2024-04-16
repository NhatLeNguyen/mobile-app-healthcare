import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import InputWithHeader from "../../components/InputWithHeader";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite/next";
import Storage from "expo-storage";
import { useToast } from "react-native-toast-notifications";

const db = SQLite.openDatabaseAsync("health-care.db");

function TargetScreen() {
  const toast = useToast();
  const [disableButton, setDisableButton] = useState(true);
  const [steps, setSteps] = useState("0");
  const [heartStep, setHeartStep] = useState("0");
  const [weight, setWeight] = useState("0");
  const [height, setHeight] = useState("0");
  const [user_id ,setUserId] = useState('1')
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
      [parseInt(steps), parseInt(heartStep),parseInt(weight), parseInt(height),user_id]
    );
    await Storage.setItem({
      key: 'steps_target',
      value: steps,
    });
    await Storage.setItem({
      key: 'heart_target',
      value: heartStep,
    });
    await Storage.setItem({
      key: 'weight',
      value: weight,
    });
    await Storage.setItem({
      key: 'height',
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
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          fontFamily: "Inter_500Medium",
          paddingLeft: 20,
          color: "black",
        }}
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
          color="green"
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
      <Text style={styles.headerText}>Thông tin của bạn</Text>
      <View style={styles.lineStyle} />
      <View style={{ paddingLeft: 20, flexDirection: "row" }}>
        <InputWithHeader
          width={150}
          header="Cân nặng"
          value={weight}
          color="#1a9be8"
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
          color="green"
          onChange={(value) => {
            setHeight(value);
            setDisableButton(false);
          }}
          subText="cm"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: disableButton ? "rgba(0,0,0,0.1)" : "black",
          },
        ]}
        onPress={() => {
          saveChanges();
        }}
        disabled={disableButton}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Inter_500Medium",
            backgroundColor: "transparent",
          }}
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
    backgroundColor: "white",
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
    marginTop: 190,
    marginLeft: 208,
  },
});