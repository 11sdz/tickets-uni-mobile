import React , {useEffect} from 'react'
import { useSelector } from 'react-redux';
import {RootState} from "../../store/state/store";
import { Stack , useRouter } from "expo-router";


const RootNavigation = () => {
    const router = useRouter();
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

    useEffect(() => {
        if(isSignedIn){
            router.replace("/(tabs)/home");
        }else{
            router.replace("/(auth)/login");
        }
    }, [isSignedIn]);


  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootNavigation