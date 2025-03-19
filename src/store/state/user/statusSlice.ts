import  {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

interface StatusData {
    status: string;
    userId: string;
    lastUpdated: Date | null;
}

interface StatusState {
    StatusData: StatusData[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: StatusState = {
    StatusData: [],
    loading: false,
    error: null,
}

export const fetchStatusData = createAsyncThunk(
    'status/fetchStatusData',
    async (_,{rejectWithValue}) => {
        try{
        const response = await axiosInstance.get(`/userStatus`);
        return response.data;
        }catch(error:any){
            return rejectWithValue(
                error.response?.data?.message ||
                'Something went wrong while fetching status data'
            );
        }
    }
);

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        // Clear status data and reset loading and error states
        clearStatusData: (state) => {
            state.StatusData = [];
            state.loading = false;
            state.error = null;
        },
        setStatus: (state, action) => {
            const { status, userId } = action.payload;
            const existingStatus = state.StatusData?.find(data => data.userId === userId);
            if (existingStatus) {
                existingStatus.status = status;
                existingStatus.lastUpdated = new Date();
            } else {
                state.StatusData?.push({ status, userId, lastUpdated: new Date() });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatusData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatusData.fulfilled, (state, action) => {
                state.loading = false;
                state.StatusData = action.payload; // Directly set the status data
            })
            .addCase(fetchStatusData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default statusSlice.reducer;
export const { clearStatusData, setStatus } = statusSlice.actions;