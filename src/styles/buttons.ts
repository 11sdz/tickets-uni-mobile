import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const buttonSizes = {
    small: {
        paddingHorizontal: width * 0.025, // 2.5% of screen width
        paddingVertical: width * 0.03, // 3% of screen width
        width: width * 0.2, // 20% of screen width
    },
    medium: {
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.035,
        width: width * 0.3,
    },
    large: {
        paddingHorizontal: width * 0.07,
        paddingVertical: width * 0.04,
        width: width * 0.4,
    },
};

export const buttonVariants = {
    primary: {
        backgroundColor: "#007bff",
        color: "#fff",
    },
    secondary: {
        backgroundColor: "#6c757d",
        color: "#fff",
    },
    danger: {
        backgroundColor: "#dc3545",
        color: "#fff",
    },
};

export const rounded = {
    borderRadius: 50,
};

export const smallRounded = {
    ...buttonSizes.small,
    ...rounded,
};
