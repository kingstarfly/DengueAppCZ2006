import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

const SpecificLocationScreen = ({ route, navigation }) => {
  // only takes address name as route param
  const {
    addressObject: { address, dataArray },
  } = route.params;

  // dataArray is an array of objects with 3 fields. "id", "date" and "num_cases".

  let latestData = dataArray.reduce((a, b) =>
    new Date(a.date) > new Date(b.date) ? a : b
  );
  // console.log("Latest Data is: ", latestData);
  const num_cases = latestData.num_cases;
  const dateISO = latestData.date;
  console.log("This is the dateISO: ", dateISO);

  const myDate = new Date(dateISO);
  const dateString = `${myDate.getDate()} - ${myDate.getMonth()} - ${myDate.getFullYear()}`;
  console.log(dateString);

  return (
    <View style={globalStyles.redContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{address}</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.bigNumber}>{num_cases}</Text>
        <Text style={styles.desc}>Total cases in the last 14 days</Text>
        <Text style={styles.time}> Updated {dateString}</Text>
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
    color: "#ffffff",
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
  time: {
    color: "#ffffffcc",
    fontSize: 10,
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
