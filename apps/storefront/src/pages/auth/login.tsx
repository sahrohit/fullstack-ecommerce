import LoginForm, { UnderlineLink } from "@/components/auth/LoginForm";
import { Logo } from "@/components/logo";
import { Image } from "@chakra-ui/next-js";
import {
	Badge,
	Box,
	Flex,
	Heading,
	HStack,
	Img,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";

const LoginPage = () => {
	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			overflow="hidden"
			minH="100vh"
			height="100%"
			bg={mode("gray.50", "inherit")}
		>
			<Box
				overflowY="auto"
				flex="1"
				py={{ base: "10", md: "16" }}
				px={{ base: "6", md: "10" }}
			>
				<Box maxW="sm" mx="auto">
					<Logo
						mb={{ base: "14", md: "32" }}
						w="auto"
						h="12"
						mx="auto"
						iconColor="green.600"
					/>
					<Box textAlign="center" mb={{ base: "10", md: "16" }}>
						<Heading
							as="h1"
							size="md"
							fontWeight="extrabold"
							whiteSpace={{ base: "normal", md: "nowrap" }}
						>
							Sign in to your account
						</Heading>
						<Text
							mt="3"
							color={mode("gray.600", "gray.400")}
							fontWeight="medium"
						>
							Need an account?{" "}
							<UnderlineLink href="/auth/register">
								Sign up for free
							</UnderlineLink>
						</Text>
					</Box>
					<LoginForm />
				</Box>
			</Box>

			<Box
				display={{ base: "none", lg: "block" }}
				maxH="100vh"
				overflow="hidden"
				flex="1"
				bg="blue.600"
				color="white"
				px="20"
				pt="28"
			>
				<Badge
					bg="blue.700"
					px="4"
					py="1"
					rounded="md"
					letterSpacing="wide"
					color="whiteAlpha.900"
				>
					Order for you and your loved ones 💖
				</Badge>
				<Text
					mt="6"
					fontWeight="extrabold"
					fontSize={{ base: "2xl", lg: "3xl" }}
					maxW="sm"
					letterSpacing="tight"
					lineHeight="normal"
				>
					One parcel a day, keeps sadness away
				</Text>
				{/* <Text mt="5" maxW="md" fontSize="lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididun.
				</Text> */}

				<Box mt="10" position="relative">
					<Img
						// width={20}
						// height={20}
						// layout=""
						width={"90%"}
						placeholder="blur"
						alt="App screenshot"
						src="/assets/e-commerce.svg"
					/>
				</Box>
			</Box>
		</Flex>
	);
};

export default LoginPage;
