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
import { PriceTag } from "./PriceTag";
import UnderlineLink from "@/components/ui/UnderlineLink";

type CartItemProps = {
	isGiftWrapping?: boolean;
	name: string;
	description: string;
	quantity: number;
	price: number;
	currency: string;
	imageUrl: string;
	salePrice?: number;
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
};

export const DrawerCartItem = (props: CartItemProps) => {
	const {
		isGiftWrapping,
		name,
		description,
		quantity,
		imageUrl,
		currency,
		price,
		salePrice,
		onChangeQuantity,
		onClickDelete,
	} = props;

	return (
		<Flex direction={"column"} justify="space-between" align="flex-start">
			<HStack
				justifyContent={"space-between"}
				alignItems={"flex-start"}
				w="full"
			>
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
										fontWeight={"semibold"}
										color="red.500"
									>
										Delete
									</UnderlineLink>

									<QuantitySelect
										value={quantity}
										onChange={(e) => {
											onChangeQuantity?.(+e.currentTarget.value);
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
