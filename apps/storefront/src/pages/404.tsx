import {
	Button,
	Heading,
	Image,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { UnderlineLink } from "ui";

const PageNotFound = () => (
	<SimpleGrid placeItems="center" minH="100vh">
		<Stack
			p={8}
			gap={{ base: 8, lg: 48 }}
			alignItems="center"
			justifyContent="space-between"
			my={{ base: 8, lg: 16 }}
			direction={["column", "row"]}
		>
			<VStack alignItems="flex-start" gap={6}>
				<VStack alignItems="flex-start" gap={2}>
					<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
						404: Page Not Found.
					</Heading>
				</VStack>
				<VStack alignItems="flex-start">
					<Heading fontSize="lg" lineHeight={1}>
						The page may have been moved, or you&apos;re just lost.
					</Heading>
				</VStack>

				<Button as={Link} href="/">
					Go Home
				</Button>
				<Text w="full" fontSize="lg">
					Have a Problem? Contact our{" "}
					<UnderlineLink href="/account/helpcenter">
						Customer Support{" "}
					</UnderlineLink>
				</Text>
			</VStack>
			<Image
				h="60vh"
				maxW={{ base: "80vw", lg: "30vw" }}
				src="/assets/delete-confirmation.svg"
			/>
		</Stack>
	</SimpleGrid>
);

export default PageNotFound;
