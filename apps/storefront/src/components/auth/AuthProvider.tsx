import { Stack, Button, Box } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { GOOGLE_OAUTH_REDIRECT_URL } from "../../../constants";

const SignInWithGoogle = () => (
	<Stack spacing="4" as="a" href={getGoogleOAuthUrl()}>
		<Button leftIcon={<Box as={FcGoogle} />}>Continue with Google</Button>
	</Stack>
);

export default SignInWithGoogle;

export const getGoogleOAuthUrl = () => {
	const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

	const qs = new URLSearchParams({
		redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
		client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		].join(" "),
	});

	return `${rootUrl}?${qs.toString()}`;
};
