import {configureStore} from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import authSlice from './api/authSlice';
import ticketSlice from './tickets/ticketSlice';
import statusSlice from './user/statusSlice';
import userLocationSlice from './user/userLocationSlice';

export const store = configureStore({
    reducer:{
        // Add your reducers here
        user: userSlice,
        auth: authSlice,
        tickets: ticketSlice,
        status: statusSlice,
        location: userLocationSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>; //return type of root reducer
export type AppDispatch = typeof store.dispatch; //return type of dispatch function
