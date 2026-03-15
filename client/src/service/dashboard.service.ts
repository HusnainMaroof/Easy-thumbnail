"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { envConfig } from "../config/envConfig";
import {
  onBoardPayload,
  PricingPayload,
  thumpnailPayload,
} from "../types/dashboard.type";
import { getCurrentUser } from "../lib/auth";
import prisma from "../lib/prisma";
import { UnauthorizedException } from "../utils/app.error";

export type ServiceResponse = {
  success: boolean;
  error: boolean;
  message?: any;
  data: any;
};

export const generateThumnailService = async (
  payload: thumpnailPayload,
): Promise<ServiceResponse> => {
  const genAI = new GoogleGenerativeAI(
    envConfig.GOOGLE_CONFIG.GOOGLE_NANO_API_KEY!,
  );

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image", // Nano Banana 2
  });

  let result;

  let image;
  try {
    result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: payload.prompt }] }],
      generationConfig: {
        // @ts-ignore - 2026 Thinking configuration
        thinkingConfig: {
          includeThoughts: true,
          thinkingBudget: 1024, // Tokens dedicated to "planning" the image
        },
      },
    });

    const response = await result.response;

    image = response.candidates?.[0]?.content.parts.find(
      (part) => part.inlineData,
    );

    if (!image) {
      return {
        success: false,
        error: true,
        message:
          "Model responded but no image was generated. Check your safety settings or prompt.",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: true,
      message: "something went wrong while generating Image",
      data: { error },
    };
  }

  return {
    success: true,
    error: false,
    message: "thumnail generated",
    data: {
      image: image.inlineData,
    },
  };
};

export const onBoardService = async (
  payload: onBoardPayload,
): Promise<ServiceResponse> => {
  const { platform, contentType, style } = payload;

  const user = await getCurrentUser();

  let getCachedUser = await redisClient?.get(`auth_session:${user.userToken}`);
  const sessionData = JSON.parse(getCachedUser!);
  if (!getCachedUser) throw new UnauthorizedException();

  const updated = await prisma.user.updateMany({
    where: { userToken: user?.userToken! },
    data: { is_Onboard: true, credits: 10 },
  });

  const create = await prisma.userProfile.create({
    data: {
      userId: sessionData?.userId!,
      contentType: contentType,
      preferredPlatform: platform,
      preferredStyle: style,
    },
  });

  sessionData.isOnboard! = true;
  sessionData.credits = sessionData.credits + 10;
  await redisClient?.set(
    `auth_session:${user.userToken}`,
    JSON.stringify(sessionData),
    "EX",
    60 * 60 * 24 * 7,
  );
  return {
    success: true,
    error: false,
    message: "Onboard Successfully",
    data: {},
  };
};

export const ProSubService = async (
  payload: PricingPayload,
): Promise<ServiceResponse> => {
  return {
    success: true,
    error: false,
    message: "thumnail generated",
    data: {},
  };
};
