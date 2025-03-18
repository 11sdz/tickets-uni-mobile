import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    uid: string;
    isSignedIn: boolean;
    userName: string;
    firstName: string;
    lastName: string;
    role:string;
    userEmail: string;
}

const initialState: UserState = {
    uid:'',
    isSignedIn: false,
    userName: '',
    firstName:'',
    lastName:'',
    role:'',
    userEmail: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.uid = action.payload.uid;
            state.isSignedIn = true;
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
        },
        signOut: (state) => {
            state.uid = '';
            state.isSignedIn = false;
            state.userName = '';
            state.userEmail = '';
        },
    },
})

export default userSlice.reducer; // Export the reducer to be used in the store
export const { signIn, signOut } = userSlice.actions; // Export the actions to be used in components



