import {StyleSheet, Text, View } from "react-native";
import React, {   useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { selectTicketById } from "../../src/store/state/tickets/ticketSlice";
import {  useSelector } from "react-redux";
import {  RootState } from "../../src/store/state/store";
import { Colors, Spacing } from "../../src/styles/index";
import Button from "../../src/components/buttons/Button";
import { ScrollView } from "react-native-gesture-handler";
import RadialMenu from "../../src/components/buttons/RadialMenu";
import TicketStatusCard from "../../src/components/ticket/TicketStatusCard";
import TicketDetailsCard from "../../src/components/ticket/TicketDetailsCard";
import TicketDescriptionCard from "../../src/components/ticket/TicketDescription";
import { useRadialMenu } from "../../src/hooks/useRadialMenu";
import TransferTicketModal from "../../src/components/ticket/TransferTicketModal";
import { useTransferMenu } from "../../src/hooks/useTransferMenu";


const TicketScreen = () => {
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

    const {
        showRadialMenu,
        setShowRadialMenu,
        radialMenuItems,
        radialMenuPosition,
        handleRadialActions,
        buttonRadialRef,
    } = useRadialMenu(ticketData?._id);

    const {
        showTransferMenu,
        setShowTransferMenu,
        allAgents,
        handleTransferTicket,
    } = useTransferMenu(ticketData?._id); // Get transfer menu state and actions

    return (
        <View style={styles.container}>
            <ScrollView>
                <TicketStatusCard agent={ticketData?.agent} date={ticketData?.date} status={ticketData?.status} />
                <TicketDetailsCard 
                    personalName={ticketData?.personalName}
                    position={ticketData?.position}
                    location={ticketData?.location}
                    mobileNumber={ticketData?.mobileNumber}
                    officeNumber={ticketData?.officeNumber}
                />
                <TicketDescriptionCard generatedTitle={ticketData?.generatedTitle} text={ticketData?.text} />
                
                <View style={styles.buttonsContainer}>
                    <Button
                        buttonText="העבר פניה"
                        buttonSize="small"
                        onPress={() => setShowTransferMenu(true)} // Open transfer menu when button is pressed
                    />
                    <Button
                        buttonText="טפל בפנייה"
                        buttonSize="small"
                        ref={buttonRadialRef}
                        onPress={() => handleRadialActions("openRadialMenu")}
                    />
                    <Button
                        buttonText="הוסף הערה"
                        buttonSize="small"
                        onPress={() => console.log("Another button pressed")}
                    />
                </View>
                <RadialMenu
                    visible={showRadialMenu}
                    items={radialMenuItems}
                    onClose={() => setShowRadialMenu(false)} // Close the radial menu when the close button is pressed
                    position={radialMenuPosition} // Pass the position for the radial menu
                />
                <TransferTicketModal
                    visible={showTransferMenu}
                    onClose={() => setShowTransferMenu(false)} // Close the modal when the close button is pressed
                    currentAgent={ticketData?.agent} // Pass the current agent to the modal
                    ticketId={ticketData?._id} // Pass the ticket ID to the modal
                    onTransferTicket={handleTransferTicket} // Pass the transfer function to the modal
                    agents={allAgents || []} // Pass the list of agents to the modal, fallback to an empty array if null
                />
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
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: Spacing.spacing.s,
    },
});
