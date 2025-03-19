import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/state/store";
import { updateStatus } from "../../../store/state/user/statusSlice";

const UpdateStatusButton = () => {
    const statusData = useSelector(
        (state: RootState) => state.status.StatusData
    );
    const userData = useSelector((state: RootState) => state.user.userData);

    const dispatch: AppDispatch = useDispatch();

    // Check if userData and statusData are available
    const userStatus = statusData?.find(
        (data) => data.userId === userData?._id
    );

    const [status, setStatus] = useState<string>(
        userStatus?.status ?? "Error getting user status"
    );

    const handleStatusUpdate = async () => {
        if (userData?._id) {
            const newStatus = status === "online" ? "offline" : "online";
            setStatus(newStatus);
            dispatch(
                updateStatus({
                    userId: userData._id,
                    status: newStatus,
                    lastUpdated: new Date().toISOString(),
                })
            );
        } else {
            // Handle the case where _id is undefined, e.g., show an error message
            console.error("User ID is undefined.");
        }
    };

    return (
        <TouchableOpacity onPress={() => handleStatusUpdate()}>
            <Text>{status}</Text>
            <Text>UpdateStatusButton</Text>
        </TouchableOpacity>
    );
};

export default UpdateStatusButton;

const styles = StyleSheet.create({});
