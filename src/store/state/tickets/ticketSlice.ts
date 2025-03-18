import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';
import { TicketData } from '../../../types/Types';

interface TicketState {
    ticketData: TicketData | null;
    loading: boolean;
    error: string | null;
}

const initialState: TicketState = {
    ticketData: null,
    loading: false,
    error: null,
}

export const fetchTicketData = createAsyncThunk(
    'ticket/fetchTicketData',
    async (_,{rejectWithValue}) => {
        try{
        const response = await axiosInstance.get(`/tickets`); // Adjust the endpoint as needed
        return response.data;
        }catch(error:any){
            return rejectWithValue(
                error.response?.data?.message ||
                'Something went wrong while fetching ticket data'
            );
        }
    }
);

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        clearTicketData: (state) => {
            if (state.ticketData) {
                state.ticketData.ticketId = '';
                state.ticketData.ticketTitle = '';
                state.ticketData.ticketLocation = '';
                state.ticketData.ticketOfficeNumber = '';
                state.ticketData.ticketMobileNumber = '';
                state.ticketData.ticketPersonalName = '';
                state.ticketData.ticketPersonalPosition = '';
                state.ticketData.ticketText = '';
                state.ticketData.ticketStatus = '';
                state.ticketData.ticketAgent = '';
                state.ticketData.ticketCreatedAt = '';
                state.ticketData.ticketOpenedAt = '';
            }
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
                state.ticketData = action.payload;
            })
            .addCase(fetchTicketData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ticketSlice.reducer;
export const { clearTicketData } = ticketSlice.actions;
