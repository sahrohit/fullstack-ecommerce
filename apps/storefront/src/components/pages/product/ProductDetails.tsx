import QuantitySelect from "@/components/shared/cart/QuantitySelect";
import { ColorSelector } from "@/components/shared/product/ColorSelector";
import { PriceTag } from "@/components/shared/product/PriceTag";
import Rating from "@/components/shared/product/Rating";
import { VariantSelector } from "@/components/shared/product/VariantSelector";
import {
	Stack,
	VStack,
	HStack,
	Heading,
	useColorModeValue,
	SimpleGrid,
	Button,
	Text,
	Box,
} from "@chakra-ui/react";
import { BsHeart } from "react-icons/bs";
import { Product, ProductImage } from "@/generated/graphql";
import { useMemo, useState } from "react";
import allVariants from "@/utils/allVariants";
import Carousel from "./Carousel";
import ImageGrid from "./ImageGrid";

interface ProductDetailsProps {
	product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const validCombinations = useMemo(
		() =>
			product.inventories.map((inventory) => {
				const values: Record<string, string | number> = {};
				values.price = inventory.price;
				inventory.variants?.forEach((variant) => {
					values[`${variant.variant_value.variant.variant_name}`] =
						variant.variant_value.value;
				});
				return values;
			}),
		[product.inventories]
	);

	const selectors = useMemo(
		() => allVariants(product.inventories),
		[product.inventories]
	);

	const keys: Record<string, string | number | null> = {};

	Object.keys(selectors).forEach((key: string) => {
		keys[key] = null;
	});

	const [selectedVariant, setSelectedVariant] = useState<typeof keys>({
		...keys,
	});

	const [isDirty, setIsDirty] = useState(false);

	const result = validCombinations.find((obj1) =>
		Object.entries(selectedVariant).every(([key, value]) => obj1[key] === value)
	);

	if (result !== undefined && !isDirty) {
		setIsDirty(true);
	}

	return (
		<Stack w="full" direction={{ base: "column-reverse", lg: "row" }} gap={8}>
			<VStack gap={2} alignItems="flex-start">
				<HStack>
					<Rating defaultValue={2} /> <span>12 reviews</span>
				</HStack>
				<Heading fontSize="3xl" lineHeight={1.2}>
					{product.name}
				</Heading>

				{/* At the start when the user havem't touched the form */}
				{!isDirty && (
					<HStack>
						<Text textAlign="justify" fontSize="xl" fontWeight="medium">
							Starting from
						</Text>
						<PriceTag
							priceProps={{
								fontSize: "xl",
							}}
							price={Math.min(
								...product.inventories.map((inv) => Number(inv.price))
							)}
							currency="USD"
						/>
					</HStack>
				)}

				{/* When the user has touched the form but the result is not found */}
				{!result && isDirty && (
					<Text
						textAlign="justify"
						fontSize="xl"
						fontWeight="medium"
						color="red.400"
					>
						Not Available
					</Text>
				)}

				{/* When the user has touched the form but the result is found */}
				{result && isDirty && (
					<PriceTag
						priceProps={{
							fontSize: "xl",
						}}
						salePriceProps={{
							fontSize: "xl",
						}}
						// salePrice={299}
						price={Number(result.price)}
						currency="USD"
					/>
				)}
				<Text
					color={useColorModeValue("gray.600", "gray.400")}
					textAlign="justify"
					fontSize="md"
				>
					{product.desc}
				</Text>
				{Object.keys(selectors).map((key) => {
					if (key === "color") {
						return (
							<ColorSelector
								options={selectors.color}
								onChange={(value) =>
									setSelectedVariant((last) => ({ ...last, color: value }))
								}
							/>
						);
					}
					return (
						<VariantSelector
							options={selectors[key]}
							variantName={key && key[0].toUpperCase() + key.slice(1)}
							key={key}
							onChange={(value) =>
								setSelectedVariant((last) => ({ ...last, [`${key}`]: value }))
							}
						/>
					);
				})}
				<SimpleGrid w="full" gap={8} columns={2}>
					<QuantitySelect
						defaultValue={1}
						onChange={
							(value) => console.log(value)
							// setSelectedVariant((last) => ({
							// 	...last,
							// 	quantity: Number(value),
							// }))
						}
					/>

					<Button size="lg" variant="outline" leftIcon={<BsHeart />}>
						Favourite
					</Button>
				</SimpleGrid>
				<Button colorScheme="blue" w="full">
					Add to Cart
				</Button>
			</VStack>
			<Box
				maxW={
					product.images && product.images.length <= 3
						? { base: "100%", lg: "50%" }
						: "100%"
				}
			>
				{product.images[0] && product.images.length > 3 ? (
					<Carousel images={product.images.map(imageMapper)} />
				) : (
					<ImageGrid images={product.images.map(imageMapper)} />
				)}
			</Box>
		</Stack>
	);
};

export default ProductDetails;

const imageMapper = (image: ProductImage) => ({
	id: `product-image-${image.id}`,
	src: image.imageURL,
});
