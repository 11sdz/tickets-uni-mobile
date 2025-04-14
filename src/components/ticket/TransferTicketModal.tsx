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
import { Spacing } from "../../styles";
import { StatusData } from "../../types/Types";

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
        <Modal transparent={true} animationType="slide" visible={visible}>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text>{ticketId}</Text>
                        <Text>{currentAgent}</Text>
                        <View style={styles.flatlistContainer}>
                            <FlatList
                                data={agents}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => onTransferTicket?.(ticketId || "", item._id)}
                                    >
                                        <Text>{item.firstName}</Text>
                                    </TouchableOpacity>
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
        borderRadius: 10,
        padding: Spacing.spacing.s,
        backgroundColor: "white",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
        zIndex: 2,
    },
    overlay: {
        flex: 1,
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "rgba(0, 0, 0, 0.09)",
    },
    flatlistContainer: {
        height: width * 0.5,
        borderRadius: 10,
    },
});
