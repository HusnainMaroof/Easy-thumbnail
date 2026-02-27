
"use server"

import { cookies } from "next/headers";
import  setRedis  from "./redis";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const auth_sessionId = cookieStore.get("auth_sessionId")?.value;
  
  if (!auth_sessionId) return;

  const session = await setRedis.get(`auth_session:${auth_sessionId}`);
  console.log(session);
  
  if (!session) return null;

  return JSON.parse(session);
};
