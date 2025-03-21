import React from 'react'
import { Stack } from 'expo-router'

const _Authlayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{headerShown:true,title:'התחברות'}}/>
      <Stack.Screen name="register" options={{headerShown:true,title:"טופס הרשמה"}}/>
    </Stack>
  )
}

export default _Authlayout