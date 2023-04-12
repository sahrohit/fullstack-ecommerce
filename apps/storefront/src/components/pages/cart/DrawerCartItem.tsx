import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Select,
	SelectProps,
	Stack,
	Image,
	useColorModeValue as mode,
	Text,
} from "@chakra-ui/react";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { PriceTag } from "@/components/shared/product/PriceTag";

type CartItemProps = {
	name: string;
	description: string;
	quantity: number;
	price: number;
	currency: string;
	imageUrl: string;
	salePrice?: number;
};

const QuantitySelect = (props: SelectProps) => (
	<FormControl w="" as={HStack} justifyContent="center">
		<FormLabel fontWeight="semibold" fontSize={16}>
			Qty
		</FormLabel>
		<Select
			size="sm"
			borderRadius={4}
			maxW="64px"
			aria-label="Select quantity"
			focusBorderColor={mode("blue.500", "blue.200")}
			{...props}
		>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
		</Select>
	</FormControl>
);

const DrawerCartItem = (props: CartItemProps) => {
	const { name, description, quantity, imageUrl, currency, price, salePrice } =
		props;

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
								src={imageUrl}
								alt={name}
								draggable="false"
								loading="lazy"
							/>
							<Box pt="2" flexGrow={1}>
								<Flex align="center" width="full" justify="space-between">
									<Stack spacing="0.5">
										<Text fontWeight="medium">{name}</Text>
										<Text color={mode("gray.600", "gray.400")} fontSize="sm">
											{description}
										</Text>
									</Stack>
									<PriceTag
										salePrice={salePrice}
										price={price}
										currency={currency}
									/>
								</Flex>
								<Flex
									mt="4"
									align="center"
									width="full"
									justify="space-between"
								>
									<UnderlineLink
										href="/"
										fontSize="sm"
										fontWeight="semibold"
										color="red.500"
									>
										Delete
									</UnderlineLink>

									<QuantitySelect
										value={quantity}
										onChange={() => {
											// TODO: Update the quantity in the cart
											// ? Quantity Select can be replaced with Number Input
											// onChangeQuantity?.(+e.currentTarget.value
										}}
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

DrawerCartItem.defaultProps = {
	salePrice: undefined,
};

export default DrawerCartItem;
