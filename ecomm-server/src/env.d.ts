declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ALLOWED_ORIGINS: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      SESSION_SECRET: string;
      CLIENT_URL: string;
      PORT: string;
    }
  }
}

export {}
