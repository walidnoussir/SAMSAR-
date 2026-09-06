import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.route.js";
import propertyRoutes from "./routes/property.route.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors());

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

app.use(notFound);

app.use(errorHandler);

export default app;
