import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import CustomInput from './Components/CustomInput';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSumbit() {
        console.log(email, password);
        const userData = {
            email: email,
            password: password,
        };

        axios
        .post("http://10.113.79.205:8083/login", userData)
            .then(res => {console.log(res.data)
            if(res.data.status=="ok"){
                Alert.alert('Login Successful');
                navigation.navigate("HomeScreen"); // Navigate here on successful login
            } else {
                Alert.alert('Login Unsuccessful');
            }
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Articul-e</Text>
            <CustomInput 
                placeholder="Email" 
                value={email} 
                setValue={setEmail} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleSumbit} >
                <Text style={styles.appButtonTex}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.signUpText}>Continue without an account</Text>
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
    button: {
        backgroundColor: "#007AFF",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 140,
        marginTop: 18,
        marginBottom: 20,        
    },
    appButtonTex: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    }
});

export default Login;
