import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import { envConfig } from "./config/envConfig.js";
import app from "./app.js";

const PORT = envConfig.PORT;

app.listen(PORT, () =>
  console.log(`server is connected to port: ${PORT.cyan}`.blue),
);
