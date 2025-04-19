import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    TextInput,
    View,
    ScrollView,
} from "react-native";
import React from "react";
import { textInputStyles } from "./textInputs";
import Button from "../buttons/Button";
import { Colors, Spacing, Typography } from "../../styles";

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
            lastName === ""
        ) {
            alert("Please fill in all fields");
            return;
        }
        onSubmit(userName, email, password, firstName, lastName, passkey);
    };

    return (
        <View>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <TextInput
                    style={textInputStyles.input}
                    placeholder="שם משתמש באנגלית"
                    value={userName}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={textInputStyles.input}
                    placeholder="מייל"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={textInputStyles.input}
                    placeholder="סיסמה"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={textInputStyles.input}
                    placeholder="אשר סיסמה"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TextInput
                    style={textInputStyles.input}
                    placeholder="שם פרטי בעברית"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={textInputStyles.input}
                    placeholder="שם משפחה בעברית"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={textInputStyles.input}
                    placeholder="קוד עבור משתמש אדמין"
                    value={passkey}
                    onChangeText={setPasskey}
                />
                <Button
                    buttonText="צור משתמש"
                    buttonSize="large"
                    onPress={() => handleVerify()}
                />
            </ScrollView>
        </View>
    );
};

export default RegisterForm;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        paddingBottom: 60, // Gives space below last input
    },
});
