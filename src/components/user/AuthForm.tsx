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
import { textInputStyles } from "./textInputs";
import Button from "../buttons/Button";

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
                    <TextInput style={[textInputStyles.input]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput style={[textInputStyles.input]}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button buttonText="Login" buttonSize="medium" onPress={() => onSubmit(email, password)} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default AuthForm;

const styles = StyleSheet.create({});
