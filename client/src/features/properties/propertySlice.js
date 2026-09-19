import { createSlice } from "@reduxjs/toolkit";
import {
  getProperties,
  getPropertyById,
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "./propertyThunks";

const initialState = {
  properties: [],
  property: null,
  myProperties: [],
  pagination: null,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    clearProperty: (state) => {
      state.property = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get By ID
      .addCase(getPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
      })
      .addCase(getPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Mine
      .addCase(getMyProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.myProperties = action.payload;
      })
      .addCase(getMyProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.myProperties.unshift(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload;
        const idx = state.myProperties.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (idx !== -1) state.myProperties[idx] = action.payload;
      })
      // Delete
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.myProperties = state.myProperties.filter(
          (p) => p._id !== action.payload,
        );
      });
  },
});

export const { clearProperty, clearError } = propertySlice.actions;
export default propertySlice.reducer;
