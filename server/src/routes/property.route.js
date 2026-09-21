import express from "express";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  getMyProperties,
  updateProperty,
  deleteProperty,
  uploadPropertyImages,
} from "../controllers/property.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

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

// Upload property images to Cloudinary
router.post(
  "/upload",
  authMiddleware,
  authorize("Owner"),
  upload.array("images", 8),
  uploadPropertyImages,
);

// Middleware to parse JSON strings from multipart/form-data if submitted directly
const parseMultipartJson = (req, res, next) => {
  if (typeof req.body.location === "string") {
    try {
      req.body.location = JSON.parse(req.body.location);
    } catch (_) {}
  }
  if (typeof req.body.images === "string") {
    try {
      req.body.images = JSON.parse(req.body.images);
    } catch (_) {
      req.body.images = [req.body.images];
    }
  }
  next();
};

// Create property (supports both JSON with pre-uploaded Cloudinary URLs and direct multipart uploads)
router.post(
  "/",
  authMiddleware,
  authorize("Owner"),
  upload.array("images", 8),
  parseMultipartJson,
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
