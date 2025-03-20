import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const TicketScreen = () => {
    const {id} = useLocalSearchParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default TicketScreen

const styles = StyleSheet.create({})