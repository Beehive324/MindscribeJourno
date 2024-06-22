// Visualizer.js
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { Audio } from 'expo-av';

export default function Visualizer({ recording }) {
  const [data, setData] = useState(new Array(30).fill(0));
  const intervalRef = useRef();

  useEffect(() => {
    if (recording) {
      const interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.isRecording) {
          const volume = status.metering;
          setData(prevData => [...prevData.slice(1), volume]);
        }
      }, 100);
      intervalRef.current = interval;
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [recording]);

  return (
    <View style={styles.visualizerContainer}>
      <Svg height="100" width="300">
        {data.map((value, index) => (
          <Line
            key={index}
            x1={index * 10}
            y1="100"
            x2={index * 10}
            y2={100 - value * 100}
            stroke="lime"
            strokeWidth="2"
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  visualizerContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
