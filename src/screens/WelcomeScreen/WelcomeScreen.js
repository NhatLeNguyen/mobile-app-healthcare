import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../../components/Button";

const WelcomeScreen = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLogin = () => {
    // Xử lý logic đăng nhập
  };

  const handleRegister = () => {
    // Xử lý logic đăng ký
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logolinhtinh.png")}
        style={[styles.image, { opacity: imageLoaded ? 1 : 0.5 }]}
        onLoad={() => setImageLoaded(true)}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Chào mừng!</Text>
        <Text style={styles.description}>
          Hãy bắt đầu hành trình của bạn ngay hôm nay
        </Text>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginButton}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerButton}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1F41BB",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default WelcomeScreen;
