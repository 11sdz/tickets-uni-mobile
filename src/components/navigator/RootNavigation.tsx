import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/state/store";
import { Stack, useRouter } from "expo-router";
import { Colors } from "../../styles";

const RootNavigation = () => {
    const router = useRouter();
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    console.log(isAuthenticated, "isAuthenticated");

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/(tabs)");
        } else {
            router.replace("/(auth)/login");
        }
    }, [isAuthenticated]);

    return (
        <Stack
            screenOptions={{
                headerTintColor: Colors.colors.tint,
                headerStyle: { backgroundColor: Colors.colors.shade },
            }}
        >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootNavigation;
