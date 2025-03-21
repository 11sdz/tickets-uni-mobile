import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Keyboard,
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
                <View style={{ paddingVertical: 10 }}>
                    <TextInput style={[textInputStyles.input]}
                        placeholder="שם משתמש או מייל"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput style={[textInputStyles.input]}
                        placeholder="סיסמה"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button buttonText="התחבר" buttonSize="large" onPress={() => onSubmit(email, password)} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default AuthForm;

const styles = StyleSheet.create({});
