import * as authService from "../services/auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    res.cookie("accessToken", result.token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password,
    );

    res.cookie("accessToken", result.token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
