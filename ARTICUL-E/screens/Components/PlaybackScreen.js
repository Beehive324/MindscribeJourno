import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PlaybackScreen({ route, navigation }) {
  const { recordingUri, recordingTitle } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playPauseRecording() {
    if (sound === null) {
      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await sound.playAsync();
      setIsPlaying(true);
    } else if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  function onPlaybackStatusUpdate(status) {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
    }
  }

  async function seekPlayback(value) {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons style={styles.musicbox} name="waveform" size= "100"></MaterialCommunityIcons>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        onSlidingComplete={seekPlayback}
      />
      <MaterialCommunityIcons name='play' size = "30" onPress={playPauseRecording} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slider: {
    width: '60%',
    height: 40,
    marginBottom: 20,
  },
  musicbox: {
    marginBottom: 70,
  }
});
