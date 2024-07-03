import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Alert, Pressable, Animated, TextInput, Switch } from 'react-native';
import { Audio } from 'expo-av';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';


export default function Record({ navigation }) {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [title, setTitle] = useState('');
  const [nightMode, setNightMode] = useState(false); // State for night mode

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  async function downloadRecording(recordingUri, recordingTitle) {
    try {
      const downloadDest = `${FileSystem.documentDirectory}${recordingTitle}.mp3`;
      await FileSystem.downloadAsync(recordingUri, downloadDest);
  
    
      const asset = await MediaLibrary.createAssetAsync(downloadDest);
      await MediaLibrary.createAlbumAsync('Recordings', asset, false);
  
      Alert.alert('Download Complete', 'Recording downloaded successfully.');
    } catch (error) {
      console.error('Failed to download recording', error);
      Alert.alert('Download Failed', 'Failed to download recording.');
    }
  }

 

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
      transcript: '',
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
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            const updatedRecordings = [...recordings];
            updatedRecordings.splice(index, 1);
            setRecordings(updatedRecordings);
          }
        }
      ],
      { cancelable: true}
    )
    
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
          <View style={styles.swipeableActions}>
            <Pressable onPress={() => playRecording(recordingLine)}>
              <MaterialCommunityIcons name="play" size={24} color="#4CAF50" style={styles.actionIcon} />
            </Pressable>
            <Pressable onPress={() => deleteRecording(index)}>
              <MaterialCommunityIcons name="delete" size={24} color="#F44336" style={styles.actionIcon} />
            </Pressable>
          </View>
        )}
        renderLeftActions={(progress, dragX) => {
          const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View style={[styles.deleteButtonContainer, { transform: [{ scale }] }]}>
              <Pressable style={styles.deleteButton} onPress={() => deleteRecording(index)}>
                <MaterialCommunityIcons name="delete" size={24} color="#FFFFFF" />
              </Pressable>
            </Animated.View>
          );
        }}
        onSwipeableLeftOpen={() => deleteRecording(index)}
      >
        <View style={[styles.recordingContainer, nightMode && styles.recordingContainerDark]}>
          <View style={styles.recordingInfo}>
            <Text style={[styles.recordingTitle, nightMode && styles.recordingTitleDark]}>
              {recordingLine.title || `Recording ${index + 1}`}
            </Text>
            <Text style={[styles.recordingDuration, nightMode && styles.recordingDurationDark]}>
            {recordingLine.duration} | {recordingLine.date}
          </Text>
          <Text style={[styles.recordingDuration, nightMode && styles.recordingDurationDark]}>
          Transcript: {recordingLine.transcript || 'Not available'}
        </Text>
          </View>
          <Menu>
            <MenuTrigger>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="#666666" style={styles.moreOptionsIcon} />
            </MenuTrigger>
            <MenuOptions customStyles={{optionsWrapper: {padding: 5}, optionText: styles.text}}>
              <MenuOption onSelect={() => playRecording(recordingLine)} text="Play" />
              <MenuOption onSelect={() => downloadRecording(recordingLine.file, recordingLine.title)} text="Download" />
              <MenuOption onSelect={() => deleteRecording(index)} text="Delete" />
            </MenuOptions>
          </Menu>
        </View>
      </Swipeable>
    ));
  }

  return (
    <GestureHandlerRootView style={[styles.container, nightMode && styles.containerDark]}>
      <View style={styles.mainContent}>
        <View style={styles.headerContainer}>
          <Text style={[styles.header, nightMode && styles.headerDark]}>All Recordings</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {getRecordingLines()}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[styles.recordButton]}
          onPress={recording ? stopRecording : startRecording}
        >
          <Animated.View style={[styles.redCircle, {width : recording ? '70%' : '100%'}]} />
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  
  containerDark: {
    backgroundColor: '#121212',
  },
  mainContent: {
    flex: 1,
    marginTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerDark: {
    color: '#FFFFFF',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  recordingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recordingContainerDark: {
    backgroundColor: '#2e2e2e',
  },
  recordingInfo: {
    flex: 1,
  },
  recordingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recordingTitleDark: {
    color: '#FFFFFF',
  },
  recordingDuration: {
    fontSize: 14,
    color: '#666666',
  },
  recordingDurationDark: {
    color: '#BBBBBB',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  footer: {
    backgroundColor: 'transparent',
    height: 70,
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
    backgroundColor: '#FFFFFF',
  },
  recordButtonDark: {
    backgroundColor: '#121212',
  },
  redCircle: {
    backgroundColor: 'orangered',
    aspectRatio: 1,
    borderRadius: 30,
  },
  swipeableActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 80,
    height: '100%',
  },
  actionIcon: {
    padding: 10,
  },
  moreOptionsIcon: {
    padding: 10,
  },
  deleteButtonContainer: {
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  deleteButton: {
    padding: 15,
  },
});
