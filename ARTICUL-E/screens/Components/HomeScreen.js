import React from "react";
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

function Home() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Home!</Text>
        </View>
    );
}

function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Profile</Text>
        </View>
    );
}

function NewRecording() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Record!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
            <Text>Settings</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Record" component={NewRecording} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
    );
}
