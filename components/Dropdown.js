import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

const ListItem = ({ item, handleOptionPress }) => {
  return (
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={() => handleOptionPress(item)}
    >
      <Text style={styles.option}>{item.address}</Text>
    </TouchableOpacity>
  );
};

const Dropdown = ({ selectedAddresses, handleOptionPress, query }) => {
  console.log("Dropdown", selectedAddresses);
  console.log("query from dropdown", query);

  const renderItem = ({ item }) => {
    return <ListItem item={item} handleOptionPress={handleOptionPress} />;
  };

  const ItemSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#000",
          marginLeft: "7%",
        }}
      ></View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={query != "" ? selectedAddresses : []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#ddda",
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
    fontSize: 22,
    color: "#333d",
  },
});
