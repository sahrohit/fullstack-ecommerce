import Carousel from "@/components/pages/product/Carousel";
import ImageGrid from "@/components/pages/product/ImageGrid";
import QuantitySelect from "@/components/shared/cart/QuantitySelect";
import { ColorSelector } from "@/components/shared/product/ColorSelector";
import { PriceTag } from "@/components/shared/product/PriceTag";
import Rating from "@/components/shared/product/Rating";
import { SizeSelector } from "@/components/shared/product/SizeSelector";
import { images } from "@/data/mock/temp";
import {
	Box,
	Button,
	HStack,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsHeart } from "react-icons/bs";

const ProductPage = () => {
	const router = useRouter();

	const { id } = router.query;

	return (
		<Stack w="full" direction={{ base: "column-reverse", lg: "row" }}>
			<VStack
				gap={2}
				flexGrow={1}
				alignItems="flex-start"
				m={{ base: 2, md: 8, lg: 16 }}
			>
				<HStack>
					<Rating defaultValue={2} /> <span>12 reviews</span>
				</HStack>
				<Heading fontSize="3xl" lineHeight={1.2}>
					Classis Black {id}
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
					With a sleek design and a captivating essence, this is a modern
					Classic made for every occasion.v Classic made for every occasion.v
					Classic made for every occasion.v Classic made for every occasion.v
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
			<Box
				maxW={{ base: "100%", lg: "50%" }}
				p={{ base: 4, md: 8, lg: 8, xl: 16 }}
			>
				{images.length > 3 ? (
					<Carousel images={images} />
				) : (
					<ImageGrid images={images} />
				)}
			</Box>
		</Stack>
	);
};

export default ProductPage;
