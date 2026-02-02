import {
  verifyOtpSchema,
  registerSchema,
  loginScheema,
  verifyPassowrdScheema,
} from "../validators/auth.validator.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import {
  loginService,
  passLinkService,
  registerService,
  reSentOtpService,
  ressetPassService,
  sendOtpService,
  verifyOtpService,
} from "../service/auth.service.js";
import { NotFoundException } from "../utils/app.error.js";
import { envConfig } from "../config/envConfig.js";
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
    req.session.email = verify.email;
    req.session.userToken = verify.userToken;
    req.session.status = verify.status;
    req.session.emailVerified = verify.emailVerified;
    req.session.save((saveErr) => {
      if (saveErr) {
        console.error("Session Save Error:", saveErr);
        return;
      }
      // console.log(req.session);

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
    req.session.status = verify.status;
    req.session.emailVerified = verify.emailVerified;

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

  if (sendLink?.message === "Not Verifed") {
    res.status(HTTPSTATUS.OK).json({
      message: "Use Exist But Not Verifed",
      date: sendLink?.data,
    });
    return;
  }

  res.status(HTTPSTATUS.OK).json({
    message: "Reset Password Link Send Chek Your Email",
    date: origin,
  });
});

// reset Pass
export const ressetPassword = asyncHandler(async (req, res) => {
  const { password } = verifyPassowrdScheema.parse(req.body);
  const PassToken = req.params.PassToken;

  if (!PassToken) throw new NotFoundException("reset Pass token not provided");

  const reset = await ressetPassService(password, PassToken);

  res
    .status(HTTPSTATUS.OK)
    .json({ message: "password Reset Successfully", data: reset });
});

// logout

export const logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie(envConfig.NODE_ENV === "production" ? "__Host-authSessionId" : "sessionId",);
      res
        .status(HTTPSTATUS.OK)
        .json({ message: "Logged out Successfully", });
    });
  });
});

// auth me
export const authMe = asyncHandler(async (req, res) => {
  const user = req.user;

  console.log(user);

  res.status(HTTPSTATUS.OK).json({
    message: "verifed user",
    date: user,
  });
});
