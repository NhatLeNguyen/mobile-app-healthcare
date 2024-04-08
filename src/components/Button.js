import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

export function Button(props) {
  const _property1Active = props.property1 === "Active";
  const _property1Small = props.property1 === "Small";
  const _property1SmallActive = props.property1 === "SmallActive";

  const classes = useMemo(
    () => ({
      root: [
        styles.root,
        _property1Small && styles.rootProperty1Small,
        _property1SmallActive && styles.rootProperty1SmallActive,
        _property1Active && styles.rootProperty1Active,
      ],
      button: [
        styles.button,
        _property1Small && styles.buttonProperty1Small,
        _property1SmallActive && styles.buttonProperty1SmallActive,
        _property1Active && styles.buttonProperty1Active,
      ],
    }),
    [styles, props.property1]
  );

  return (
    <View style={classes.root} testID={props.testID}>
      <Text style={classes.button} testID="615:3">
        {props.children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: 357,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#132A7A",
  },
  rootProperty1Small: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  rootProperty1SmallActive: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1f41bb",
  },
  rootProperty1Active: {
    backgroundColor: "#1f41bb",
    shadowColor: "#cbd6ff",
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  button: {
    color: "#FFFFFF",
    textAlign: "center",
    // fontFamily: "Poppins",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
  },
  buttonProperty1Small: {
    color: "#494949",
    fontSize: 14,
  },
  buttonProperty1SmallActive: {
    color: "#ffffff",
    fontSize: 14,
  },
  buttonProperty1Active: {
    color: "#ffffff;",
  },
});
export default Button;
