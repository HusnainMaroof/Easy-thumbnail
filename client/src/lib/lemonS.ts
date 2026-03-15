import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { envConfig } from "../config/envConfig";

export const initLemonSqueezy = () => {
  let key = envConfig?.PAYMENT_KEYS?.LEMON_API;

  if (!key) {
    console.log("from lemon js not key ");
  }
  lemonSqueezySetup({
    apiKey: key,
    onError: (error) => console.error("Lemon Squeezy Error:", error),
  });
};
