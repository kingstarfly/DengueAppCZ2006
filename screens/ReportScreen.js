import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { globalStyles } from '../styles/global';

const ReportScreen = ( { navigation }) => {
    return (
        <View style={globalStyles.redContainer}>
            <Text>Report Dengue Breeding Grounds</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

export default ReportScreen;