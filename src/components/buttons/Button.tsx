import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Buttons, Colors, Typography } from '../../styles'


interface ButtonProps {
  buttonText: string;
  buttonSize: keyof typeof Buttons.buttonSizes; // ✅ Strongly typed keys
  onPress: () => void;
}

const Button = ({ buttonText, buttonSize, onPress }: ButtonProps) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, Buttons.buttonSizes[buttonSize]]}>
      <Text style={[Typography.typography[buttonSize],styles.text]}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    backgroundColor: Colors.colors.tint,
    borderRadius: Buttons.rounded.borderRadius,
    elevation: 3,
    shadowColor: Colors.colors.shade,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text:{
    textAlign: 'center',
    fontFamily: 'Rubik-Medium',
  }
})