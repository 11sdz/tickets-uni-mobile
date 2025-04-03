import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Spacing, Typography } from '../../styles'

const width = Dimensions.get("window").width; // Get the width of the window

const ListHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>פניות בטיפולי:</Text>
    </View>
  )
}

export default ListHeader

const styles = StyleSheet.create({
    container: {
        width: width * 0.5,
        padding: Spacing.spacing.s,
        backgroundColor: Colors.colors.ListHeader,
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
        borderRadius: 20,
        borderColor: Colors.colors.secondary,
    },
    title: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Bold",
        color: Colors.colors.heading,
    },
})