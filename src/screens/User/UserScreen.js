import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function SidebarItem({ icon, label, onPress, selected }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuItem, selected && styles.menuItemSelected]}
    >
      <AntDesign name={icon} size={30} color="black" />
      <Text
        style={[styles.sidebarItem, selected && styles.sidebarItemSelected]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function UserScreen() {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Profile":
        return <Text>Profile Content</Text>;
      case "Change Password":
        return <Text>Change Password Content</Text>;
      case "Dark mode":
        return <Text>Dark Mode Content</Text>;
      case "Setting":
        return <Text>Setting Content</Text>;

      case "Log out":
        return <Text>Logout Content</Text>;
      default:
        return null;
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            {/* <Image source={""} style={styles.avatarImage} /> */}
          </View>
          <Text style={styles.username}>Nguyen Nhat Khang</Text>
        </View>
      </View>

      <View style={styles.sidebar}>
        <SidebarItem
          icon="profile"
          label="Hồ sơ"
          onPress={() => setSelectedMenu("Profile")}
          selected={selectedMenu === "Profile"}
        />
        <SidebarItem
          icon="lock"
          label="Đổi mật khẩu"
          onPress={() => setSelectedMenu("Change Password")}
          selected={selectedMenu === "Change Password"}
        />
        <SidebarItem
          icon="bulb1"
          label="Dark mode"
          onPress={() => setSelectedMenu("Dark mode")}
          selected={selectedMenu === "Dark mode"}
        />
        <SidebarItem
          icon="setting"
          label="Cài đặt"
          onPress={() => setSelectedMenu("Setting")}
          selected={selectedMenu === "Setting"}
        />

        <SidebarItem
          icon="logout"
          label="Đăng xuất"
          onPress={() => setSelectedMenu("Log out")}
          selected={selectedMenu === "Log out"}
        />
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CECECE4F",
  },
  header: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    alignItems: "center",
    margin: 20, // Thêm khoảng lề bên trái
    borderRadius: 8, // Bo tròn góc của avatarContainer
    overflow: "hidden", // Đảm bảo nội dung bên trong không vượt qua biên của avatarContainer
    elevation: 10, // Thêm độ nâng cao cho box shadow
    shadowColor: "#000", // Màu sắc của box shadow
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của box shadow
    shadowOpacity: 0.2, // Độ trong suốt của box shadow
    shadowRadius: 5, // Bán kính của box shadow
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    marginTop: 10,
    fontSize: 24,
    color: "#000000",
  },

  sidebar: {
    width: 400,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 10, // Thêm độ nâng cao cho box shadow
    shadowColor: "#000", // Màu sắc của box shadow
    shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển của box shadow
    shadowOpacity: 0.2, // Độ trong suốt của box shadow
    shadowRadius: 5, // Bán kính của box shadow
  },
  menuItemSelected: {
    backgroundColor: "#DBD9D9",
  },
  sidebarItem: {
    fontSize: 20,
    marginLeft: 10,
  },

  content: {
    flex: 1,
    padding: 20,
  },
});
export default UserScreen;
