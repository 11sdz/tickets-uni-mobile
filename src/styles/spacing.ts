import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const spacing = {
    xs: width * 0.01, // 1% of screen width
    s: width * 0.02,  // 2% of screen width
    m: width * 0.04,  // 4% of screen width
    l: width * 0.06,  // 6% of screen width
    xl: width * 0.08, // 8% of screen width
};