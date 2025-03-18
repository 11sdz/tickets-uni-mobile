import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance , {setAuthToken} from "../../../api/axiosInstance";

interface AuthState {
    data: any;
    error: string | null;
    loading: boolean;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    data: null,
    error: null,
    loading: false,
    token: null,
    isAuthenticated: false,
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
        console.log(response.data, "response")
        return response.data;
    } catch (error: any) {
        console.log(error)
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
            console.log(response.data, "response")
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Something went wrong while logging in"
            );
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.loading = false;
            state.error = null;
            state.data = null;
            state.isAuthenticated = false;
            setAuthToken(null);
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.token = null;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'unknown error';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {              
                state.loading = false;
                state.data = action.payload;
                state.token = action.payload.token;
                state.error = null;
                state.isAuthenticated = true;
                setAuthToken(action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'unknown error';
            });
    },
})

export default authSlice.reducer;