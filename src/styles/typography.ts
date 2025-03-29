import { Dimensions, PixelRatio, TextStyle } from "react-native";

const { width } = Dimensions.get("window");

/**
 * Scale font size based on screen width.
 * Ensures typography is responsive on all devices.
 */
const scaleFont = (size: number) => {
    const scaleFactor = width / 375; // Base iPhone 11 screen width
    return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

export const typography = {
    heading: {
        fontSize: scaleFont(24),
        fontWeight: "700" as TextStyle["fontWeight"],
        lineHeight: scaleFont(32),
    },
    subheading: {
        fontSize: scaleFont(20),
        fontWeight: "600" as TextStyle["fontWeight"],
        lineHeight: scaleFont(28),
    },
    body: {
        fontSize: scaleFont(16),
        fontWeight: "400" as TextStyle["fontWeight"],
        lineHeight: scaleFont(24),
    },
    caption: {
        fontSize: scaleFont(14),
        fontWeight: "300" as TextStyle["fontWeight"],
        lineHeight: scaleFont(20),
    },
    buttonText: {
        fontSize: scaleFont(16),
        fontWeight: "600" as TextStyle["fontWeight"],
        lineHeight: scaleFont(22),
        textTransform: "uppercase",
    },small:{
        fontSize: scaleFont(12), // Smaller font size for small text
        fontWeight: "400" as TextStyle["fontWeight"], // Normal weight
        lineHeight: scaleFont(16), // Adjust line height for readability
    },medium: {
        fontSize: scaleFont(14), // Medium font size for medium text
        fontWeight: "500" as TextStyle["fontWeight"], // Medium weight for better visibility
        lineHeight: scaleFont(20), // Adjust line height for readability
    },large:{
        fontSize: scaleFont(18), // Larger font size for large text
        fontWeight: "600" as TextStyle["fontWeight"], // Semi-bold weight for emphasis
        lineHeight: scaleFont(26), // Adjust line height for readability
    }
};

