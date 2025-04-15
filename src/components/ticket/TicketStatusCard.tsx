import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getFormattedDate, getFormattedStatus } from "../../utilities/Tickets";
import { Colors, Spacing, Typography } from "../../styles/index";
import FieldRow from "./FieldRow";

interface TicketStatusCardProps {
    agent?: string;
    date?: string;
    status?: string;
}

const TicketStatusCard: React.FC<TicketStatusCardProps> = ({
    agent,
    date,
    status,
}) => {
    return (
        <View style={styles.card}>
            <View style={[styles.header, styles.row]}>
                <FieldRow label="בטיפול של:" value={agent} />
                <Text style={styles.title}>
                    {date ? getFormattedDate(date) : ""}
                </Text>
            </View>
            <FieldRow
                label="סטטוס:"
                value={status ? getFormattedStatus(status) : ""}
            />
        </View>
    );
};

export default TicketStatusCard;

const styles = StyleSheet.create({
    card: {
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: Spacing.spacing.s,
        borderRadius: 10,
        elevation: 10,
        shadowColor: Colors.colors.secondary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        marginVertical: Spacing.spacing.s,
    },
    row: {
        flexDirection: "row",
    },
    header: {
        justifyContent: "space-between",
    },
    title: {
        ...Typography.typography.subheading,
        fontFamily: "NotoSerif-Medium",
    },
});
