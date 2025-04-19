import { createSlice, createAsyncThunk ,PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { UserLocation } from "../../../types/Types";

export const fetchUserLocation = createAsyncThunk(
    "userLocation/fetchUserLocation",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/location`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Something went wrong while fetching user location data"
            );
        }
    }
);

export const updateLocation = createAsyncThunk(
    "userLocation/updateLocation",
    async (
      { userId, coordinates }: { userId: string; coordinates: [number, number] },
      { rejectWithValue }
    ) => {
      try {
        const response = await axiosInstance.post(
          `/location/${userId}/update`,
          {
            latitude: coordinates[1],
            longitude: coordinates[0],
          }
        );
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Something went wrong while updating user location"
        );
      }
    }
  );

interface UserLocationState {
    userLocation: UserLocation[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserLocationState = {
    userLocation: [],
    loading: false,
    error: null,
};

const userLocationSlice = createSlice({
    name: "userLocation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchUserLocation.fulfilled,
                (state, action: PayloadAction<UserLocation[]>) => {
                    state.userLocation = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchUserLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateLocation.fulfilled,
                (state, action: PayloadAction<UserLocation>) => {
                    const updatedLocationIndex = state.userLocation?.findIndex(
                        (location) => location.userId === action.payload.userId
                    );
                    if (updatedLocationIndex !== undefined && updatedLocationIndex >= 0) {
                        state.userLocation![updatedLocationIndex] = action.payload;
                    } else {
                        state.userLocation?.push(action.payload);
                    }
                    state.loading = false;
                }
            )
            .addCase(updateLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userLocationSlice.reducer;
export const userLocationActions = userLocationSlice.actions;