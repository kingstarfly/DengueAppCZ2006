import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import { globalStyles } from "../styles/global";

const SelectLocationScreen = ({ navigation }) => {
  const [loc, setLoc] = useState("Current Location");

  const onLocSelect = (loc) => {
    navigation.navigate("Cases", {
      screen: "SpecificLocation",
      params: {
        loc: loc,
      },
    });
  };

  return (
    <View style={globalStyles.blueContainer}>
      <View style={styles.locationContainer}>
        <Text style={styles.title}>Select your location</Text>
      </View>
      <View style={styles.pickerContainer}>
        <TouchableOpacity style={styles.picker}>
          <Picker
            prompt={"Select your location"}
            style={{
              height: 50,
              width: 300,
              color: "white",
              overflow: "scroll",
            }}
            selectedValue={loc}
            onValueChange={(newVal, newIndex) => {
              setLoc(newVal);
              onLocSelect(newVal);
            }}
          >
            <Picker.Item label="Current Location" value="Current Location" />
            <Picker.Item
              label="71 Marine Parade Drive"
              value="71 Marine Parade Drive"
            />
            <Picker.Item
              label="123 Teenage Street"
              value="123 Teenage Street"
            />
          </Picker>
        </TouchableOpacity>
      </View>

      {/* <Button
        title="Go"
        onPress={() =>
          navigation.navigate("Cases", {
            screen: "SpecificLocation",
            params: {
              loc: loc,
            },
          })
        }
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  locationContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
  },

  pickerContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  picker: {
    height: 50,
    width: 300,
    padding: -25,
    backgroundColor: "#ffffff55",
    borderRadius: 10,
  },
});
export default SelectLocationScreen;
