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
import { getLocationText } from "../../utilities/Tickets";

const { width } = Dimensions.get("window");

type TicketCardProps = {
    ticketData: TicketData;
    onPress: (ticketId: string) => void;
};

const TicketCard = ({ ticketData, onPress }: TicketCardProps) => {

    const handleLongPress = () => {
        console.log("Long pressed on ticket:", ticketData._id);
    };

    const locationText = getLocationText(ticketData.location); // Use the utility function to get the location text

    return (
        <TouchableOpacity
            onPress={() => onPress(ticketData._id)}
            onLongPress={handleLongPress} // Optional: Handle long press if needed
            style={styles.cardStyle}
        >
                <View>
                    <Text style={styles.generatedTitle}>
                        {ticketData.generatedTitle}
                    </Text>
                </View>
                <Text style={styles.location}>מיקום: {locationText}</Text>
                <Text style={styles.number}>מס': {ticketData.title}</Text>
            {/* <View style={styles.seperator} />
            <Text style={styles.text}>{ticketData.text}</Text> */}
        </TouchableOpacity>
    );
};

export default TicketCard;

const styles = StyleSheet.create({
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
    generatedTitle: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Bold",
        writingDirection: "rtl",
        alignSelf: "flex-start", // Align to the start for Hebrew text direction
        maxWidth: width 
    },
    location: {
        ...Typography.typography.body,
        fontFamily: "Rubik-Medium",
        color: Colors.colors.subheading, // Use subheading color for location
    },
    title: {
        ...Typography.typography.caption,
        fontFamily: "Rubik-Medium",
    },
    text: {
        ...Typography.typography.body,
        fontFamily: "NotoSerif-Regular",
    },
    number:{
        ...Typography.typography.body, // Use caption style for the number to make it smaller
        fontFamily: "Rubik-Medium", // Ensure the font is loaded
        color: Colors.colors.body, // Use primary color for better visibility
        textAlign: "right", // Align to the right for Hebrew text
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
        alignItems: "flex-start", // Align items to the start for Hebrew text direction
    },
    seperator: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.colors.shade,
        marginVertical: Spacing.spacing.s,
    },
});
