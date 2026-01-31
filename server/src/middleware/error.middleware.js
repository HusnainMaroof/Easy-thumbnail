import colors from "colors";
import { z } from "zod";
import { AppError, errorCodes } from "../utils/app.error.js";
import { HTTPSTATUS } from "../config/http.config.js";

export const errorHandler = (err, req, res, next) => {
  console.log(`Error occurred :${req.path}`.red, err);

  if (err instanceof z.ZodError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Validation Failed",
      errorCodes: errorCodes.ERR_VALIDATION,
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errCode: err.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "internal Server Error",
    error: err?.message,
    errorCodes: errorCodes.ERR_INTERNAL,
  });
};
