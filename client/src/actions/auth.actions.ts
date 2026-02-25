"use server";

import {
  registerService,
  reSendOtpService,
  sendOtpService,
  verifyOtpService,
} from "../service/auth.service";
import { reSentOtpPayload, VerifyOtpPayload } from "../types/auth";
import { catchErrors } from "../utils/errorWrapper";

export type ActionResponse = {
  success: boolean;
  message?: any;
  data: any;
};

export const regUserAction = catchErrors(
  async (
    prevState: ActionResponse,
    formData: FormData,
  ): Promise<ActionResponse> => {
    try {
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
        message: "good",
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred In Reg Action",
        data: null,
      };
    }
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
        data: res.data,
      };
    }

    if (payload.sender === "otp-verifier") {
      let res = await verifyOtpService(payload.code, payload.userToken);
      return {
        success: res.success,
        message: res.message,
        data: res.data,
      };
    }

    return {
      success: true,
      message: "Otp Verified",
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
      message: "good",
      data: null,
    };
  },
);
