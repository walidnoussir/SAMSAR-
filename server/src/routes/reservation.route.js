import express from "express";

import {
  createReservation,
  getMyReservations,
  cancelReservation,
  getPropertyReservations,
  acceptReservation,
  rejectReservation,
} from "../controllers/reservation.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validation.middleware.js";

import {
  createReservationValidation,
  reservationIdValidation,
  reservationPropertyIdValidation,
} from "../validations/reservation.validation.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

// Create reservation
router.post(
  "/",
  authMiddleware,
  authorize("User"),
  createReservationValidation,
  validate,
  createReservation,
);

// Get my reservations
router.get("/my", authMiddleware, authorize("User"), getMyReservations);

// Cancel my reservation
router.patch(
  "/:id/cancel",
  authMiddleware,
  authorize("User"),
  reservationIdValidation,
  validate,
  cancelReservation,
);

/*
|--------------------------------------------------------------------------
| Owner Routes
|--------------------------------------------------------------------------
*/

// Get reservations for owner's property
router.get(
  "/property/:propertyId",
  authMiddleware,
  authorize("Owner"),
  reservationPropertyIdValidation,
  validate,
  getPropertyReservations,
);

// Accept reservation
router.patch(
  "/:id/accept",
  authMiddleware,
  authorize("Owner"),
  reservationIdValidation,
  validate,
  acceptReservation,
);

// Reject reservation
router.patch(
  "/:id/reject",
  authMiddleware,
  authorize("Owner"),
  reservationIdValidation,
  validate,
  rejectReservation,
);

export default router;
