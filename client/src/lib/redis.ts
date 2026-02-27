// lib/redis.ts
import Redis from "ioredis";
import { envConfig } from "../config/envConfig";

// Tell TypeScript that globalThis can have a redisClient
declare global {
  // eslint-disable-next-line no-var
  var redisClient: Redis | undefined;
}

let setRedis: Redis;

if (!globalThis.redisClient) {
  globalThis.redisClient = new Redis(envConfig.REDIS_CONFIG.REDIS_URL!);
}

setRedis = globalThis.redisClient;

export default setRedis;
