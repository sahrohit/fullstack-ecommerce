/* eslint-disable import/no-cycle */
import Result from "@/components/shared/Result";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { Cart, useFetchCartItemsQuery } from "@/generated/graphql";
import { CheckoutForm } from "@/pages/cart/checkout";
import { capitalize } from "@/utils/helpers";
import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormHelperText,
	HStack,
	Heading,
	Image,
	Input,
	InputGroup,
	Stack,
	Text,
	VStack,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { UseFormWatch } from "react-hook-form";

interface OrderSummaryProps {
	setFormPromoCode: (promoCode: string) => void;
	watch: UseFormWatch<CheckoutForm>;
}

const OrderSummary = ({ watch, setFormPromoCode }: OrderSummaryProps) => {
	const { data, loading, error } = useFetchCartItemsQuery();
	const [promoCode, setPromoCode] = useState("");

	const subTotal = useMemo(
		() =>
			data?.fetchCartItems?.reduce(
				(accumulator, item) =>
					accumulator + item.quantity * item!.inventory!.price,
				0
			) ?? 0,
		[data?.fetchCartItems]
	);

	const shippingPrice = watch("shippingMethod") === "standard" ? 150 : 300;

	if (loading) {
		return <p>Loading...</p>;
	}

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
		<VStack my={8} gap={4} w="full">
			<Heading fontSize="xl" fontWeight="bold" lineHeight="1.2" my={4} w="full">
				Order Summary
			</Heading>
			<Stack spacing="4" width="full" p={4} divider={<Divider />}>
				{data?.fetchCartItems?.map((item) => (
					<OrderSummaryItem key={item.id} cartItem={item as Cart} />
				))}
			</Stack>
			<VStack w="full" my={4}>
				<HStack w="full" alignItems="flex-start">
					<FormControl>
						<InputGroup>
							<Input
								type="text"
								placeholder="Promo Code"
								size="lg"
								value={promoCode}
								onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
							/>
						</InputGroup>
						<FormHelperText>We&apos;ll never share your email.</FormHelperText>
					</FormControl>
					<Button
						size="lg"
						onClick={() => {
							setFormPromoCode(promoCode);
						}}
					>
						Apply
					</Button>
				</HStack>
			</VStack>

			<VStack w="full" px={8} gap={2} py={4}>
				<HStack justify="space-between" w="full" fontSize="lg">
					<Text color={mode("gray.600", "gray.400")}>Sub Total</Text>
					<PriceTag price={subTotal} currency="NPR" />
				</HStack>
				<HStack justify="space-between" w="full" fontSize="lg">
					<Text color={mode("gray.600", "gray.400")}>Shipping Cost</Text>
					{watch("shippingMethod") ? (
						<HStack>
							<Text>+</Text>
							<PriceTag price={shippingPrice} currency="NPR" />
						</HStack>
					) : (
						<Text fontSize="sm" textDecoration="underline">
							Select Shipping Method
						</Text>
					)}
				</HStack>
				<HStack justify="space-between" w="full" fontSize="lg">
					<Text color={mode("gray.600", "gray.400")}>Discount</Text>
					{watch("promoCode") ? (
						<HStack>
							<Text>-</Text>
							<PriceTag price={shippingPrice} currency="NPR" />
						</HStack>
					) : (
						<Text fontSize="sm" textDecoration="underline">
							Enter Promo Code
						</Text>
					)}
				</HStack>
				<Divider />

				<HStack
					justify="space-between"
					w="full"
					fontWeight="bold"
					fontSize="xl"
				>
					<Text color={mode("gray.500", "gray.300")}>Order Total</Text>
					<PriceTag price={subTotal + shippingPrice} currency="NPR" />
				</HStack>
				<Button size="xl" w="full" colorScheme="blue" type="submit">
					Place Order
				</Button>
			</VStack>
		</VStack>
	);
};

export default OrderSummary;

type OrderSummaryItemProps = {
	cartItem: Cart;
};

const OrderSummaryItem = ({ cartItem }: OrderSummaryItemProps) => {
	const { quantity, inventory } = cartItem;

	const description =
		inventory?.variants
			?.map((variant) => capitalize(variant.variant_value.value as string))
			.sort()
			.join(", ") ?? "";
	return (
		<HStack justifyContent="space-between" alignItems="flex-start" w="full">
			<Box flexGrow={1}>
				<Stack direction="row" spacing="5" width="full">
					<Stack direction="row" spacing="5" width="full">
						<Image
							rounded="lg"
							width="100px"
							height="100px"
							fit="cover"
							src={inventory!.product!.images[2].imageURL}
							alt={inventory!.product!.name}
							draggable="false"
							loading="lazy"
						/>
						<VStack pt="2" flexGrow={1} justifyContent="space-around">
							<Flex
								align="center"
								width="full"
								justify="space-between"
								alignItems="flex-start"
								gap={4}
							>
								<Stack spacing="0.5" flexGrow={1}>
									<Text fontWeight="medium" whiteSpace="pre-wrap">
										{inventory!.product!.name}
									</Text>
									<Text color={mode("gray.600", "gray.400")} fontSize="sm">
										{description}
									</Text>
								</Stack>
								<VStack alignItems="flex-end">
									<PriceTag price={inventory!.price} currency="NPR" />
									<Text fontWeight="medium">✕ {quantity}</Text>
									<Divider />
								</VStack>
							</Flex>
							<HStack w="full" justifyContent="flex-end">
								<PriceTag
									price={quantity * inventory!.price}
									currency="NPR"
									priceProps={{
										fontSize: "lg",
									}}
								/>
							</HStack>
						</VStack>
					</Stack>
				</Stack>
			</Box>
		</HStack>
	);
};
