import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    findNodeHandle,
} from "react-native";
import { Buttons, Colors, Typography } from "../../styles";
import Icon from "../Icon";

export type ButtonLayout = {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
};

export interface ButtonHandle {
    measure: () => Promise<ButtonLayout>;
}

interface ButtonProps {
    buttonText: string;
    buttonSize: keyof typeof Buttons.buttonSizes;
    onPress: () => void;
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
    iconStyle?: object;
}

const Button = forwardRef<ButtonHandle, ButtonProps>(
    (
        {
            buttonText,
            buttonSize,
            onPress,
            iconName,
            iconSize,
            iconColor,
            iconStyle,
        },
        ref
    ) => {
        const buttonRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);

        useImperativeHandle(ref, () => ({
            measure: () => {
                return new Promise<ButtonLayout>((resolve, reject) => {
                    const node = findNodeHandle(buttonRef.current);
                    if (node) {
                        UIManager.measure(
                            node,
                            (x, y, width, height, pageX, pageY) => {
                                resolve({ x, y, width, height, pageX, pageY });
                            }
                        );
                    } else {
                        reject(new Error("Failed to find node handle."));
                    }
                });
            },
        }));

        return (
            <TouchableOpacity 
                ref={buttonRef}
                onPress={onPress}
                style={[styles.button, Buttons.buttonSizes[buttonSize]]}
            >
                <Text style={[Typography.typography[buttonSize], styles.text]}>
                    {buttonText}
                </Text>
                {iconName && (
                    <Icon
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                        style={iconStyle}
                    />
                )}
            </TouchableOpacity>
        );
    }
);

export default Button;

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.colors.tint,
        borderRadius: Buttons.rounded.borderRadius,
        elevation: 3,
        shadowColor: Colors.colors.shade,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        textAlign: "center",
        fontFamily: "Rubik-Medium",
    },
});
