import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,

   EMAIL_CONFIG: {
    BREVO_SMTP_SDK_KEY: process.env.BREVO_SMTP_SDK_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },
};
