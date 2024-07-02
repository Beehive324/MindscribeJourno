import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

export const Home = ({ color }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        [
          { label: 'Total Recordings', opacity: 1 },
          { label: 'Favourite Recordings', opacity: 0.8 },
          { label: 'Analysis', opacity: 0.5 }
        ].map(({ label, opacity }) => (
          <View
            key={label}
            style={[styles.color, { backgroundColor: color, opacity }]}
          >
            <Text style={styles.text}>{label}</Text>
          </View>
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
