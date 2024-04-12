import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { MaskedTextInput } from "react-native-mask-text";

const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsFocused(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsFocused(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return { isFocused };
};

export default function Input(props) {
  const { isFocused } = useFocus();
  const _property1Active = props.property1 === "Active";
  const [isPassHidden, setIsPassHidden] = useState(true);
  const classes = useMemo(
    () => ({
      root: [
        styles.root,
        _property1Active && styles.rootProperty1Active,
        isFocused && styles.rootFocused,
      ],
      placeholder: [
        styles.placeholder,
        _property1Active && styles.placeholderProperty1Active,
      ],
    }),
    [styles, props.property1, isFocused, props.isPassword]
  );

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={classes.root} testID={props.testID}>
      <TextInput
        placeholder={props.placeholder}
        onBlur={handleBlur}
        style={styles.textInput}
        onChangeText={props.onChange}
        secureTextEntry={isPassHidden}
      />
      {props.isPassword && isPassHidden ? (
        <Ionicons
          name="eye-off-outline"
          size={24}
          color="black"
          style={{ position: "absolute", right: 20 }}
          onPress={() => setIsPassHidden(false)}
        />
      ) : (
        props.isPassword && (
          <Ionicons
            name="eye-outline"
            size={24}
            color="black"
            style={{ position: "absolute", right: 20 }}
            onPress={() => setIsPassHidden(true)}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: 357,
    // padding: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#DDE5FF",
    // backgroundColor: 'red'
  },
  rootFocused: {
    // Add styles for focused state (e.g., border)
  },
  rootProperty1Active: {
    borderWidth: 2,
    borderStyle: "solid",
  },
  placeholder: {
    color: "rgba(98, 98, 98, 1)",
    textAlign: "center",
    // fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
  },
  placeholderProperty1Active: {
    color: "rgba(255, 0, 0, 1)", // Example color for active state
  },
  textInput: {
    // fontSize: 16,
    // flex: 1,
    // backgroundColor:'red',
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
