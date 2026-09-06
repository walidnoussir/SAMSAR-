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

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all properties
router.get("/", getAllProperties);

// Get my properties
router.get("/my", authMiddleware, authorize("Owner"), getMyProperties);

// Get property by ID
router.get("/:id", getPropertyById);

/*
|--------------------------------------------------------------------------
| Owner Routes
|--------------------------------------------------------------------------
*/

// Create property
router.post("/", authMiddleware, authorize("Owner"), createProperty);

// Update property
router.put("/:id", authMiddleware, authorize("Owner"), updateProperty);

// Delete property
router.delete("/:id", authMiddleware, authorize("Owner"), deleteProperty);

export default router;
