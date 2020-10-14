import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { globalStyles } from "../styles/global";
import { firebase } from "../firebase/config";

import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]); // for firebase warnings

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
    text: "321 Teenage Road",
  },
  {
    id: "6",
    text: "654 Adam Street",
  },
  {
    id: "7",
    text: "111 Lucky Drive",
  },
  {
    id: "8",
    text: "5 Random Street",
  },
];

const SelectLocationScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [selectedAddresses, setSelectedAddresses] = useState([]);
  const [addressObjects, setAddressObjects] = useState([]); // get from firebase and not change this

  const entityRef = firebase.firestore().collection("14DayData");

  useEffect(() => {
    entityRef
      .doc("13102020")
      .get()
      .then((doc) => {
        let newAddressObjects = [];
        for (const [address, caseObject] of Object.entries(doc.data())) {
          newAddressObjects = [
            ...newAddressObjects,
            {
              id: caseObject.id,
              address: address,
              num_cases: caseObject.num_cases,
            },
          ];
        }
        console.log("Retrieved from firebase", newAddressObjects);
        setAddressObjects(newAddressObjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchFilterFunction = (query) => {
    console.log("SearchFuncton: addressObjects = ", addressObjects);
    const newData = addressObjects.filter((item) => {
      const queryText = query.toLowerCase();
      const itemText = item.address.toLowerCase();
      return itemText.indexOf(queryText) > -1;
    });

    console.log("SearchFuncton: newData = ", newData);

    setSelectedAddresses(newData);
    setQuery(query);
  };

  const handleOptionPress = (addressObject) => {
    navigation.navigate("Cases", {
      screen: "SpecificLocation",
      params: {
        address: addressObject.address,
        num_cases: addressObject.num_cases,
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
        <Dropdown
          selectedAddresses={selectedAddresses}
          handleOptionPress={handleOptionPress}
          query={query}
        />
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
