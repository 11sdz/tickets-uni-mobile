import React, { ElementRef, useRef, useState } from "react";
import { View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Spacing } from "../../styles/index";
import FieldRow from "./FieldRow";
import Button from "../buttons/Button";
import PhoneNumbers from "./PhoneNumbers";
import ImageModal from "../ImageModal";
import { getLocationText } from "../../utilities/Tickets";


const { width } = Dimensions.get("window"); // Get the width of the device screen}

interface TicketDetailsCardProps {
    personalName?: string;
    position?: string;
    location?: string;
    mobileNumber?: string;
    officeNumber?: string;
}

const TicketDetailsCard: React.FC<TicketDetailsCardProps> = ({
    personalName,
    position,
    location,
    mobileNumber,
    officeNumber,
}) => {
    const [showPhoneModal, setShowPhoneModal] = useState(false); // State to control the visibility of the phone modal
    const [phoneModalXY, setPhoneModalXY] = useState<{
        x: number;
        y: number;
    } | null>(null); // State to store the position of the phone modal
    const callTouchRef = useRef<ElementRef<typeof View>>(null);
    const [showMap, setShowMap] = useState(false); // State to control the visibility of the map modal

    const handlePhoneNumbersPress = () => {
        console.log("Phone numbers pressed"); // Log for debugging
        callTouchRef.current?.measure((fx, fy, width, height, px, py) => {
            setPhoneModalXY({ x: px + width / 8, y: py + height / 2 }); // Store the position for the modal
        });

        setShowPhoneModal(true);
    };

    const handleLocationPress = () => {
        console.log("Location pressed"); // Log for debugging
        setShowMap(true); // Show map modal
    };

    const locationText = location
        ? getLocationText(location, 25)
        : ""; // Use the utility function to get the location text

    return (
        <View style={styles.card}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <FieldRow label={'נפתח ע"י'} value={personalName} />
                <Button
                    buttonText="חייג"
                    buttonSize="xsmall"
                    onPress={handlePhoneNumbersPress}
                    iconName="phone"
                    iconSize={14}
                    iconColor="green"
                    iconStyle={{ marginStart: Spacing.spacing.xs }}
                />
            </View>
            <FieldRow
                label="תפקיד:"
                value={position}
                callTouchRef={callTouchRef}
            />
            <Pressable onPress={handleLocationPress}>
                <FieldRow
                    label="מיקום:"
                    value={`📍${locationText}`}
                    textDecorationLine
                />
            </Pressable>
            <PhoneNumbers
                onClose={() => setShowPhoneModal(false)}
                visible={showPhoneModal}
                mobileNumber={mobileNumber}
                officeNumber={officeNumber}
                position={phoneModalXY || undefined}
            />
            <ImageModal
                visible={showMap}
                onClose={() => setShowMap(false)}
                imageUri={require("../../assets/images/ariel-map.jpg")}
                imageWidth={width * 0.9}
                imageHeight={width * 0.5}
            />
        </View>
    );
};

export default TicketDetailsCard;

const styles = StyleSheet.create({
    card: {
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: Spacing.spacing.s,
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        marginVertical: Spacing.spacing.s,
    },
    row: {
        flexDirection: "row",
    },
});
