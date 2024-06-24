import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import CustomInput from './Components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function Signup({ navigation}) {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = () => {
        navigation.navigate("Login");
    };
    
    const handleSubmit = async () => {
        if (!emailPattern.test(email)) {
            Alert.alert('Error', 'Invalid email');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post("http://10.113.79.205:8083/register", userData);
            console.log(response.data);
            navigation.navigate('Login');
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                Alert.alert('Error', 'Registration failed. ' + error.response.data.message);
            } else if (error.request) {
                console.error('Error request:', error.request);
                Alert.alert('Error', 'No response from server. Please try again later.');
            } else {
                console.error('Error message:', error.message);
                Alert.alert('Error', 'An error occurred. Please try again.');
            }
        }
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
            <Button title="Signup" onPress={handleSubmit} />
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
