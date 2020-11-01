import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import DengueStats from "../components/DengueStats";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.beigeContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      {/* <DengueStats></DengueStats> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonBlue}
          onPress={() => navigation.navigate("SelectLocation")}
        >
          <Text style={styles.menuText}>View Cases</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRed}
          onPress={() => navigation.navigate("Report")}
        >
          <Text style={styles.menuText}>Report Dengue Breeding Grounds</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGreen}
          onPress={() => navigation.navigate("Resources")}
        >
          <Text style={styles.menuText}>View Resources</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  beigeContainer: {
    paddingVertical: 150,
    backgroundColor: "#eeebe1ff",
    flex: 1,
    paddingHorizontal: 50,
    alignItems: "flex-start",
    // borderWidth: 1,
    // borderColor: 'red'
  },

  title: {
    fontSize: 30,
    color: "#222",
  },

  titleContainer: {
    flex: 1,
    // borderWidth: 1,
  },

  buttonContainer: {
    flex: 4,
    // borderWidth: 1,
    justifyContent: "space-around",
  },

  buttonBlue: {
    backgroundColor: "#2d77ecc2",
    height: 110,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonRed: {
    backgroundColor: "#e7627dc2",
    height: 110,

    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonGreen: {
    backgroundColor: "#3e9683c2",
    height: 110,

    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  menuText: {
    justifyContent: "flex-end",
    fontSize: 26,
    fontWeight: "900",
    color: "#ffffff",
  },
});

export default HomeScreen;
