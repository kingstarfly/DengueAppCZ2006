import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { globalStyles } from "../styles/global";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import SpecificLocationScreen from "./SpecificLocationScreen";
import SingaporeLocationScreen from "./SingaporeLocationScreen";

const Tab = createMaterialTopTabNavigator();

const CasesScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 14,
          textTransform: "capitalize",
        },

        indicatorStyle: {
          width: 10,
          height: 10,
          marginLeft: 100,
          marginBottom: 2,
          borderRadius: 10,
          marginHorizontal: "auto",
        },
      }}
      initialRouteName="SpecificLocation"
      screenOptions={{ headerShown: false }}
      backBehavior={"none"}
    >
      <Tab.Screen
        name="SpecificLocation"
        component={SpecificLocationScreen}
        options={{
          title: "Your Location",
        }}
      />
      <Tab.Screen
        name="SingaporeLocation"
        component={SingaporeLocationScreen}
        options={{
          title: "Singapore",
        }}
      />
    </Tab.Navigator>
  );
};

export default CasesScreen;
