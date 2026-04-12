"use server";

import { envConfig } from "../config/envConfig";
import { Prisma } from "../generated/client";
import { getCurrentUser } from "../lib/auth";
import prisma from "../lib/prisma";
import {
  generateThumnailService,
  onBoardService,
  ProSubService,
} from "../service/dashboard.service";
import {
  onBoardPayload,
  PricingPayload,
  thumpnailPayload,
} from "../types/dashboard.type";
import { catchErrors } from "../utils/errorWrapper";

export type ActionResponse = {
  success: boolean;
  error: boolean;
  message?: any;
  data: any;
};

export const generateThumnailAction = catchErrors(
  async (
    prevState: ActionResponse,
    payload: thumpnailPayload,
  ): Promise<ActionResponse> => {
    const user = await getCurrentUser();
    const service = await generateThumnailService(payload);

    if (service.success) {
      let saveThumbnail = await prisma.gallery.create({
        data: {
          generationConfig: payload.ThumbnailConfig as Prisma.InputJsonValue,
          userId: user.authsuccess.data.userToken!,
        },
      });
    }

    return {
      success: false,
      error: true,
      message: "to many request please try again letter",
      data: {},
    };
  },
);

export const onBoardAction = catchErrors(
  async (
    prevState: ActionResponse,
    payload: onBoardPayload,
  ): Promise<ActionResponse> => {
    const service = await onBoardService(payload);

    return {
      success: service.success,
      error: service.error,
      message: service.message,
      data: service.data,
    };
  },
);

// export const pricingAction = catchErrors(
//   async (
//     prevState: ActionResponse,
//     payload: PricingPayload,
//   ): Promise<ActionResponse> => {
//     const res = await fetch("/api/pricing/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ plainId: envConfig.PAYMENT_KEYS.LEMON_STORE_ID }),
//     });
//     if (!res.ok) throw new Error("Checkout creation failed");

//     const result = await res.json();

//     console.log(result);

//     return {
//       success: false,
//       error: false,
//       message: "redirect",
//       data: { url: result.checkoutUrl },
//     };
//   },
// );
