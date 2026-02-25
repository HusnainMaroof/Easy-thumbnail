import prisma from "../lib/prisma";
import { sendOtpEmail } from "../lib/sendMails";
import { ForbiddenException, UnauthorizedException } from "../utils/app.error";
import { catchErrors } from "../utils/errorWrapper";
import {
  generateOtpHelper,
  generateToken,
  hashValueHelper,
} from "../utils/helper";

interface RegisterForm {
  email: string;
  displayName: string;
  password: string;
}

export type ServiceResponse = {
  success: boolean;
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
        message: "Not Verified",
        data: userExist.userToken,
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

  return { success: true, message: "USER_CREATED", data: newUser };
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
    success: mail.success,
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

  return { success: true, message: "Otp Verified", data: "" };
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

  return { success: true, message: "Otp Resended ", data: "" };
};
