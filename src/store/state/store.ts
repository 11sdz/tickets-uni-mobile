import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import apiSlice from './api/apiSlice';

export const store = configureStore({
    reducer:{
        // Add your reducers here
        user: userSlice,
        api: apiSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>; //return type of root reducer
export type AppDispatch = typeof store.dispatch; //return type of dispatch function
