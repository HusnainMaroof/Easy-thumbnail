import express from "express";
import { login, regUser, reSendOtp, verifyOtp } from "../controller/auth.controller.js";

export const authRoutes = express.Router();

authRoutes.post("/user-register", regUser);
authRoutes.post("/verifyOtp/:token", verifyOtp);
authRoutes.get("/login", login);
authRoutes.post("/resend-otp", reSendOtp);
