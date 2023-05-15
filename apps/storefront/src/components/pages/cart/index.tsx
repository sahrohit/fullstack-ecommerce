/* eslint-disable no-nested-ternary */
import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	Button,
	useColorModeValue as mode,
	Img,
	VStack,
	Text,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Cart as ICart, useFetchCartItemsQuery } from "@/generated/graphql";
import Result from "@/components/shared/Result";
import PageLoader from "@/components/shared/PageLoader";
import CartItem, { CartItemSkeleton } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";

const Cart = () => {
	const { data, loading, error } = useFetchCartItemsQuery();

	const linkColor = mode("blue.500", "blue.200");

	if (loading) return <PageLoader />;

	if (error)
		return (
			<Result
				heading={error.name}
				text={error.message}
				type="error"
				dump={error.stack}
			/>
		);

	return (
		<Box
			maxW={{ base: "4xl", lg: "7xl" }}
			mx="auto"
			w="full"
			px={{ base: "4", md: "8", lg: "12" }}
			py={{ base: "6", md: "8", lg: "12" }}
		>
			<Stack
				direction={{ base: "column", lg: "row" }}
				align={{ lg: "flex-start" }}
				spacing={{ base: "8", md: "16" }}
			>
				<Stack spacing={{ base: "8", md: "10" }} flex="2">
					<Heading fontSize="2xl" fontWeight="bold">
						Shopping Cart ({data?.fetchCartItems?.length ?? 0} items)
					</Heading>

					<Button
						display={{ base: "block", lg: "none" }}
						colorScheme="blue"
						size="lg"
						fontSize="md"
						rightIcon={<FaArrowRight />}
					>
						Checkout
					</Button>

					<Stack spacing="10">
						{loading ? (
							Array(3)
								.fill("cart")
								.map((cart, index) => (
									<CartItemSkeleton key={`${cart}-${index + 1}`} />
								))
						) : !data?.fetchCartItems?.length ? (
							<VStack py={8} gap={4}>
								<Box textAlign="center">
									<Heading as="h3" fontSize="2xl" lineHeight="1">
										Nothing in Cart
									</Heading>
									<Text>Treat yourself, and add something here now.</Text>
								</Box>
								<Img
									width="50%"
									placeholder="blur"
									alt="App screenshot"
									src="/assets/empty-list.svg"
								/>
							</VStack>
						) : (
							data?.fetchCartItems?.map((item) => (
								<CartItem key={item.id} cartItem={item as ICart} />
							))
						)}
					</Stack>
				</Stack>

				<Flex
					direction="column"
					align="center"
					flex="1"
					position="sticky"
					top={{ base: "6", md: "8", lg: "12" }}
				>
					<CartOrderSummary data={data?.fetchCartItems as ICart[]} />
					<HStack mt="6" fontWeight="semibold">
						<p>or</p>
						<Link href="/" color={linkColor}>
							Continue shopping
						</Link>
					</HStack>
				</Flex>
			</Stack>
		</Box>
	);
};

export default Cart;
