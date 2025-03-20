import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/state/store";
import { fetchTicketData } from "../../src/store/state/tickets/ticketSlice";
import UpdateStatusButton from "../../src/components/status/UpdateStatusButton";
import { Buttons, Colors, Spacing } from "../../src/styles";

const Home = () => {
    const {
        loading,
        error,
        tickets: ticketData,
    } = useSelector((state: RootState) => state.tickets);
    const dispatch: AppDispatch = useDispatch();

    const handleGetTickets = async () => {
        try {
            // Handle registration logic here
            dispatch(fetchTicketData({ agent: "agent2" }));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGetTickets} style={styles.refreshTicketsButton}>
                <Text>Get Tickets</Text>
            </TouchableOpacity>
            <UpdateStatusButton/>
            <Text>Home</Text>
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {ticketData.map((ticket) => (
                <View key={ticket._id}>
                    <Text>{ticket.title}</Text>
                    <Text>{ticket.text}</Text>
                </View>
            ))}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: Spacing.spacing.m,
    },
    refreshTicketsButton: {
        ...Buttons.buttonSizes.medium,
        ...Buttons.smallRounded,
        backgroundColor: Colors.colors.primary,
    },

});
