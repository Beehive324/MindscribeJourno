import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import icons from Expo vector icons library
import Svg, { Circle } from 'react-native-svg'; // Import SVG components for custom progress

const Progress = ({ streaks }) => {
  const maxStreakDays = 30;
  const percentage = (streaks / maxStreakDays) * 100; // Calculate percentage of progress

  let progressColor = '#FF6347'; // Default color for progress bar
  if (percentage === 100) {
    progressColor = '#00CC00'; // Green color when streak goal is achieved
  } else if (percentage >= 70) {
    progressColor = '#FFA500'; // Orange color for significant progress
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
          <Feather name="check-circle" size={24} color={progressColor} style={{ marginTop: -80 }} />
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
    marginBottom: 60,
    alignItems: 'center',
    marginTop: 90,
  },
  progressContainer: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 50,
  },
  progressText: {
    fontSize: 18,
    marginTop: 80,
  },
  streakText: {
    marginTop: 100,
    fontSize: 16,
  },
});

export default Progress;
