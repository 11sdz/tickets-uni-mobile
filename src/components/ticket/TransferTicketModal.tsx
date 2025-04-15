import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Colors, Spacing, Typography } from "../../styles";
import { StatusData } from "../../types/Types";
import Button from "../buttons/Button";

const { width } = Dimensions.get("window"); // Get the width of the window

interface TransferTicketModalProps {
    visible: boolean;
    onClose: () => void;
    currentAgent?: string;
    ticketId?: string;
    onTransferTicket?: (ticketId: string, newAgent: string) => void;
    agents?: StatusData[] | null; // Assuming StatusData is an array of strings or objects
}

const TransferTicketModal: React.FC<TransferTicketModalProps> = ({
    visible,
    onClose,
    currentAgent,
    ticketId,
    agents,
    onTransferTicket,
}) => {
    return (
        <Modal transparent={true} animationType="fade" visible={visible}>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            למי להעביר את הפנייה?
                        </Text>
                        <View style={styles.flatlistContainer}>
                            <FlatList
                                numColumns={2}
                                data={agents}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <View style={styles.itemContainer}>
                                        <Button buttonSize="small" buttonText={item.firstName+" "+item.lastName} onPress={() => {
                                            onTransferTicket?.(ticketId || "", item.userId);
                                        }} />
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default TransferTicketModal;

const styles = StyleSheet.create({
    container: {
        height: width * 0.4,
        width: width * 0.8,
        borderRadius: 10,
        padding: Spacing.spacing.m,
        backgroundColor: "white",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
        zIndex: 2,
        elevation: 10,
        shadowColor: Colors.colors.shade,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    overlay: {
        flex: 1,
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "rgba(0, 0, 0, 0.09)",
    },
    flatlistContainer: {
        borderRadius: 10,
    },
    names: {
        ...Typography.typography.large,
        fontFamily: "NotoSerif-Medium",
    },
    title: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-Medium",
    },
    nameContainer: {
        padding: Spacing.spacing.xs,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    itemContainer: {
        padding: Spacing.spacing.s,
    }
});
