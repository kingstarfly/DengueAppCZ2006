import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { globalStyles } from '../styles/global'

const CasesScreen = ( { navigation }) => {
    return (
        <View style={globalStyles.blueContainer}>
            <Text>View Cases</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

export default CasesScreen;