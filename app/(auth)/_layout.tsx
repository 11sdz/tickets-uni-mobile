import React from 'react'
import { Stack } from 'expo-router'

const _Authlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown:false}}/>
      <Stack.Screen name="register" options={{headerShown:false}}/>
    </Stack>
  )
}

export default _Authlayout