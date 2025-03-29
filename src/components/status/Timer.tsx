import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatTimeElapsed } from '../../utilities/Timer';
import { Typography } from '../../styles';

interface TimerProps{
    start:Date
}

const Timer= ({start}:TimerProps) => {
  const [elapsedTime,setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        const now = new Date();
        const difference = Math.floor((start.getTime() - now.getTime()) / 1000); // Convert milliseconds to seconds
        setElapsedTime(difference);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [start]);

  return (
    <View>
      <Text style={styles.timer}>{formatTimeElapsed(new Date(start.getTime() + elapsedTime * 1000))}</Text>
    </View>
  )
}

export default Timer

const styles = StyleSheet.create({
  timer:{
    ...Typography.typography.heading,
    fontFamily: "Rubik-Regular", // Ensure the font is loaded
  }
})