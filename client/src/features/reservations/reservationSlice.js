import { createSlice } from "@reduxjs/toolkit";
import {
  createReservation,
  getMyReservations,
  cancelReservation,
  getPropertyReservations,
  acceptReservation,
  rejectReservation,
} from "./reservationThunks";

const initialState = {
  reservations: [],
  propertyReservations: [],
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.unshift(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Mine
      .addCase(getMyReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(getMyReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel
      .addCase(cancelReservation.fulfilled, (state, action) => {
        const idx = state.reservations.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (idx !== -1) state.reservations[idx] = action.payload;
      })
      // Get Property Reservations
      .addCase(getPropertyReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyReservations = action.payload;
      })
      .addCase(getPropertyReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Accept
      .addCase(acceptReservation.fulfilled, (state, action) => {
        const idx = state.propertyReservations.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (idx !== -1) state.propertyReservations[idx] = action.payload;
      })
      // Reject
      .addCase(rejectReservation.fulfilled, (state, action) => {
        const idx = state.propertyReservations.findIndex(
          (r) => r._id === action.payload._id,
        );
        if (idx !== -1) state.propertyReservations[idx] = action.payload;
      });
  },
});

export const { clearError } = reservationSlice.actions;
export default reservationSlice.reducer;
