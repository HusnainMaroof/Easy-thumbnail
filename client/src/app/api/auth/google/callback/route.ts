import { NextResponse } from "next/server";
import axios from "axios";
import { generateToken } from "@/src/utils/helper";
import setRedis from "@/src/lib/redis";
import { serialize } from "cookie";
import { envConfig } from "@/src/config/envConfig";
import prisma from "@/src/lib/prisma";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code" }, { status: 400 });
  const tokenResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      code,
      client_id: envConfig.GOOGLE_CONFIG.GOOGLE_CLIENT_ID!,
      client_secret: envConfig.GOOGLE_CONFIG.GOOGLE_CLIENT_SECRETS!,
      redirect_uri: `${envConfig.ORIGINS.ORIGIN_ONE}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  const { id_token, access_token } = tokenResponse.data;

  const userInfoResponse = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${access_token}` } },
  );
  const user = userInfoResponse.data;
  const userExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  let sessionId = await generateToken(32);
  let expiresAt = 60 * 60 * 24 * 7;

  if (userExist) {
    if (userExist.status === "ACTIVE") {
      const updateStatus = await prisma.user.update({
        where: { id: userExist.id },
        data: { status: "ACTIVE", emailVerified: true },
      });
    }
    await setRedis.set(
      `auth_session:${sessionId}`,
      JSON.stringify(user),
      "EX",
      expiresAt,
    );
    const cookie = serialize("auth_sessionId", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });
    const res = NextResponse.redirect(
      `${envConfig.ORIGINS.ORIGIN_ONE}/dashboard/home`,
    );
    res.headers.set("Set-cookie", cookie);
    return res;
  }

  const createUser = await prisma.user.create({
    data: {
      email: user.email,
      displayName: user.name,
      userToken: sessionId,
      status: "ACTIVE",
      emailVerified: true,
      password: "",
      google_id: access_token,
    },
  });

  await setRedis.set(
    `auth_session:${sessionId}`,
    JSON.stringify(user),
    "EX",
    expiresAt,
  );
  const cookie = serialize("auth_sessionId", sessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
  });

  const res = NextResponse.redirect(
    `${envConfig.ORIGINS.ORIGIN_ONE}/dashboard/home`,
  );
  res.headers.set("Set-cookie", cookie);
  return res;
}
