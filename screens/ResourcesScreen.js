import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { globalStyles } from "../styles/global";

const Resource = ({ data }) => {
  console.log(data);
  return (
    <View style={styles.resourceContainer}>
      <Text style={styles.resourceTitle}>{data.title}</Text>
      <Text style={styles.resourceBody}>{data.body}</Text>
      <Text>{data.imgURI}</Text>
    </View>
  );
};

const FAKE_DATA = [
  {
    title: "Do the 5-Step Mozzie Wipeout",
    body: "Are you doing the Mozzie Wipeout correctly?",
    imgURI: "placeholder img URI",
    id: "1",
  },

  {
    title: "What are the symptoms of Dengue?",
    body: "Seek medical attention if you are showing these symptoms.",
    imgURI: "placeholder img URI",
    id: "2",
  },

  {
    title: "Mythbusters: Can you get dengue twice??",
    body: "Contrary to popular belief...",
    imgURI: "placeholder img URI",
    id: "3",
  },
];

const ResourcesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <Resource style={styles.resourceContainer} data={item} />
      // <Text>hi</Text>
    );
  };

  return (
    <View style={globalStyles.lightGreenContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dengue Resources</Text>
      </View>
      <View style={styles.allResourcesContainer}>
        <FlatList
          data={FAKE_DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },

  resourceContainer: {
    flex: 1,
    backgroundColor: "#3e9683c2",
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 100, // TO CHANGE THIS! NOTE!!
  },

  resourceTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  resourceBody: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
  },

  allResourcesContainer: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
export default ResourcesScreen;
