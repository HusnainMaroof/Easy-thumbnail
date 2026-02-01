import colors from "colors";
import { envConfig } from "./envConfig.js";
import { BadRequestExceptions } from "../utils/app.error.js";
import { createClient } from "redis";

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_USERNAME } =
  envConfig.REDIS_CONFIG;

  if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD)
    throw new BadRequestExceptions("Redis Config is missing");
export const redisClient = createClient({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
});

redisClient.on("connect", () => console.log("Redis connecting...".cyan));
redisClient.on("ready", () => console.log("Redis ready".green));
redisClient.on("error", (err) => console.error("Redis error:".red, err.message));

export const connectRedis = async () => {
  if (redisClient.isOpen) return;
  await redisClient.connect();
};