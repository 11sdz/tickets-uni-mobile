import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Spacing, Typography } from '../../styles'

const width = Dimensions.get("window").width; // Get the width of the window

const ListFooter = () => {
return (
    <View style={styles.container}>
      <Text style={styles.title}>נראה שאין עוד פניות. אם אינך רואה את כולם לחץ רענן פניות.</Text>
    </View>
  )
}

export default ListFooter

const styles = StyleSheet.create({
    container: {
        width: width,
        marginTop: Spacing.spacing.xs,
        backgroundColor: Colors.colors.ListHeader,
        padding: Spacing.spacing.s,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 3,
        shadowColor: Colors.colors.shade,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        borderRadius: 5,
        borderColor: Colors.colors.secondary,
    },
    title: {
        ...Typography.typography.body,
        fontFamily: "Rubik-Regular",
        color: Colors.colors.heading,
        maxWidth: width * 0.8, // Set maxWidth to 80% of the screen width
    },
})