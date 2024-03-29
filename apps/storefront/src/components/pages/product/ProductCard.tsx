import {
	AspectRatio,
	Box,
	ButtonGroup,
	HStack,
	Skeleton,
	SlideFade,
	Stack,
	StackProps,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "generated-graphql";
import { PriceTag } from "ui";
import Rating from "@/components/shared/product/Rating";
import FavouriteButton from "./FavouriteButton";
import QuickView from "./details/QuickView";

interface ProductCardProps {
	product: Product;
	rootProps?: StackProps;
}

const ProductCard = (props: ProductCardProps) => {
	const [isHovering, setIsHovering] = useState(false);
	const optionsBackgroundColor = useColorModeValue("white", "gray.800");
	const isMobile = useBreakpointValue({ base: true, md: false });

	const { product, rootProps } = props;
	const { name, images: unsortedImages, inventories } = product;

	const images = [...unsortedImages]?.sort((a, b) => a.sequence - b.sequence);
	return (
		<Stack
			spacing={{ base: "4", md: "5" }}
			{...rootProps}
			onMouseEnter={() => {
				setIsHovering(true);
			}}
			onMouseLeave={() => {
				setTimeout(() => {
					setIsHovering(false);
				}, 300);
			}}
		>
			<Box position="relative">
				<AspectRatio
					ratio={4 / 5}
					as={Link}
					href={`/products/${product.identifier}`}
				>
					<Image
						src={images?.[0]?.imageURL ?? "https://picsum.photos/200/300"}
						alt={name}
						draggable="false"
						width={400}
						height={500}
					/>
				</AspectRatio>
				<FavouriteButton
					productId={product.id}
					position="absolute"
					top="4"
					right="4"
					aria-label={`Add ${name} to your favourites`}
				/>
				{(isHovering || !isMobile) && (
					<ButtonGroup
						as={SlideFade}
						in={isHovering || isMobile}
						offsetY="20px"
						bg={optionsBackgroundColor}
						p={2}
						rounded="md"
						spacing="6"
						position="absolute"
						bottom="4"
						right="4"
						aria-label={`Add ${name} to your favourites`}
					>
						<QuickView product={product} />
					</ButtonGroup>
				)}
			</Box>
			<Stack>
				<Stack spacing="1">
					<Text
						fontWeight="medium"
						color={useColorModeValue("gray.700", "gray.400")}
					>
						{name}
					</Text>
					<PriceTag
						price={inventories?.[0]?.price || 0}
						// salePrice={salePrice}
						currency="NPR"
					/>
				</Stack>
				{/*
				// ? Rating on the product page is maybe un-necessary
				 <HStack>
					<Rating defaultValue={2} size="sm" />
					<Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
						12 Reviews
					</Text>
				</HStack> */}
			</Stack>
		</Stack>
	);
};

ProductCard.defaultProps = {
	rootProps: {},
};

export default ProductCard;

export const ProductCardSkeleton = () => (
	<Stack spacing={{ base: "4", md: "5" }}>
		<Box position="relative">
			<AspectRatio ratio={4 / 5}>
				<Skeleton />
			</AspectRatio>
		</Box>
		<Stack>
			<Stack gap="1">
				<Skeleton height="20px" w="70%" />
				<Skeleton height="20px" w="30%" />
			</Stack>
			<HStack>
				<Rating size="sm" />
				<Skeleton w="30%">
					<Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
						12 Reviews
					</Text>
				</Skeleton>
			</HStack>
		</Stack>
	</Stack>
);
