import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import AuthForm from "../../src/components/navigator/user/AuthForm";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/store/state/api/authSlice";
import { RootState, AppDispatch } from "../../src/store/state/store";
import { fetchUserData } from "../../src/store/state/user/userSlice";
import { fetchStatusData } from "../../src/store/state/user/statusSlice";
import { Buttons, Colors, Spacing } from "../../src/styles";
import Button from "../../src/components/buttons/Button";

const Login = () => {
    const router = useRouter();
    const { loading, error, data ,token} = useSelector(
        (state: RootState) => state.auth
    );

    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async (username: string, password: string) => {
        try {
            // Handle registration logic here
            const loginResponse = await dispatch(loginUser({ username, password })).unwrap();

            if (loginResponse) {
                dispatch(fetchUserData());
                dispatch(fetchStatusData());
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <AuthForm onSubmit={handleLogin} />
            <Button buttonText="Register now" buttonSize="medium" onPress={() => router.push("/(auth)/register")} />
            {loading && <Text>Loading...</Text>}
            {error && <Text>{error}</Text>}
            {data && token && <Text>{data.message} {token} </Text>}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: Spacing.spacing.m,
    }
});
