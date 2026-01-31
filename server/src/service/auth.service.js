import prisma from "../lib/db.js";
import { sendOtpEmail } from "../lib/sendEmails.js";
import {
  ForbiddenExceptions,
  UnauthorizedExceptions,
} from "../utils/app.error.js";
import { generateOtp, hashValue } from "../utils/helper.js";
import crypto from "crypto";

export const registerService = async (body) => {
  const { email, displayName, password } = body;

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) throw new UnauthorizedExceptions("user already exist");

  let hashPass = await hashValue(password);
  let token = await crypto.randomBytes(32).toString("hex");
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashPass,
      displayName: displayName,
      userToken: token,
    },
  });

  return newUser;
};

export const sendOtpService = async (user) => {
  const { id, email, userToken } = user;

  let otp = await generateOtp();
  const otpExpirtesAt = new Date(Date.now() + 60 * 60 * 1000);

  await sendOtpEmail(email, otp, "Otp Verification");

  let send = await prisma.emailVerification.create({
    data: {
      userId: id,
      code: otp,
      expiresAt: otpExpirtesAt,
      otpToken: userToken,
    },
  });

  return send;
};

export const verifyOtpService = async (otp, token) => {
  let checkRecored = await prisma.emailVerification.findFirst({
    where: { otpToken: token },
  });

  if (!checkRecored) throw new UnauthorizedExceptions("unauthrized user");

  let isExpried = new Date() > checkRecored.expiresAt;
  if (isExpried) throw new ForbiddenExceptions("Otp Is expried");

  if (checkRecored.code !== otp)
    throw new UnauthorizedExceptions("Invalid Otp");

  let updatedUser = await prisma.user.update({
    where: { id: checkRecored.userId },
    data: { status: "ACTIVE", emailVerified: true },
  });

  let DelEmailRow = await prisma.emailVerification.delete({
    where: { id: checkRecored.id },
  });

  return updatedUser;
};
