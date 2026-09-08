import { body, param } from "express-validator";

/*
|--------------------------------------------------------------------------
| Create Reservation Validation
|--------------------------------------------------------------------------
*/

export const createReservationValidation = [
  body("propertyId")
    .notEmpty()
    .withMessage("Property ID is required")
    .isMongoId()
    .withMessage("Invalid property ID"),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),
];

/*
|--------------------------------------------------------------------------
| Reservation ID Validation
|--------------------------------------------------------------------------
*/

export const reservationIdValidation = [
  param("id").isMongoId().withMessage("Invalid reservation ID"),
];

/*
|--------------------------------------------------------------------------
| Property ID Validation
|--------------------------------------------------------------------------
*/

export const reservationPropertyIdValidation = [
  param("propertyId").isMongoId().withMessage("Invalid property ID"),
];
