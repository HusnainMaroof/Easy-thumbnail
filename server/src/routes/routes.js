import express from "express";
import { authRoutes } from "./auth.routes.js";

export const rootRouter = express.Router();

rootRouter.use("/auth" , authRoutes);
