import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	Button,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import CART_DATA from "@/data/cart";
import { FaArrowRight } from "react-icons/fa";
import CartItem from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";

const Cart = () => (
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
					Shopping Cart ({CART_DATA.length} items)
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
					{CART_DATA.map((item) => (
						<CartItem key={item.id} {...item} />
					))}
				</Stack>
			</Stack>

			<Flex
				direction="column"
				align="center"
				flex="1"
				position="sticky"
				top={{ base: "6", md: "8", lg: "12" }}
			>
				<CartOrderSummary />
				<HStack mt="6" fontWeight="semibold">
					<p>or</p>
					<Link href="/" color={mode("blue.500", "blue.200")}>
						Continue shopping
					</Link>
				</HStack>
			</Flex>
		</Stack>
	</Box>
);

export default Cart;
