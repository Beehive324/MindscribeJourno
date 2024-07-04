import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

const Progress = ({ recordings }) => {
  const maxStreakDays = 30;
  const [streaks, setStreaks] = useState(0);
  const [recordedDates, setRecordedDates] = useState([]);

  // Calculate streaks and recorded dates
  useEffect(() => {
    if (!recordings || recordings.length === 0) {
      setStreaks(0); // Reset streaks if no recordings
      setRecordedDates([]);
      return;
    }

    const dates = recordings.map((recording) => recording.date);
    const uniqueDates = Array.from(new Set(dates)); // Get unique dates

    setRecordedDates(uniqueDates);

    // Calculate streaks based on recordings
    const lastRecordingDate = new Date(recordings[recordings.length - 1].date);
    const today = new Date();

    const timeDiff = Math.abs(today.getTime() - lastRecordingDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays === 1) {
      setStreaks((prevStreaks) => prevStreaks + 1);
    } else if (diffDays > 1) {
      setStreaks(0);
    }
  }, [recordings]);

  const percentage = (streaks / maxStreakDays) * 100;

  let progressColor = '#FF6347';
  if (percentage === 100) {
    progressColor = '#00CC00';
  } else if (percentage >= 70) {
    progressColor = '#FFA500';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Streak</Text>
      <View style={styles.progressContainer}>
        <Svg height="100" width="100">
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke="#E0E0E0"
            strokeWidth="8"
            fill="transparent"
          />
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke={progressColor}
            strokeWidth="8"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            fill="transparent"
          />
        </Svg>
        {percentage === 100 && (
          <Feather
            name="check-circle"
            size={24}
            color={progressColor}
            style={{ marginTop: -80 }}
          />
        )}
        <Text style={styles.progressText}>{`${percentage.toFixed(0)}%`}</Text>
      </View>
      <Text style={styles.streakText}>{`Current Streak: ${streaks} days`}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50
  },
  progressContainer: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
    marginTop: 40,
  },
  progressText: {
    fontSize: 18,
    marginTop: 10,
  },
  streakText: {
    marginTop: 10,
    fontSize: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
    marginBottom: 40,
  },
  calendarDay: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  recordedDay: {
    backgroundColor: '#FF6347',
  },
  calendarDate: {
    fontSize: 12,
  },
});

export default Progress;
