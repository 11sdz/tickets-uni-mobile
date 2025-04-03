import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { selectTicketById } from '../../src/store/state/tickets/ticketSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/state/store';

const TicketScreen = () => {
  const { id } = useLocalSearchParams();  // Get ticket ID from URL params
  const ticketId = id as string; // Ensure ticket ID is a string

  const ticketData = useSelector((state: RootState) => selectTicketById(state, ticketId));  // Get ticket from Redux store
  const { loading, error } = useSelector((state: RootState) => state.tickets);  // Loading and error state

  console.log('Ticket Data:', ticketData!==null);  // Log ticket data for debugging

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default TicketScreen

const styles = StyleSheet.create({})