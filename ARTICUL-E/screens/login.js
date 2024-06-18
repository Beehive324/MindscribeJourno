// Login.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import CustomInput from './Components/CustomInput';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onLoginPressed = () => {
        Alert.alert('Login Info', `Username: ${username}\nPassword: ${password}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <CustomInput 
                placeholder="Email" 
                value={username} 
                setValue={setUsername} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry
            />
            <Button title="Login" onPress={onLoginPressed} />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
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
    signUpText: {
        color: 'blue',
        marginTop: 20,
    },
});

export default Login;
