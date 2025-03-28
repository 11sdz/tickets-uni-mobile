import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { TicketData } from "../../types/Types";
import { Colors, Spacing, Typography } from "../../styles";

const { width } = Dimensions.get("window");

type TicketCardProps = {
    ticketData: TicketData;
    onPress: (ticketId: string) => void;
};

const TicketCard = ({ ticketData, onPress }: TicketCardProps) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(ticketData._id)}
            style={styles.cardStyle}
        >
            <View style={styles.header}>
                <View style={{maxWidth: width * 0.6,}}>
                    <Text style={styles.generatedTitle}>
                        {ticketData.generatedTitle}
                    </Text>
                    <Text style={styles.location}>{ticketData.location}</Text>
                </View>
                <Text style={styles.generatedTitle}>{ticketData.title}</Text>
            </View>
            <View style={styles.seperator} />
            <Text style={styles.text}>{ticketData.text}</Text>
        </TouchableOpacity>
    );
};

export default TicketCard;

const styles = StyleSheet.create({
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    direction: "rtl",
  },
    generatedTitle: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Bold",
        textAlign: "right",
    },
    location: {
        ...Typography.typography.body,
        fontFamily: "Rubik-Medium",
        textAlign: "right",
    },
    title: {
        ...Typography.typography.caption,
        fontFamily: "Rubik-Medium",
        textAlign: "right",
    },
    text: {
        ...Typography.typography.body,
        fontFamily: "NotoSerif-Regular",
        textAlign: "right",
    },
    cardStyle: {
        backgroundColor: "#fff",
        padding: Spacing.spacing.m,
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
        maxWidth: width,
    },
    seperator: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.colors.shade,
        marginVertical: Spacing.spacing.s,
    },
});
