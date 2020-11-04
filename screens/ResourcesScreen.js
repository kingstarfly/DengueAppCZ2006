import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";

// images
import dd1 from "../assets/dd1.png";
import dd2 from "../assets/dd2.png";
import dd3 from "../assets/dd3.png";
import dd4 from "../assets/dd4.png";
import dengue_symptoms from "../assets/dengue_symptoms.png";
import zika_4 from "../assets/zika_4.jpg";

const Resource = ({ data }) => {
  const renderSwitch = (param) => {
    switch (data.name) {
      case "dd":
        return (
          <React.Fragment>
            <Image
              source={dd1}
              style={{
                height: 280,
                width: 280,
                resizeMode: "contain",
                marginBottom: 30,
              }}
            />
            <Image
              source={dd2}
              style={{
                height: 280,
                width: 280,
                resizeMode: "contain",
                marginBottom: 30,
              }}
            />
            <Image
              source={dd3}
              style={{
                height: 280,
                width: 280,
                resizeMode: "contain",
                marginBottom: 30,
              }}
            />
            <Image
              source={dd4}
              style={{
                height: 280,
                width: 280,
                resizeMode: "contain",
                marginBottom: 30,
              }}
            />
          </React.Fragment>
        );
        break;
      case "symptoms":
        return (
          <React.Fragment>
            <Image
              source={dengue_symptoms}
              style={{
                height: 430,
                width: 300,
                resizeMode: "contain",
                marginBottom: 30,
              }}
            />
          </React.Fragment>
        );
        break;
      case "zika":
        return (
          <React.Fragment>
            <Image
              source={zika_4}
              style={{
                height: 500,
                width: 300,
                resizeMode: "contain",
                marginBottom: 30,
              }}
            />
          </React.Fragment>
        );

        break;
    }
  };
  return (
    <View style={styles.resourceContainer}>
      <Text style={styles.resourceTitle}>{data.title}</Text>
      <Text style={styles.resourceBody}>{data.body}</Text>
      <View style={styles.imagesContainer}>{renderSwitch(data.name)}</View>
    </View>
  );
};

const FAKE_DATA = [
  {
    title: "Quick Info For You!",
    name: "dd",
    id: "1",
  },

  {
    title: "What are the symptoms of Dengue?",
    name: "symptoms",
    id: "2",
  },

  {
    title: "Have You Done The Mozzie Wipeout?",
    name: "zika",
    id: "3",
  },
];

const ResourcesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return <Resource style={styles.resourceContainer} data={item} />;
  };

  return (
    <SafeAreaView style={globalStyles.lightGreenContainer}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
    paddingBottom: 10, // TO CHANGE THIS! NOTE!!
  },

  resourceTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  imagesContainer: {
    marginTop: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 1,
  },
});
export default ResourcesScreen;
