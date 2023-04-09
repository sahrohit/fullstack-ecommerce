import { Flex, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { Link } from "@chakra-ui/next-js";
import ThemeSwitch from "@/components/shared/ThemeSwitch";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/navbar";
import DrawerCart from "@/components/pages/cart/DrawerCart";

const HomePage = () => {
	return (
		<>
			<Head>
				<title>Ecommerce App</title>
			</Head>
			<main>
				<Navbar />
				<Grid placeContent={"center"}>
					<DrawerCart />
					<Heading>Home Page</Heading>
					<Flex
						direction={"column"}
						textAlign={"center"}
						gap={4}
						my={8}
						fontSize={20}
					>
						<ThemeSwitch />
						<Link href="/auth/login">Login Page</Link>
						<Link href="/auth/register">Register Page</Link>
						<Link href="/auth/forgot-password">Forgot Password Page</Link>
						<Link href="/auth/verify-email">Verify Email</Link>
					</Flex>
				</Grid>
			</main>
			<Footer />
		</>
	);
};

export default HomePage;
