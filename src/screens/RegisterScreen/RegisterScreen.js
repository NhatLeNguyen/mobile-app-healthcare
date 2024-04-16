import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialMedia from "../../components/SocialMedia";
import { useToast } from "react-native-toast-notifications";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as SQLite from "expo-sqlite/next";

import * as ImagePicker from "expo-image-picker";
import { imagesDataURL } from "../../constants/setting/data";
import { FONTS, COLORS } from "../../constants/setting";
import { MaterialIcons } from "@expo/vector-icons";
import SettingScreen from "../Setting/SettingScreen";
import EditProfile from "../Setting/EditProfile";
import InputWithHeader from "../../components/InputWithHeader";

const api_key = "fce0fdaca315e959bb801ec7aade8f433b9e6def";
const db = SQLite.openDatabaseAsync("health-care.db");

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

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

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dobirth, setDobirth] = useState("");
  const [sex, setSex] = useState("Nam");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const handleRegister = async () => {
    if (email === "" || repassword === "" || password === "") {
      toast.show("Vui lòng điền đầy đủ thông tin", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (validateEmail(email) === false) {
      toast.show("Email không đúng định dạng", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (validatePassword(password) === false) {
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
    if (password !== repassword) {
      console.log("???");
      toast.show("Mật khẩu không khớp", {
        type: "danger",
        animationType: "zoom-in",
      });
      return;
    }
    let status = "valid";
    let id = toast.show("", {
      animationType: "zoom-in",
      icon: (
        <ActivityIndicator
          size={"large"}
          color="#408ee0"
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
      ),
      textStyle: { color: "#408ee0", margin: 0 },
      normalColor: "none",
      placement: "center",
    });
    // await axios
    //   .get(
    //     `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${api_key}`
    //   )
    //   .then(function (response) {
    //     status = response.data.data.status;
    //     if (status === "invalid") {
    //       toast.hide(id);
    //       toast.show("Email không tồn tại", {
    //         type: "danger",
    //         animationType: "zoom-in",
    //       });
    //       return;
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const results = (await db).getAllSync(
      "select * from user where email = ?",
      [email]
    );
    if (results.length !== 0) {
      toast.hide(id);
      toast.show("Tài khoản đã tồn tại", {
        type: "warning",
        animationType: "zoom-in",
        duration: 2000,
      });
      return;
    }
    if (status == "valid") {
      setTimeout(() => {
        setShowModal(true);
        toast.show("Vui lòng điền thông tin cá nhân", {
          type: "success",
          animationType: "zoom-in",
        });
      }, 2000);
      // (await db).runSync("insert into user(email, password, steps_target, heart_target) values(?, ?, ?, ?)", [
      //   email,
      //   password, 500, 50,
      // ]);
    }
  };
  const handleLastSubmit = async () => {
    // if (
    //   name === "" ||
    //   phone === "" ||
    //   address === "" ||
    //   dobirth === "" ||
    //   sex === "" ||
    //   weight === "" ||
    //   height === ""
    // ) {
    //   console.log('vll');
    //   toast.hideAll()
    //   toast.show("Vui lòng điền đầy đủ thông tin", {
    //     type: "danger",
    //     offset: 50,
    //     animationType: "zoom-in",
    //   });
    //   return;
    // }
    let image = selectedImage !== 'https://i.ibb.co/W29btXp/profile.jpg' ? selectedImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
    console.log('image: ', image);

    (await db).runSync(
      "insert into user(password, name, phone, address, dobirth, email, weight, height, avatar, steps_target, heart_target, sex) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [password, name, phone, address, dobirth, email, parseInt(weight), parseInt(height), image, 500, 50, sex]
    );
    setShowModal(false)
    toast.hideAll();
    toast.show("Đăng nhập với tài khoản mới nào !!", {
      type: "success",
      animationType: "zoom-in",
      duration: 4000,
    });
    toast.show("Đăng kí thành công", {
      type: "success",
      animationType: "zoom-in",
      duration: 4000,
    });
    navigation.navigate("LoginScreen");

  };

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const ModalContent = (
    <View style={styles.modalContainer}>
      {/* <Text>Điền thông tin cá nhân để tiếp tục !</Text> */}
      <View
        style={{
          alignItems: "center",
          marginVertical: 22,
        }}
      >
        <TouchableOpacity onPress={handleImageSelection}>
          <Image
            source={{ uri: selectedImage }}
            style={{
              height: 170,
              width: 170,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 10,
              zIndex: 9999,
            }}
          >
            <MaterialIcons
              name="photo-camera"
              size={32}
              color={COLORS.primary}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Input
        testID="nameInput"
        property1=""
        placeholder="Họ và tên"
        onChange={setName}
      />
      <Input
        testID="phoneInput"
        property1=""
        placeholder="Số điện thoại"
        onChange={setPhone}
        isNumberic={true}
      />
      <Input
        testID="addressInput"
        property1=""
        placeholder="Địa chỉ"
        onChange={setAddress}
      />
      <Input
        testID="dobirthInput"
        property1=""
        placeholder="Ngày sinh"
        onChange={setDobirth}
      />
      {/* <Input
        testID="sexInput"
        property1=""
        placeholder="Giới tính"
        onChange={setSex}
      /> */}
      <InputWithHeader
        isPicker={true}
        value="Nam"
        width={150}
        items={[
          { label: "Nam", value: "Nam" },
          { label: "Nữ", value: "Nữ" },
        ]}
        style={{
          width: "100%",
          backgroundColor: "#DDE5FF",
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        textProps={{ color: "gray" }}
        onChange={setSex}
      />
      <Input
        testID="weightInput"
        property1=""
        placeholder="Chiều cao (cm)"
        onChange={(value) => setHeight(parseInt(value))}
        isNumberic={true}
      />
      <Input
        testID="heightInput"
        property1=""
        placeholder="Cân nặng (kg)"
        onChange={(value) => setWeight(parseInt(value))}
        isNumberic={true}
      />
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#132A7A",
          borderRadius: 15,
          // marginLeft: 130,
          // marginRight: 130,
        }}
        onPress={() => {
          handleLastSubmit();
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Inter_600SemiBold",
            padding: 10,
            color: "white",
          }}
        >
          Lưu
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Modal
        transparent
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
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
              width: "90%",
              height: 500,
              borderRadius: 10,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <EditProfile />
            <Pressable
              style={{ top: 8, right: 8, position: "absolute" }}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={25} color="black" />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <Text style={styles.title}>Đăng ký</Text>
      <Text style={styles.welcomeText}>
        Tạo một tài khoản để có thể khám phá sức khỏe của bạn !
      </Text>
      <Input
        testID="emailInput"
        property1=""
        placeholder="Email"
        onChange={setEmail}
      />
      <Input
        testID="passwordInput"
        property1=""
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChange={setPassword}
        isPassword={true}
      />
      <Input
        testID="passwordInputConfirm"
        property1=""
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
        onChange={setRepassword}
        isPassword={true}
      />
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleRegister()}>
        <Button testID="registerButton" property1="">
          Đăng ký
        </Button>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>Bạn đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.createAccount}>Đăng nhập ngay !</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.socialMedia}>Hoặc Đăng nhập với </Text>
      <SocialMedia testID="socialMediaButtons" />

      <TouchableOpacity
        onPress={() => {
          print("hehe");
        }}
      ></TouchableOpacity>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>{ModalContent}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 40, // or a larger size that fits your design
    marginBottom: 20,
    fontWeight: "700",
    color: "#132A7A",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "500",
  },
  createAccount: {
    fontWeight: "700",
  },

  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "right",
    textDecorationLine: "underline",
  },
  socialMedia: {
    marginTop: 10,
    marginBottom: 10,
    opacity: 0.5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    elevation: 5,
  },
});
export default RegisterScreen;
