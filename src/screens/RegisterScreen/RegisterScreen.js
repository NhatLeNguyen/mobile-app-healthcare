import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialMedia from "../../components/SocialMedia";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import * as SQLite from "expo-sqlite/next";

const api_key = "4dbf11735e742379a68418241510cced7bcacc35";
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
  // console.log('Email: ',email);
  // console.log('Pass: ', password);
  // console.log("Repass: ", repassword);
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
    let status = "invalid";
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
    await axios
      .get(
        `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${api_key}`
      )
      .then(function (response) {
        status = response.data.data.status;
        if (status === "invalid") {
          toast.hide(id);
          toast.show("Email không tồn tại", {
            type: "danger",
            animationType: "zoom-in",
          });
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    const results = (await db).getAllSync(
      "select * from user where email = ?",
      [email]
    );
    if(results.length !== 0){
      toast.hide(id)
      toast.show("Tài khoản đã tồn tại", {
        type: "warning",
        animationType: "zoom-in",
        duration: 2000,
      });
      return ;
    }
    if (status == "valid") {
      toast.hide(id);
      toast.show("Đăng kí thành công", {
        type: "success",
        animationType: "zoom-in",
        duration: 2000,
      });

      setTimeout(() => {
        toast.show("Đăng nhập với tài khoản mới nào !!", {
          type: "success",
          animationType: "zoom-in",
          duration: 2000,
        });
        navigation.navigate("LoginScreen");
      }, 2000);
      (await db).runSync(
        "insert into user(email, password) values(?, ?)",
        [email, password]
      );
    }
  };

  return (
    <View style={styles.container}>
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
        // isPassword={true}
      />
      <Input
        testID="passwordInputConfirm"
        property1=""
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
        onChange={setRepassword}
        // isPassword={true}
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
});
export default RegisterScreen;
