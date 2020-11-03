import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

const ListItem = ({ addressObject, handleOptionPress }) => {
  // console.log("From dropdown listitem - addressObject is... ", addressObject);
  const address = addressObject.address;

  return (
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() => handleOptionPress(addressObject)}
    >
      <Text style={styles.option}>{address}</Text>
    </TouchableOpacity>
  );
};

const Dropdown = ({ selectedAddressObjects, handleOptionPress, query }) => {
  // console.log("Dropdown", selectedAddressObjects);
  // console.log("query from dropdown", query);

  const renderItem = ({ item }) => {
    return (
      <ListItem addressObject={item} handleOptionPress={handleOptionPress} />
    );
  };

  const ItemSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#bebebe",
          marginLeft: "7%",
        }}
      ></View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={query != "" ? selectedAddressObjects : []}
        renderItem={renderItem}
        keyExtractor={(addressObject) => addressObject.address} // key is the key of the object, which is the address name
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fdfdfdcc",
    borderRadius: 20,
    padding: 20,
    width: 280,
  },
  itemStyle: {
    flex: 1,
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  prompt: {
    fontSize: 20,
  },
  option: {
    fontSize: 16,
    color: "#000",
  },
});
