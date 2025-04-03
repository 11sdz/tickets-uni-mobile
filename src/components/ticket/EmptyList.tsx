import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Spacing, Typography } from '../../styles'
import LottieAnimation from '../LottieAnimation'
import LottieView from 'lottie-react-native'

const EmptyList = () => {
    const animationRef = useRef<LottieView>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            animationRef.current?.reset(); // Reset animation
            animationRef.current?.play();  // Play animation
        }, 10000); // 10 seconds interval

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>לא נמצאו פניות, לחץ רענן.</Text>
      <LottieAnimation
        source={require("../../assets/lottie/404notfound.json")}
        porportion={0.75}
        ref={animationRef} // Pass the ref to LottieAnimation
        autoPlay={false} // Disable autoPlay to control it manually
        loop={false} // Disable loop to control it manually
      />
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.spacing.m,
  },header: {
    ...Typography.typography.heading,
    fontFamily: "Rubik-Bold",
  },
})