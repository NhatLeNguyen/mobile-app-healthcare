import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

function InputWithHeader(props) {
  const [isPress, setIsPress] = useState(false);
  return (
    <View style={[{ width: props.width }, props.style]}>
      {props.header && (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Inter_500Medium",
            color: props.headerColor,
            marginBottom: 10,
          }}
        >
          {props.header}
        </Text>
      )}
      {props.isPicker ? (
        <View>
          <RNPickerSelect
            value={props.value}
            onValueChange={(value) => props.onChange(value)}
            items={props.items}
            textInputProps={props.textProps}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPress(true)}
          style={{ justifyContent: "center" }}
        >
          <TextInput
            value={props.value}
            placeholder={props.placeholder}
            keyboardType="numeric"
            style={{
              borderColor: props.color,
              borderWidth: 1,
              padding: 12,
              fontFamily: "Inter_400Regular",
              borderRadius: 5,
              color: props.color,
            }}
            onChangeText={props.onChange}
            onPressOut={props.onPressout}
          />
          <Text style={{ position: "absolute", right: 15, color: props.headerColor }}>
            {props.subText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default InputWithHeader;
