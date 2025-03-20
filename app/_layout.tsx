import { Provider } from "react-redux";
import { store } from "../src/store/state/store";
import RootNavigation from "../src/components/navigator/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        </GestureHandlerRootView>
    );
};

export default RootLayout;
