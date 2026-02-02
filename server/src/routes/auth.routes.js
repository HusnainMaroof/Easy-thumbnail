import express from "express";
import {
  authMe,
  login,
  logout,
  regUser,
  reSendOtp,
  resetPasswordLink,
  ressetPassword,
  verifyOtp,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import passport from "passport";

export const authRoutes = express.Router();

authRoutes.post("/user-register", regUser);
authRoutes.post("/verifyOtp/:token", verifyOtp);
authRoutes.get("/login", login);
authRoutes.post("/resend-otp", reSendOtp);
authRoutes.post("/send-resset-pass-link", resetPasswordLink);
authRoutes.post("/resset-password/:PassToken", ressetPassword);
authRoutes.get("/authMe", protectRoute, authMe);

authRoutes.get("/logout" , logout)



// google api

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login?error=oauth_failed",
    session: true,
  }),
  (req, res) => {
    // On success, Passport has already called req.login() and created the session.
    // Redirect to your React frontend dashboard.

    console.log(res);

    // res.redirect("http://localhost:5173/dashboard");
  },
);
