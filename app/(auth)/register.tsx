import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RegisterForm from '../../src/components/user/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../src/store/state/api/authSlice'
import { RootState, AppDispatch } from '../../src/store/state/store'
import { Colors, Spacing, Typography } from '../../src/styles'
import LoadingModal from '../../src/components/LoadingModal'

const {width} = Dimensions.get('window')

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
      <View style={styles.header}>
        <Text style={styles.headerText}>מלא פרטים:</Text>
      </View>
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
      },
  header:{
      padding: Spacing.spacing.xs,
      //backgroundColor: Colors.colors.ListHeader,
      borderRadius: 16,
      width: width*0.45,
      alignSelf: 'center',
      marginBottom: Spacing.spacing.s,
      justifyContent: 'center',
      alignItems: 'center',
    },headerText:{
      ...Typography.typography.heading,
      fontFamily:'Rubik-Bold',
      textAlign: 'center',
      maxWidth: width*0.4,
    }
})