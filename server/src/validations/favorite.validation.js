import { body, param } from "express-validator";

/*
|--------------------------------------------------------------------------
| Add Favorite Validation
|--------------------------------------------------------------------------
*/

export const addFavoriteValidation = [
  body("propertyId")
    .notEmpty()
    .withMessage("Property ID is required")
    .isMongoId()
    .withMessage("Invalid property ID"),
];

/*
|--------------------------------------------------------------------------
| Favorite Property ID Validation
|--------------------------------------------------------------------------
*/

export const favoritePropertyIdValidation = [
  param("propertyId").isMongoId().withMessage("Invalid property ID"),
];
