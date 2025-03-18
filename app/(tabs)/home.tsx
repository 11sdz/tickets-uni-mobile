import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/state/store";
import { fetchTicketData } from "../../src/store/state/tickets/ticketSlice";

const Home = () => {
    const { loading, error, ticketData} = useSelector(
        (state: RootState) => state.tickets
    );
    const dispatch: AppDispatch = useDispatch();

    const handleGetTickets = async () => {
        try {
            // Handle registration logic here
            dispatch(fetchTicketData());
            console.log(ticketData);
        } catch (e) {
            console.log(e);
        }
    };

  return (
<View>
  <TouchableOpacity onPress={handleGetTickets}>
    <Text>Get Tickets</Text>
  </TouchableOpacity>
  <Text>Home</Text>
  {loading && <Text>Loading...</Text>}
  {error && <Text>{error}</Text>}
</View>
  )
}

export default Home

const styles = StyleSheet.create({})