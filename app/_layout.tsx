import { Slot , useRouter } from "expo-router";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "../src/store/state/store";
import { useEffect } from "react";
import RootNavigation from "../src/components/navigator/RootNavigation";

const RootLayout =()=>{
   
    return(
        <Provider store={store}>
            <RootNavigation/>
        </Provider>
    );

}

export default RootLayout;