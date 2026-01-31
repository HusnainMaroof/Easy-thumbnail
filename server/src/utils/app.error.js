import { HTTPSTATUS } from "../config/http.config.js";

export const errorCodes = {
  ERR_INTERNAL: "ERR_INTERNAL",
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_NOT_FOUND: "ERR_NOT_FOUND",
  ERR_VALIDATION: "ERR_VALIDATION",
};

export class AppError extends Error {
  constructor(
    message,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode = errorCodes.ERR_INTERNAL,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCodes.ERR_INTERNAL);
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Resource Not Found ") {
    super(message, HTTPSTATUS.NOT_FOUND, errorCodes.ERR_NOT_FOUND);
  }
}
export class BadRequestExceptions extends AppError {
  constructor(message = "Bad Request ") {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCodes.ERR_BAD_REQUEST);
  }
}
export class UnauthorizedExceptions extends AppError {
  constructor(message = "Unauthroized Access") {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCodes.ERR_UNAUTHORIZED);
  }
}
