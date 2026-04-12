"use server";

import { cookies } from "next/headers";
import prisma from "../lib/prisma";
import setRedis from "../lib/redis";
import { sendOtpEmail } from "../lib/sendMails";
import {
  loginService,
  passLinkService,
  registerService,
  reSendOtpService,
  ResetPasswordService,
  sendOtpService,
  verifyOtpService,
} from "../service/auth.service";
import { reSentOtpPayload, VerifyOtpPayload } from "../types/authType";
import { catchErrors } from "../utils/errorWrapper";
import { generateOtpHelper, generateToken } from "../utils/helper";
import { envConfig } from "../config/envConfig";
import { revalidatePath } from "next/cache";

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

    console.log("log from regestration u adfafaefaq");

    const createUser = await registerService(payload);
    if (!createUser.success) {
      return createUser;
    }

    const sendOtp = await sendOtpService(
      createUser.data.id,
      createUser.data.email,
      createUser.data.userToken,
    );

    return {
      success: sendOtp.success,
      error: sendOtp.error,
      message: sendOtp.message,
      data: sendOtp.data,
    };
  },
);

export const verifyOtpAction = catchErrors(
  async (
    prevState: ActionResponse,
    payload: VerifyOtpPayload,
  ): Promise<ActionResponse> => {
    if (!payload.userToken) throw new Error("Unauthrozied");
    let response;
    if (payload.sender === "otp-resender") {
      response = await reSendOtpService(payload.userToken);
      return {
        success: response.success,
        message: response.message,
        error: response.error,
        data: response.data,
      };
    }

    response = await verifyOtpService(payload.code, payload.userToken);

    let UserData = {
      userId: response.data.id,
      userToken: response.data.userToken!,
      email: response.data.email!,
      displayName: response.data.displayName!,
      SubPlans: response.data.subscriptionPlan,
      isOnboard: response.data.is_Onboard,
      credits: response.data.credits,
      galleryData: null,
    };

    console.log("from auth", UserData);

    const cookieStore = await cookies();
    const sessionId = await generateToken(32);
    let expiresAt = 60 * 60 * 24 * 7;
    await setRedis.set(
      `auth_session:${sessionId}`,
      JSON.stringify(UserData),
      "EX",
      expiresAt,
    );

    cookieStore.set("auth_sessionId", sessionId, {
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: expiresAt,
    });
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

    const payload = Object.fromEntries(formData) as {
      email: string;

      password: string;
    };

    const login = await loginService(payload);

    const cookieStore = await cookies();
    const sessionId = await generateToken(32);

    let UserData = {
      userId: login.data.id,
      userToken: login.data.userToken!,
      email: login.data.email!,
      displayName: login.data.displayName!,
      SubPlans: login.data.subscriptionPlan,
      isOnboard: login.data.is_Onboard,
      credits: login.data.credits,
      galleryData: null,
    };

    let expiresAt = 60 * 60 * 24 * 7;
    await setRedis.set(
      `auth_session:${sessionId}`,
      JSON.stringify(UserData),
      "EX",
      expiresAt,
    );

    cookieStore.set("auth_sessionId", sessionId, {
      httpOnly: true,
      secure: envConfig.NODE_ENV === "production",
      sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: expiresAt,
    });
    return {
      success: login.success,
      error: login.error,
      message: login.message,
      data: login.data,
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

    return {
      success: true,
      error: false,
      message: "Otp email sended",
      data: getUser.userToken,
    };
  },
);

export const logoutAction = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("auth_sessionId")?.value;
    console.log("from server");
    console.log(sessionId);

    if (sessionId) {
      await setRedis.del(`auth_session:${sessionId}`);
    }
    cookieStore.set({
      name: "session_id",
      value: "",
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });

    revalidatePath("/");
    return {
      success: false,
      error: false,
      message: "logout successfully",
      data: {},
    };
  },
);
