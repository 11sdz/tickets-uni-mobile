import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, Spacing, Typography } from "../../styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/state/store";
import { getUserStatus } from "../../utilities/Status";
import Timer from "./Timer";
import UpdateStatusButton from "./UpdateStatusButton";

const ShiftCard = () => {
    const statusData = useSelector(
        (state: RootState) => state.status.StatusData // Adjust the type according to your store
    );
    const userData = useSelector((state: RootState) => state.user.userData);

    // Check if userData and statusData are available
    const userStatus = getUserStatus(statusData ?? [], userData?._id);
    const online = userStatus && userStatus.status === "online";

    return (
        <View style={styles.container}>
            <View style={styles.shiftButton}>
                <UpdateStatusButton />
            {online && <View style={styles.timer}>
                    <Timer start={new Date(userStatus.lastUpdated)} />
                </View>}
            </View>
        </View>
    );
};

export default ShiftCard;

const styles = StyleSheet.create({
    container: {
        padding: Spacing.spacing.m,
        borderWidth: 2,
        borderColor: Colors.colors.secondary,
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
    },
    shiftButton: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timer: {
        padding: Spacing.spacing.s,
    },
    text: {
        ...Typography.typography.body,
        fontFamily: "Rubik-Regular", // Ensure the font is loaded
    },
});
