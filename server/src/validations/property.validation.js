import { body, param } from "express-validator";

export const createPropertyValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("propertyType")
    .notEmpty()
    .withMessage("Property type is required")
    .isIn(["Apartment", "House", "Studio", "Villa", "Room"])
    .withMessage("Invalid property type"),

  body("location.city").trim().notEmpty().withMessage("City is required"),

  body("location.address").trim().notEmpty().withMessage("Address is required"),

  body("location.latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),

  body("location.longitude")
    .notEmpty()
    .withMessage("Longitude is required")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),

  body("bedrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bedrooms must be a positive integer"),

  body("bathrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bathrooms must be a positive integer"),

  body("surface")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Surface must be a positive number"),
];

export const updatePropertyValidation = [
  param("id").isMongoId().withMessage("Invalid property ID"),

  ...createPropertyValidation,
];

export const propertyIdValidation = [
  param("id").isMongoId().withMessage("Invalid property ID"),
];
