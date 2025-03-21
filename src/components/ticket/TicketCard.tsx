import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TicketData } from '../../types/Types'
import { Colors, Typography } from '../../styles';

type TicketCardProps = {
  ticketData: TicketData;
  onPress: (ticketId:string) => void;
}

const TicketCard = ({ticketData,onPress}: TicketCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(ticketData._id)} style={styles.cardStyle}>

        <Text style={styles.text}>{ticketData.text}</Text>
        <Text style={styles.title}>מס': {ticketData.title}</Text>
    </TouchableOpacity>
  )
}

export default TicketCard

const styles = StyleSheet.create({
  title:{
    ...Typography.typography.caption,
    fontFamily: 'Rubik-Medium',
    textAlign: 'right',
  },
  text:{
    ...Typography.typography.body,
    fontFamily: 'NotoSerif-Regular',
    textAlign: 'right',

  },
  cardStyle:{
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    elevation: 3,
    shadowColor: Colors.colors.shade,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
})