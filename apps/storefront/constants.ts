export const PROD = process.env.NODE_ENV === "production";

export const BRAND_NAME = "Ecommerce Storefront";
export const COLOR = "Ecommerce Storefront";

export const APP_URL = !PROD
	? "http://localhost:3000"
	: "https://hamropasal.vercel.app";
