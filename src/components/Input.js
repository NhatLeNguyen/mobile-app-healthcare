import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  MaskedTextInput,
} from "react-native";

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

export function Input(props) {
  const { isFocused } = useFocus();
  const _property1Active = props.property1 === "Active";

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
      {props.isPassword ? (
        <MaskedTextInput
          mask="•" // Replace password characters with dots
          placeholder={props.placeholder}
          onBlur={handleBlur}
          style={styles.textInput}
        />
      ) : (
        <TextInput
          placeholder={props.placeholder}
          onBlur={handleBlur}
          style={styles.textInput}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: 357,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 35,
    paddingBottom: 20,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(241, 244, 255, 1)",
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
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
  },
  placeholderProperty1Active: {
    color: "rgba(255, 0, 0, 1)", // Example color for active state
  },
  textInput: {
    // Add custom styles for TextInput (optional)
  },
});

export default Input;
