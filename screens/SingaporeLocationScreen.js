import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";
import { firebase } from "../firebase/config";
import { format, formatDistanceToNow } from "date-fns";
import { SafeAreaView } from "react-native-safe-area-context";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]); // for firebase warnings

const SingaporeLocationScreen = ({ navigation }) => {
  const [dailyObject, setDailyObject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const entityRef = firebase.firestore().collection("dailyData");

  useEffect(() => {
    entityRef
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const { date, num_cases } = doc.data();
          setDailyObject({ date: date.toDate(), num_cases });
          setIsLoading(false);
        });
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.yellowContainer}>
      {isLoading ? (
        <Text>Loading Spinner</Text>
      ) : (
        <Fragment>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Singapore Today</Text>
          </View>
          <View style={styles.numberContainer}>
            <Text style={styles.bigNumber}>{dailyObject.num_cases}</Text>
            <Text style={styles.desc}>Total cases</Text>
            <Text style={styles.time}>
              Updated {formatDistanceToNow(dailyObject.date)} ago
            </Text>
          </View>

          <View style={styles.graphContainer}>
            <Text></Text>
          </View>
        </Fragment>
      )}
    </SafeAreaView>
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
  },
  desc: {
    color: "#ffffffcc",
    fontSize: 26,
  },
  time: {
    color: "#fffc",
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
