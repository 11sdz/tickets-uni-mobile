import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Spacing, Typography } from '../../styles'

interface UserHeaderProps {
    firstName?: string
    lastName?: string
}

const UserHeader: React.FC<UserHeaderProps> = ({ firstName, lastName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>שלום👋&nbsp;{firstName} {lastName}</Text>
    </View>
  )
}

export default UserHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: Spacing.spacing.m,
    },
    text: {
        ...Typography.typography.heading,
        fontFamily: "Rubik-Bold",
        direction: "rtl",
        textAlign: "right",
    },
})