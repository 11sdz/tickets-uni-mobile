import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React from "react";
import AuthForm from "../../src/components/user/AuthForm";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../src/store/state/api/authSlice";
import { RootState, AppDispatch } from "../../src/store/state/store";
import { fetchUserData } from "../../src/store/state/user/userSlice";
import { fetchStatusData } from "../../src/store/state/user/statusSlice";
import { Colors, Spacing } from "../../src/styles";
import Button from "../../src/components/buttons/Button";
import LoadingModal from "../../src/components/LoadingModal";

const Login = () => {
    const router = useRouter();
    const { loading, error, data, token } = useSelector(
        (state: RootState) => state.auth
    );

    const dispatch: AppDispatch = useDispatch();

    const handleLogin = async (username: string, password: string) => {
        try {
            // Handle registration logic here
            const loginResponse = await dispatch(
                loginUser({ username, password })
            ).unwrap();

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
            <Button
                buttonText="צור משתמש"
                buttonSize="large"
                onPress={() => router.push("/(auth)/register")}
            />
            <LoadingModal loading={loading} message="מתחבר..." />
            {error && <Text>{error}</Text>}
            {data && token && (
                <Text>
                    {data.message} {token}{" "}
                </Text>
            )}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.background,
        padding: Spacing.spacing.m,
    },
});
