import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { selectTicketById } from "../../src/store/state/tickets/ticketSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/state/store";
import { Colors, Spacing, Typography } from "../../src/styles/index";
import {
    getFormattedDate,
    getFormattedStatus,
    getLocationText,
} from "../../src/utilities/Tickets";
import Button from "../../src/components/buttons/Button";
import PhoneNumbers from "../../src/components/ticket/PhoneNumbers";
import { ScrollView } from "react-native-gesture-handler";
import ImageModal from "../../src/components/ImageModal";

const { width } = Dimensions.get("window"); // Get the width of the device screen}

const FieldRow = ({
    label,
    value,
    callTouchRef,
    textDecorationLine,
}: {
    label: string;
    value: string | undefined;
    callTouchRef?: React.RefObject<View>;
    textDecorationLine?: boolean;
}) => (
    <View style={styles.row} ref={callTouchRef || undefined}>
        <Text style={styles.field}>{label}&nbsp;</Text>
        <Text style={[styles.title, textDecorationLine ? { textDecorationLine: 'underline' } : {}]}>{value}</Text>
    </View>
);

const TicketScreen = () => {
    const [showMap, setShowMap] = useState(false); // State to control the visibility of the map modal
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

    const handleLocationPress = () => {
        console.log("Location pressed"); // Log for debugging
        setShowMap(true); // Show map modal
    }

    console.log("Ticket ID:", ticketId); // Log ticket ID for debugging

    console.log("Ticket Data:", ticketData !== null); // Log ticket data for debugging
    console.log(ticketData?.createdAt);

    const locationText = ticketData?.location
        ? getLocationText(ticketData?.location, 25)
        : ""; // Use the utility function to get the location text

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.card}>
                    <View style={[styles.header, styles.row]}>
                        <FieldRow
                            label="בטיפול של:"
                            value={ticketData?.agent}
                        />
                        <View>
                            <Text style={styles.title}>
                                {ticketData?.date
                                    ? getFormattedDate(ticketData.date)
                                    : ""}
                            </Text>
                        </View>
                    </View>
                    <FieldRow
                        label="סטטוס:"
                        value={
                            ticketData?.status
                                ? getFormattedStatus(ticketData.status)
                                : ""
                        }
                    />
                </View>
                <View style={styles.card}>
                    <View
                        style={[
                            styles.row,
                            { justifyContent: "space-between" },
                        ]}
                    >
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
                    <Pressable onPress={handleLocationPress}>
                        <FieldRow
                            label={"מיקום:"}
                            value={`📍${locationText}`}
                            textDecorationLine={true}
                        />
                    </Pressable>
                    <PhoneNumbers
                        onClose={() => setShowPhoneModal(false)}
                        visible={showPhoneModal}
                        mobileNumber={ticketData?.mobileNumber}
                        officeNumber={ticketData?.officeNumber}
                        position={phoneModalXY || undefined} // Pass the position to the PhoneNumbers component for modal positioning
                    />
                </View>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.field}>
                            {ticketData?.generatedTitle}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.body}>{ticketData?.text}</Text>
                    </View>
                </View>
                <ImageModal
                    visible={showMap}
                    onClose={() => setShowMap(false)}
                    imageUri={require("../../src/assets/images/ariel-map.jpg")}
                    imageWidth={width * 0.9}
                    imageHeight={width * 0.5}
                />
                <View style={styles.buttonsContainer}>
                    <Button 
                        buttonText="סגור פניה"
                        buttonSize="small"
                        onPress={() => console.log("Button pressed")}
                    />
                    <Button 
                        buttonText="סמן בטיפול"
                        buttonSize="small"
                        onPress={() => console.log("Another button pressed")}
                    />
                    <Button 
                        buttonText="הוסף הערה"
                        buttonSize="small"
                        onPress={() => console.log("Another button pressed")}
                    />
                </View>
                {loading && <Text>טוען...</Text>}
                {error && <Text>{error}</Text>}
            </ScrollView>
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
    },
    card: {
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
    row: {
        flexDirection: "row",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Spacing.spacing.s,
    },
});
