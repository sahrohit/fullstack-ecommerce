import {
	Box,
	Flex,
	HStack,
	Heading,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";

import { HiOutlineExternalLink } from "react-icons/hi";
import Logo from "@/components/logo";
import RegisterForm from "@/components/auth/RegisterForm";
import withAuthPages from "@/routes/withAuthPages";
import UnderlineLink from "@/components/ui/UnderlineLink";

const RegisterPage = () => (
	<Flex minH="100vh" direction={{ base: "column", md: "row" }}>
		<Box
			display={{ base: "none", md: "block" }}
			maxW={{ base: "20rem", lg: "40rem" }}
			flex="1"
			bg="primary.600"
			color="white"
			px="10"
			py="8"
			position="sticky"
			top={0}
			h="100vh"
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
			px={{ base: "6", md: "10", lg: "16", xl: "20" }}
			py={{ base: "4", md: "8" }}
			bg={{ md: mode("gray.50", "gray.800") }}
		>
			<Box maxW="3xl">
				<Heading
					color={mode("primary.600", "primary.400")}
					as="h1"
					size="lg"
					fontWeight="extrabold"
					letterSpacing="tight"
				>
					Create your own store
				</Heading>
				<Text fontSize="lg" my={2}>
					Already own a store?{" "}
					<UnderlineLink href="/auth/login">Login</UnderlineLink>
				</Text>
				<Box
					minW={{ md: "420px" }}
					mt="10"
					rounded="xl"
					bg={{ md: mode("white", "gray.700") }}
					shadow={{ md: "lg" }}
				>
					<RegisterForm />
				</Box>
			</Box>
		</Box>
	</Flex>
);

export default withAuthPages(RegisterPage);
