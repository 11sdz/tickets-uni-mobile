import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterForm from '../../src/components/user/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../src/store/state/api/authSlice'
import { RootState, AppDispatch } from '../../src/store/state/store'
import { Colors, Spacing } from '../../src/styles'
import { router } from 'expo-router'
import LoadingModal from '../../src/components/LoadingModal'

const Register = () => {
  const {loading, error ,data} = useSelector((state:RootState) => state.auth)
  const dispatch: AppDispatch = useDispatch();

  const handleRegister = async (username:string, email:string, password:string, firstName:string, lastName:string, passkey:string) => {
    try{
      // Handle registration logic here
      dispatch(registerUser({username, email, password, firstName, lastName, passkey}))
      console.log(username,email,password,firstName,lastName,passkey)
    }catch(e){
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <RegisterForm onSubmit={handleRegister}/>
      <LoadingModal loading={loading} message="מבצע הרשמה..." />
      {error && <Text>{error}</Text>}
      {data && <Text>{data.message}</Text>}
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container:{
          flex: 1,
          backgroundColor: Colors.colors.background,
          padding: Spacing.spacing.m,
      }
})