import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryCursorContainer,
} from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseISO, format } from "date-fns";
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
  // console.log("This is the dateISO: ", dateISO);
  const myDate = parseISO(dateISO);
  const datefnsString = format(myDate, "d-MMM-yy");
  // console.log(datefnsString);

  return (
    <SafeAreaView
      style={
        num_cases >= 10
          ? globalStyles.redContainer
          : num_cases >= 5
          ? globalStyles.yellowContainer
          : globalStyles.greenContainer
      }
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{address}</Text>
      </View>
      <View style={styles.numberContainer}>
        <Text style={styles.bigNumber}>{num_cases}</Text>
        <Text style={styles.desc}>Total cases in the last 14 days</Text>
        <Text style={styles.time}> Updated {datefnsString}</Text>
      </View>
      <View style={styles.graphContainer}>
        <VictoryChart
          width={400}
          theme={VictoryTheme.grayscale}
          containerComponent={
            <VictoryVoronoiContainer
              labels={({ datum }) => {
                return datum._y;
              }}
            />
          }
          domainPadding={{ y: [10, 30], x: [0, 20] }}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31", strokeWidth: 2 },
              parent: { border: "1px solid #ccc" },
            }}
            data={dataArray}
            x={(data) => {
              return format(parseISO(data.date), "d MMM");
            }}
            y="num_cases"
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
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
  },
  desc: {
    color: "#ffffffcc",
    fontSize: 16,
  },
  time: {
    color: "#ffffffcc",
    fontSize: 16,
  },
  graphContainer: {
    flex: 4,
    justifyContent: "flex-end",
  },
});

export default SpecificLocationScreen;
