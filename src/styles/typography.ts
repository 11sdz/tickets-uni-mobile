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
        fontWeight: "bold",
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
    },
};
