import express from "express";
import { regUser, verifyOtp } from "../controller/auth.controller.js";

export const authRoutes = express.Router();

authRoutes.post("/user-register", regUser);
authRoutes.post("/verifyOtp/:token", verifyOtp);
