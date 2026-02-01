import prisma from "../lib/db.js";
import { sendOtpEmail } from "../lib/sendEmails.js";
import {
  BadRequestExceptions,
  ForbiddenExceptions,
  NotFoundException,
  UnauthorizedExceptions,
} from "../utils/app.error.js";
import { generateOtpHelper, hashValueHelper } from "../utils/helper.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { envConfig } from "../config/envConfig.js";
// register Service
export const registerService = async (body) => {
  const { email, displayName, password } = body;

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    if (userExist?.status === "PENDING" || !userExist?.emailVerified)
      return {
        message: "Not Verified",
        data: userExist.userToken,
      };
    throw new UnauthorizedExceptions("user already exist");
  }

  let hashPass = await hashValueHelper(password);
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

// sendOtp Service

export const sendOtpService = async (user) => {
  const { id, email, userToken } = user;

  let otp = await generateOtpHelper();
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

// verify Otp Service
export const verifyOtpService = async (otp, token) => {
  let checkRecored = await prisma.emailVerification.findFirst({
    where: { otpToken: token },
  });

  if (!checkRecored) throw new UnauthorizedExceptions("Unauthrized user");

  let isExpried = new Date() > checkRecored.expiresAt;
  if (isExpried) throw new ForbiddenExceptions("Otp Is Expried");

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

// Login Service

export const loginService = async (email, password) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!findUser) throw new NotFoundException("user not Found");

  let comparePass = bcrypt.compare(password, findUser?.password);
  if (!comparePass) throw new UnauthorizedExceptions("Password does Not Match");

  return findUser;
};

// reSendOtp Service
export const reSentOtpService = async (userToken) => {
  console.log(userToken);

  const findUser = await prisma.user.findUnique({
    where: { userToken: userToken },
  });

  let otp = await generateOtpHelper();
  const otpExpirtesAt = new Date(Date.now() + 60 * 60 * 1000);

  await sendOtpEmail(findUser.email, otp, "Otp Verification");

  const updateUser = await prisma.emailVerification.updateMany({
    where: { userId: findUser.id },
    data: {
      code: otp,
      expiresAt: otpExpirtesAt,
      attemptCount: { increment: 1 },
    },
  });

  return updateUser;
};

// Re SetPassword Link

export const passLinkService = async (email, origin) => {
  let allowedOrigin = [envConfig.ORIGINS.FRONTEND_ORIGIN_ONE];

  if (!allowedOrigin.includesO(origin))
    throw new UnauthorizedExceptions("Unauthrized  Or Invalid Origin");

  const getUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!getUser) throw new NotFoundException("User Does not Exist");

  const resetToken = await crypto.randomBytes(32).toString();


};
