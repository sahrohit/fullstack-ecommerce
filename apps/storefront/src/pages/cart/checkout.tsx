import { Stack, Button, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CheckoutPage = () => {
	const router = useRouter();
	return (
		<Stack w="full" direction={["column", "row", "row", "row"]}>
			<Box flexGrow={1}>
				<Text>Checkout</Text>
			</Box>
			<Box w="1/3">
				<Button onClick={() => router.push("/cart")}>Go to cart</Button>
			</Box>
		</Stack>
	);
};

export default CheckoutPage;
