import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import CustomInput from './Components/CustomInput';
import { useNavigation } from '@react-navigation/native';

export default function Signup({ useNavigation}) {
    
    const navigation = useNavigation()

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
        Alert.alert('Signup Info', `Username: ${username}\nEmail: ${email}\nPassword: ${password}`);
        // Logic to Sign up User
        // for example, by calling an API or performing some action.
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

