import {
  verifyOtpSchema,
  registerSchema,
} from "../validators/auth.validator.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import {
  registerService,
  sendOtpService,
  verifyOtpService,
} from "../service/auth.service.js";

export const regUser = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);

  const createUser = await registerService(body);

  const otp = await sendOtpService(createUser);

  res.status(HTTPSTATUS.OK).json({
    message: "user created Successfully",
    data: { ...createUser, ...otp },
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = verifyOtpSchema.parse(req.body);

  const token = req.params.token;


  let verify = await verifyOtpService(otp, token);

  res.status(HTTPSTATUS.OK).json({ message: "Otp is verified ", date: verify });
});
