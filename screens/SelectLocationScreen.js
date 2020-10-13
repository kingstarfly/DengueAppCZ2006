import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-community/picker";
import { globalStyles } from "../styles/global";

import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";
const MOCK_DATA = [
  {
    id: "1",
    text: "123 Teenage Road",
  },
  {
    id: "2",
    text: "456 Adam Street",
  },
  {
    id: "3",
    text: "777 Lucky Drive",
  },
  {
    id: "4",
    text: "10 Random Street",
  },
  {
    id: "5",
    text: "123 Teenage Road",
  },
  {
    id: "6",
    text: "456 Adam Street",
  },
  {
    id: "7",
    text: "777 Lucky Drive",
  },
  {
    id: "8",
    text: "10 Random Street",
  },
];

const SelectLocationScreen = ({ navigation }) => {
  const [loc, setLoc] = useState("Current Location");
  const [query, setQuery] = useState("");
  const [addresses, setAddresses] = useState([]);

  const onLocSelect = (loc) => {
    navigation.navigate("Cases", {
      screen: "SpecificLocation",
      params: {
        loc: loc,
      },
    });
  };

  const searchFilterFunction = (query) => {
    if (query == "") {
      setAddresses([]);
      setQuery(query);
      return;
    }
    const newData = MOCK_DATA.filter((item) => {
      const itemText = `${item.text.toLowerCase()}`;
      const queryText = query.toLowerCase();

      return itemText.indexOf(queryText) > -1;
    });

    setAddresses(newData);
    setQuery(query);
  };

  const handleOptionPress = (data) => {
    const address = data.text;

    navigation.navigate("Cases", {
      screen: "SpecificLocation",
      params: {
        loc: address,
      },
    });
  };

  return (
    <View style={globalStyles.blueContainer}>
      <View style={styles.locationContainer}>
        <Text style={styles.title}>Select your location</Text>
      </View>
      <View style={styles.pickerContainer}>
        <SearchBar query={query} searchFilterFunction={searchFilterFunction} />
        <Dropdown addresses={addresses} handleOptionPress={handleOptionPress} />
      </View>
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
    marginBottom: 50,
    marginTop: 30,
    minWidth: 1000,
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
