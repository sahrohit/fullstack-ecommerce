import UserProfile from "@/components/shared/sidebar/UserProfile";
import withProtected from "@/routes/withProtected";
import { Button, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const HomePage = () => {
	const router = useRouter();

	return (
		<SimpleGrid height="100vh" width="100%" placeItems="center">
			<Heading>Welcome Admin!</Heading>
			<Button
				colorScheme="primary"
				onClick={() => {
					router.push("/dashboard");
				}}
			>
				Go to Dashboard
			</Button>
			<VStack>
				<HStack gap={4}>
					<Button
						colorScheme="secondary"
						onClick={() => {
							router.push("/auth/login");
						}}
					>
						Login
					</Button>

					<Button
						colorScheme="secondary"
						onClick={() => {
							router.push("/auth/register");
						}}
					>
						Register
					</Button>
				</HStack>
				<UserProfile />
			</VStack>
		</SimpleGrid>
	);
};

export default withProtected(HomePage);
