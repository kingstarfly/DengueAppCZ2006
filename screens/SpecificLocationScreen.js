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
import { parseISO, format, parse } from "date-fns";
import { globalStyles } from "../styles/global";

const getFormattedDateStringAndNumCases = (dataArray) => {
  let latestData = dataArray.reduce((a, b) =>
    new Date(a.date) > new Date(b.date) ? a : b
  );

  const num_cases = latestData.num_cases;
  const dateISO = latestData.date;
  const myDate = parseISO(dateISO);
  const datefnsString = format(myDate, "d-MMM-yy");
  return [datefnsString, num_cases];
};

const SpecificLocationScreen = ({ route, navigation }) => {
  const {
    addressObject: { address, dataArray },
  } = route.params;

  const [datefnsString, num_cases] = getFormattedDateStringAndNumCases(
    dataArray
  );

  const styleToUse =
    num_cases >= 10
      ? globalStyles.redContainer
      : num_cases >= 1
      ? globalStyles.yellowContainer
      : globalStyles.greenContainer;

  return (
    <SafeAreaView style={{ ...styleToUse, ...{ paddingTop: 100 } }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {address.length <= 35 ? address : `${address.slice(0, 35)}...`}
        </Text>
      </View>
      <View style={styles.numberContainer}>
        <Text
          style={num_cases > 99 ? styles.bigNumberThree : styles.bigNumberTwo}
        >
          {num_cases}
        </Text>

        <View style={styles.description}>
          <Text style={styles.suffix}>Total cases in the last 14 days</Text>
          <Text style={styles.time}> Updated {datefnsString}</Text>
        </View>
      </View>
      {dataArray.length > 1 ? (
        <View style={styles.graphContainer}>
          <VictoryChart
            height={300}
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
              y={(data) => {
                return parseInt(data.num_cases);
              }}
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
                tickLabels: {
                  fontSize: 14,
                  padding: 20,
                  fill: "#ffe",
                  angle: 30,
                },
              }}
            />
          </VictoryChart>
        </View>
      ) : (
        <View
          style={{
            flex: 4,
            justifyContent: "flex-start",
            paddingHorizontal: 90,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Not enough data to show graph
          </Text>
        </View>
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
    fontSize: 32,
    textAlign: "center",
  },
  numberContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
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

  description: {
    marginTop: 0,
    alignItems: "center",
  },

  suffix: {
    color: "#ffffff",
    fontSize: 16,
  },
  time: {
    color: "#ffffffcc",
    fontSize: 16,
  },
  graphContainer: {
    flex: 7,
    justifyContent: "flex-end",
    paddingLeft: 20,
  },
});

export default SpecificLocationScreen;
