import { envConfig } from "../config/envConfig";
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
    const service = await generateThumnailService(payload);

    return {
      success: service.success,
      error: service.error,
      message: service.message,
      data: service.data,
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

export const pricingAction = catchErrors(
  async (
    prevState: ActionResponse,
    payload: PricingPayload,
  ): Promise<ActionResponse> => {
    let service;

    const res = await fetch("/api/pricing/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plainId: envConfig.PAYMENT_KEYS.LEMON_STORE_ID }),
    });
    if (!res.ok) throw new Error("Checkout creation failed");

    console.log(res);

    return {
      success: true,
      error: false,
      message: "redirect",
      data: { url: res.url },
    };
  },
);
