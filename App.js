import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';


import HomeScreen from './screens/HomeScreen'
import CasesScreen from './screens/CasesScreen'
import ReportScreen from './screens/ReportScreen'
import ResourcesScreen from './screens/ResourcesScreen'
import SelectLocationScreen from './screens/SelectLocationScreen'

const Stack = createStackNavigator();

export default function App() {
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, cardStyleInterpolator: forFade, transitionSpec: { open: TransitionSpecs.FadeInFromBottomAndroidSpec, close: TransitionSpecs.FadeInFromBottomAndroidSpec}}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cases" component={CasesScreen} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Resources" component={ResourcesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
