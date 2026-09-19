import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.route.js";
import propertyRoutes from "./routes/property.route.js";
import reservationRoutes from "./routes/reservation.route.js";
import favoriteRoutes from "./routes/favorite.routes.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
