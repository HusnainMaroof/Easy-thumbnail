import express from "express";
import {
  authMe,
  login,
  regUser,
  reSendOtp,
  resetPasswordLink,
  ressetPassword,
  verifyOtp,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/user-register", regUser);
authRoutes.post("/verifyOtp/:token", verifyOtp);
authRoutes.get("/login", login);
authRoutes.post("/resend-otp", reSendOtp);
authRoutes.post("/send-resset-pass-link", resetPasswordLink);
authRoutes.post("/resset-password/:PassToken", ressetPassword);


authRoutes.get("/authMe", protectRoute, authMe);
