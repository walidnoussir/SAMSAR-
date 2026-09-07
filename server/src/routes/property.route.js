import express from "express";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  getMyProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  createPropertyValidation,
  updatePropertyValidation,
  propertyIdValidation,
  propertyFilterValidation,
} from "../validations/property.validation.js";

import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all properties + filters + pagination
router.get("/", propertyFilterValidation, validate, getAllProperties);

// Get my properties
router.get("/my", authMiddleware, authorize("Owner"), getMyProperties);

// Get property by ID
router.get("/:id", propertyIdValidation, validate, getPropertyById);

/*
|--------------------------------------------------------------------------
| Owner Routes
|--------------------------------------------------------------------------
*/

// Create property
router.post(
  "/",
  authMiddleware,
  authorize("Owner"),
  createPropertyValidation,
  validate,
  createProperty,
);

// Update property
router.put(
  "/:id",
  authMiddleware,
  authorize("Owner"),
  updatePropertyValidation,
  validate,
  updateProperty,
);

// Delete property
router.delete(
  "/:id",
  authMiddleware,
  authorize("Owner"),
  propertyIdValidation,
  validate,
  deleteProperty,
);

export default router;
