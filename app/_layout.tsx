import { Provider } from "react-redux";
import { store } from "../src/store/state/store";
import RootNavigation from "../src/components/navigator/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import React,{ useEffect, useState } from "react";
import { I18nManager } from "react-native";

const RootLayout = () => {
    const [fontLoaded] = useFonts({
        "NotoSerif-Black": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-Black.ttf"),
        "NotoSerif-Bold": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-Bold.ttf"),
        "NotoSerif-Regular": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-Regular.ttf"),
        "NotoSerif-Light": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-Light.ttf"),
        "NotoSerif-Medium": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-Medium.ttf"),
        "NotoSerif-Thin": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-Thin.ttf"),
        "NotoSerif-ExtraBold": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-ExtraBold.ttf"),
        "NotoSerif-ExtraLight": require("../src/assets/fonts/NotoSerif/NotoSerifHebrew-ExtraLight.ttf"),

        "Rubik-Black": require("../src/assets/fonts/Rubik/Rubik-Black.ttf"),
        "Rubik-Bold": require("../src/assets/fonts/Rubik/Rubik-Bold.ttf"),
        "Rubik-Regular": require("../src/assets/fonts/Rubik/Rubik-Regular.ttf"),
        "Rubik-Light": require("../src/assets/fonts/Rubik/Rubik-Light.ttf"),
        "Rubik-Medium": require("../src/assets/fonts/Rubik/Rubik-Medium.ttf"),
        "Rubik-SemiBold": require("../src/assets/fonts/Rubik/Rubik-SemiBold.ttf"),
        "Rubik-ExtraBold": require("../src/assets/fonts/Rubik/Rubik-ExtraBold.ttf"),
    });

    const [isRTLSet, setIsRTLSet] = useState(false);

    useEffect(() => {
        const enableRTL = async () => {
            if (!I18nManager.isRTL && !isRTLSet) {
                I18nManager.allowRTL(true);
                I18nManager.forceRTL(true);

                setIsRTLSet(true); // Mark that RTL is set and avoid further reloads
            }
        };

        enableRTL();
    }, [isRTLSet]); // Only run when RTL isn't set yet

    if (!fontLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        </GestureHandlerRootView>
    );
};

export default RootLayout;
