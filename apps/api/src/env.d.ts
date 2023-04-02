declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_ORIGINS: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      SESSION_SECRET: string;
      PORT: string;
      SENDGRID_API_KEY: string;
    }
  }
}

export {}
