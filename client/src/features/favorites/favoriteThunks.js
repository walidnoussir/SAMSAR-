import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getFavorites = createAsyncThunk(
  "favorites/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/favorites");
      return data.favorites;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch favorites",
      );
    }
  },
);

export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (propertyId, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/favorites", { propertyId });
      return data.favorite;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add favorite",
      );
    }
  },
);

export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (propertyId, { rejectWithValue }) => {
    try {
      await api.delete(`/favorites/${propertyId}`);
      return propertyId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove favorite",
      );
    }
  },
);

export const checkFavorite = createAsyncThunk(
  "favorites/check",
  async (propertyId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/favorites/${propertyId}`);
      return { propertyId, isFavorited: data.isFavorited };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check favorite",
      );
    }
  },
);
