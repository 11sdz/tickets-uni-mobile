import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";

interface RegisterFormProps {
    onSubmit: (
        userName: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        passkey: string
    ) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [passkey, setPasskey] = React.useState("");

    const handleVerify = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (
            userName === "" ||
            email === "" ||
            password === "" ||
            firstName === "" ||
            lastName === "" ||
            passkey === ""
        ) {
            alert("Please fill in all fields");
            return;
        }
        onSubmit(userName, email, password, firstName, lastName, passkey);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text>RegisterForm</Text>
                    <TextInput
                        placeholder="User Name"
                        value={userName}
                        onChangeText={setUserName}
                    />
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
                    <TextInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        placeholder="Passkey"
                        value={passkey}
                        onChangeText={setPasskey}
                    />
                    <TouchableOpacity onPress={() => handleVerify()}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default RegisterForm;

const styles = StyleSheet.create({});
