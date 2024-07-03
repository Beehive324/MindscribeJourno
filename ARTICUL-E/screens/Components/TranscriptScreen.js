import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TranscriptScreen({ route }) {
  const { transcript } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.transcriptText}>{transcript}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  transcriptText: {
    fontSize: 16,
    color: '#333333',
  },
});
