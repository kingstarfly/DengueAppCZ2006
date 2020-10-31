import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

const SearchBar = ({ query, searchFilterFunction }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => searchFilterFunction(text)}
        value={query}
        underlineColorAndroid="transparent"
        placeholder="Search Here..."
        autoFocus
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  textInput: {
    textAlign: "center",
    height: 42,
    fontSize: 24,
    color: "#fdfdfdcc",
    borderRadius: 8,
    paddingHorizontal: 50,
  },
});
