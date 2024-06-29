import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './screens/Record';
import Login from './screens/login'; 
import SplashScreen from './screens/Splashscreen'; 
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import HomeScreen from './screens/Components/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  }, []); // Empty dependency array to run only once

  return (
    <NavigationContainer>
      {isShowSplashScreen ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Record" component={Record} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
