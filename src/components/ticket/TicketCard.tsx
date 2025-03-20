import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TicketData } from '../../types/Types'

type TicketCardProps = {
  ticketData: TicketData;
  onPress: (ticketId:string) => void;
}

const TicketCard = ({ticketData,onPress}: TicketCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(ticketData._id)}>
        <Text>{ticketData.title}</Text>
        <Text>{ticketData.text}</Text>
    </TouchableOpacity>
  )
}

export default TicketCard

const styles = StyleSheet.create({})