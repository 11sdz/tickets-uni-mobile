import { Dimensions, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import ZoomableImage from "./ZoomableImage";
import { Colors, Spacing } from "../styles";

interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    imageUri: string | number;
    imageWidth?: number;
    imageHeight?: number;
}

const ImageModal = ({
    visible,
    onClose,
    imageUri,
    imageWidth,
    imageHeight,
}: ImageModalProps) => {
    const { width } = Dimensions.get("window");
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
                <TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <ZoomableImage
                            imageUri={imageUri}
                            imageWidth={imageWidth || width * 0.9}
                            imageHeight={imageHeight || width * 0.5}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default ImageModal;

const styles = StyleSheet.create({
    container: {
        padding: Spacing.spacing.s,
        borderRadius: 10,
        elevation: 10,
        shadowColor: Colors.colors.shade,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    overlay:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
});
