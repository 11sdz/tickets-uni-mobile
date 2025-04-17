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
import LocationComponent from "../../src/components/location/LocationComponent";


const Home = () => {
    const {userData} = useSelector((state: RootState) => state.user); // Get agent from Redux store
    const {userLocation} = useSelector((state: RootState) => state.location); // Get user location from Redux store
    console.log("User Location", userLocation,userData?._id)

    return (
        <View style={styles.container}>
            <UserHeader firstName={userData?.firstName} lastName={userData?.lastName} />
            <ShiftCard/>
            {userData?._id && <LocationComponent userId={userData?._id} />}
            {/* Add other components here as needed */}
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
