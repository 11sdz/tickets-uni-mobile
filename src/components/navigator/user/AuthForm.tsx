import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Keyboard,
    TouchableOpacity,
    Text,
} from "react-native";
import React from "react";

type AuthFormProps = {
    onSubmit: (email: string, password: string) => Promise<void>;
  };

const AuthForm = ({onSubmit}:AuthFormProps) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity onPress={() => onSubmit(email, password)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default AuthForm;

const styles = StyleSheet.create({});
