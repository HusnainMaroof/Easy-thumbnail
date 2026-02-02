import session from "express-session";
import { RedisStore } from "connect-redis";
import { envConfig } from "../config/envConfig.js";
import { redisClient } from "../config/connectRedis.js";

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess:",
});


// console.log(envConfig.SECRET.SESSION_SECRET.red);

export const sessionsMiddleware = session({
  store: redisStore,
  secret: envConfig.SECRET.SESSION_SECRET,
  name:
    envConfig.NODE_ENV === "production" ? "__Host-authSessionId" : "sessionId",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: envConfig?.NODE_ENV === "production",
    sameSite: envConfig.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
    path: "/",
  },
});
