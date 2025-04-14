import {
    StyleSheet,
    View,
} from "react-native";
import React from "react";
import { Colors, Spacing } from "../../src/styles";
import ShiftCard from "../../src/components/status/ShiftCard";
import UserHeader from "../../src/components/user/UserHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/state/store";


const Home = () => {
    const {userData} = useSelector((state: RootState) => state.user); // Get agent from Redux store

    return (
        <View style={styles.container}>
            <UserHeader firstName={userData?.firstName} lastName={userData?.lastName} />
            <ShiftCard/>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: Spacing.spacing.m,
    },
});
