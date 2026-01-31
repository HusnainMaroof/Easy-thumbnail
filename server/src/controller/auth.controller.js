import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

export const regUser = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);

  res.status(HTTPSTATUS.OK).json({ message: "ok", data: body });
});
