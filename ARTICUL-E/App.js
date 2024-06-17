import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native'; // Import Text from react-native
import Record from './screens/Record';
import Login from './screens/login'; // Correct casing for Login
import SplashScreen from './screens/Splashscreen'; // Correct casing for SplashScreen

export default function App() {
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);
  }, []); // Add empty dependency array to useEffect to run only once

  return (
    <View style={styles.container}>
      {isShowSplashScreen ? <SplashScreen /> : <Record />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
