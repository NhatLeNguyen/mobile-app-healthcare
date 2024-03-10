import { View, Text } from "react-native";
function Fact({ text, size }) {
  return (
    <View
      style={{
        backgroundColor: "rgba(251, 101, 66 , 0.2)",
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginTop: 15
      }}
    >
      <Text style={{color: "#375E97", fontSize:20, textAlign: 'left', padding: 20}}>{text}</Text>
    </View>
  );
}

export default Fact;
