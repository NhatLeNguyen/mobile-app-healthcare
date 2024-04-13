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
  SafeAreaView,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import { useToast } from "react-native-toast-notifications";
import { Storage } from "expo-storage";
import * as SQLite from "expo-sqlite/next";

const db = SQLite.openDatabaseAsync("health-care.db");

function validatePassword(password) {
  const minLength = 8;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );

  if (
    password.length >= minLength &&
    (hasUpperCase || hasLowerCase) &&
    hasNumber
  ) {
    return true; // Password is valid
  } else {
    return false; // Password is invalid
  }
}

function HomeHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [email, setEmail] = useState("");
  const [passwordFromStorage, setPasswordFromStorage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const navigation = useNavigation();
  const toast = useToast();
  useEffect(() => {
    const loading = async () => {
      const item = await Storage.getItem({ key: `email` });
      setEmail(item);
      const pass = await Storage.getItem({ key: `password` });
      setPasswordFromStorage(pass);
    };
    loading();
  }, []);

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  const handleLogout = () => {
    toast.hideAll();
    toast.show("Đăng xuất thành công", {
      type: "success",
      offset: 50,
      animationType: "zoom-in",
    });
    navigation.navigate("LoginScreen");
  };
  const handleChangePassword = async () => {
    if (password === "" || newPassword === "" || reNewPassword === "") {
      toast.hideAll();
      toast.show("Vui lòng điền đầy đủ thông tin", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (newPassword !== reNewPassword) {
      toast.hideAll();
      toast.show("Mật khẩu mới không khớp", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }

    if (validatePassword(newPassword) === false) {
      toast.hideAll();
      toast.show("Ít nhất 8 kí tự, phải có chữ cái và số", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      toast.show("Mật khẩu không hợp lệ", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }

    if (password !== passwordFromStorage) {
      toast.hideAll();
      toast.show("Mật khẩu không chính xác", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    (await db).runAsync("update user set password = ? where email = ?", [
      newPassword,
      email,
    ]);
    await Storage.setItem({
      key: `password`,
      value: newPassword,
    });
    toast.hideAll();
    toast.show("Đổi mật khẩu thành công", {
      type: "success",
      offset: 50,
      animationType: "zoom-in",
    });
    setIsChangePasswordModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent
        animationType="fade"
        visible={isChangePasswordModalVisible}
        onRequestClose={() => setIsAccountModalVisible(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 50,
          }}
        >
          <View
            style={{
              width: "80%",
              height: 350,
              borderRadius: 10,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <Text style={[styles.welcomeText, { marginBottom: 20 }]}>
              Đổi mật khẩu
            </Text>
            <Input
              style={styles.textInput}
              testID="passwordInput"
              property1=""
              placeholder="Mật khẩu cũ"
              secureTextEntry={true}
              onChange={setPassword}
              isPassword={true}
            />
            <Input
              style={styles.textInput}
              testID="passwordInput"
              property1=""
              placeholder="Mật khẩu mới"
              secureTextEntry={true}
              onChange={setNewPassword}
              isPassword={true}
            />
            <Input
              style={styles.textInput}
              testID="passwordInput"
              property1=""
              placeholder="Nhập lại mật khẩu mới"
              secureTextEntry={true}
              onChange={setReNewPassword}
              isPassword={true}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => handleChangePassword()}
            >
              <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>
                Đổi mật khẩu
              </Text>
            </TouchableOpacity>
            <Pressable
              style={{ top: 8, right: 8, position: "absolute" }}
              onPress={() => setIsChangePasswordModalVisible(false)}
            >
              <Ionicons name="close" size={25} color="black" />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <Modal
        transparent
        animationType="fade"
        visible={isAccountModalVisible}
        // style={{height: 80, flex: 0.5 }}
        onRequestClose={() => setIsAccountModalVisible(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 50,
            // backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <View
            style={{
              width: "90%",
              // height: "70%",
              height: 470,
              borderRadius: 20,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <Image
              source={{
                uri: "https://wallpaper-house.com/data/out/7/wallpaper2you_152770.jpg",
              }}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                borderRadius: 20,
              }}
            />
            <Avatar
              rounded
              size={100}
              source={{
                uri: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=sph",
              }}
            />
            <Text style={styles.welcomeText}>Trần Phúc Khang</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => {
                navigation.navigate("EditProfile");
                setIsAccountModalVisible(false);
              }}
            >
              <FontAwesome
                name="user"
                size={23}
                color="#F1F1F1"
                style={{
                  position: "absolute",
                  // left: 10,
                  left: 0,
                  borderRightWidth: 2,
                  borderRightColor: "white",
                  padding: 8,
                  paddingRight: 14,
                }}
              />
              <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>
                Thông tin cá nhân
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => {
                setIsChangePasswordModalVisible(true);
              }}
            >
              <FontAwesome
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
              />
              <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>
                Đổi mật khẩu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => handleLogout()}
            >
              <MaterialIcons
                name="logout"
                size={18}
                color="red"
                style={{
                  position: "absolute",
                  // left: 10,
                  left: 0,
                  borderRightWidth: 2,
                  borderRightColor: "white",
                  padding: 10,
                }}
              />
              <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
            <Pressable
              style={{ top: 8, right: 8, position: "absolute" }}
              onPress={() => setIsAccountModalVisible(false)}
            >
              <Ionicons name="close" size={25} color="black" />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity
        style={{ paddingTop: 5, marginRight: 10 }}
        onPress={() => handleModal()}
        activeOpacity={0.5}
      >
        <Ionicons name="information-circle-outline" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsAccountModalVisible(true)}
      >
        <Avatar
          rounded
          size={40}
          source={{
            uri: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=sph",
          }}
        />
      </TouchableOpacity>
      <Modal
        transparent
        animationType="fade"
        visible={isModalVisible}
        // style={{ height: 150, flex: 0.5 }}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Swiper style={styles.wrapper} showsButtons={false}>
              <View style={styles.slide1}>
                <View>
                  <Text style={styles.textHeader}>
                    Theo dõi hoạt động bằng Google Fit
                  </Text>
                </View>
                <View style={styles.body}>
                  <FontAwesome name="heartbeat" size={30} color={"green"} />
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    Điểm nhịp tim
                  </Text>
                  <Text style={styles.bodyText}>
                    Chọn tốc độ để ghi điểm và chinh phục mục tiêu này
                  </Text>

                  <Ionicons
                    name="footsteps"
                    size={30}
                    color={"blue"}
                    style={{ paddingTop: 25 }}
                  />
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>Bước</Text>
                  <Text style={styles.bodyText}>
                    Hãy chăm chỉ vận động để đạt được mục tiêu này
                  </Text>
                  <Text
                    style={[
                      styles.lastText,
                      {
                        marginTop: 25,
                      },
                    ]}
                  >
                    Cùng với tính năng điếm số bước, LK tính điểm nhịp tim khi
                    bạn nỗ lực tập luyện
                  </Text>
                </View>
              </View>

              <View style={styles.slide2}>
                <View>
                  <Text style={styles.textHeader}>Cách ghi điểm nhịp tim</Text>
                </View>
                <View style={styles.body}>
                  <FontAwesome
                    name="heartbeat"
                    size={100}
                    color={"green"}
                    style={{ marginTop: 80 }}
                  />
                  <Text
                    style={[
                      styles.lastText,
                      {
                        marginTop: 70,
                      },
                    ]}
                  >
                    Ghi điểm cho hoạt động làm tăng nhịp tim như đi bộ nhanh,
                    đạp xe và bài tập cường độ cao ngắt quãng (HIIT)
                  </Text>
                </View>
              </View>
              <View style={styles.slide3}>
                <View>
                  <Text style={styles.textHeader}>
                    Một cách đơn giản để sống khỏe
                  </Text>
                </View>
                <View style={styles.body}>
                  <Image
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/1991px-WHO_logo.svg.png",
                    }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text
                    style={[
                      styles.lastText,
                      {
                        marginTop: 30,
                      },
                    ]}
                  >
                    Mục tiêu hàng tuần của bạn được đưa ra được dựa trên mức độ
                    hoạt động thể chất mà Tổ chứ Y tế Thế giới khuyến nghị.
                  </Text>
                  <Text
                    style={[
                      styles.lastText,
                      {
                        marginTop: 20,
                      },
                    ]}
                  >
                    Khi đạt 150 Điểm nhịp tim mỗi tuần, bạn có thể ngủ ngon hơn,
                    có tinh thần sảng khoái hơn và kéo dài tuổi thọ.
                  </Text>
                </View>
              </View>
            </Swiper>
            <Pressable
              style={{ top: 5, right: 5, position: "absolute" }}
              onPress={() => handleModal()}
            >
              <Ionicons name="close" size={25} color="gray" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 5,
    right: 10,
    flexDirection: "row",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    width: "85%",
    height: "80%",
    elevation: 5,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 1,
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 1,
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 1,
  },
  textHeader: {
    fontSize: 25,
    textAlign: "center",
  },
  body: {
    marginTop: 25,
    alignItems: "center",
    textAlign: "center",
  },
  bodyText: {
    textAlign: "center",
    color: "gray",
    paddingLeft: 30,
    paddingRight: 30,
  },
  lastText: {
    textAlign: "center",
    fontSize: 17,
    paddingLeft: 3,
    paddingRight: 3,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 100,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Inter_500Medium",
  },
  button: {
    width: "80%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderStartColor: "red",
    borderEndColor: "green",
    borderRadius: 5,
    // backgroundColor: "black",
    backgroundColor: "#7a7e82",
    marginTop: 15,
  },
  textInput: {
    justifyContent: "center",
    width: "90%",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    backgroundColor: "#DDE5FF",
    marginBottom: 0,
  },
});

export default HomeHeader;
