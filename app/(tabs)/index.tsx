import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Link href="(tabs)/users/1">Go To user 1</Link>
    </View>
  )
} 

export default index

const styles = StyleSheet.create({})