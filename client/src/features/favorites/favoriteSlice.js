import { createSlice } from "@reduxjs/toolkit";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} from "./favoriteThunks";

const initialState = {
  favorites: [],
  favoriteIds: [],
  loading: false,
  error: null,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
        state.favoriteIds = action.payload.map((f) => f.property?._id || f.property);
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.unshift(action.payload);
        const propId = action.payload.property?._id || action.payload.property;
        if (!state.favoriteIds.includes(propId)) {
          state.favoriteIds.push(propId);
        }
      })
      // Remove
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((f) => {
          const propId = f.property?._id || f.property;
          return propId !== action.payload;
        });
        state.favoriteIds = state.favoriteIds.filter(
          (id) => id !== action.payload,
        );
      })
      // Check
      .addCase(checkFavorite.fulfilled, (state, action) => {
        const { propertyId, isFavorited } = action.payload;
        if (isFavorited && !state.favoriteIds.includes(propertyId)) {
          state.favoriteIds.push(propertyId);
        } else if (!isFavorited) {
          state.favoriteIds = state.favoriteIds.filter(
            (id) => id !== propertyId,
          );
        }
      });
  },
});

export const { clearError } = favoriteSlice.actions;
export default favoriteSlice.reducer;
