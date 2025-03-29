import {
    StyleSheet,
    View,
} from "react-native";
import React from "react";
import UpdateStatusButton from "../../src/components/status/UpdateStatusButton";
import { Colors, Spacing } from "../../src/styles";
import ShiftCard from "../../src/components/status/ShiftCard";

const Home = () => {
    return (
        <View style={styles.container}>
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
