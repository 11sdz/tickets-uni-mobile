import {
    Dimensions,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/state/store";
import { fetchUserLocation } from "../../store/state/user/userLocationSlice";
import { Colors, Spacing } from "../../styles/index";
import Button from "../buttons/Button";

const { width } = Dimensions.get("window");

interface MapModalProps {
    onClose: () => void;
    visible: boolean;
}

const MapModal = ({ onClose, visible }: MapModalProps) => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const fetchLocation = () => {
            dispatch(fetchUserLocation());
        };
        fetchLocation();
        const interval = setInterval(() => {
            fetchLocation();
        }, 900000); // Fetch location every 15 minutes
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [dispatch]);

    const locationData = useSelector((state: RootState) => state.location);

    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.buttonAndMapContainer}>
                        <View style={styles.mapContainer}>
                            <MapView style={styles.mapView}
                                initialRegion={{
                                    latitude: 32.10324036689726, // Default latitude
                                    longitude: 35.2077724888716, // Default longitude
                                    latitudeDelta: 0.0922, // Default latitude delta
                                    longitudeDelta: 0.0421, // Default longitude delta
                                }}>
                                {locationData?.userLocation?.map((location) => (
                                    <Marker
                                        key={location._id} // Use _id directly as the unique key
                                        coordinate={{
                                            latitude: location.coordinates[0],
                                            longitude: location.coordinates[1],
                                        }}
                                        title={`${
                                            location.userId?.firstName ||
                                            "Unknown"
                                        } ${location.userId?.lastName || ""}`} // Access first and last name
                                    />
                                ))}
                            </MapView>
                        </View>
                        <Button
                            buttonSize="small"
                            buttonText="סגור"
                            onPress={onClose}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default MapModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        justifyContent: "center",
    },
    mapView: {
        flex: 1,
    },
    buttonAndMapContainer: {
        borderRadius: 12,
        backgroundColor: Colors.colors.tint,
        padding: Spacing.spacing.s,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: width * 0.9,
        height: width,
    },
});
