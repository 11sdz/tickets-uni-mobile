import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import AuthForm from "../../src/components/navigator/user/AuthForm";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/store/state/api/apiSlice";
import { RootState, AppDispatch } from "../../src/store/state/store";

const Login = () => {
    const router = useRouter();
    const { loading, error, data } = useSelector(
        (state: RootState) => state.api
    );
    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async (username: string, password: string) => {
        try {
            // Handle registration logic here
            dispatch(loginUser({ username, password }));
            console.log(username, password);
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
            {data && <Text>data</Text>}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({});
