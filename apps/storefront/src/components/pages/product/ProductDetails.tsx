import Rating from "@/components/shared/product/Rating";
import { Stack, VStack, HStack, Heading, Box } from "@chakra-ui/react";
import { Product, ProductImage } from "@/generated/graphql";
import Carousel from "./Carousel";
import ImageGrid from "./ImageGrid";
import AddToCartForm from "./AddToCartForm";

interface ProductDetailsProps {
	product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => (
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

export default ProductDetails;

const imageMapper = (image: ProductImage) => ({
	id: `product-image-${image.id}`,
	src: image.imageURL,
});
