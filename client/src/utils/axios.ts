import axios from "axios";
import { envConfig } from "../config/envConfig";

export const LEMON_SQUEEZY_ENDPOINT = "https://api.lemonsqueezy.com/v1/";

export const lemonSqueezyApiInstance = axios.create({
  baseURL: LEMON_SQUEEZY_ENDPOINT,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${envConfig?.PAYMENT_KEYS?.LEMON_API!}`,
  },
});
