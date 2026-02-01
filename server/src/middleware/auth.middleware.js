import { UnauthorizedExceptions } from "../utils/app.error.js";
import session from "express-session";
export const protectRoute = (req, res, next) => {
  if (!req.session || !req.session.userId)
    throw new UnauthorizedExceptions("No Session OR Session Expired");

  req.user = {
    id: req.session.userId,
  };
};
