import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomInput from './Components/CustomInput';

const Splash = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Articul-e</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#234E5F',
    },
    title: {
        fontSize: 32,
        color: '#FFFFFF',
        marginBottom: 20,
        fontFamily: 'Advent Pro',
        fontWeight: 'bold',
        color: "black",
    },
});

export default Splash;
