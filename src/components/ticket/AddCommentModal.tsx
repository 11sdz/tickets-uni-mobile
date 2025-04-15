import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import {
    TextInput,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Button from "../buttons/Button";
import { Spacing } from "../../styles";

const { width } = Dimensions.get("window"); // Get the width of the window

interface AddCommentModalProps {
    visible: boolean;
    onClose: () => void;
    ticketId?: string;
    onAddComment?: (ticketId: string, commentText: string) => void;
    commentText?: string;
    setCommentText?: (text: string) => void;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({
    visible,
    onClose,
    ticketId,
    onAddComment,
    commentText,
    setCommentText,
}) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View>
                        <Text>Add a comment:</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                value={commentText}
                                onChangeText={setCommentText}
                                placeholder="הוסף הערה"
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                buttonSize={"small"}
                                buttonText="Add Comment"
                                onPress={() =>
                                    onAddComment?.(
                                        ticketId || "",
                                        commentText || ""
                                    )
                                }
                            />
                            <Button
                                buttonSize={"small"}
                                buttonText="Close"
                                onPress={onClose}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddCommentModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
        width: width * 0.8,
        backgroundColor: "white",
        padding: Spacing.spacing.m,
        borderRadius: 10,
        elevation: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },textInput:{
        height: width*0.2,
        borderRadius:10,
        padding:Spacing.spacing.s,
    }
});
