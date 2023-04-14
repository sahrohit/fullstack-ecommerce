import QuantitySelect from "@/components/shared/cart/QuantitySelect";
import { ColorSelector } from "@/components/shared/product/ColorSelector";
import { PriceTag } from "@/components/shared/product/PriceTag";
import Rating from "@/components/shared/product/Rating";
import { SizeSelector } from "@/components/shared/product/SizeSelector";
import { images } from "@/data/mock/temp";
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
import Carousel from "./Carousel";
import ImageGrid from "./ImageGrid";

const ProductDetails = () => (
	<Stack w="full" direction={{ base: "column-reverse", lg: "row" }} gap={8}>
		<VStack gap={2} alignItems="flex-start">
			<HStack>
				<Rating defaultValue={2} /> <span>12 reviews</span>
			</HStack>
			<Heading fontSize="3xl" lineHeight={1.2}>
				Classis Black
			</Heading>
			<PriceTag
				priceProps={{
					fontSize: "xl",
				}}
				salePriceProps={{
					fontSize: "xl",
				}}
				salePrice={299}
				price={399}
				currency="USD"
			/>
			<Text
				color={useColorModeValue("gray.600", "gray.400")}
				textAlign="justify"
				fontSize="md"
			>
				With a sleek design and a captivating essence, this is a modern Classic
				made for every occasion.v Classic made for every occasion.v Classic made
				for every occasion.v Classic made for every occasion.v
			</Text>
			<SimpleGrid w="full" gap={8} columns={2}>
				<ColorSelector />
				<SizeSelector />
				<QuantitySelect defaultValue={1} />

				<Button size="lg" variant="outline" leftIcon={<BsHeart />}>
					Favourite
				</Button>
			</SimpleGrid>
			<Button colorScheme="blue" w="full">
				Add to Cart
			</Button>
		</VStack>
		<Box maxW={images.length <= 3 ? { base: "100%", lg: "50%" } : "100%"}>
			{images.length > 3 ? (
				<Carousel images={images} />
			) : (
				<ImageGrid images={images} />
			)}
		</Box>
	</Stack>
);

export default ProductDetails;
