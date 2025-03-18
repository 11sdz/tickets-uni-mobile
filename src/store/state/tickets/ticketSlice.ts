import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';
import { TicketData } from '../../../types/Types';

interface TicketState {
    tickets: TicketData[];  // Initialize tickets as an empty array instead of null
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    tickets: [],  // Empty array for storing ticket data
    loading: false,
    error: null,
};

export const fetchTicketData = createAsyncThunk(
    'ticket/fetchTicketData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/tickets`); // Adjust the endpoint as needed
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong while fetching ticket data'
            );
        }
    }
);

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        // Refactor clearTicketData to reset the entire ticket array
        clearTicketData: (state) => {
            state.tickets = [];  // Reset tickets to an empty array
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTicketData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTicketData.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload; // Action payload is the list of tickets
            })
            .addCase(fetchTicketData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ticketSlice.reducer;
export const { clearTicketData } = ticketSlice.actions;
