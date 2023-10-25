import {
	Box,
	Flex,
	HStack,
	Stack,
	Image,
	useColorModeValue as mode,
	Text,
	useToast,
} from "@chakra-ui/react";
import {
	Cart,
	useDeleteFromCartMutation,
	useUpdateCartMutation,
} from "generated-graphql";
import { UnderlineButton, capitalize, PriceTag, QuantitySelect } from "ui";

type CartItemProps = {
	cartItem: Cart;
};

const DrawerCartItem = ({ cartItem }: CartItemProps) => {
	const { quantity, inventory } = cartItem;

	const toast = useToast();
	const [updateCartMutation] = useUpdateCartMutation({
		refetchQueries: ["FetchCartItems"],
	});

	const [deleteFromCartMutation] = useDeleteFromCartMutation({
		refetchQueries: ["FetchCartItems"],
	});

	const description =
		inventory?.variants
			?.map((variant) => capitalize(variant.variant_value.value as string))
			.sort()
			.join(", ") ?? "";

	const image = inventory?.product?.images.find(
		(singleImage) => singleImage.sequence === 0
	)?.imageURL;

	const handleQuanityChange = async (value: string | number) => {
		if (value === quantity) return;
		await updateCartMutation({
			variables: {
				inventoryId: Number(inventory!.inventory_id),
				quantity: Number(value),
			},
		});
	};

	return (
		<Flex direction="column" justify="space-between" align="flex-start">
			<HStack justifyContent="space-between" alignItems="flex-start" w="full">
				<Box flexGrow={1}>
					<Stack direction="row" spacing="5" width="full">
						<Stack direction="row" spacing="5" width="full">
							<Image
								rounded="lg"
								width="120px"
								height="120px"
								fit="cover"
								src={image ?? "htts://via.placeholder.com/150"}
								alt={inventory!.product!.name}
								draggable="false"
								loading="lazy"
							/>
							<Box pt="2" flexGrow={1}>
								<Flex align="center" width="full" justify="space-between">
									<Stack spacing="0.5">
										<Text fontWeight="medium">{inventory!.product!.name}</Text>
										<Text color={mode("gray.600", "gray.400")} fontSize="sm">
											{description}
										</Text>
									</Stack>
									<PriceTag
										// salePrice={salePrice}
										price={inventory!.price}
										currency="NPR"
									/>
								</Flex>
								<Flex
									mt="4"
									align="center"
									width="full"
									justify="space-between"
								>
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
									</UnderlineButton>

									<QuantitySelect
										maxW="160px"
										defaultValue={quantity}
										value={quantity}
										onChange={handleQuanityChange}
									/>
								</Flex>
							</Box>
						</Stack>
					</Stack>
				</Box>
			</HStack>
		</Flex>
	);
};

export default DrawerCartItem;
