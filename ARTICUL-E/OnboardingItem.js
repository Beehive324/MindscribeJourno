import React from 'react';
import CustomInput from './screens/Components/CustomInput';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import Slides from './Slides';

export default OnboardingItem = ({ item }) => {

    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />
            <View style= {{flex: 0.3}}>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.description}>{item.description}</Text>
            </View>
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
        fontSize: 28,
        color: '#FFFFFF',
        fontFamily: 'Advent Pro',
        fontWeight: 'bold',
        color: "black",
        textAlign: 'center',
    },
    button: {
        marginBottom: 100,
        position: 40,
    },

    image: {
        flex: 0.7,
        justifyContent: 'center'
    },

    description: {
        fontWeight: 300,
        textAlign: 'center',
        paddingHorizontal: 64,
        color: '#62656b'
    }

    
});


