import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

interface UserData {
    _id: string;
    uid: string;
    userName: string;
    userEmail: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface UserState {
    userData: UserData | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    userData: null,
    loading: false,
    error: null,
}


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_,{rejectWithValue}) => {
        try{
        const response = await axiosInstance.get(`/user`);
        return response.data;
        }catch(error:any){
            return rejectWithValue(
                error.response?.data?.message ||
                'Something went wrong while fetching user data'
            );
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Clear user data and reset loading and error states
        clearUserData: (state) => {
            state.userData = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload; // Directly set the user data
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : (action.payload as Error).message ?? 'Unknown error';
            });
    },
});

export default userSlice.reducer; // Export the reducer to be used in the store
export const { clearUserData } = userSlice.actions; // Export the actions to be used in components



