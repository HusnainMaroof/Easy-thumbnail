"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { envConfig } from "../config/envConfig";
import {
  onBoardPayload,
  PricingPayload,
  thumpnailPayload,
} from "../types/dashboard.type";
import { getCurrentUser } from "../lib/auth";
import { UnauthorizedException } from "../utils/app.error";
import setRedis from "../lib/redis";

import { uploadToCloudinary } from "../utils/uploadImg";
import { fileToBuffer } from "../utils/helper";
import { prisma } from "../lib/prisma";

export type ServiceResponse = {
  success: boolean;
  error: boolean;
  message?: any;
  data: any;
};

export const generateThumnailService = async (
  payload: thumpnailPayload,
): Promise<ServiceResponse> => {
  // const genAI = new GoogleGenerativeAI(
  //   envConfig.GOOGLE_CONFIG.GOOGLE_NANO_API_KEY!,
  // );

  // const model = genAI.getGenerativeModel({
  //   model: "gemini-2.5-flash-image", // Nano Banana 2
  // });

  // let result;

  // let image;
  // try {
  //   result = await model.generateContent({
  //     contents: [{ role: "user", parts: [{ text: payload.prompt }] }],
  //     generationConfig: {
  //       // @ts-ignore - 2026 Thinking configuration
  //       thinkingConfig: {
  //         includeThoughts: true,
  //         thinkingBudget: 1024, // Tokens dedicated to "planning" the image
  //       },
  //     },
  //   });

  //   const response = await result.response;

  //   image = response.candidates?.[0]?.content.parts.find(
  //     (part) => part.inlineData,
  //   );

  //   if (!image) {
  //     return {
  //       success: false,
  //       error: true,
  //       message:
  //         "Model responded but no image was generated. Check your safety settings or prompt.",
  //       data: null,
  //     };
  //   }
  // } catch (error) {
  //   console.log(error);

  //   return {
  //     success: false,
  //     error: true,
  //     message: "something went wrong while generating Image",
  //     data: { error },
  //   };
  // }

  // Todo add the generation model and generation logic here and return the image URL in response

  // Hugging Face API integration example (uncomment and replace with actual implementation)

  const file = payload?.ThumbnailConfig?.referenceImage;
  let refuploadUrl = "";
  if (file instanceof File) {
    try {
      const buffer = await fileToBuffer(file);
      let uploadResult = await uploadToCloudinary(buffer);
      refuploadUrl = uploadResult!;
    } catch (error) {
      console.log(
        "error while uploading ref img from dashboard service",
        error,
      );
    }
  }

  let imageUrl = "";
  try {
    const res = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${envConfig.HUGGING_FACE.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: payload.prompt,
          options: {
            wait_for_model: true,
          },
        }),
      },
    );

    if (!res.ok) {
      return {
        success: false,
        error: true,
        message: "something went wrong while generating Image",
        data: { error: await res.text() },
      };
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    imageUrl = await uploadToCloudinary(buffer);
  } catch (error) {
    console.log("from thumnail service", error);
  }

  return {
    success: true,
    error: false,
    message: "thumnail generated",
    data: {
      imgUrl: imageUrl,
      refImgUrl: refuploadUrl,
    },
  };
};

export const onBoardService = async (
  payload: onBoardPayload,
): Promise<ServiceResponse> => {
  const { platform, contentType, style } = payload;

  const user = await getCurrentUser();

  let getCachedUser = await redisClient?.get(`auth_session:${user.sessionId}`);
  const sessionData = JSON.parse(getCachedUser!);
  console.log("from onboard service", user);
  if (!getCachedUser) throw new UnauthorizedException();

  const updated = await prisma.user.updateMany({
    where: { userToken: user?.authsuccess.data.userToken! },
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
  sessionData.credits = sessionData.credits;

  let expiresAt = 60 * 60 * 24 * 7;
  await setRedis.set(
    `auth_session:${user.sessionId}`,
    JSON.stringify(sessionData),
    "EX",
    expiresAt,
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
