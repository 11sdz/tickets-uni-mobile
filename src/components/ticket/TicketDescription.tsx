import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/index";

interface TicketDescriptionCardProps {
    generatedTitle?: string;
    text?: string;
}

const TicketDescriptionCard: React.FC<TicketDescriptionCardProps> = ({ generatedTitle, text }) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.field}>{generatedTitle}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.body}>{text}</Text>
            </View>
        </View>
    );
};

export default TicketDescriptionCard;

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
        justifyContent:'flex-start',
        direction: "rtl",
    },
    body: {
        ...Typography.typography.body,
        fontFamily: "NotoSerif-Regular",
        textAlign:'left',
    },
    field: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-SemiBold",
    },
});
