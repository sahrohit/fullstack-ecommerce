import {
	Box,
	Flex,
	Heading,
	Img,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";

import { DividerWithText, UnderlineLink } from "ui";
import Logo from "@/components/logo";
import RegisterForm from "@/components/auth/RegisterForm";
import SignInWithGoogle from "@/components/auth/AuthProvider";
import withAuthPages from "@/routes/withAuthPages";
import { BRAND_NAME } from "@/constants";

const RegisterPage = () => (
	<Box minH="100vh" bg={{ md: mode("gray.100", "inherit") }}>
		<Box maxW="6xl" mx="auto" px={{ base: "4", md: "10" }}>
			<SimpleGrid alignItems="center" columns={{ base: 1, lg: 2 }} spacing="14">
				<Box w="full" maxW="xl" mx="auto">
					<Box
						rounded={{ md: "xl" }}
						p={{ base: "4", md: "12" }}
						borderWidth={{ md: "1px" }}
						borderColor={mode("gray.200", "transparent")}
					>
						<Stack
							justifyContent={{ base: "center", sm: "space-between" }}
							alignItems={{ base: "center", sm: "flex-start" }}
							direction={{
								base: "column-reverse",
								sm: "row",
							}}
						>
							<Box mb="8" textAlign={{ base: "center", md: "start" }}>
								<Heading size="lg" mb="2" fontWeight="extrabold">
									Welcome,
								</Heading>
								<Text
									fontSize="lg"
									color={mode("gray.600", "gray.400")}
									fontWeight="medium"
								>
									Enter your details to get started
								</Text>
							</Box>
							<Logo
								h={{ base: 12, md: 6 }}
								// mb={{ base: "16", md: "10" }}
								iconColor="primary.600"
								mx={{ base: "auto", md: "unset" }}
							/>
						</Stack>
						<SignInWithGoogle />

						<DividerWithText>or</DividerWithText>
						<RegisterForm />
						<Text
							display={{ base: "block", lg: "none" }}
							mt="8"
							align="center"
							fontWeight="medium"
						>
							Already have an account?{" "}
							<UnderlineLink href="/auth/login">
								Log in with {BRAND_NAME}
							</UnderlineLink>
						</Text>
					</Box>
				</Box>

				<Flex direction="column" py="24" display={{ base: "none", lg: "flex" }}>
					<Img
						width="90%"
						placeholder="blur"
						alt="App screenshot"
						src="/assets/sign-up.svg"
					/>
					<Text mt="8" align="center" fontWeight="medium">
						Already have an account?{" "}
						<UnderlineLink href="/auth/login">
							Log in with {BRAND_NAME}
						</UnderlineLink>
					</Text>
				</Flex>
			</SimpleGrid>
		</Box>
	</Box>
);

export default withAuthPages(RegisterPage);
