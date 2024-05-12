import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialMedia from "../../components/SocialMedia";
// import * as SQLite from "expo-sqlite/next";
import * as SQLite from "expo-sqlite";
import { useToast } from "react-native-toast-notifications";
import { Storage } from "expo-storage";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { getFormatedDate } from "react-native-modern-datepicker";
// import * as MailComposer from "expo-mail-composer";
import axios from "axios";
import { IP } from "../../constants/Constants";
import CameraComponent from "../../components/camera/CameraComponent";
// import * as Nhaccuatui from 'nhaccuatui-api'

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

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

const LoginScreen = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState("");
  const [emailGetPass, setEmailGetPass] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const loading = async () => {
      const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/track/2468405595',
        headers: {
          'X-RapidAPI-Key': 'b079ba438emsh692e7774aa79897p1c07bcjsn5f7c36f38020',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log('\n\n\n\n',response.data);
      } catch (error) {
        console.error(error);
      }
      
    }
    loading();
  }, []);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.show("Vui lòng điền đầy đủ thông tin", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (validateEmail(email) === false) {
      toast.hideAll();
      toast.show("Email không đúng định dạng", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (validatePassword(password) === false) {
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

    const results = (await db).getAllSync(
      "select * from user where email = ?",
      [email]
    );
    if (results.length == 0) {
      toast.hideAll();
      toast.show("Tài khoản không tồn tại", {
        type: "warning",
        animationType: "zoom-in",
      });
      return;
    }
    const results1 = (await db).getAllSync(
      "select * from user where email = ? and password = ?",
      [email, password]
    );
    if (results1.length == 0) {
      toast.hideAll();
      toast.show("Mật khẩu không chính xác", {
        type: "warning",
        animationType: "zoom-in",
      });
      return;
    }
    let challenge_data = [];
    await axios
      .get(`http://${IP}:1510/getChallenge`, {})
      .then(function (response) {
        const data = response.data.data;
        challenge_data = data;
      })
      .catch(function (error) {
        console.log(error);
      });
    for (let i = 0; i < challenge_data.length; i++) {
      var startDate = new Date(challenge_data[i]["start_date"]);
      var endDate = new Date(challenge_data[i]["end_date"]);
      const userSteps = (await db).getAllSync(
        "select user_id,sum(steps) as totalUserSteps from practicehistory where date between ? and ? group by user_id order by totalUserSteps desc",
        [
          getFormatedDate(startDate, "YYYY-MM-DD"),
          getFormatedDate(endDate, "YYYY-MM-DD"),
        ]
      );
      for (let j = 0; j < userSteps.length; j++) {
        const url = (await db).getAllSync(
          "select avatar from user where user_id = ?",
          [userSteps[j]["user_id"]]
        );
        userSteps[j]["avatar"] = url[0]["avatar"];
      }
      // console.log(userSteps);
      await Storage.setItem({
        key: `challenge_user_step${challenge_data[i]["id"]}`,
        value: JSON.stringify(userSteps),
      });
      // await Storage.setItem({key: `challenge_target${challenge_data[i]['id']}`, value: toString(challenge_data[i]['target'])})
      // await Storage.setItem({key: `challenge_milestone${challenge_data[i]['id']}`, value: toString(challenge_data[i]['milestone'])})
    }

    toast.hideAll();
    toast.show("Đăng nhập thành công", {
      type: "success",
      animationType: "zoom-in",
    });
    // console.log(results1);
    for (let key of Object.keys(results1[0])) {
      await Storage.setItem({
        key: key,
        value: String(results1[0][key]),
      });
    }
    // Loading map
    await Storage.setItem({
      key: "isDarkMode",
      value: "false",
    });

    navigation.navigate("MainScreen");
  };

  const handleSendEmail = async () => {
    if (emailGetPass === "") {
      toast.show("Vui lòng điền email", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (validateEmail(emailGetPass) === false) {
      toast.hideAll();
      toast.show("Email không đúng định dạng", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    const results1 = (await db).getAllSync(
      "select password from user where email = ?",
      [emailGetPass]
    );
    if (results1.length === 0) {
      toast.hideAll();
      toast.show("Tài khoản chưa được đăng ký", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    axios
      .post(`http://${IP}:1510/send-email`, {
        to: emailGetPass,
        subject: "Lấy lại mật khẩu",
        text: `Mật khẩu của bạn là '${results1[0].password}'. Lưu ý bảo mật để tránh mất mật khẩu`,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // await MailComposer.composeAsync(
    //   {
    //     recipients: [emailGetPass],
    //     body: `Mật khẩu của bạn là '${results1[0].password}'. Lưu ý bảo mật để tránh mất mật khẩu`,
    //     subject: 'Lấy lại mật khẩu',
    //     isHtml: false
    //   }
    // )
  };
  return (
    <View style={styles.container}>
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
              width: "80%",
              height: 200,
              borderRadius: 10,
              backgroundColor: "#f5f5f5",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <Text style={[styles.welcomeText, { marginBottom: 20 }]}>
              Quên mật khẩu
            </Text>
            <TextInput
              placeholder={"Email"}
              style={styles.textInput}
              onChangeText={setEmailGetPass}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => handleSendEmail()}
            >
              <Text style={{ color: "white", fontFamily: "Inter_500Medium" }}>
                Gửi về mail
              </Text>
            </TouchableOpacity>
            <Pressable
              style={{ top: 8, right: 8, position: "absolute" }}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={25} color="black" />
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.welcomeText}>
        Chào mừng bạn quay lại, hãy cùng tập luyện nào!
      </Text>
      <Input
        style={styles.add}
        testID="emailInput"
        property1=""
        placeholder="Email"
        onChange={setEmail}
      />
      <Input
        style={styles.add}
        testID="passwordInput"
        property1=""
        placeholder="Mật khẩu"
        secureTextEntry={true}
        onChange={setPassword}
        isPassword={true}
      />
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleLogin()}>
        <Button testID="loginButton" property1="">
          Đăng nhập
        </Button>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text>Bạn chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.createAccount}>Đăng ký ngay !</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.socialMedia}>Hoặc Đăng nhập với </Text>
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
        disabled={this.state.isSigninInProgress}
      />
      ; */}
      <SocialMedia testID="socialMediaButtons" />
      <TouchableOpacity
        onPress={() => {
          print("hehe");
        }}
      ></TouchableOpacity>
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
    fontSize: 16,
    marginBottom: 70,
    fontWeight: "500",
    textAlign: "center",
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
  },
  createAccount: {
    // marginTop: 20,
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
  textInput: {
    justifyContent: "center",
    width: "90%",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    backgroundColor: "#DDE5FF",
    marginBottom: 10,
  },
  button: {
    width: "90%",
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
  add: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default LoginScreen;
