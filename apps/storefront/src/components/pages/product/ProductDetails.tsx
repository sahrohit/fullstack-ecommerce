import { Product, ProductImage } from "generated-graphql";
import { Box, HStack, Heading, Stack, VStack } from "@chakra-ui/react";
import Rating from "@/components/shared/product/Rating";
import AddToCartForm from "./AddToCartForm";
import Carousel from "./Carousel";
import ImageGrid from "./ImageGrid";

interface ProductDetailsProps {
	product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
	const images = [...product.images]?.sort((a, b) => a.sequence - b.sequence);

	return (
		<Stack w="full" direction={{ base: "column-reverse", lg: "row" }} gap={8}>
			<VStack gap={2} alignItems="flex-start">
				<HStack>
					<Rating defaultValue={2} /> <span>12 reviews</span>
				</HStack>
				<Heading fontSize="3xl" lineHeight={1.2}>
					{product.name}
				</Heading>

				{product.inventories && <AddToCartForm product={product} />}
			</VStack>
			<Box
				maxW={
					images && images.length <= 3 ? { base: "100%", lg: "50%" } : "100%"
				}
			>
				{images[0] && images.length > 3 ? (
					<Carousel images={images.map(imageMapper)} />
				) : (
					<ImageGrid images={images.map(imageMapper)} />
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
