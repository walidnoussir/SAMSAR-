import express from "express";

import {
  login,
  logout,
  register,
  getMe,
} from "../controllers/auth.controller.js";

import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import validate from "../middlewares/validation.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, register);

router.post("/login", loginValidation, validate, login);

router.post("/logout", logout);

router.get("/me", authMiddleware, getMe);

export default router;

