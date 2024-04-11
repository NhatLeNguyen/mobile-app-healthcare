import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialMedia from "../../components/SocialMedia";
import * as SQLite from "expo-sqlite/next";
import { useToast } from "react-native-toast-notifications";
import { Storage } from 'expo-storage'
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
  const navigation = useNavigation();

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
    toast.hideAll();
    toast.show("Đăng nhập thành công", {
      type: "success",
      animationType: "zoom-in",
    });
    await Storage.setItem({
      key: `email`,
      value: email
    })
    await Storage.setItem({
      key: `password`,
      value: password
    })
    navigation.navigate("MainScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.welcomeText}>
        Chào mừng bạn quay lại, hãy cùng tập luyện nào!
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
      <TouchableOpacity
        onPress={() => {
          console.log("Quen mk");
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
});

export default LoginScreen;
