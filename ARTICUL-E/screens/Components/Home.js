import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Adjusted imports
import React from 'react';


export const Home = ({ color }) => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header]}>Home</Text>
      </View>
      {
        [
          { label: 'Total Recordings', opacity: 1, navigateTo: 'Record' },
          { label: 'Favourite Recordings', opacity: 0.8, navigateTo: 'Record' },
          { label: 'Analysis', opacity: 0.5, navigateTo: 'Record' }
        ].map(({ label, opacity, navigateTo }) => (
          <TouchableOpacity
            key={label}
            onPress={() => navigation.navigate(navigateTo)} // Use navigation object obtained from useNavigation
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
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -45,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
});
    
