import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const SearchBar = ({ query, searchFilterFunction, userClicked }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      {userClicked ? (
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => searchFilterFunction(text)}
          value={query}
          underlineColorAndroid="transparent"
          placeholder="..."
          autoFocus
        />
      ) : (
        <View>
          <Text style={styles.title}>Select your</Text>
          <Text style={styles.title}>location</Text>
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  textInput: {
    textAlign: "center",
    fontSize: 40,
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 50,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 40,
  },
});
