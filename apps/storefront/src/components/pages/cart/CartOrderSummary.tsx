import {
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { Cart } from "@/generated/graphql";
import { formatPrice } from "@/components/shared/product/PriceTag";

type OrderSummaryBillItemProps = {
	label: string;
	value?: string;
	children?: React.ReactNode;
};

export const OrderSummaryBillItem = (props: OrderSummaryBillItemProps) => {
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

OrderSummaryBillItem.defaultProps = {
	value: undefined,
	children: undefined,
};

interface CartOrderSummaryProps {
	data: Cart[];
}

export const CartOrderSummary = ({ data }: CartOrderSummaryProps) => {
	const router = useRouter();
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
				<OrderSummaryBillItem label="Subtotal" value={formatPrice(subTotal)} />
				<OrderSummaryBillItem label="Shipping + Tax">
					<Text textDecor="underline">Calculated on checkout</Text>
				</OrderSummaryBillItem>
				<OrderSummaryBillItem label="Coupon Code">
					<Text textDecor="underline">Calculated on checkout</Text>
				</OrderSummaryBillItem>
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
				// as={Link}
				// href={data.length ? "/cart/checkout" : ""}
				isDisabled={!data.length}
				colorScheme="blue"
				size="lg"
				fontSize="md"
				rightIcon={<FaArrowRight />}
				onClick={() => router.push("/cart/checkout")}
			>
				Checkout
			</Button>
		</Stack>
	);
};
