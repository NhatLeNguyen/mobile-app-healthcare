import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
//components
import Input from "../../components/Input";
import Button from "../../components/Button";
import SocialMedia from "../../components/SocialMedia";

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.welcomeText}>
        Chào mừng bạn quay lại, hãy cùng tập luyện nào!
      </Text>
      <Input testID="emailInput" property1="" placeholder="Email" />
      <Input
        testID="passwordInput"
        property1=""
        placeholder="Mật khẩu"
        secureTextEntry={true}
        // isPassword={true}
      />
      <TouchableOpacity
        onPress={() => {
          print("Quen mk");
        }}
      >
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <Button testID="loginButton" property1="">
        Đăng nhập
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.createAccount}>Đăng ký ngay !</Text>
      </TouchableOpacity>

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
    fontSize: 16,
    marginBottom: 70,
    fontWeight: "500",
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 10,
  },
  createAccount: {
    marginTop: 20,
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

export default LoginPage;
