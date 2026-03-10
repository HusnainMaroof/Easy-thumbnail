import {
  generateThumnailService,
  onBoardService,
} from "../service/dashboard.service";
import { onBoardPayload, thumpnailPayload } from "../types/dashboard.type";
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
