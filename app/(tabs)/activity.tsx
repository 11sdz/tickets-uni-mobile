import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../src/store/state/store";
import { fetchTicketData } from "../../src/store/state/tickets/ticketSlice";
import { Colors, Spacing } from "../../src/styles";
import Button from "../../src/components/buttons/Button";
import { FlatList } from "react-native-gesture-handler";
import TicketCard from "../../src/components/ticket/TicketCard";
import { router } from "expo-router";
import EmptyList from "../../src/components/ticket/EmptyList";
import ListHeader from "../../src/components/ticket/ListHeader";
import ListFooter from "../../src/components/ticket/ListFooter";
import { sortTicketData } from "../../src/utilities/Tickets";
import TicketsCount from "../../src/components/ticket/TicketsCount";
import LoadingModal from "../../src/components/LoadingModal";

const ItemSeparator = () => <View style={{ height: Spacing.spacing.s }} />;

const ActivityScreen = () => {
    const {
        loading,
        error,
        tickets: ticketData,
    } = useSelector((state: RootState) => state.tickets);
    const dispatch: AppDispatch = useDispatch();
    const { userData } = useSelector((state: RootState) => state.user); // Get agent from Redux store

    const [statusFilter, setStatusFilter] = useState("all"); // Default to "all" status
    const [filteredTickets, setFilteredTickets] = useState(ticketData); // Initialize filtered tickets with all tickets

    const handleGetTickets = async () => {
        try {
            // Handle registration logic here
            dispatch(fetchTicketData({ agent: userData?._id }));
        } catch (e) {
            console.log(e);
        }
    };

    const handleTicketPress = (ticketId: string) => {
        console.log("Open ticket id:", ticketId);
        router.push(`/tickets/${ticketId}`);
    };
    useEffect(() => {
        if (!statusFilter) {
            setFilteredTickets(ticketData);
        } else if (statusFilter === "all") {
            const sortedByStatusThenDate = sortTicketData(
                ticketData,
                "statusThenDate"
            );
            setFilteredTickets(sortedByStatusThenDate);
        } else {
            const sortedByStatusThenDate = sortTicketData(
                ticketData,
                "statusThenDate"
            );
            const filtered = sortedByStatusThenDate.filter(
                (ticket) => ticket.status === statusFilter
            );
            setFilteredTickets(filtered);
        }
    }, [ticketData, statusFilter]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Button
                    buttonSize="xsmall"
                    onPress={handleGetTickets}
                    iconName="arrows-rotate"
                />
                <TicketsCount ticketData={ticketData}/>
                <LoadingModal
                    loading={loading}
                    message={"טוען פניות"}/>
                {error && <Text>{error}</Text>}
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={filteredTickets}
                    ItemSeparatorComponent={ItemSeparator}
                    renderItem={({ item }) => (
                        <TicketCard
                            ticketData={item}
                            onPress={handleTicketPress}
                        />
                    )}
                    ListEmptyComponent={() => EmptyList()}
                    ListHeaderComponent={() =>
                        ListHeader({
                            statusFilter,
                            setStatusFilter,
                            hasTickets: ticketData.length > 0,
                        })
                    }
                    ListFooterComponent={() =>
                        ticketData.length > 0 && ListFooter()
                    }
                />
            </View>
        </View>
    );
};

export default ActivityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: Spacing.spacing.m,
    },
    listContainer: {
        flex: 1,
        paddingVertical: Spacing.spacing.m,
        paddingHorizontal: Spacing.spacing.s,
    },
    filtersContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: Spacing.spacing.s,
    },headerContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});
