import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

const SpecificLocationScreen = ({ route, navigation }) => {
  const { loc } = route.params;
  console.log(route.params);
  return (
    <View style={globalStyles.redContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{loc}</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.bigNumber}>17</Text>
        <Text style={styles.desc}>Total cases in the last 14 days</Text>
      </View>
      <View style={styles.graphContainer}>
        <Text>Graph</Text>
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
    color: "#ffffffdd",
    fontSize: 44,
    textAlign: "center",
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
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
  },
});

export default SpecificLocationScreen;
