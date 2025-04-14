import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../../styles";

interface FieldRowProps {
        label: string;
        value: string | undefined;
        callTouchRef?: React.RefObject<View>;
        textDecorationLine?: boolean;
}

const FieldRow = ({ label, value, callTouchRef, textDecorationLine }: FieldRowProps) => (
    <View style={styles.row} ref={callTouchRef || undefined}>
        <Text style={styles.field}>{label}&nbsp;</Text>
        <Text
            style={[
                styles.title,
                textDecorationLine ? { textDecorationLine: "underline" } : {},
            ]}
        >
            {value}
        </Text>
    </View>
);

export default FieldRow;

const styles = StyleSheet.create({
    title: {
        ...Typography.typography.subheading,
        fontFamily: "NotoSerif-Medium",
    },
    field: {
        ...Typography.typography.subheading,
        fontFamily: "Rubik-SemiBold",
    },
    row: {
        flexDirection: "row",
    },
});
