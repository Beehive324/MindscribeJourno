// Components/CustomInput.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ placeholder, value, setValue, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        height: 40,
    },
});

export default CustomInput;
