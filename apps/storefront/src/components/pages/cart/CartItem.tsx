import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Select,
	SelectProps,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { CartProductMeta } from "./CartProductMeta";
import UnderlineLink from "@/components/ui/UnderlineLink";
import { PriceTag } from "@/components/shared/product/PriceTag";

type CartItemProps = {
	isGiftWrapping?: boolean;
	name: string;
	description: string;
	quantity: number;
	price: number;
	currency: string;
	imageUrl: string;
	onChangeQuantity?: (quantity: number) => void;
	onClickGiftWrapping?: () => void;
	onClickDelete?: () => void;
};

const QuantitySelect = (props: SelectProps) => {
	return (
		<FormControl w={""} as={HStack} justifyContent={"center"}>
			<FormLabel fontWeight={"semibold"} fontSize={16}>
				Qty
			</FormLabel>
			<Select
				size="sm"
				borderRadius={4}
				maxW="64px"
				aria-label="Select quantity"
				focusBorderColor={useColorModeValue("blue.500", "blue.200")}
				{...props}
			>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
			</Select>
		</FormControl>
	);
};

const CartOptions = () => {
	return (
		<Box>
			<UnderlineLink
				href="/"
				fontSize="sm"
				fontWeight={"semibold"}
				color="red.500"
			>
				Delete
			</UnderlineLink>{" "}
			|{" "}
			<UnderlineLink href="/" fontSize="sm" fontWeight={"semibold"}>
				Save for Later
			</UnderlineLink>
		</Box>
	);
};

export const CartItem = (props: CartItemProps) => {
	const {
		isGiftWrapping,
		name,
		description,
		quantity,
		imageUrl,
		currency,
		price,
		onChangeQuantity,
		onClickDelete,
	} = props;

	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			justify="space-between"
			align="flex-start"
		>
			<HStack
				justifyContent={"space-between"}
				alignItems={"flex-start"}
				w="full"
			>
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
				<QuantitySelect
					value={quantity}
					onChange={(e) => {
						onChangeQuantity?.(+e.currentTarget.value);
					}}
				/>
				<VStack alignItems={"flex-end"} justifyContent={"flex-start"}>
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

				<QuantitySelect
					value={quantity}
					onChange={(e) => {
						onChangeQuantity?.(+e.currentTarget.value);
					}}
				/>
			</Flex>
		</Flex>
	);
};
