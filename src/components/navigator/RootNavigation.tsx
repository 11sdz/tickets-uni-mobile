import React , {useEffect} from 'react'
import { useSelector } from 'react-redux';
import {RootState} from "../../store/state/store";
import { Stack , useRouter } from "expo-router";


const RootNavigation = () => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    console.log(isAuthenticated, "isAuthenticated")

    useEffect(() => {
        if(isAuthenticated){
            router.replace("/(tabs)/home");
        }else{
            router.replace("/(auth)/login");
        }
    }, [isAuthenticated]);


  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootNavigation