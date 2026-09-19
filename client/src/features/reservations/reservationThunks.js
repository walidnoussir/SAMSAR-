import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const createReservation = createAsyncThunk(
  "reservations/create",
  async ({ propertyId, message }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/reservations", { propertyId, message });
      return data.reservation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create reservation",
      );
    }
  },
);

export const getMyReservations = createAsyncThunk(
  "reservations/getMine",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/reservations/my");
      return data.reservations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reservations",
      );
    }
  },
);

export const cancelReservation = createAsyncThunk(
  "reservations/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/reservations/${id}/cancel`);
      return data.reservation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel reservation",
      );
    }
  },
);

export const getPropertyReservations = createAsyncThunk(
  "reservations/getByProperty",
  async (propertyId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/reservations/property/${propertyId}`);
      return data.reservations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reservations",
      );
    }
  },
);

export const acceptReservation = createAsyncThunk(
  "reservations/accept",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/reservations/${id}/accept`);
      return data.reservation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept reservation",
      );
    }
  },
);

export const rejectReservation = createAsyncThunk(
  "reservations/reject",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/reservations/${id}/reject`);
      return data.reservation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reject reservation",
      );
    }
  },
);
