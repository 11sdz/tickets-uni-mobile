import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, Spacing, Typography } from "../../src/styles";
import ShiftCard from "../../src/components/status/ShiftCard";
import UserHeader from "../../src/components/user/UserHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store/state/store";
import LocationComponent from "../../src/components/location/LocationComponent";
import MapModal from "../../src/components/location/MapModal";
import Button from "../../src/components/buttons/Button";
import MapLocationsView from "../../src/components/location/MapLocationsView";

const Home = () => {
    const [showMap, setShowMap] = useState(false); // State to control the visibility of the map modal
    const { userData } = useSelector((state: RootState) => state.user); // Get agent from Redux store
    const { userLocation } = useSelector((state: RootState) => state.location); // Get user location from Redux store
    console.log("User Location", userLocation, userData?._id);

    return (
        <View style={styles.container}>
            <UserHeader
                firstName={userData?.firstName}
                lastName={userData?.lastName}
            />
            <ShiftCard />
            {/* {userData?._id && <LocationComponent userId={userData?._id} />} */}
            <View style={styles.dashboardCard}>
                <Text style={styles.title}>מפת נוכחות:</Text>
                <MapLocationsView />
            </View>
            {/* <MapModal visible={showMap} onClose={() => setShowMap(false)} /> */}
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
    },dashboardCard: {
        marginTop: Spacing.spacing.m,
        backgroundColor: "white",
        borderRadius: 12,
        padding: Spacing.spacing.m,
        marginBottom: Spacing.spacing.m,
        shadowColor: Colors.colors.shade,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },title:{
        ...Typography.typography.subheading,
        fontFamily:'Rubik-Bold'
    }
});
