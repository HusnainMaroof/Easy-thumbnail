import express from "express";
import { regUser } from "../controller/auth.controller.js";

export const authRoutes = express.Router();

authRoutes.post("/user-register", regUser);
