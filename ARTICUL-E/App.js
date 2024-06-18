import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Import Text from react-native
import Record from './screens/Record';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login'; // Correct casing for Login
import SplashScreen from './screens/Splashscreen'; // Correct casing for SplashScreen
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  }, []); // Add empty dependency array to useEffect to run only once

  return (
    <NavigationContainer>
    <View style={styles.container}>
      {isShowSplashScreen ? <SplashScreen /> : <Signup />}
    
        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen name = "Login" component={Login} />
          <Stack.Screen name = "Signup" component={Signup} />
        </Stack.Navigator>
    </View>
    </NavigationContainer>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
