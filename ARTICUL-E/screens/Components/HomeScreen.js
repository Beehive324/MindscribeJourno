import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Record from '../Record';
import { useNavigation, navigation } from '@react-navigation/native';
import Settings from './Settings';
import { Home } from './Home';

function Setting() {
  return (
    <Settings navigation={navigation} />
  );
}

function Profile() {
  return (
    <Home color="#0891b2" navigation={navigation} />
  );
}

function Create({ navigation }) {
    return (
      <Record navigation={navigation} />
    );
  }
  
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
        <Tab.Screen
        name="Home"
        component={Profile}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="New Recording"
        component={Create}
        options={{
          tabBarLabel: 'New Recording',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      
    </Tab.Navigator>
  );
}

