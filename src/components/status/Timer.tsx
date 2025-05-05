import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { formatTimeElapsed } from '../../utilities/Timer';
import { Typography } from '../../styles';

interface TimerProps {
  start: Date;
}

const Timer = ({ start }: TimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTime = start.getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = Math.floor((now - startTime) / 1000);
      setElapsedTime(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [start.getTime()]); // ONLY run when the start time actually changes

  return (
    <View>
      <Text style={styles.timer}>{formatTimeElapsed(elapsedTime)}</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timer: {
    ...Typography.typography.heading,
    fontFamily: 'Rubik-Regular',
  },
});
