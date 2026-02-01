import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,

  EMAIL_CONFIG: {
    BREVO_SMTP_SDK_KEY: process.env.BREVO_SMTP_SDK_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
  },

  // node env

  NODE_ENV: process.env.NODE_ENV,

  // redis config
  REDIS_CONFIG: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },

  // session and jwt  Secret
  SECRET: {
    SESSION_SECRET: process.env.SESSION_SECRET,
  },


  // origin
  ORIGINS:{
    FRONTEND_ORIGIN_ONE:process.env.FRONTEND_ORIGIN_ONE
  }
};
