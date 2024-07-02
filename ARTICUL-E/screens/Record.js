import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert, Pressable, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

export default function Record({ navigation }) {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    const uri = recording.getURI();
    const newRecording = {
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: uri,
      title: title,
      date: new Date().toLocaleDateString(),
    };

    setRecordings([...recordings, newRecording]);
    setTitle('');
  }

  function getDurationFormatted(milliseconds) {
    if (milliseconds === 0) {
      return '0:00';
    }
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  function deleteRecording(index) {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedRecordings = recordings.filter((_, i) => i !== index);
            setRecordings(updatedRecordings);
          },
        },
      ],
      { cancelable: true }
    );
  }

  function playRecording(recordingLine) {
    navigation.navigate('PlayBackScreen', {
      recordingUri: recordingLine.file,
      recordingTitle: recordingLine.title || 'Recording',
    });
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => (
      <Swipeable
        key={index}
        renderRightActions={() => (
          <View style={styles.deleteButton}>
            <Button title="Delete" color="white" onPress={() => deleteRecording(index)} />
          </View>
        )}
      >
        <View style={styles.row}>
          <Text style={styles.fill}>
            {recordingLine.title || `Recording ${index + 1}`} | {recordingLine.duration} | {recordingLine.date}
          </Text>
          <Menu>
            <MenuTrigger>
              <Text style={styles.moreOptions}>⋮</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => playRecording(recordingLine)} text="Play" />
              <MenuOption onSelect={() => deleteRecording(index)} text="Delete" />
            </MenuOptions>
          </Menu>
        </View>
      </Swipeable>
    ));
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {getRecordingLines()}
          <View style={styles.inputContainer}></View>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable
            style={styles.recordButton}
            onPress={recording ? stopRecording : startRecording}
          >
            <Animated.View style={[styles.redCircle]} />
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  recordingCount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  fill: {
    flex: 1,
    marginHorizontal: 15,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  bottomContainer: {
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
  },
  moreOptions: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  footer: {
    backgroundColor: 'white',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    borderRadius: 60,
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: 'gray',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redCircle: {
    backgroundColor: 'orangered',
    aspectRatio: 1,
    borderRadius: 30,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});
