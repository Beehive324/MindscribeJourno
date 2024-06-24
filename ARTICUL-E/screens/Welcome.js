import React from 'react';
import CustomInput from './Components/CustomInput';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Articul-e</Text>
            <Button style={styles.Button} title="Get Started" onPress={() =>navigation.navigate("Login")} />
        </View>

    
        

        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        color: '#FFFFFF',
        marginBottom: 20,
        fontFamily: 'Advent Pro',
        fontWeight: 'bold',
        color: "black",
    },
    button: {
        marginBottom: 100,
        position: 40,
    },
    
});

export default Welcome;
