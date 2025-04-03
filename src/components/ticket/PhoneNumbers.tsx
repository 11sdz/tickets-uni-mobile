import {
    Linking,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React from "react";
import { Colors, Spacing, Typography } from "../../styles";
import Icon from "../Icon";

interface PhoneNumbersProps {
    visible: boolean; // Control visibility of the modal, typically passed from parent component
    officeNumber?: string; // Array of phone numbers to display
    mobileNumber?: string; // Optional mobile number
    position?: { x: number; y: number }; // Optional position for the modal, if needed for positioning
    onClose?: () => void; // Optional callback for closing the modal, if needed
}

const PhoneNumbers = ({
    visible,
    officeNumber,
    mobileNumber,
    position,
    onClose,
}: PhoneNumbersProps) => {
    const openDialer = (number: string) => () => {
        const url = `tel:${number}`; // Construct the URL for dialing the number
        Linking.openURL(url) // Open the dialer with the constructed URL
            .catch((err) => console.error("Error opening dialer:", err)); // Handle any errors that occur
    };

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={() => {}}
        >
            <TouchableOpacity
                style={styles.overlay} // Apply position if provided
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableWithoutFeedback>
                    <View
                        style={
                            [
                                styles.container,
                                position
                                    ? { top: position.y, left: position.x }
                                    : {},
                            ] /* Apply position if provided */
                        }
                    >
                        <View style={styles.rowContainer}>
                            <Text style={styles.header}>התקשר ללקוח:</Text>
                            <Icon
                                name="phone"
                                size={Typography.typography.subheading.fontSize}
                            />
                        </View>
                        <View style={styles.seperator} />
                        <View style={styles.rowContainer}>
                            {officeNumber && (
                                <TouchableOpacity
                                    onPress={openDialer(officeNumber)}
                                >
                                    <View style={styles.numbersContainer}>
                                        {/* Office number */}
                                        <Text style={styles.body}>
                                            {officeNumber}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            {officeNumber && mobileNumber && (
                                <View style={{ width: Spacing.spacing.m }}>
                                    {/* Added width for spacing */}
                                </View>
                            )}
                            {mobileNumber && (
                                <TouchableOpacity
                                    onPress={openDialer(mobileNumber)}
                                >
                                    <View style={styles.numbersContainer}>
                                        {/* Mobile number */}
                                        <Text style={styles.body}>
                                            {mobileNumber}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default PhoneNumbers;

const styles = StyleSheet.create({
    container: {
        //paddingVertical: Spacing.spacing.s,
        justifyContent: "center",
        backgroundColor: Colors.colors.tint, // Background color for the modal content
        borderRadius: 18, // Rounded corners for the modal content
    },
    overlay: {
        flex: 1,
        alignItems: "center",
    },
    rowContainer: {
        paddingHorizontal: Spacing.spacing.m, // Horizontal padding for the row container
        paddingVertical: Spacing.spacing.s, // Vertical padding for the row container
        flexDirection: "row", // Arrange items in a row
        justifyContent: "center", // Center align horizontally
        alignItems: "center", // Center align vertically
    },
    numbersContainer: {
        flexDirection: "row", // Arrange office number and icon in a row
        alignItems: "center", // Center align vertically
    },
    header: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Bold", // Use a medium font weight for the header
        marginEnd: Spacing.spacing.xs, // Add some space between the header and the icon
    },
    seperator: {
        height: 1,
        backgroundColor: Colors.colors.seperator,
    },
    body: {
        ...Typography.typography.body, // Use body typography for the mobile number
        fontFamily: "NotoSerif-Regular", // Use regular font weight for the body text
        marginStart: Spacing.spacing.xs, // Add some space between the icon and the number
    },
});
