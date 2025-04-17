import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../Icon";
import { Colors, Spacing, Typography } from "../../styles";

interface FilterButtonProps {
    // Define any props you want to pass to the FilterButton component
    onPress?: () => void; // Optional onPress function
    title?: string; // Optional title for the button
    isActive?: boolean; // Optional prop to indicate if the button is active
}

const FilterButton = ({
    title,
    onPress,
    isActive,
}: FilterButtonProps) => {
    // Define the styles for the button based on the props
    const activeColor = isActive ? Colors.colors.tint : Colors.colors.filterButton; // Change color based on active state

    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:activeColor}]} onPress={onPress}>
            {isActive && (
                <Icon
                    name={"square-xmark"}
                    size={Spacing.spacing.m}
                    color={Colors.colors.green}
                />
            )}
            <Text style={styles.filterText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default FilterButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: Spacing.spacing.s,
        borderRadius: Spacing.spacing.xs,
    },
    filterText: {
        ...Typography.typography.small,
        marginLeft: Spacing.spacing.xs,
        fontFamily: 'Rubik-Medium',
    },
});
