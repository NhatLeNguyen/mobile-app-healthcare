import { useState } from "react";
import { TextInput, View, Text, Pressable, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";

function InputWithHeader(props) {
  const [isPress, setIsPress] = useState(false);
  return (
    <View style={[{ width: props.width }, props.style]}>
      <Text
        style={{
          fontSize: 13,
          fontFamily: "Inter_500Medium",
          color: isPress ? props.color : "black",
        }}
      >
        {props.header}
      </Text>
      {props.isPicker ? (
        <View style={{ borderWidth: 1 }}>
          <RNPickerSelect
            value={props.value}
            onValueChange={(value) => console.log(value)}
            items={props.items}
          />
        </View>
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsPress(true)}>
          <TextInput
            value={props.value}
            placeholder={props.placeholder}
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              padding: 12,
              fontFamily: "Inter_400Regular",
              borderRadius: 5,
              color: isPress ? props.color : "black",
            }}
            onChangeText={props.onChange}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default InputWithHeader;
