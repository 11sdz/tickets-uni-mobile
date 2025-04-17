import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Spacing, Typography } from '../styles';

interface LoadingModalProps {
    loading: boolean;
    message?: string;
}

const LoadingModal = ({ loading,message }: LoadingModalProps) => {
    return (
        <Modal
            visible={loading}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <View style={styles.loaderContainer}>
                    <Text style={styles.text}>{message}</Text>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    loaderContainer: {
        padding: Spacing.spacing.m,
        borderRadius: 10,
        backgroundColor: "#333",
    },
    text: {
        ...Typography.typography.large,
        fontFamily: "Rubik-Bold",
        color: "#fff",
        marginBottom: Spacing.spacing.s,
    },
});