import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS, COLORS } from "../../constants/setting";
import { imagesDataURL } from "../../constants/setting/data";
import * as ImagePicker from "expo-image-picker";
import Input from "../../components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import Storage from "expo-storage";

const ModalContent = () => {
  const [name, setName] = useState("123");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dobirth, setDobirth] = useState(new Date());
  const [sex, setSex] = useState("");
  const [stepsTarget, setStepsTarget] = useState(0);
  const [heartTarget, setHeartTarget] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  useEffect(() => {
    const loading = async () => {
        let na = await Storage.getItem({key: 'name'})
        setName(na)
        let pho = await Storage.getItem({key: 'phone'})
        setPhone(pho)
        let add = await Storage.getItem({key: 'address'})
        setAddress(add)
    }
    loading()
  }, [])

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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dobirth;
    setShowDatePicker(false);
    setDobirth(currentDate);
  };

  const GenderOptions = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
    { label: "Khác", value: "Khác" },
  ];

  return (
    <View style={styles.modalContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImageSelection}>
          <Image source={{ uri: selectedImage }} style={styles.profileImage} />
          <View style={styles.cameraIcon}>
            <MaterialIcons
              name="photo-camera"
              size={32}
              color={COLORS.primary}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.subTitle}>Họ và tên</Text>
      <Input
        testID="nameInput"
        property1="Họ và tên"
        placeholder="Nhập họ và tên"
        value={name}
        onChange={setName}
      />
      <Text style={styles.subTitle}>Số điện thoại</Text>
      <Input
        testID="phoneInput"
        property1="Số điện thoại"
        placeholder="Nhập số điện thoại"
        value={phone}
        onChange={setPhone}
      />
      <Text style={styles.subTitle}>Địa chỉ</Text>
      <Input
        testID="addressInput"
        property1="Địa chỉ"
        placeholder="Nhập địa chỉ"
        value={address}
        onChange={setAddress}
      />
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <Text style={styles.subTitle}>Giới tính</Text>
          <TouchableOpacity onPress={() => setShowGenderPicker(true)}>
            <View style={styles.sexPicker}>
              <Picker
                selectedValue={sex}
                style={{ height: 44, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
              >
                {GenderOptions.map((option) => (
                  <Picker.Item
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <Text style={styles.subTitle}>Ngày sinh</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.dateOfBirth}>
              <Text style={styles.dateText}>
                {dobirth.toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dobirth}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => console.log("Save")}
      >
        <Text style={styles.saveButtonText}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  Title: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  subTitle: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 2,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    zIndex: 9999,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    alignItems: "left",
  },
  dateOfBirth: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: 44,
    width: 180,
    borderColor: COLORS.secondaryGray,
    backgroundColor: "#DDE5FF",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
  },
  datePickerLabel: {
    flex: 1,
    color: COLORS.primary,
    fontSize: 16,
  },
  dateText: {
    textAlign: "center",
    flex: 1,
    fontSize: 16,
  },

  sexPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    height: 44,
    width: 150,
    borderColor: COLORS.secondaryGray,
    backgroundColor: "#DDE5FF",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    paddingLeft: 8,
  },
  genderText: {
    flex: 1,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default ModalContent;
