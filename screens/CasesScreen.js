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
      initialRouteName="SpecificLocation"
      screenOptions={{ headerShown: false }}
      backBehavior={"none"}
    >
      <Tab.Screen name="SpecificLocation" component={SpecificLocationScreen} />
      <Tab.Screen
        name="SingaporeLocation"
        component={SingaporeLocationScreen}
      />
    </Tab.Navigator>
  );
};

export default CasesScreen;
