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
        <View style={styles.bigNumberCircle}>
          <Text
            style={num_cases > 99 ? styles.bigNumberThree : styles.bigNumberTwo}
          >
            {num_cases}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.suffix}>Total cases in the last 14 days</Text>
          <Text style={styles.time}> Updated {datefnsString}</Text>
        </View>
      </View>
      {dataArray.length > 1 ? (
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
    flex: 1.5,
    justifyContent: "flex-end",
    paddingHorizontal: 15,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    textAlign: "center",
  },
  numberContainer: {
    flex: 7,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 20,
  },
  bigNumberTwo: {
    fontSize: 100,
    color: "#f5f5f5",
    textAlign: "center",
  },
  bigNumberThree: {
    fontSize: 80,
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
    marginTop: 25,
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
    flex: 4,
    justifyContent: "flex-end",
    paddingLeft: 20,
  },
});

export default SpecificLocationScreen;
