import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../store/state/store';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { updateLocation } from '../../store/state/user/userLocationSlice';
import { Text, View } from 'react-native';

interface UserLocationProps {
    userId: string;
}

const LocationComponent = ({ userId }: UserLocationProps) => {
    const [permission, setPermission] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const requestPermissions = async () => {
            // Request foreground permissions first
            const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();

            // If foreground permission is granted, request background permission if necessary
            if (foregroundStatus !== 'granted') {
                setPermission(false);
                console.log('Foreground permission not granted');
            }
            else {
                setPermission(true);
                console.log('Foreground permission granted');
            }
        };

        requestPermissions();

        // Set interval to update location every 15 minutes
        const locationInterval = setInterval(() => {
            if (permission) {
                getLocationAndUpdate();
            }
        }, 900000); // Every 15 minutes

        // Cleanup interval when component unmounts
        return () => clearInterval(locationInterval);
    }, [permission]);

    const getLocationAndUpdate = async () => {
        if (!permission) {
            console.log('Permission not granted, location not updated');
            return;
        }

        try {
            // Get the current location with high accuracy
            const { coords } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            console.log("User's location:", coords);

            // Dispatch updateLocation action to update Redux store
            dispatch(updateLocation({
                userId,
                coordinates: [coords.longitude, coords.latitude],
            }));
        } catch (error) {
            console.log('Error getting location:', error);
        }
    };

    // Update location once when the component mounts
    useEffect(() => {
        if (permission) {
            getLocationAndUpdate();
        }
    }, [permission]);

    return (
        <View>
            <Text>Location Component</Text>
            {permission ? (
                <Text>Location permission granted</Text>
            ) : (
                <Text>Location permission not granted!</Text>
            )}
            {/* You can add more UI elements here if needed */}
            {/* For example, a button to manually update location */}
        </View>
    ); // This component doesn't need to render anything
};

export default LocationComponent;
