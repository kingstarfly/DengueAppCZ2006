import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../styles/global";
import { firebase } from "../firebase/config";
import { SafeAreaView } from "react-native-safe-area-context";

import Dropdown from "../components/Dropdown";
import SearchBar from "../components/SearchBar";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]); // for firebase warnings

const SelectLocationScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [selectedAddressObjects, setSelectedAddressObjects] = useState([]);
  const [initialAddressObjects, setInitialAddressObjects] = useState([]); // get from firebase and not change this
  const [hasUserClicked, setHasUserClicked] = useState(false);

  const entityRef = firebase.firestore().collection("14DayData4");

  useEffect(() => {
    // console.log("In useEffect hook of Select Location Screen!");
    // populate selectedAddresses which is just an array of addresss names only.
    entityRef
      .get()
      .then((querySnapshot) => {
        let objectArray = [];
        querySnapshot.forEach((doc) => {
          // doc represents the addressobject. Has attribute "address" and has a sub-collection "data".
          const address = doc.data().address;
          let dataArray = doc
            .data()
            .data.slice(Math.max(doc.data().data.length - 7, 0));
          // dataArray.reverse();

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

  const handleUserClick = () => {
    setHasUserClicked(true);
  };

  return (
    <SafeAreaView style={globalStyles.blueContainer}>
      <KeyboardAvoidingView behavior={"padding"} style={{ paddingTop: 100 }}>
        <TouchableWithoutFeedback
          onPress={handleUserClick}
          style={{ borderWidth: 1, borderColor: "red" }}
        >
          <View style={styles.pickerContainer}>
            <SearchBar
              query={query}
              searchFilterFunction={searchFilterFunction}
              userClicked={hasUserClicked}
            />

            <Dropdown
              selectedAddressObjects={selectedAddressObjects}
              handleOptionPress={handleOptionPress}
              query={query}
              style={{ borderColor: "red", borderWidth: 1 }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
