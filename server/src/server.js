import dotenv from "dotenv";
import express from "express";
dotenv.config();
import colors from "colors";
import cors from "cors";
import { envConfig } from "./config/envConfig.js";
import { connectDB } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import { rootRouter } from "./routes/routes.js";
import { connectRedis } from "./config/connectRedis.js";
import { sessionsMiddleware } from "./middleware/sessions.middleware.js";
const app = express();
const PORT = envConfig.PORT;

let allowedOrigin = [envConfig.ORIGINS.FRONTEND_ORIGIN_ONE];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("cors Blocked : Origin Erro not Allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.options("/*splat", cors());

connectDB();
connectRedis();
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(sessionsMiddleware);
app.use(cookieParser());
app.use("/api", rootRouter);

app.use(errorHandler);
app.listen(PORT, () =>
  console.log(`server is connected to port: ${PORT.cyan}`.blue),
);
