import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";

interface ApiState {
    data: any;
    error: string | null;
    loading: boolean;
}

const initialState: ApiState = {
    data: null,
    error: null,
    loading: false,
};

// Async thunk for fetching data
export const registerUser = createAsyncThunk<
    any,
    {
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        email: string;
        passkey: string;
    },
    { rejectValue: string }
>("api/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/auth/register", userData);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message ||
                "Something went wrong while registering"
        );
    }
});

export const loginUser = createAsyncThunk<
    any,
    { username: string; password: string },
    { rejectValue: string }
>(
    "api/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Something went wrong while logging in"
            );
        }
    }
)

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'unknown error';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {              
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }   )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'unknown error';
            });
    },
})

export default apiSlice.reducer;