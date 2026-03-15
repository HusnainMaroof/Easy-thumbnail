// src/app/api/webhook/lemon/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import setRedis from "@/src/lib/redis";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("X-Signature") || "";
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || "";

    // 1. SECURITY: Verify HMAC signature
    const hmac = crypto.createHmac("sha256", secret);
    const digest = hmac.update(rawBody).digest("hex");
    if (digest !== signature)
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

    const payload = JSON.parse(rawBody);
    if (payload.meta.event_name === "order_created") {
      const { userId, checkoutToken } = payload.meta.custom_data;

      // 2. VERIFY: check Redis for the token
      const stored = await setRedis.get(`checkout:${checkoutToken}`);
      if (!stored)
        return NextResponse.json(
          { error: "Token invalid/expired" },
          { status: 400 },
        );

      const { userId: redisUserId, planId } = JSON.parse(stored);

      if (redisUserId === userId) {
        // ✅ FINAL ACTION: Update your database (e.g. Prisma/MongoDB)
        console.log(`Upgrading User ${userId} to Pro!`);
        await setRedis.del(`checkout:${checkoutToken}`); // Clean up Redis
      }
    }

    return NextResponse.json({ message: "OK" });
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}
