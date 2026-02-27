import { cookies } from "next/headers";
import { envConfig } from "../config/envConfig";
import prisma from "../lib/prisma";
import { sendOtpEmail, sendResetPassEmail } from "../lib/sendMails";
import { ForbiddenException, UnauthorizedException } from "../utils/app.error";
import { catchErrors } from "../utils/errorWrapper";
import {
  generateOtpHelper,
  generateToken,
  hashValueHelper,
} from "../utils/helper";
import bcrypt from "bcryptjs";

interface RegisterForm {
  email: string;
  displayName: string;
  password: string;
}
interface LoginForm {
  email: string;

  password: string;
}
interface EmailType {
  email: string;
  origin: string;
}
interface ResetFormType {
  password: string;
  token: string;
}

export type ServiceResponse = {
  success: boolean;
  error: boolean;
  message?: any;
  data: any;
};

export const registerService = async (
  formData: RegisterForm,
): Promise<ServiceResponse> => {
  const { email, displayName, password } = formData;

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExist) {
    if (userExist?.status === "PENDING" || !userExist?.emailVerified)
      return {
        success: false,
        error: true,
        message: "Not Verified",
        data: userExist?.userToken!,
      };
    throw new Error("user already exist");
  }

  let hashPass = await hashValueHelper(password);
  let userToken = await generateToken(32);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashPass,
      displayName: displayName,
      userToken: userToken,
    },
  });

  return {
    success: true,
    error: false,
    message: "USER_CREATED",
    data: newUser,
  };
};

export const sendOtpService = async (
  id: string,
  email: string,
  userToken: string,
): Promise<ServiceResponse> => {
  let otp = await generateOtpHelper();

  const otpExpirtesAt = new Date(Date.now() + 60 * 60 * 1000);

  let mail = await sendOtpEmail(email, otp, "Otp Verification");
  let save = await prisma.emailVerification.create({
    data: {
      userId: id,
      otpToken: userToken,
      code: otp,
      expiresAt: otpExpirtesAt,
    },
  });

  return {
    success: true,
    error: false,
    message: "Otp sended",
    data: { userToken },
  };
};

export const verifyOtpService = async (
  code: string,
  userToken: string,
): Promise<ServiceResponse> => {
  let checkRecored = await prisma.emailVerification.findFirst({
    where: { otpToken: userToken },
  });

  if (!checkRecored) throw new Error("Unauthrized user");

  let isExpried = new Date() > checkRecored.expiresAt;
  if (isExpried) throw new Error("Otp Is Expried");
  if (checkRecored.code !== code) throw new Error("Invalid Otp");

  let updatedUser = await prisma.user.update({
    where: { id: checkRecored.userId },
    data: { status: "ACTIVE", emailVerified: true },
  });
  let DelEmailRow = await prisma.emailVerification.delete({
    where: { id: checkRecored.id },
  });

  return { success: true, error: false, message: "Otp Verified", data: "" };
};

export const reSendOtpService = async (
  userToken: string,
): Promise<ServiceResponse> => {
  const findUser = await prisma.user.findUnique({
    where: { userToken: userToken },
  });

  let otp = await generateOtpHelper();
  const otpExpirtesAt = new Date(Date.now() + 60 * 60 * 1000);
  await sendOtpEmail(findUser?.email!, otp, "Otp Verification");

  const updateUser = await prisma.emailVerification.updateMany({
    where: { userId: findUser?.id! },
    data: {
      code: otp,
      expiresAt: otpExpirtesAt,
      attemptCount: { increment: 1 },
    },
  });

  return { success: true, error: false, message: "Otp Resended", data: "" };
};

export const passLinkService = async (
  formdata: EmailType,
): Promise<ServiceResponse> => {
  const { email, origin } = formdata;

  let allowedOrigin = [envConfig.ORIGINS.ORIGIN_ONE];

  if (!allowedOrigin.includes(origin)) throw new UnauthorizedException();

  const getUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!getUser) throw new Error("User Does not Exist");

  let resetToken = await generateToken(32);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  let link = `${origin}/auth/reset-password/${resetToken}`;

  let main = await sendResetPassEmail(email, link, "ReSet Password");

  return { success: true, error: false, message: "email sended", data: {} };
};

export const ResetPasswordService = async (
  formData: ResetFormType,
): Promise<ServiceResponse> => {
  const getUser = await prisma.user.findFirst({
    where: { resetPasswordToken: formData.token },
  });
  console.log(getUser);
  if (!getUser) throw new Error("Unauthrized User");

  let isExpried = new Date() > getUser.resetPasswordExpiresAt!;

  if (isExpried) throw new Error("Reset Password Link Expired");
  let hashPass = await hashValueHelper(formData.password);

  let updatedUser = await prisma.user.updateMany({
    where: { id: getUser.id },
    data: {
      password: hashPass,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    },
  });

  return {
    success: true,
    error: false,
    message: "Password Reset Successfully",
    data: {},
  };
};

export const loginService = async (
  formData: LoginForm,
): Promise<ServiceResponse> => {
  const { email, password } = formData;
  const userExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!userExist) throw new Error("User Not Found");

  if (userExist?.status === "PENDING" || !userExist?.emailVerified)
    return {
      success: false,
      error: true,
      message: "Not Verified",
      data: userExist.userToken,
    };

  let checkPass = await bcrypt.compare(password, userExist.password);

  if (!checkPass) throw new Error("Inncorect Password");

  return {
    success: true,
    error: false,
    message: "login Successfully",
    data: userExist,
  };
};
