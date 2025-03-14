import {Provider} from "react-redux";
import {store} from "../src/store/state/store";
import RootNavigation from "../src/components/navigator/RootNavigation";

const RootLayout =()=>{
    return(
        <Provider store={store}>
            <RootNavigation/>
        </Provider>
    );

}

export default RootLayout;