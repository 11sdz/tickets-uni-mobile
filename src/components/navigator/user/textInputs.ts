import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../styles";

export const textInputStyles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: Colors.colors.border,
        borderRadius: 8,
        padding: Spacing.spacing.m,
        marginBottom: Spacing.spacing.m,
        fontSize: Typography.fontSizes.medium,
        color: Colors.colors.text,
    }
});