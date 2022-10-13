import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as w,
  heightPercentageToDP as h,
} from "react-native-responsive-screen";
import colors from "../assets/colors";

const CategoryButton = ({ title, OnPress }) => {
  return (
    <TouchableOpacity style={styles.primaryContainer} onPress={OnPress}>
      <LinearGradient
        colors={["#02967c", "#049e6a", "#06a558"]}
        style={styles.gradientStyle}
      >
        <View style={styles.secondaryContainer}>
          <Text style={styles.mainContainer}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    color: "white",
    paddingVertical: h("1%"),
    fontSize: 18,
    marginHorizontal: w("6%"),
  },
  primaryContainer: { marginTop: h("3%"), marginLeft: w("5%") },
  gradientStyle: { borderRadius: 5 },
  secondaryContainer: { justifyContent: "center", alignItems: "center" },
});
export default CategoryButton;
