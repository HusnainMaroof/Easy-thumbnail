// src/app/api/pricing/create-checkout/route.ts
import { NextResponse } from "next/server";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { getCurrentUser } from "@/src/lib/auth";
import setRedis from "@/src/lib/redis";
import { nanoid } from "nanoid"; // or your generateToken helper
import { initLemonSqueezy } from "@/src/lib/lemonS";

export async function POST(req: Request) {
  try {
    initLemonSqueezy();
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { planId } = await req.json(); // LS Variant ID (e.g. 1404763)
    const checkoutToken = nanoid(32);

    // ✅ SAVE TO REDIS: Link this user to the specific checkout session
    await setRedis.set(
      `checkout:${checkoutToken}`,
      JSON.stringify({ userId: user.id, planId }),
      "EX",
      900, // 15 minute expiry
    );

    // ✅ SDK CALL: Create the checkout session
    const { data, error } = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID!,
      planId,
      {
        checkoutData: {
          custom: { userId: user.id, checkoutToken }, // Hidden metadata
          customerEmail: user.email,
        },
        productOptions: {
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=success`,
        },
      },
    );

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ checkoutUrl: data?.data.attributes.url });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
