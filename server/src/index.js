import dotenv from "dotenv";
import express from "express";
dotenv.config();
import colors from "colors";
import { envConfig } from "./config/envConfig.js";
import { connectDB } from "./config/connectDb.js";

const app = express();
const PORT = envConfig.PORT;

connectDB();

app.listen(PORT, () =>
  console.log(`server is connected to port: ${PORT.cyan}`.blue),
);
