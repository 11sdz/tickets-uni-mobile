import { Dimensions, Modal, StyleSheet, View } from "react-native";
import React from "react";
import ZoomableImage from "./ZoomableImage";

interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    imageUri: string | number;
    imageWidth?: number;
    imageHeight?: number;
    onImageLoad?: () => void;
    zoomable?: boolean;
}

const ImageModal = ({
    visible,
    onClose,
    imageUri,
    imageWidth,
    imageHeight,
    onImageLoad,
    zoomable,
}: ImageModalProps) => {
    const { width } = Dimensions.get("window");
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ZoomableImage
                        imageUri={imageUri}
                        imageWidth={imageWidth || width * 0.9}
                        imageHeight={imageHeight || width * 0.5}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ImageModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }
});
