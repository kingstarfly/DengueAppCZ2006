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
          // console.log(doc.data());
          const { date, num_cases } = doc.data();
          setDailyObject({ date: date.toDate(), num_cases });
          setIsLoading(false);
        });
      });
  }, []);

  return (
    <SafeAreaView
      style={{ ...globalStyles.blueContainer, ...{ paddingTop: 100 } }}
    >
      {isLoading ? (
        <Text>Loading Spinner</Text>
      ) : (
        <Fragment>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Singapore</Text>
          </View>
          <View style={styles.numberContainer}>
            <Text
              style={
                dailyObject.num_cases > 99
                  ? styles.bigNumberThree
                  : styles.bigNumberTwo
              }
            >
              {dailyObject.num_cases}
            </Text>

            <View style={styles.description}>
              <Text style={styles.suffix}>Total cases today</Text>
              <Text style={styles.time}>
                Updated {formatDistanceToNow(dailyObject.date)} ago
              </Text>
            </View>
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
    flex: 3,
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  title: {
    color: "#ffffff",
    fontSize: 36,
  },

  numberContainer: {
    flex: 7,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bigNumberTwo: {
    fontSize: 120,
    color: "#f5f5f5",
    textAlign: "center",
  },
  bigNumberThree: {
    fontSize: 100,
    color: "#f5f5f5",
    textAlign: "center",
  },
  bigNumberCircle: {
    borderColor: "#fff5",
    aspectRatio: 1,
    borderWidth: 3,
    width: 200,
    borderRadius: 1000,
    backgroundColor: "#3333",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    marginTop: 10,
    alignItems: "center",
  },

  suffix: {
    color: "#ffffffcc",
    fontSize: 20,
  },
  time: {
    color: "#fffc",
    fontSize: 16,
  },
  graphContainer: {
    flex: 7,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});
export default SingaporeLocationScreen;
