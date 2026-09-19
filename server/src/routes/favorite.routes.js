import express from "express";

import {
  addFavorite,
  removeFavorite,
  getMyFavorites,
  checkFavorite,
} from "../controllers/favorite.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  addFavoriteValidation,
  favoritePropertyIdValidation,
} from "../validations/favorite.validation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| User Routes — Favorites
|--------------------------------------------------------------------------
*/

// Add favorite
router.post(
  "/",
  authMiddleware,
  authorize("User"),
  addFavoriteValidation,
  validate,
  addFavorite,
);

// Get my favorites
router.get("/", authMiddleware, authorize("User"), getMyFavorites);

// Check if property is favorited
router.get(
  "/:propertyId",
  authMiddleware,
  authorize("User"),
  favoritePropertyIdValidation,
  validate,
  checkFavorite,
);

// Remove favorite
router.delete(
  "/:propertyId",
  authMiddleware,
  authorize("User"),
  favoritePropertyIdValidation,
  validate,
  removeFavorite,
);

export default router;
