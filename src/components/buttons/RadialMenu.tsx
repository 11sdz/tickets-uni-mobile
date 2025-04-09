import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { Colors, Spacing } from "../../styles";
import Button from "./Button";

const { width, height } = Dimensions.get("window"); // Get the width of the window

interface RadialMenuProps {
    items: Array<{
        label: string;
        onPress: () => void;
    }>;
    visible: boolean;
    position?: any;
    onClose: () => void;
}

const RadialMenu: React.FC<RadialMenuProps> = ({
    items,
    visible,
    onClose,
    position,
}) => {
    // Radial menu logic goes here
    console.log(position);

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <View
                    style={[
                        styles.container,
                        {
                            left: 0, // Center the menu horizontally
                            top: position?.pageY - position?.height * 1.5,
                        },
                    ]}
                >
                    {items.map((item, index) => (
                        <View key={index}>
                            <Button
                                buttonText={item.label}
                                buttonSize="small"
                                onPress={item.onPress}
                            />
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default RadialMenu;

const styles = StyleSheet.create({
    container: {
        //position: 'absolute', // 👈 This is key
        borderRadius: 100,
        padding: Spacing.spacing.s,
        zIndex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
    },
    menuItemText: {
        color: Colors.colors.primary,
        padding: Spacing.spacing.xs,
    },
});
