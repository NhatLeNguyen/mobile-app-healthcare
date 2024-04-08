import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialMedia from "../../components/SocialMedia";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    // Xử lý logic đăng ký tại đây (gọi API, lưu trữ dữ liệu, v.v.)
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <Text style={styles.welcomeText}>
        Tạo một tài khoản để có thể khám phá sức khỏe của bạn !
      </Text>
      <Input testID="emailInput" property1="" placeholder="Email" />
      <Input
        testID="passwordInput"
        property1=""
        placeholder="Mật khẩu"
        secureTextEntry={true}
        // isPassword={true}
      />
      <Input
        testID="passwordInputConfirm"
        property1=""
        placeholder="Nhập lại mật khẩu"
        secureTextEntry={true}
        // isPassword={true}
      />

      <Button testID="registerButton" property1="">
        Đăng ký
      </Button>
      <View style={{flexDirection:'row', marginTop: 20}}>
        <Text>Bạn đã có tài khoản?  </Text>
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
