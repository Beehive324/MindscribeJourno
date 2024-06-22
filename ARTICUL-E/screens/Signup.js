import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import CustomInput from './Components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Signup({ navigation}) {
    


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = () => {
        navigation.navigate("Login");
    };


    const onSignupPressed = () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        const userData={
            email: email,
            password: password
        };
        axios.post("http://10.113.79.205:8083/register", userData)
        .then(res => console.log(res.data))
        .catch(e => console.log(e));


    }; 



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <CustomInput 
                placeholder="Email" 
                value={email} 
                setValue={setEmail} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry
            />
            <CustomInput 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                setValue={setConfirmPassword} 
                secureTextEntry
            />
            <Button title="Signup" onPress={onSignupPressed} />
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.signInText}>Already got an account? Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Record')}>
                <Text style={styles.signInText}>Continue without an account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    signInText: {
        color: 'blue',
        marginTop: 20,
    },
});
