export const PROD = process.env.NODE_ENV === "production";

export const BRAND_NAME = "Hamropasal";
export const COLOR = "Ecommerce Storefront";

export const APP_URL = !PROD
	? "http://localhost:3000"
	: "https://www.rudejellyfish.live";

export const GOOGLE_OAUTH_REDIRECT_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback`;
