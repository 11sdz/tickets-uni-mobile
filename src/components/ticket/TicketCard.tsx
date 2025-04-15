import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { ElementRef, useRef, useState } from "react";
import { TicketData } from "../../types/Types";
import { Colors, Spacing, Typography } from "../../styles";
import { getLocationText } from "../../utilities/Tickets";
import PhoneNumbers from "./PhoneNumbers";

const { width } = Dimensions.get("window");

type TicketCardProps = {
    ticketData: TicketData;
    onPress: (ticketId: string) => void;
};

const TicketCard = ({ ticketData, onPress }: TicketCardProps) => {
    const [phoneModalVisible, setPhoneModalVisible] = useState(false); // State to control the visibility of the phone modal
    const [phoneModalXY, setPhoneModalXY] = useState<{
        x: number;
        y: number;
    } | null>();

    const cardTouchRef = useRef<ElementRef<typeof TouchableOpacity>>(null); // Ref to the TouchableOpacity for handling long press

    const handleLongPress = () => {
        console.log("Long pressed on ticket:", ticketData._id);
        cardTouchRef.current?.measure((fx, fy, width, height, px, py) => {
            setPhoneModalXY({ x: px + width / 8, y: py + height / 2 }); // Store the position for the modal
            console.log("Measured position:", {
                fx,
                fy,
                width,
                height,
                px,
                py,
            });
        });
        setPhoneModalVisible(true); // Show the phone modal
    };

    const locationText = getLocationText(ticketData.location, 35); // Use the utility function to get the location text

    return (
        <TouchableOpacity
            onPress={() => onPress(ticketData._id)}
            onLongPress={handleLongPress} // Optional: Handle long press if needed
            style={styles.cardStyle}
            ref={cardTouchRef} // Attach the ref to the TouchableOpacity for long press handling
        >
            <View>
                <Text style={styles.generatedTitle}>
                    {ticketData.generatedTitle}
                </Text>
            </View>
            <Text style={styles.location}>מיקום: {locationText}</Text>
            <Text style={styles.number}>מס': {ticketData.title}</Text>
            <PhoneNumbers
                onClose={() => setPhoneModalVisible(false)}
                visible={phoneModalVisible}
                mobileNumber={ticketData.mobileNumber}
                officeNumber={ticketData.officeNumber}
                position={phoneModalXY || undefined} // Pass the position to the PhoneNumbers component for modal positioning
            />
            {/* <View style={styles.seperator} />
            <Text style={styles.text}>{ticketData.text}</Text> */}
        </TouchableOpacity>
    );
};

export default TicketCard;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        direction:'rtl'
    },
    generatedTitle: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Bold",
        writingDirection: "rtl",
        alignSelf: "flex-start", // Align to the start for Hebrew text direction
        textAlign: "left", // Align to the left for Hebrew text
    },
    location: {
        ...Typography.typography.body,
        fontFamily: "Rubik-Medium",
        color: Colors.colors.subheading, // Use subheading color for location
        textAlign: "left", // Align to the left for Hebrew text
    },
    title: {
        ...Typography.typography.caption,
        fontFamily: "Rubik-Medium",
        textAlign: "left",
    },
    text: {
        ...Typography.typography.body,
        fontFamily: "NotoSerif-Regular",
        textAlign: "left", // Align to the left for Hebrew text
    },
    number: {
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
