"use server";

import { cookies } from "next/headers";
import setRedis from "./redis";
import { authFalse, AuthPayload } from "../types/authType";

export const getCurrentUser = async (): Promise<AuthPayload> => {
  const cookieStore = await cookies();
  const auth_sessionId = cookieStore.get("auth_sessionId")?.value;

  if (!auth_sessionId)
    return {
      autherror: { error: true, message: "no session" },
      authsuccess: { ...authFalse },
    };

  const session = await setRedis.get(`auth_session:${auth_sessionId}`);
  // console.log(session);

  if (!session)
    return {
      autherror: { error: true, message: "Session expired or not found" },
      authsuccess: { ...authFalse },
    };

  const parsed = JSON.parse(session);
  return {
    autherror: { error: false, message: "" },
    authsuccess: {
      success: true,
      authMessage: "auth",
      data: {
        credits: parsed.credits,
        email: parsed.email,
        displayName: parsed.displayName,
        userToken: parsed.userToken,
        SubPlans: parsed.SubPlans,
        isOnboard: parsed.isOnboard,
      },
    },
  };
};
