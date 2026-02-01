import {
  verifyOtpSchema,
  registerSchema,
  loginScheema,
} from "../validators/auth.validator.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import {
  loginService,
  registerService,
  reSentOtpService,
  sendOtpService,
  verifyOtpService,
} from "../service/auth.service.js";
import { BadRequestExceptions, NotFoundException } from "../utils/app.error.js";
// register User Controller
export const regUser = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);

  const createUser = await registerService(body);

  if (createUser?.message === "Not Verified") {
    res.status(HTTPSTATUS.OK).json({
      message: "User Is Register But Not Verifed",
      data: createUser?.data,
    });
    return;
  }

  const otp = await sendOtpService(createUser);

  res.status(HTTPSTATUS.CREATED).json({
    message: "user created Successfully",
    data: { ...createUser, ...otp },
  });
});

// Verify Otp Controller
export const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = verifyOtpSchema.parse(req.body);

  const token = req.params.token;

  let verify = await verifyOtpService(otp, token);

  req.session.regenerate((err) => {
    if (err) {
      console.error("Session Regeneration Error:", err);
      return;
    }
    req.session.userId = verify.id;
    req.session.userToken = verify.userToken;
    req.session.email = verify.email;

    req.session.save((saveErr) => {
      if (saveErr) {
        console.error("Session Save Error:", saveErr);
        return;
      }
      console.log(req.session);

      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "Otp is verified ", date: verify });
    });
  });
});

// Login Controller

export const login = asyncHandler(async (req, res) => {
  const { email, password } = loginScheema.parse(req.query);

  let verify = await loginService(email, password);

  if (verify.status === "PENDING" || !verify.emailVerified) {
    res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "User Is Resiter But Not Verifed",
      data: verify.userToken,
    });
    return;
  }

  req.session.regenerate((err) => {
    if (err) {
      console.error("Session Regeneration Error:", err);
      return;
    }

    req.session.userId = verify.id;
    req.session.email = verify.email;
    req.session.userToken = verify.userToken;

    req.session.save((saveErr) => {
      if (saveErr) {
        console.error("Session Save Error:", saveErr);
        return;
      }
      // console.log(req.session);
      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "user login Succefully", data: verify });
    });
  });
});

// Resend Otp

export const reSendOtp = asyncHandler(async (req, res) => {
  const { userToken } = req.body;
  if (!userToken) throw new NotFoundException("Token Not Found");
  const resend = await reSentOtpService(userToken);

  res.status(HTTPSTATUS.OK).json({
    message: "ReSend Otp Succefully",
    data: resend,
  });
});

// Reset Passowrd Link

export const resetPasswordLink = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new NotFoundException("Email is Requred");

  let origin = req.headers.origin;

  let sendLink = await passLinkService(email, origin);
});
