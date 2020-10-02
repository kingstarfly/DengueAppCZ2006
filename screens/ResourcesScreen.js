import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { globalStyles } from '../styles/global';

const ResourcesScreen = ( { navigation }) => {
    return (
        <View style={globalStyles.greenContainer}>
            <Text>View Resources</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

export default ResourcesScreen;