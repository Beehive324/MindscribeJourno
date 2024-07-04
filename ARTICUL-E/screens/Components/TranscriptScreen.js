import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function TranscriptScreen({ route }) {
  const { transcript, title } = route.params;
  console.log(transcript)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.transcriptText}>{transcript}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 10,
  },
  transcriptText: {
    fontSize: 16,
    color: '#333333',
  },
});
