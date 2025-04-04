import { StyleSheet, Text, View } from "react-native";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { selectTicketById } from "../../src/store/state/tickets/ticketSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/state/store";
import { Colors, Spacing, Typography } from "../../src/styles/index";
import { getFormattedDate, getLocationText } from "../../src/utilities/Tickets";
import Button from "../../src/components/buttons/Button";
import PhoneNumbers from "../../src/components/ticket/PhoneNumbers";

const FieldRow = ({
    label,
    value,
    callTouchRef,
}: {
    label: string;
    value: string | undefined;
    callTouchRef?: React.RefObject<View>;
}) => (
    <View style={styles.row} ref={callTouchRef || undefined}>
        <Text style={styles.field}>{label}&nbsp;</Text>
        <Text style={styles.title}>{value}</Text>
    </View>
);

const TicketScreen = () => {
    const [showPhoneModal, setShowPhoneModal] = useState(false); // State to control the visibility of the phone modal
    const [phoneModalXY, setPhoneModalXY] = useState<{
        x: number;
        y: number;
    } | null>(null); // State to store the position of the phone modal
    const callTouchRef = useRef<ElementRef<typeof View>>(null);

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

    const handlePhoneNumbersPress = () => {
        console.log("Phone numbers pressed"); // Log for debugging
        callTouchRef.current?.measure((fx, fy, width, height, px, py) => {
            setPhoneModalXY({ x: px + width / 8, y: py + height / 2 }); // Store the position for the modal
        });

        setShowPhoneModal(true);
    };

    console.log("Ticket ID:", ticketId); // Log ticket ID for debugging

    console.log("Ticket Data:", ticketData !== null); // Log ticket data for debugging
    console.log(ticketData?.createdAt);

     const locationText = ticketData?.location ? getLocationText(ticketData?.location, 25) : ""; // Use the utility function to get the location text
    

    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.row]}>
                <View style={styles.row}>
                    <Text style={styles.field}>בטיפול של:&nbsp;</Text>
                    <Text style={styles.title}>{ticketData?.agent}</Text>
                </View>
                <View style={styles.date}>
                    <Text style={styles.title}>
                        {ticketData?.date
                            ? getFormattedDate(ticketData.date)
                            : ""}
                    </Text>
                </View>
            </View>
            <View style={styles.header}>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <FieldRow
                        label={'נפתח ע"י'}
                        value={ticketData?.personalName}
                    />
                    <Button
                        buttonText="חייג"
                        buttonSize="small"
                        onPress={handlePhoneNumbersPress}
                        iconName="phone"
                        iconSize={Typography.typography.body.fontSize}
                        iconColor={"green"}
                        iconStyle={{ marginStart: Spacing.spacing.xs }}
                    />
                </View>
                <FieldRow
                    label={"תפקיד:"}
                    value={ticketData?.position}
                    callTouchRef={callTouchRef}
                />
                <FieldRow
                    label={"מיקום:"}
                    value={`📍${locationText}`}
                />
                <PhoneNumbers
                    onClose={() => setShowPhoneModal(false)}
                    visible={showPhoneModal}
                    mobileNumber={ticketData?.mobileNumber}
                    officeNumber={ticketData?.officeNumber}
                    position={phoneModalXY || undefined} // Pass the position to the PhoneNumbers component for modal positioning
                />
            </View>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Text style={styles.field}>
                        {ticketData?.generatedTitle}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.body}>{ticketData?.text}</Text>
                </View>
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
        marginVertical: Spacing.spacing.s,
    },
    title: {
        ...Typography.typography.subheading,
        fontFamily: "NotoSerif-Medium",
    },
    body: {
        ...Typography.typography.body,
        fontFamily: "NotoSerif-Regular",
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
