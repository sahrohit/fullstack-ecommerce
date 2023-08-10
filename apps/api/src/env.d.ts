declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ALLOWED_ORIGINS: string;
			DATABASE_URL: string;
			REDIS_URL: string;
			SESSION_SECRET: string;
			PORT: string;
			CLIENT_URL: string;
			KHALTI_SECRET_KEY: string;
			RESEND_HOST: string;
			RESENT_PORT: string;
			RESEND_AUTH_USER: string;
			RESEND_AUTH_PASS: string;
		}
	}
}

export {};
