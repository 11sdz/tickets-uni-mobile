import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthForm from '../../src/components/navigator/user/AuthForm'

const Login = () => {

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
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})