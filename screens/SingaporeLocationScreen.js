import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

const SingaporeLocationScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.yellowContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Singapore Today</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.bigNumber}>8</Text>
        <Text style={styles.desc}>Total cases today</Text>
      </View>
      <View style={styles.graphContainer}>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 2,
    justifyContent: "center",
  },
  title: {
    color: "#ffffffee",
    fontSize: 44,
  },

  numberContainer: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bigNumber: {
    fontSize: 150,
    color: "#f5f5f5",
    fontFamily: "sans-serif-medium",
  },
  desc: {
    color: "#ffffffcc",
    fontSize: 16,
  },

  graphContainer: {
    flex: 4,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});
export default SingaporeLocationScreen;
