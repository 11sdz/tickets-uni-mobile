import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

interface UserData {
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
        const response = await axiosInstance.get(`/user/profile`);
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
        clearUserData: (state) => {
            if (state.userData) {
                state.userData.uid = '';
                state.userData.userName = '';
                state.userData.userEmail = '';
                state.userData.firstName = '';
                state.userData.lastName = '';
                state.userData.role = '';
            }
            state.loading = false;
            state.error = null;
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
                state.userData = {
                    uid: action.payload.uid,
                    userName: action.payload.userName,
                    userEmail: action.payload.userEmail,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    role: action.payload.role,
                };
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === "string" ? action.payload : (action.payload as Error).message ?? "unknown error";
            });
    },
})

export default userSlice.reducer; // Export the reducer to be used in the store
export const { clearUserData } = userSlice.actions; // Export the actions to be used in components



