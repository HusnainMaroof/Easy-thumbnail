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

  let userExist;
  userExist = await redisClient?.get(`auth_session:${user.sub}`);

  if (userExist) {
    userExist = JSON.parse(userExist);
  } else {
    userExist = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
  }

  let expiresAt = 60 * 60 * 24 * 7;

  // while google login
  if (userExist) {
    if (userExist?.status === "PENDING") {
      const updateStatus = await prisma.user.update({
        where: { id: userExist.id },
        data: { status: "ACTIVE", emailVerified: true },
      });
    }
    const getgalleryData = await prisma.gallery.findFirst({
      where: {
        userId: userExist.id,
      },
    });

    let UserData = {
      userId: userExist.userId,
      userToken: userExist.userToken!,
      email: userExist.email!,
      displayName: userExist.displayName!,
      SubPlans: userExist.subscriptionPlan,
      isOnboard: userExist.is_Onboard,
      credits: userExist.credits,
      galleryData: getgalleryData || null,
    };
    await setRedis.set(
      `auth_session:${userExist.userToken!}`,
      JSON.stringify(UserData),
      "EX",
      expiresAt,
    );
    const cookie = serialize("auth_sessionId", userExist.userToken!, {
      path: "/",
      httpOnly: true,
      sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresAt,
    });

    if (!userExist.is_Onboard) {
      const res = NextResponse.redirect(
        `${envConfig.ORIGINS.ORIGIN_ONE}/dashboard/onboarding`,
      );
      res.headers.set("Set-cookie", cookie);
      return res;
    }

    const res = NextResponse.redirect(
      `${envConfig.ORIGINS.ORIGIN_ONE}/dashboard/home`,
    );
    res.headers.set("Set-cookie", cookie);
    return res;
  }

  // is the user is totally new then create a new user

  const createUser = await prisma.user.create({
    data: {
      email: user.email,
      displayName: user.name,
      userToken: user.sub,
      status: "ACTIVE",
      emailVerified: true,
      password: "",
      google_id: user.sub,
      credits: 10,
    },
  });
  let UserData = {
    userId: createUser.id,
    userToken: createUser.userToken!,
    email: createUser.email!,
    displayName: createUser.displayName!,
    SubPlans: createUser.subscriptionPlan,
    isOnboard: createUser.is_Onboard,
    credits: createUser.credits,
    galleryData: null,
  };
  await setRedis.set(
    `auth_session:${createUser.userToken!}`,
    JSON.stringify(UserData),
    "EX",
    expiresAt,
  );
  const cookie = serialize("auth_sessionId", createUser.userToken!, {
    path: "/",
    httpOnly: true,
    sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresAt,
  });

  const res = NextResponse.redirect(
    `${envConfig.ORIGINS.ORIGIN_ONE}/dashboard/onboarding`,
  );
  res.headers.set("Set-cookie", cookie);
  return res;
}
