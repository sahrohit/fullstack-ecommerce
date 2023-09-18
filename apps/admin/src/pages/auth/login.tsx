import {
	Box,
	Flex,
	HStack,
	Heading,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";
import SignInWithGoogle from "@/components/auth/AuthProvider";
import LoginForm from "@/components/auth/LoginForm";
import withAuthPages from "@/routes/withAuthPages";
import Logo from "@/components/logo";
import DividerWithText from "@/components/ui/DividerWithText";

const LoginPage = () => (
	<Flex minH="100vh" direction={{ base: "column", md: "row" }}>
		<Box
			display={{ base: "none", md: "block" }}
			maxW={{ base: "20rem", lg: "40rem" }}
			flex="1"
			bg="primary.600"
			color="white"
			px="10"
			py="8"
		>
			<Box>
				<Logo w="auto" h="7" />
			</Box>
			<Flex
				direction="column"
				align="center"
				justify="center"
				h="full"
				textAlign="center"
				mt="-10"
			>
				<Box>
					<Text
						maxW="md"
						mx="auto"
						fontWeight="extrabold"
						fontSize={{ base: "4xl", lg: "5xl" }}
						letterSpacing="tight"
						lineHeight="normal"
					>
						Create your brand and Build your business with us
					</Text>
					<Text mt="5" maxW="sm" mx="auto">
						Solving your business problem one at a time.
					</Text>
				</Box>
				<HStack
					justify="center"
					as="a"
					href="#"
					minW="2xs"
					py="3"
					fontWeight="semibold"
					px="2"
					mt="5"
					border="2px solid white"
					rounded="lg"
					_hover={{ bg: "whiteAlpha.200" }}
				>
					<Box>What we Offer?</Box>
					<HiOutlineExternalLink />
				</HStack>
			</Flex>
		</Box>
		<Box
			flex="1"
			px={{ base: "6", md: "10", lg: "16", xl: "28" }}
			py={{ base: "4", md: "8" }}
			bg={{ md: mode("gray.50", "gray.800") }}
		>
			<Box maxW="xl">
				<Box>
					<Box display={{ md: "none" }} mb="16">
						<Logo w="auto" h="7" iconColor="primary.400" />
					</Box>
					<Heading
						color={mode("primary.600", "primary.400")}
						as="h1"
						size="xl"
						fontWeight="extrabold"
						letterSpacing="tight"
					>
						Welcome back
					</Heading>
					<Text
						mt="3"
						fontSize={{ base: "xl", md: "3xl" }}
						fontWeight="bold"
						color={mode("gray.500", "inherit")}
					>
						Sign in to continue
					</Text>
				</Box>

				<Box
					minW={{ md: "420px" }}
					mt="10"
					rounded="xl"
					bg={{ md: mode("white", "gray.700") }}
					shadow={{ md: "lg" }}
					px={{ md: "10" }}
					pt={{ base: "8", md: "12" }}
					pb="8"
				>
					<LoginForm />
					<DividerWithText>Or</DividerWithText>
					<SignInWithGoogle />
				</Box>
			</Box>
		</Box>
	</Flex>
	// <Flex
	// 	direction={{ base: "column", md: "row" }}
	// 	overflow="hidden"
	// 	minH="100vh"
	// 	height="100%"
	// 	bg={mode("gray.50", "inherit")}
	// >
	// 	<Box
	// 		overflowY="auto"
	// 		flex="1"
	// 		py={{ base: "10", md: "16" }}
	// 		px={{ base: "6", md: "10" }}
	// 	>
	// 		<Box maxW="sm" mx="auto">
	// 			<Logo
	// 				mb={{ base: "14", md: "14" }}
	// 				w="auto"
	// 				h="12"
	// 				iconColor="primary.600"
	// 			/>
	// 			<Box textAlign="center" mb={{ base: "10", md: "16" }}>
	// 				<Heading
	// 					as="h1"
	// 					size="md"
	// 					fontWeight="extrabold"
	// 					whiteSpace={{ base: "normal", md: "nowrap" }}
	// 				>
	// 					Sign in to your account
	// 				</Heading>

	// 				<Text mt="3" color={mode("gray.600", "gray.400")} fontWeight="medium">
	// 					Need an account?{" "}
	// 					<UnderlineLink href="/auth/register">
	// 						Sign up for free
	// 					</UnderlineLink>
	// 				</Text>
	// 			</Box>
	// 			<LoginForm />
	// 			<Box my="6">
	// 				<SignInWithGoogle />
	// 			</Box>
	// 		</Box>
	// 	</Box>

	// 	<Box
	// 		display={{ base: "none", lg: "block" }}
	// 		maxH="100vh"
	// 		overflow="hidden"
	// 		flex="1"
	// 		bg={"primary.600" ?? "primary.600"}
	// 		color="white"
	// 		px="20"
	// 		pt="28"
	// 	>
	// 		<Badge
	// 			bg={"primary.700" ?? "primary.700"}
	// 			px="4"
	// 			py="1"
	// 			rounded="md"
	// 			letterSpacing="wide"
	// 			color="whiteAlpha.900"
	// 		>
	// 			Order for you and your loved ones 💖
	// 		</Badge>
	// 		<Text
	// 			mt="6"
	// 			fontWeight="extrabold"
	// 			fontSize={{ base: "2xl", lg: "3xl" }}
	// 			maxW="sm"
	// 			letterSpacing="tight"
	// 			lineHeight="normal"
	// 		>
	// 			One parcel a day, keeps sadness away
	// 		</Text>

	// 		<Box mt="10" position="relative">
	// 			<Img
	// 				width="90%"
	// 				placeholder="blur"
	// 				alt="App screenshot"
	// 				src="/assets/e-commerce.svg"
	// 			/>
	// 		</Box>
	// 	</Box>
	// </Flex>
);

export default withAuthPages(LoginPage);
