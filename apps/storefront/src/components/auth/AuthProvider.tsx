import { Stack, Button, Box } from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export const SignInWithGoogle = () => {
	return (
		<Stack spacing="4">
			<Button
				variant="outline"
				leftIcon={<Box as={FcGoogle} color="red.500" />}
			>
				Sign up with Google
			</Button>
		</Stack>
	);
};
