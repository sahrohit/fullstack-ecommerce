import { GOOGLE_OAUTH_REDIRECT_URL } from "../constants";

interface GoogleTokenResult {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	id_token: string;
}

export const getGoogleOAuthToken = async ({
	code,
}: {
	code: string;
}): Promise<GoogleTokenResult> => {
	const url = "https://oauth2.googleapis.com/token";
	const values = new URLSearchParams({
		code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
		grant_type: "authorization_code",
	});
	try {
		const res = await fetch(url, {
			method: "POST",
			body: values,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		return res.json();
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
};
