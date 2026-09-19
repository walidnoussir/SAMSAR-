import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const getProperties = createAsyncThunk(
  "properties/getAll",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/properties", { params: filters });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch properties",
      );
    }
  },
);

export const getPropertyById = createAsyncThunk(
  "properties/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/properties/${id}`);
      return data.property;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch property",
      );
    }
  },
);

export const getMyProperties = createAsyncThunk(
  "properties/getMine",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/properties/my");
      return data.properties;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch your properties",
      );
    }
  },
);

export const createProperty = createAsyncThunk(
  "properties/create",
  async (propertyData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/properties", propertyData);
      return data.property;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create property",
      );
    }
  },
);

export const updateProperty = createAsyncThunk(
  "properties/update",
  async ({ id, propertyData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/properties/${id}`, propertyData);
      return data.property;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update property",
      );
    }
  },
);

export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/properties/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete property",
      );
    }
  },
);
