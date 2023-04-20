import { Stack, Button, Box } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const SignInWithGoogle = () => (
	<Stack spacing="4">
		<Button leftIcon={<Box as={FcGoogle} color="red.500" />}>
			Sign up with Google
		</Button>
	</Stack>
);

export default SignInWithGoogle;
