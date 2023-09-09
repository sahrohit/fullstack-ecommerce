export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGOT_PASSWORD_PREFIX = "forgot-password:";
export const VERIFY_EMAIL_PREFIX = "verify-email:";
export const USER_VALIDATION_PREFIX = "validate-user:";
export const COMPANY = {
	name: "Hamropasal",
	logo: `https://hamropasal.vercel.app/logo.png`,
	address: "Tikathali, Mahalaxmi",
	zip: "44708",
	city: "Kathmandu",
	country: "Nepal",
};
export const GOOGLE_OAUTH_REDIRECT_URL = `${process.env.API_URL}/auth/google/callback`;
export const ESEWA_MERCHANT_CODE = "EPAYTEST";
