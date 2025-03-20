import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/index";

export const textInputStyles = StyleSheet.create({
    input:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.colors.shade,
        padding: Spacing.spacing.m,
        marginBottom: Spacing.spacing.m,
        backgroundColor: '#FFF',//Colors.colors.primary,
        fontSize: Typography.typography.body.fontSize,
        lineHeight: Typography.typography.body.lineHeight,
        fontWeight: Typography.typography.body.fontWeight as any,
        elevation: 10,
        shadowColor: Colors.colors.shade,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
    }
});