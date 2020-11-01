import React from "react";
import { StyleSheet, Text, View, Button, ViewComponent } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryVoronoiContainer,
  VictoryCursorContainer,
  VictoryArea,
} from "victory-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseISO, format } from "date-fns";
import { globalStyles } from "../styles/global";

const SpecificLocationScreen = ({ route, navigation }) => {
  // only takes address name as route param
  const {
    addressObject: { address, dataArray },
  } = route.params;

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

  // console.log("data Array is: ", dataArray);

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
          theme={VictoryTheme.material}
          domainPadding={{ y: [10, 30], x: [0, 20] }}
        >
          <VictoryArea
            style={{
              data: {
                fill: "#ffffff",
                fillOpacity: 0.45,
                stroke: "#fff",
                strokeWidth: 3,
              },
            }}
            data={dataArray}
            x={(data) => {
              return format(parseISO(data.date), "d MMM");
            }}
            y="num_cases"
          />

          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "#fff", strokeWidth: 0 },
              ticks: { stroke: "#eee", size: 1 },
              tickLabels: { fontSize: 25, padding: 10, fill: "#ffe" },
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "#fff", strokeWidth: 0 },
              ticks: { stroke: "#eee", size: 1 },
              tickLabels: { fontSize: 16, padding: 20, fill: "#ffe" },
            }}
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
    fontSize: 36,
    textAlign: "center",
  },

  numberContainer: {
    flex: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -15,
  },
  bigNumber: {
    fontSize: 130,
    color: "#f5f5f5",
    marginBottom: -20,
  },
  desc: {
    color: "#ffffff",
    fontSize: 20,
  },
  time: {
    color: "#ffffffcc",
    fontSize: 20,
  },
  graphContainer: {
    flex: 4,
    justifyContent: "flex-end",
    paddingLeft: 20,
  },
});

export default SpecificLocationScreen;
