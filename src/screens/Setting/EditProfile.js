import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../../constants/setting";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesDataURL } from "../../constants/setting/data";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { ThemeContext } from "../MainScreen/ThemeProvider";
import Storage from "expo-storage";
import { useToast } from "react-native-toast-notifications";
import * as SQLite from "expo-sqlite/next";

const db = SQLite.openDatabaseAsync("health-care.db");

const EditProfile = ({ navigation }) => {
  const themeValue = useContext(ThemeContext)
  const toast = useToast()
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [disableButton, setDisableButton] = useState(true);

  const [user_id, setUserId] = useState("1");
  const [name, setName] = useState("NhatLeNguyen");
  const [email, setEmail] = useState("hehhee@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("0987654321");

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("01/01/1990");
  const [startedDate, setStartedDate] = useState("12/12/1990");

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate);
  };

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
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
      setDisableButton(false)
    }
  };
  useEffect(() => {
    (async () => {
      const im_url = await Storage.getItem({key:'avatar'})
      setSelectedImage(im_url)
      const na = await Storage.getItem({key: 'name'});
      setName(na)
      const em = await Storage.getItem({key: 'email'})
      setEmail(em)
      const dob = await Storage.getItem({key: 'dobirth'})
      setSelectedStartDate(dob)
      const phone = await Storage.getItem({key: 'phone'})
      setPhoneNumber(phone)
      const id = await Storage.getItem({ key: `user_id` });
      setUserId(id);
    })()
  },[])
  
  const saveChanges = async () => {
    if (name === '') {
      toast.hideAll();
      toast.show("Họ và tên không hợp lệ", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    if (phoneNumber.length < 10) {
      toast.hideAll();
      toast.show("Số điện thoại không hợp lệ", {
        type: "danger",
        offset: 50,
        animationType: "zoom-in",
      });
      return;
    }
    (await db).runSync(
      "UPDATE user SET avatar = ?,name = ?,dobirth = ?,phone = ?  WHERE user_id = ?",
      [
        selectedImage,
        name,
        selectedStartDate,
        phoneNumber,
        user_id,
      ]
    );
    await Storage.setItem({
      key: "avatar",
      value: selectedImage,
    });

    await Storage.setItem({
      key: "name",
      value: name,
    });

    await Storage.setItem({
      key: "dobirth",
      value: selectedStartDate,
    });

    await Storage.setItem({
      key: "phone",
      value: phoneNumber,
    });

    setDisableButton(true);
    toast.hideAll();
    toast.show("Thay đổi thành công", {
      type: "success",
      offset: 50,
      animationType: "zoom-in",
    });
  }

  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 35,
              width: "90%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: COLORS.primary,
                textHeaderColor: "#469ab6",
                textDefaultColor: COLORS.white,
                selectedTextColor: COLORS.white,
                mainColor: "#469ab6",
                textSecondaryColor: COLORS.white,
                borderColor: "rgba(122,146,165,0.1)",
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <ScrollView
      style={[{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }, themeValue.isDarkMode && {backgroundColor: '#202125', marginTop: 0}]}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity> */}

      </View>

      <View>
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

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={[{ ...FONTS.h4}, themeValue.isDarkMode && styles.textDarkMode]}>Họ và tên</Text>
            <View
              style={[{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }, themeValue.isDarkMode && styles.textDarkMode]}
            >
              <TextInput
                style={themeValue.isDarkMode && styles.textDarkMode}
                value={name}
                onChangeText={(value) => {
                    setName(value)
                    setDisableButton(false)
                  }
                }
                editable={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={[{ ...FONTS.h4}, themeValue.isDarkMode && styles.textDarkMode]}>Email</Text>
            <View
              style={[{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }, themeValue.isDarkMode && styles.textDarkMode]}
            >
              <TextInput
                style={[themeValue.isDarkMode && styles.textDarkMode, {color: 'gray'}]}
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            {/* <Text style={{ ...FONTS.h4 }}>Password</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable={true}
                secureTextEntry
              />
            </View> */}
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={[{ ...FONTS.h4}, themeValue.isDarkMode && styles.textDarkMode]}>Ngày sinh</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={[{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }, themeValue.isDarkMode && styles.textDarkMode]}
            >
              <Text style={themeValue.isDarkMode && styles.textDarkMode}>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={[{ ...FONTS.h4}, themeValue.isDarkMode && styles.textDarkMode]}>Số điện thoại</Text>
          <View
            style={[{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }, themeValue.isDarkMode && styles.textDarkMode]}
          >
            <TextInput
              style={themeValue.isDarkMode && styles.textDarkMode}
              value={phoneNumber}
              onChangeText={(value) => {
                  setPhoneNumber(value)
                  setDisableButton(false)
                }
              }
              editable={true}
            />
          </View>
        </View>

        {/* <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Lưu thông tin
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.button,
          {
            backgroundColor: disableButton ? "rgba(0,0,0,0.1)" : "black",
          },
          themeValue.isDarkMode && {
            backgroundColor: disableButton ? "rgba(255,255,255, 0.2)" : "white",
          }
        ]}
        onPress={() => {
          saveChanges();
        }}
        disabled={disableButton}
      >
        <Text
          style={[{
            color: disableButton ? "rgba(255,255,255,0.9)" : "white",
            // color:'black',
            fontSize: 14,
            fontFamily: "Inter_500Medium",
            backgroundColor: "transparent",
          }, themeValue.isDarkMode && {
              color: disableButton ? "rgba(255,255,255, 0.3)" : "black",
          }]}
        >
          Lưu thay đổi
        </Text>
      </TouchableOpacity>

        {renderDatePicker()}
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  textDarkMode: {
    color: '#e2e3e7',
    borderColor: '#e2e3e7'
  },
  button: {
    width: '100%',
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#1a9be8",
    marginTop: 25
  },
})
