import express from "express";

import { login, register } from "../controllers/auth.controller.js";

import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);

router.post("/login", loginValidation, validate, login);

export default router;
