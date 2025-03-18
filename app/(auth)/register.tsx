import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterForm from '../../src/components/navigator/user/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../src/store/state/api/authSlice'
import { RootState, AppDispatch } from '../../src/store/state/store'

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
    <View>
      <RegisterForm onSubmit={handleRegister}/>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {data && <Text>{data.message}</Text>}
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})