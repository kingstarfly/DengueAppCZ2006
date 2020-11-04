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
          color: "#fff",
          fontWeight: "bold",
          paddingHorizontal: 8,
          paddingVertical: 3,
          // borderWidth: 1,
          borderRadius: 50,
        },

        indicatorStyle: {
          width: 8,
          height: 8,
          marginLeft: 85,
          marginBottom: 40,
          borderRadius: 10,
          marginHorizontal: "auto",
          backgroundColor: "#fffc",
        },
        style: {
          backgroundColor: "transparent",
          position: "absolute",
          left: 0,
          top: 10,
          right: 0,
          borderWidth: 0,
          elevation: 0,
          marginHorizontal: 30,
          marginBottom: 100,
          // todo FIX THE SPACING
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
