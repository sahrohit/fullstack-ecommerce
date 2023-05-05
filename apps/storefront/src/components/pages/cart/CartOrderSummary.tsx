import { formatPrice } from "@/components/shared/product/PriceTag";
import { Cart } from "@/generated/graphql";
import {
	Button,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";

type OrderSummaryItemProps = {
	label: string;
	value?: string;
	children?: React.ReactNode;
};

export const OrderSummaryItem = (props: OrderSummaryItemProps) => {
	const { label, value, children } = props;
	return (
		<Flex justify="space-between" fontSize="sm">
			<Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
				{label}
			</Text>
			{value ? <Text fontWeight="medium">{value}</Text> : children}
		</Flex>
	);
};

OrderSummaryItem.defaultProps = {
	value: undefined,
	children: undefined,
};

interface CartOrderSummaryProps {
	data: Cart[];
}

export const CartOrderSummary = ({ data }: CartOrderSummaryProps) => {
	const subTotal = useMemo(
		() =>
			data.reduce(
				(acc, item) => acc + item.quantity * (item.inventory?.price ?? 0),
				0
			),
		[data]
	);

	return (
		<Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
			<Heading size="md">Order Summary</Heading>

			<Stack spacing="6">
				<OrderSummaryItem label="Subtotal" value={formatPrice(subTotal)} />
				<OrderSummaryItem label="Shipping + Tax">
					<Link href="/" textDecor="underline">
						Calculate shipping
					</Link>
				</OrderSummaryItem>
				<OrderSummaryItem label="Coupon Code">
					<Link href="/" textDecor="underline">
						Add coupon code
					</Link>
				</OrderSummaryItem>
				<Flex justify="space-between">
					<Text fontSize="lg" fontWeight="semibold">
						Total
					</Text>
					<Text fontSize="xl" fontWeight="extrabold">
						{formatPrice(subTotal)}
					</Text>
				</Flex>
			</Stack>
			<Button
				isDisabled={!data.length}
				colorScheme="blue"
				size="lg"
				fontSize="md"
				rightIcon={<FaArrowRight />}
			>
				Checkout
			</Button>
		</Stack>
	);
};
