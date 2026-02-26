"use server";

import prisma from "../lib/prisma";
import { sendOtpEmail } from "../lib/sendMails";
import {
  passLinkService,
  registerService,
  reSendOtpService,
  ResetPasswordService,
  sendOtpService,
  verifyOtpService,
} from "../service/auth.service";
import { reSentOtpPayload, VerifyOtpPayload } from "../types/auth";
import { catchErrors } from "../utils/errorWrapper";
import { generateOtpHelper } from "../utils/helper";

export type ActionResponse = {
  success: boolean;
  error: boolean;
  message?: any;
  data: any;
};

export const regUserAction = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    const payload = Object.fromEntries(formData) as {
      email: string;
      displayName: string;
      password: string;
    };

    const createUser = await registerService(payload);
    if (!createUser.success) {
      return createUser;
    }

    const sendOtp = await sendOtpService(
      createUser.data.id,
      createUser.data.email,
      createUser.data.userToken,
    );

    if (sendOtp.success) {
      return sendOtp;
    }

    return {
      success: true,
      error: false,
      message: "good",
      data: null,
    };
  },
);

export const verifyOtpAction = catchErrors(
  async (
    prevState: ActionResponse,
    payload: VerifyOtpPayload,
  ): Promise<ActionResponse> => {
    if (!payload.userToken) throw new Error("Unauthrozied");

    if (payload.sender === "otp-resender") {
      let res = await reSendOtpService(payload.userToken);
      return {
        success: res.success,
        message: res.message,
        error: res.error,
        data: res.data,
      };
    }

    if (payload.sender === "otp-verifier") {
      let res = await verifyOtpService(payload.code, payload.userToken);
      return {
        success: res.success,
        message: res.message,
        error: res.error,
        data: res.data,
      };
    }

    return {
      success: true,
      message: "Otp Verified",
      error: false,
      data: {},
    };
  },
);

export const loginAction = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    console.log("from login action");

    return {
      success: true,
      error: false,
      message: "good",
      data: null,
    };
  },
);

export const PassLinkActions = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    const payload = Object.fromEntries(formData) as {
      email: string;
      origin: string;
    };
    const link = await passLinkService(payload);

    return { success: true, error: false, message: link.message, data: {} };
  },
);

export const ResetPassowrdAction = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    const payload = Object.fromEntries(formData) as {
      password: string;
      token: string;
    };

    const reset = await ResetPasswordService(payload);

    return {
      success: reset.success,
      error: reset.error,
      message: reset.message,
      data: {},
    };
  },
);

export const EmailVerifierAction = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    const payload = Object.fromEntries(formData) as {
      email: string;
      origin: string;
    };

    console.log(payload.email);

    const getUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!getUser) throw new Error("Unauthrozied");
     let otp = await generateOtpHelper();
  const otpExpirtesAt = new Date(Date.now() + 60 * 60 * 1000);
  await sendOtpEmail(getUser?.email!, otp, "Otp Verification");

  const updateUser = await prisma.emailVerification.updateMany({
    where: { userId: getUser?.id! },
    data: {
      code: otp,
      expiresAt: otpExpirtesAt,
      attemptCount: { increment: 1 },
    },
  });


console.log(getUser.userToken);


    return {
      success: true,
      error: false,
      message: "Otp email sended",
      data: getUser.userToken,
    };
  },
);
