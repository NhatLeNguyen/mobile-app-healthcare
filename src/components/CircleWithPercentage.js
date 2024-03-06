import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, ClipPath } from "react-native-svg";

const CircleWithPercentage = ({ diameter, color,restColor ,MAX_VALUE, value, paddingCircle,paddingText, textSize }) => {
  const percentage = value < MAX_VALUE ? 100 - (value / MAX_VALUE) * 100 : 0;
  const radius = diameter / 2;
  const circumference = 2 * Math.PI * radius;
  const startAngle = Math.PI / -2; // Góc bắt đầu từ góc 0 giờ
  return (
    <View style={[styles.container,{paddingTop:paddingCircle}]}>
      <Svg style={styles.backgroundCirle} height={diameter} width={diameter}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 10} // Để lại khoảng trắng ở mép
          fill="none"
          stroke={restColor}
          strokeWidth={7}
          strokeDasharray={[circumference]}
          strokeDashoffset={(0 / 100) * circumference} // Tính toán offset dựa trên phần trăm
          transform={`rotate(-90 ${radius} ${radius})`} // Xoay vòng tròn để bắt đầu từ góc 0 giờ
          startAngle={startAngle} // Thiết lập góc bắt đầu
          endAngle={startAngle + (Math.PI * 2 * 0) / 100} // Tính toán góc kết thúc
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 10} // Để lại khoảng trắng ở mép
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeDasharray={[circumference]}
          strokeDashoffset={(percentage / 100) * circumference} // Tính toán offset dựa trên phần trăm
          transform={`rotate(-90 ${radius} ${radius})`} // Xoay vòng tròn để bắt đầu từ góc 0 giờ
          startAngle={startAngle} // Thiết lập góc bắt đầu
          endAngle={startAngle + (Math.PI * 2 * percentage) / 100} // Tính toán góc kết thúc
          strokeLinecap="round"
        />
      </Svg>
      <View style={[styles.circleText, { backgroundColor: "transparent", paddingTop: paddingText }]}>
        <Text style={[styles.percentageText,{fontSize: textSize, color:color}]}>{value}</Text>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  circleText: {
    borderRadius: 999,
    width: "100%",
    height: "100%",
    alignItems: "center",
    position: "absolute",
  },
  percentageText: {
    fontWeight: "bold",
  },
  backgroundCirle: {
    // position: "absolute",
  },
});

export default CircleWithPercentage;
