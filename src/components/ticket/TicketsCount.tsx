import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, Spacing, Typography } from "../../styles";

interface TicketsCountProps {
    ticketData: any[];
}

const TicketsCount = ({ ticketData }: TicketsCountProps) => {
    const allTickets = ticketData?.length ?? 0;
    const openTickets = ticketData?.filter((ticket) => ticket.status === "open").length ?? 0;
    const completedTickets = ticketData?.filter((ticket) => ticket.status === "completed").length ?? 0;
    const uncompletedTickets = ticketData?.filter((ticket) => ticket.status === "uncompleted").length ?? 0;
    const inProgressTickets = ticketData?.filter((ticket) => ticket.status === "inprogress").length ?? 0;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.text}>
                    סה"כ:{"\u00A0"}{String(allTickets)}
                </Text>
                <Text style={styles.text}>
                    פתוחות:{"\u00A0"}{String(openTickets)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>
                    טופל:{"\u00A0"}{String(completedTickets)}
                </Text>
                <Text style={styles.text}>
                    לא טופל:{"\u00A0"}{String(uncompletedTickets)}
                </Text>
                <Text style={styles.text}>
                    בטיפול:{"\u00A0"}{String(inProgressTickets)}
                </Text>
            </View>
        </View>
    );
};

export default TicketsCount;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.colors.ListHeader,
        paddingHorizontal: Spacing.spacing.xs,
        borderRadius: 8,
        elevation: 3,
        shadowColor: Colors.colors.shade,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    text: {
        ...Typography.typography.medium,
        fontFamily: "Rubik-Bold",
        color: "#000",
        marginHorizontal: Spacing.spacing.xs,
    },
});
