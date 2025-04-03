import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { selectTicketById } from "../../src/store/state/tickets/ticketSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/state/store";
import { Colors, Spacing, Typography } from "../../src/styles/index";
import { getFormattedDate } from "../../src/utilities/Tickets";
import Icon from "../../src/components/Icon";
import Button from "../../src/components/buttons/Button";

const TicketScreen = () => {
    const navigation = useNavigation(); // Get navigation object from router
    const { id } = useLocalSearchParams(); // Get ticket ID from URL params
    const ticketId = id as string; // Ensure ticket ID is a string

    const ticketData = useSelector((state: RootState) =>
        selectTicketById(state, ticketId)
    ); // Get ticket from Redux store
    const { loading, error } = useSelector((state: RootState) => state.tickets); // Loading and error state

    useEffect(() => {
        if (ticketData?.title) {
            navigation.setOptions({ title: `פניה מס': ${ticketData.title}` }); // Set navigation title to ticket title
        }
    }, [ticketData]);

    console.log("Ticket ID:", ticketId); // Log ticket ID for debugging

    console.log("Ticket Data:", ticketData !== null); // Log ticket data for debugging
    console.log(ticketData?.createdAt);

    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.row]}>
                <View style={styles.row}>
                    <Text style={styles.field}>בטיפול של:&nbsp;</Text>
                    <Text style={styles.title}>{ticketData?.agent}</Text>
                </View>
                <View style={styles.date}>
                    <Text style={styles.title}>
                        {ticketData?.createdAt
                            ? getFormattedDate(ticketData.createdAt)
                            : ""}
                    </Text>
                </View>
            </View>
            <View style={[styles.header, styles.row]}>
                <View style={styles.row}>
                    <Text style={styles.field}>נפתח ע"י:&nbsp;</Text>
                    <Text style={styles.title}>{ticketData?.personalName}</Text>
                </View>
                <Button
                    buttonText="חייג"
                    buttonSize="small"
                    onPress={() => {
                        /* Handle button press */
                    }}
                    iconName="phone"
                    iconSize={Typography.typography.body.fontSize}
                    iconColor={"green"}
                />
            </View>
            <Text>{id}</Text>
            {loading && <Text>טוען...</Text>}
            {error && <Text>{error}</Text>}
        </View>
    );
};

export default TicketScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacing.spacing.m,
        backgroundColor: Colors.colors.background,
    },
    header: {
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: Spacing.spacing.s,
        borderRadius: 10,
        elevation: 10,
        shadowColor: Colors.colors.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
    },
    title: {
        ...Typography.typography.subheading,
        fontFamily: "NotoSerif-Medium",
    },
    field: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-SemiBold",
    },
    date: {},
    row: {
        flexDirection: "row",
    },
});
