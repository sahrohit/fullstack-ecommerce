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
import { validVariants, allVariants, selectorsToKeys } from "@/utils/mappers";
import Carousel from "./Carousel";
import ImageGrid from "./ImageGrid";

interface ProductDetailsProps {
	product: Product;
}

const removePrice = (obj: Record<string, string | number | null>) => {
	const { price, inventoryId, ...rest } = obj;
	return rest;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const { validCombinations, allCombinations, keys } = useMemo(
		() => ({
			validCombinations: validVariants(product.inventories),
			allCombinations: allVariants(product.inventories),
			keys: selectorsToKeys(allVariants(product.inventories)),
		}),
		[product.inventories]
	);

	const defaultVariant = useMemo(
		() =>
			validCombinations.find(
				(obj1) =>
					obj1.price ===
					Math.min(...product.inventories.map((inv) => Number(inv.price)))
			) ?? validCombinations[0],
		[product.inventories, validCombinations]
	);

	const [selectedVariant, setSelectedVariant] =
		useState<typeof keys>(defaultVariant);
	const [quantity, setQuantity] = useState(1);

	const result = useMemo(
		() =>
			validCombinations.find((obj1) =>
				Object.entries(removePrice(selectedVariant)).every(
					([key, value]) => obj1[key] === value
				)
			),
		[selectedVariant, validCombinations]
	);

	const handleAddToCart = () => {
		console.log("Add to cart", {
			quantity,
			...result,
		});
	};

	return (
		<Stack w="full" direction={{ base: "column-reverse", lg: "row" }} gap={8}>
			<VStack gap={2} alignItems="flex-start">
				<HStack>
					<Rating defaultValue={2} /> <span>12 reviews</span>
				</HStack>
				<Heading fontSize="3xl" lineHeight={1.2}>
					{product.name}
				</Heading>

				{/* When the user has touched the form but the result is not found */}
				{!result && (
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
				{result && (
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
				{Object.keys(allCombinations).map((key) => {
					if (key === "color") {
						return (
							<ColorSelector
								key={`selector-${key}`}
								options={allCombinations.color}
								defaultValue={defaultVariant[key] as string}
								onChange={(value) =>
									setSelectedVariant((last) => ({ ...last, color: value }))
								}
							/>
						);
					}
					return (
						<VariantSelector
							options={allCombinations[key]}
							defaultValue={defaultVariant[key]}
							variantName={key && key[0].toUpperCase() + key.slice(1)}
							key={`selector-${key}`}
							onChange={(value) =>
								setSelectedVariant((last) => ({ ...last, [`${key}`]: value }))
							}
						/>
					);
				})}
				<SimpleGrid w="full" gap={8} columns={2}>
					<QuantitySelect
						defaultValue={1}
						onChange={(value) => setQuantity(Number(value))}
					/>

					<Button size="lg" variant="outline" leftIcon={<BsHeart />}>
						Favourite
					</Button>
				</SimpleGrid>
				<Button
					colorScheme="blue"
					w="full"
					isDisabled={!result}
					onClick={handleAddToCart}
				>
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
