import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function PlaybackScreen({ route, navigation }) {
  const { recordingUri, recordingTitle } = route.params;

  async function playRecording() {
    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recordingTitle}</Text>
      <Button title="Play" onPress={playRecording} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
