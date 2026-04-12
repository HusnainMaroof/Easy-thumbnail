import { envConfig } from "@/src/config/envConfig";
import { getCurrentUser } from "@/src/lib/auth";
import { initLemonSqueezy } from "@/src/lib/lemonS";
import setRedis from "@/src/lib/redis";
import { generateToken } from "@/src/utils/helper";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { NextResponse } from "next/server";

export async function POST(req: Response) {
  initLemonSqueezy();
  try {
    const getuser = await getCurrentUser();
    if (!getuser)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let storeId = envConfig.PAYMENT_KEYS.LEMON_STORE_ID?.toString();
    let variantsId = envConfig.PAYMENT_KEYS.LEMON_VARIANT_ID?.toString();
    let userToken = getuser?.authsuccess.data.userToken;

    const checkoutToken = await generateToken(32);
    await setRedis.set(
      `checkout:${checkoutToken}`,
      JSON.stringify({ userToken, variantsId }),
      "EX",
      600,
    );
    const { data, error } = await createCheckout(storeId!, variantsId!, {
      checkoutData: {
        custom: { userToken: userToken, checkoutToken }, // Hidden metadata
        email: getuser?.authsuccess.data.email ,
      },
      productOptions: {
        redirectUrl: `${envConfig.ORIGINS.ORIGIN_ONE}/dashboard/home`,
      },
    });
    if (error) {
      // 💡 LOG THE FULL ERROR CAUSE TO SEE THE EXACT FIELD FAILING
      console.error("Lemon Squeezy detailed error:", error.cause);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }    

    return NextResponse.json({
      checkoutUrl: data.data.attributes.url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", data: { error } },
      { status: 500 },
    );
  }
}
