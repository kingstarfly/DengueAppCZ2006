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
  const [selectedAddressObjects, setSelectedAddressObjects] = useState([]);
  const [initialAddressObjects, setInitialAddressObjects] = useState([]); // get from firebase and not change this

  const entityRef = firebase.firestore().collection("14DayData2");

  useEffect(() => {
    // populate selectedAddresses which is just an array of addresss names only.
    entityRef
      .get()
      .then((querySnapshot) => {
        let objectArray = [];
        querySnapshot.forEach((doc) => {
          // doc represents the addressobject. Has attribute "address" and has a sub-collection "data".
          const address = doc.data().address;
          let dataArray = [];
          doc.ref
            .collection("data")
            .orderBy("date", "desc")
            .limit(5) // take only 5 dates
            .get()
            .then((innerQuerySnapShot) => {
              innerQuerySnapShot.forEach((innerDoc) => {
                dataArray.push({
                  id: innerDoc.id,
                  date: innerDoc.data().date.toDate().toISOString(),
                  num_cases: innerDoc.data().num_cases,
                });
                // console.log("this is inner each dataArray", dataArray);
              });
              // done with constructing dataArray
              // need to reverse to get earliest date first
              dataArray.reverse();
            });
          objectArray.push({ address: address, dataArray: dataArray });
        });

        // console.log("Retrieved from firebase", objectArray);
        setInitialAddressObjects(objectArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchFilterFunction = (query) => {
    const newData = initialAddressObjects.filter((item) => {
      const queryText = query.toLowerCase();
      const itemText = item.address.toLowerCase();
      return itemText.indexOf(queryText) > -1;
    });

    // console.log("SearchFuncton: newData = ", newData);

    setSelectedAddressObjects(newData);
    setQuery(query);
  };

  const handleOptionPress = (addressObject) => {
    // only passes address name to screen
    navigation.navigate("Cases", {
      screen: "SpecificLocation",
      params: {
        addressObject: addressObject,
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
          selectedAddressObjects={selectedAddressObjects}
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
