import { NextResponse } from "next/server";
import crypto from "node:crypto";
import setRedis from "@/src/lib/redis";
import { envConfig } from "@/src/config/envConfig";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";
    const secret = envConfig.SECRET.LEMON_WEBHOOK_SECRET || "";

    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest("hex");

    if (digest !== signature) {
      console.log("❌ Signature Mismatch!");
      console.log("Calculated:", digest);
      console.log("Expected:", signature);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const customData = payload.meta.custom_data;

    if (eventName === "order_created") {
      const { user_token, checkout_token } = customData;

      const storedData = await setRedis.get(`checkout:${checkout_token}`);

      if (!storedData) {
        console.error("Checkout token not found in Redis or expired");
        return NextResponse.json({ error: "Session invalid" }, { status: 400 });
      }

      const { userToken: redisUserToken } = JSON.parse(storedData);

      if (redisUserToken === user_token) {
        await prisma.user.update({
          where: { userToken: user_token },
          data: {
            subscriptionPlan: "PRO",
            credits: 45,
          },
        });

        // 6. Cleanup Redis to prevent replay attacks
        await setRedis.del(`checkout:${checkout_token}`);
        const ttl = await setRedis.ttl(`auth_session:${user_token}`);

        if (ttl > 0) {
          // key exists and has TTL → preserve it
          await setRedis.set(
            `auth_session:${user_token}`,
            JSON.stringify({ credits: 45 }),
            "EX",
            ttl,
          );
        } else {
          // key has no TTL or doesn't exist → just set without EX
          await setRedis.set(
            `auth_session:${user_token}`,
            JSON.stringify({ credits: 45 }),
          );
        }

        console.log(`User ${user_token} successfully upgraded to PRO`);
      }
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
