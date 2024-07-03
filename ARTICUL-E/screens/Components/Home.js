import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, navigation } from '@react-navigation/native';
import React from 'react';

export const Home = ({ color, navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        [
          { label: 'Total Recordings', opacity: 1, navigateTo: 'Record' },
          { label: 'Favourite Recordings', opacity: 0.8, navigateTo: 'Record' },
          { label: 'Analysis', opacity: 0.5, navigateTo: 'Record' }
        ].map(({ label, opacity, navigateTo }) => (
          <TouchableOpacity
            key={label}
            onPress={() => navigation.navigate(navigateTo)}
          >
            <View
              style={[styles.color, { backgroundColor: color, opacity }]}
            >
              <Text style={styles.text}>{label}</Text>
            </View>
          </TouchableOpacity>
        ))
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  color: {
    width: '100%',
    height: 150,
    borderRadius: 25,
    marginBottom: 15,
    marginTop: 70,
    padding: 15,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
    
