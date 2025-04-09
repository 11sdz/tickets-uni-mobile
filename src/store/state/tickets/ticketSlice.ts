import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';
import { TicketData } from '../../../types/Types';
import { RootState } from '../store'; // Adjust the import path as needed

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
    async ({ agent }: { agent?: string }, { rejectWithValue }) => {
        try {
            const endpoint = agent ? `/tickets?agent=${agent}` : `/tickets`; // Adjust the endpoint as needed
            const response = await axiosInstance.get(endpoint); // Adjust the endpoint as needed
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong while fetching ticket data'
            );
        }
    }
);

export const patchTicket = createAsyncThunk(
    'ticket/patchTicket',
    async (
        { _id, updateData }: { _id: string; updateData: Partial<TicketData> },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.patch(`/tickets/${_id}`, updateData);
            return response.data;  // Returning the updated ticket
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Something went wrong while updating ticket data'
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
            })
            .addCase(patchTicket.fulfilled, (state, action) => {
                const updatedTicket = action.payload;
                const index = state.tickets.findIndex(ticket => ticket._id === updatedTicket._id);
                if (index !== -1) {
                    state.tickets[index] = updatedTicket;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(patchTicket.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            }).addCase(patchTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            });
    },
});



export default ticketSlice.reducer;
export const { clearTicketData } = ticketSlice.actions;

// Selector to get a ticket by ID from the Redux store
export const selectTicketById = createSelector(
    [(state: RootState) => state.tickets.tickets, (_: RootState, ticketId: string) => ticketId],
    (tickets, ticketId) => tickets.find(ticket => ticket._id === ticketId) || null
);