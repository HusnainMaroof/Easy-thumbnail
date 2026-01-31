import dotenv from "dotenv";
import express from "express";
dotenv.config();
import colors from "colors";
import { envConfig } from "./config/envConfig.js";
import { connectDB } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import { rootRouter } from "./routes/routes.js";
const app = express();
const PORT = envConfig.PORT;

connectDB();

app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", rootRouter);

app.use(errorHandler);
app.listen(PORT, () =>
  console.log(`server is connected to port: ${PORT.cyan}`.blue),
);
