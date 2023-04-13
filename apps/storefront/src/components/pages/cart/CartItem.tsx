import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { PriceTag } from "@/components/shared/product/PriceTag";
import QuantitySelect from "@/components/shared/cart/QuantitySelect";
import { CartProductMeta } from "./CartProductMeta";

type CartItemProps = {
	isGiftWrapping?: boolean;
	name: string;
	description: string;
	quantity: number;
	price: number;
	currency: string;
	imageUrl: string;
};

const CartOptions = () => (
	<Box>
		<UnderlineLink href="/" fontSize="sm" fontWeight="semibold" color="red.500">
			Delete
		</UnderlineLink>{" "}
		|{" "}
		<UnderlineLink href="/" fontSize="sm" fontWeight="semibold">
			Save for Later
		</UnderlineLink>
	</Box>
);

const CartItem = (props: CartItemProps) => {
	const {
		isGiftWrapping,
		name,
		description,
		quantity,
		imageUrl,
		currency,
		price,
	} = props;

	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			align="flex-start"
		>
			<HStack justifyContent="space-between" alignItems="flex-start" w="full">
				<Box flexGrow={1}>
					<CartProductMeta
						name={name}
						description={description}
						image={imageUrl}
						isGiftWrapping={isGiftWrapping}
					/>
				</Box>
				<Box display={{ base: "flex", md: "none" }}>
					<PriceTag price={price} currency={currency} />
				</Box>
			</HStack>

			{/* Desktop */}
			<Flex
				width="full"
				justify="space-between"
				display={{ base: "none", md: "flex" }}
			>
				<QuantitySelect defaultValue={quantity} />
				<VStack alignItems="flex-end" justifyContent="flex-start">
					<PriceTag price={price} currency={currency} />
					<CartOptions />
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
				<CartOptions />

				<QuantitySelect defaultValue={quantity} />
			</Flex>
		</Flex>
	);
};

CartItem.defaultProps = {
	isGiftWrapping: false,
};

export default CartItem;
