type EmailConfig = {
  BREVO_SMTP_SDK_KEY?: string;
  EMAIL_FROM?: string;
};

type RedisConfig = {
  REDIS_HOST?: string;
  REDIS_PORT?: string;
  REDIS_USERNAME?: string;
  REDIS_PASSWORD?: string;
  REDIS_URL?: string;
};

type SecretConfig = {
  SESSION_SECRET?: string;
};

type GoogleConfig = {
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRETS?: string;
  GOOGLE_NANO_API_KEY?: string;
};
type ORIGINS = {
  ORIGIN_ONE?: string;
};

export const envConfig = {
  DATABASE_URL: process.env.DATABASE_URL,

  NODE_ENV: process.env.NODE_ENV,

  EMAIL_CONFIG: {
    BREVO_SMTP_SDK_KEY: process.env.BREVO_SMTP_SDK_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
  } satisfies EmailConfig,

  REDIS_CONFIG: {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_URL: process.env.REDIS_URL,
  } satisfies RedisConfig,

  SECRET: {
    SESSION_SECRET: process.env.SESSION_SECRET,
  } satisfies SecretConfig,

  GOOGLE_CONFIG: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRETS: process.env.GOOGLE_CLIENT_SECRETS,
    GOOGLE_NANO_API_KEY: process.env.GOOGLE_NANO_API_KEY,
  } satisfies GoogleConfig,

  ORIGINS: {
    ORIGIN_ONE: process.env.FRONTEND_ORIGIN_ONE,
  } satisfies ORIGINS,

  PAYMENT_APIS: process.env.PAYMENT_APIS,
};
