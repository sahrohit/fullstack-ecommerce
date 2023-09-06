import {
	Box,
	Flex,
	HStack,
	Skeleton,
	Stack,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import {
	Cart,
	useDeleteFromCartMutation,
	useUpdateCartMutation,
} from "@/generated/graphql";
import { UnderlineButton } from "@/components/ui/UnderlineLink";
import { PriceTag } from "@/components/shared/product/PriceTag";
import QuantitySelect from "@/components/shared/cart/QuantitySelect";
import { capitalize } from "@/utils/helpers";
import { CartProductMeta } from "./CartProductMeta";

type CartItemProps = {
	cartItem: Cart;
};

const CartItem = ({ cartItem }: CartItemProps) => {
	const toast = useToast();
	const [updateCartMutation] = useUpdateCartMutation({
		refetchQueries: ["FetchCartItems"],
	});
	const { quantity, inventory } = cartItem;

	const description =
		inventory?.variants
			?.map((variant) => capitalize(variant.variant_value.value as string))
			.sort()
			.join(", ") ?? "";

	const image = inventory?.product?.images.find(
		(singleImage) => singleImage.sequence === 0
	)?.imageURL;

	const handleQuanityChange = async (value: string | number) => {
		if (Number(value) === Number(quantity)) return;
		const res = await updateCartMutation({
			variables: {
				inventoryId: Number(inventory!.inventory_id),
				quantity: Number(value),
			},
		});
		if (res.data?.updateCart) {
			toast({
				title: "Cart updated",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			align="flex-start"
			gap={2}
		>
			<HStack justifyContent="space-between" alignItems="flex-start" w="full">
				<Box flexGrow={1}>
					<CartProductMeta
						name={inventory!.product!.name}
						description={description}
						image={image ?? "https://via.placeholder.com/150"}
						isGiftWrapping
					/>
				</Box>
				<Box display={{ base: "flex", md: "none" }}>
					<PriceTag price={inventory!.price} currency="NPR" />
				</Box>
			</HStack>

			{/* Desktop */}
			<Flex
				width="full"
				justify="space-between"
				display={{ base: "none", md: "flex" }}
				gap={2}
			>
				<QuantitySelect
					defaultValue={quantity}
					value={quantity}
					onChange={handleQuanityChange}
					maxW="180px"
				/>
				<VStack alignItems="flex-end" justifyContent="flex-start">
					<PriceTag price={inventory!.price} currency="NPR" />
					<CartOptions inventory={inventory} quantity={quantity} />
				</VStack>
			</Flex>

			{/* Mobile */}
			<Flex
				mt="4"
				align="center"
				width="full"
				justify="space-between"
				display={{ base: "flex", md: "none" }}
			>
				<CartOptions inventory={inventory} quantity={quantity} />

				<QuantitySelect
					onChange={handleQuanityChange}
					value={quantity}
					defaultValue={quantity}
					maxW="180px"
				/>
			</Flex>
		</Flex>
	);
};

export default CartItem;

const CartOptions = ({
	inventory,
	quantity,
}: {
	inventory: Cart["inventory"];
	quantity: Cart["quantity"];
}) => {
	const toast = useToast();
	const [deleteFromCartMutation] = useDeleteFromCartMutation({
		refetchQueries: ["FetchCartItems"],
	});
	return (
		<Box>
			<UnderlineButton
				color="red.500"
				onClick={async () => {
					const res = await deleteFromCartMutation({
						variables: {
							inventoryId: Number(inventory!.inventory_id),
							quantity: Number(quantity),
						},
					});
					if (res.data?.deleteFromCart) {
						toast({
							title: "Item removed from cart",
							status: "success",
							duration: 2000,
							isClosable: true,
						});
					}
				}}
			>
				Delete
			</UnderlineButton>{" "}
			| <UnderlineButton>Save for Later</UnderlineButton>
		</Box>
	);
};

export const CartItemSkeleton = () => (
	<Flex
		direction={{ base: "column", md: "row" }}
		justify="space-between"
		align="flex-start"
		gap={2}
	>
		<HStack justifyContent="space-between" alignItems="flex-start" w="full">
			<Box flexGrow={1}>
				<Box flexGrow={1}>
					<Stack direction="row" spacing="5" width="full">
						<Stack direction="row" spacing="5" width="full">
							<Skeleton rounded="lg" width="120px" height="120px" />
							<Box pt="2">
								<Stack spacing="0.5">
									<Skeleton>
										<Text fontWeight="medium">Lorem ipsum, dolor sit</Text>
									</Skeleton>
									<Skeleton>
										<Text fontSize="sm">S, Red</Text>
									</Skeleton>
								</Stack>
							</Box>
						</Stack>
					</Stack>
				</Box>
			</Box>
			<Box display={{ base: "flex", md: "none" }}>
				{/* <PriceTag price={inventory!.price} currency="NPR" /> */}
				<Skeleton>
					<Text>Price goes here</Text>
				</Skeleton>
				<Skeleton>
					<Text>Price goes here</Text>
				</Skeleton>
			</Box>
		</HStack>

		{/* Desktop */}
		<Flex
			width="full"
			justify="space-between"
			display={{ base: "none", md: "flex" }}
			gap={2}
		>
			{/* <QuantitySelect
					defaultValue={quantity}
					value={quantity}
					onChange={handleQuanityChange}
					maxW="180px"
				/> */}
			<Box>
				<Skeleton>
					<Text fontSize="2xl" lineHeight="20px">
						Quantity goes here
					</Text>
				</Skeleton>
			</Box>
			<VStack alignItems="flex-end" justifyContent="flex-start" gap={4}>
				<Skeleton>
					<Text>Price goes here</Text>
				</Skeleton>
				<HStack>
					<Skeleton>
						<Text fontSize="xs">Price goes here</Text>
					</Skeleton>{" "}
					|{" "}
					<Skeleton>
						<Text fontSize="xs">Price goes here</Text>
					</Skeleton>
				</HStack>
				{/* <CartOptions inventory={inventory} quantity={quantity} /> */}
			</VStack>
		</Flex>

		{/* Mobile */}
		<Flex
			mt="4"
			align="center"
			width="full"
			justify="space-between"
			display={{ base: "flex", md: "none" }}
		>
			{/* <CartOptions inventory={inventory} quantity={quantity} /> */}

			{/* <QuantitySelect
					onChange={handleQuanityChange}
					value={quantity}
					defaultValue={quantity}
					maxW="180px"
				/> */}
		</Flex>
	</Flex>
);
