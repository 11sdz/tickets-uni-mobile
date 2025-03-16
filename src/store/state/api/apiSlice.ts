import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

interface ApiState {
    data: any;
    error: string | null;
    loading: boolean;
}

const initialState: ApiState = {
    data: null,
    error: null,
    loading: false,
}

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

