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
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import Swiper from "react-native-swiper";

function HomeHeader() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ paddingTop: 5, marginRight: 10 }}
        onPress={() => handleModal()}
        activeOpacity={0.5}
      >
        <Ionicons name="information-circle-outline" size={30} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
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
        animationType="slide"
        visible={isModalVisible}
        style={{ height: 80, flex: 0.5 }}
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
                    Cùng với tính năng điếm số bước, Fit tính điểm nhịp tim khi
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
    </View>
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
    width: 325,
    height: 600,
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
});

export default HomeHeader;
