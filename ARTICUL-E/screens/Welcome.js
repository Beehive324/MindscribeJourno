import React, {useState, useRef} from 'react';
import CustomInput from './Components/CustomInput';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, FlatList, Animation } from 'react-native';
import Slides from '../Slides';
import OnbardingItem from '../OnboardingItem'

const Welcome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Articul-e</Text>
            <FlatList data={Slides} renderItem={({item}) => <OnbardingItem item={item} />} 

            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            
            />
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
        marginTop: 30,
        color: '#FFFFFF',
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
