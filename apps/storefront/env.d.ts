declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_API_URL: string;
			KHALTI_SECRET_KEY: string;
		}
	}
}

export {};
