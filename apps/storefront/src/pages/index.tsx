import { Flex, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { Link } from "@chakra-ui/next-js";

const HomePage = () => {
	return (
		<>
			<Head>
				<title>Ecommerce App</title>
			</Head>
			<main>
				<Grid placeContent={"center"} h={"100vh"}>
					<Heading>Home Page</Heading>
					<Flex
						direction={"column"}
						textAlign={"center"}
						gap={4}
						my={8}
						fontSize={20}
					>
						<Link href="/auth/login">Login Page</Link>
						<Link href="/auth/register">Register Page</Link>
						<Link href="/auth/forgot-password">Forgot Password Page</Link>
						<Link href="/auth/verify-email">Verify Email</Link>
					</Flex>
				</Grid>
			</main>
		</>
	);
};

export default HomePage;
