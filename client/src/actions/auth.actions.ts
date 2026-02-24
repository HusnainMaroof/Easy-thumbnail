"use server";

import { registerService } from "../service/auth.service";
import { registerSchema } from "../validator/auth.validator";
import { validateForm } from "../validator/validate";

export type ActionResponse = {
  success: boolean;
  message?: any;
  data: any;
};

export const regUserAction = async (
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
};

export const loginAction = async (
  prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    console.log("from login action");

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
          : "An unexpected error occurred in Login Action",
      data: null,
    };
  }
};
