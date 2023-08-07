import QuantitySelect from "@/components/shared/cart/QuantitySelect";
import { ColorSelector } from "@/components/shared/product/ColorSelector";
import { PriceTag } from "@/components/shared/product/PriceTag";
import { VariantSelector } from "@/components/shared/product/VariantSelector";
import {
	Product,
	useAddToCartMutation,
	useAddToFavouriteMutation,
	useFavouritesQuery,
	useRemoveFromFavouriteMutation,
} from "@/generated/graphql";
import { validVariants, allVariants, selectorsToKeys } from "@/utils/mappers";
import {
	useToast,
	useColorModeValue,
	SimpleGrid,
	Button,
	Text,
	Icon,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiHeart } from "react-icons/fi";

interface AddToCartFormProps {
	product: Product;
}

const removePrice = (obj: Record<string, string | number | null>) => {
	const { price, inventoryId, ...rest } = obj;
	return rest;
};

const AddToCartForm = ({ product }: AddToCartFormProps) => {
	const { validCombinations, allCombinations, keys } = useMemo(
		() => ({
			// ? The ! operator is used because this Add to Cart is conditionally
			// ? rendered only when product.inventories is present
			validCombinations: validVariants(product.inventories!),
			allCombinations: allVariants(product.inventories!),
			keys: selectorsToKeys(allVariants(product.inventories!)),
		}),
		[product.inventories]
	);

	const defaultVariant = useMemo(
		() =>
			validCombinations.find(
				(obj1) =>
					obj1.price ===
					Math.min(
						...(product.inventories?.map((inv) => Number(inv.price)) || [])
					)
			) ?? validCombinations[0],
		[product.inventories, validCombinations]
	);

	const toast = useToast();
	const [addToCartMutation] = useAddToCartMutation({
		refetchQueries: ["FetchCartItems"],
	});

	const [selectedVariant, setSelectedVariant] =
		useState<typeof keys>(defaultVariant);
	const [quantity, setQuantity] = useState(1);

	const result = useMemo(
		() =>
			validCombinations &&
			validCombinations.find((obj1) =>
				Object.entries(removePrice(selectedVariant)).every(
					([key, value]) => obj1[key] === value
				)
			),
		[selectedVariant, validCombinations]
	);

	const handleAddToCart = async () => {
		const response = await addToCartMutation({
			variables: {
				quantity,
				inventoryId: Number(result?.inventoryId),
			},
		});
		if (response.data?.addToCart) {
			toast({
				title: "Added to cart",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
		}
	};

	return (
		<>
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
					currency="NPR"
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
							value={(selectedVariant.color as string) ?? ""}
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
						value={
							(selectedVariant[
								key as keyof typeof selectedVariant
							] as string) ?? ""
						}
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
				<FavouriteButton productId={product.id} />
			</SimpleGrid>
			<Button
				colorScheme="blue"
				w="full"
				isDisabled={!result}
				onClick={handleAddToCart}
			>
				Add to Cart
			</Button>
		</>
	);
};

export default AddToCartForm;

const FavouriteButton = ({ productId }: { productId: number }) => {
	const toast = useToast();
	const { data, loading, error } = useFavouritesQuery();
	const [addToFavouriteMutation] = useAddToFavouriteMutation({
		refetchQueries: ["Favourites"],
	});
	const [removeFromFavouriteMutation] = useRemoveFromFavouriteMutation({
		refetchQueries: ["Favourites"],
	});
	if (loading || error) return null;

	const isFavourite = data?.favourites
		?.map((fav) => fav.productId)
		.includes(productId);

	return (
		<Button
			size="lg"
			variant="outline"
			justifyContent="center"
			leftIcon={
				<Icon
					transform={
						isFavourite ? "scale(1.1) rotate(360deg)" : "scale(1) rotate(0deg)"
					}
					fontSize="lg"
					as={FiHeart}
					transition="all 0.4s ease"
					color={isFavourite ? "red.500" : "gray.500"}
					fill={isFavourite ? "red" : "none"}
				/>
			}
			onClick={() => {
				if (isFavourite) {
					removeFromFavouriteMutation({
						variables: {
							productId,
						},
					});
					toast({
						title: "Removed from favourites",
						status: "success",
						duration: 2000,
						isClosable: true,
					});
					return;
				}
				addToFavouriteMutation({
					variables: {
						productId,
					},
				});
				toast({
					title: "Added to favourites",
					status: "success",
					duration: 2000,
					isClosable: true,
				});
			}}
		>
			{isFavourite ? "Unfavourite" : "Favourite"}
		</Button>
	);
};
