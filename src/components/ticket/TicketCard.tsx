import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TicketData } from '../../types/Types'
import { Typography } from '../../styles';

type TicketCardProps = {
  ticketData: TicketData;
  onPress: (ticketId:string) => void;
}

const TicketCard = ({ticketData,onPress}: TicketCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(ticketData._id)}>
        <Text style={styles.title}>{ticketData.title}</Text>
        <Text style={styles.text}>{ticketData.text}</Text>
    </TouchableOpacity>
  )
}

export default TicketCard

const styles = StyleSheet.create({
  title:{
    ...Typography.typography.heading,
    fontFamily: 'Rubik-Bold',
  },
  text:{
    ...Typography.typography.body,
    fontFamily: 'Rubik-Regular',

  }
})