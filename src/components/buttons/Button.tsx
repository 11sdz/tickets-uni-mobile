import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Buttons, Colors, Typography } from '../../styles'
import Icon from '../Icon';


interface ButtonProps {
  buttonText: string;
  buttonSize: keyof typeof Buttons.buttonSizes; // ✅ Strongly typed keys
  onPress: () => void;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;

}

const Button = ({ buttonText, buttonSize, onPress, iconName, iconSize, iconColor }: ButtonProps) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, Buttons.buttonSizes[buttonSize]]}>
      <Text style={[Typography.typography[buttonSize],styles.text]}>{buttonText}</Text>
      {iconName && <Icon name={iconName} size={iconSize} color={iconColor} />}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button:{
    flexDirection: 'row',
    justifyContent: 'center',
    
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