import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import propertyReducer from "../features/properties/propertySlice";
import reservationReducer from "../features/reservations/reservationSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    reservations: reservationReducer,
    favorites: favoriteReducer,
  },
});

export default store;
