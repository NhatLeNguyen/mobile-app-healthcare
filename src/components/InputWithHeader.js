import { useState } from "react";
import { TextInput, View, Text, Pressable, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";

function InputWithHeader(props) {
  const [isPress, setIsPress] = useState(false);
  return (
    <View style={[{ width: props.width }, props.style]}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Inter_500Medium",
          color: isPress ? props.color : "white",
          marginBottom: 10
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
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsPress(true)} style={{justifyContent:'center'}}>
          <TextInput
            value={props.value}
            placeholder={props.placeholder}
            keyboardType="numeric"
            style={{
              borderColor: 'white',
              borderWidth: 1,
              padding: 12,
              fontFamily: "Inter_400Regular",
              borderRadius: 5,
              color: isPress ? props.color : "white",
            }}
            onChangeText={props.onChange}
            onPressOut={props.onPressout}
          />
          <Text style={{position:'absolute', right: 15, color: 'white'}}>{props.subText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default InputWithHeader;