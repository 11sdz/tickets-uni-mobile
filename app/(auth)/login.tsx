import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import AuthForm from "../../src/components/navigator/user/AuthForm";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/store/state/api/authSlice";
import { RootState, AppDispatch } from "../../src/store/state/store";
import { fetchUserData } from "../../src/store/state/user/userSlice";

const Login = () => {
    const router = useRouter();
    const { loading, error, data ,token} = useSelector(
        (state: RootState) => state.auth
    );

    const { userData } = useSelector(
        (state: RootState) => state.user
    );

    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async (username: string, password: string) => {
        try {
            // Handle registration logic here
            const loginResponse = await dispatch(loginUser({ username, password })).unwrap();

            if (loginResponse) {
                dispatch(fetchUserData());
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View>
            <AuthForm onSubmit={handleLogin} />
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text>Register</Text>
            </TouchableOpacity>
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {data && token && <Text>{data.message} {token}</Text>}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({});
