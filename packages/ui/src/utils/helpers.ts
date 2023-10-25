export const capitalize = (s: string) =>
	s[0].toUpperCase() + s.slice(1).toLowerCase();

export function parseJwt(token: string) {
	if (token.length === 0) {
		return null;
	}

	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
			.join("")
	);

	return JSON.parse(jsonPayload);
}
