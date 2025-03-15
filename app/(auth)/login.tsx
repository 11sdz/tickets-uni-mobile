import { StyleSheet, TouchableOpacity,Text, View } from 'react-native'
import React from 'react'
import AuthForm from '../../src/components/navigator/user/AuthForm'
import { useRouter } from 'expo-router'

const Login = () => {
  const router = useRouter();

  const handleLogin = async (email:string, password:string) => {
    try{
      console.log(email,password)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <View>
      <AuthForm onSubmit={handleLogin}/>
      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})