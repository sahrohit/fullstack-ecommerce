import {
	AspectRatio,
	Box,
	ButtonGroup,
	HStack,
	IconButton,
	Image,
	Skeleton,
	SlideFade,
	Stack,
	StackProps,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import { Product } from "@/data/mock/temp";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { PriceTag } from "@/components/shared/product/PriceTag";
import Rating from "@/components/shared/product/Rating";
import FavouriteButton from "./FavouriteButton";

interface ProductCardProps {
	product: Product;
	rootProps?: StackProps;
}

const ProductCard = (props: ProductCardProps) => {
	const [isHovering, setIsHovering] = useState(false);
	const optionsBackgroundColor = useColorModeValue("white", "gray.800");
	const isMobile = useBreakpointValue({ base: true, md: false });

	const { product, rootProps } = props;
	const { name, imageUrl, price, salePrice, rating } = product;
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
				<AspectRatio ratio={4 / 5}>
					<Image
						src={imageUrl}
						alt={name}
						draggable="false"
						fallback={<Skeleton />}
						borderRadius={{ base: "md", md: "xl" }}
					/>
				</AspectRatio>
				<FavouriteButton
					position="absolute"
					top="4"
					right="4"
					aria-label={`Add ${name} to your favourites`}
				/>
				{(isHovering || isMobile) && (
					<ButtonGroup
						as={SlideFade}
						in={isHovering || isMobile}
						offsetY="20px"
						bg={optionsBackgroundColor}
						p={2}
						rounded="md"
						variant="outline"
						spacing="6"
						position="absolute"
						bottom="4"
						right="0"
						left="0"
						mx={3}
						aria-label={`Add ${name} to your favourites`}
					>
						<IconButton
							size="sm"
							flexGrow={1}
							variant="ghost"
							colorScheme="blue"
							aria-label="Search database"
							icon={<AiOutlineShoppingCart size={24} />}
						/>
						<IconButton
							size="sm"
							flexGrow={1}
							variant="ghost"
							colorScheme="blue"
							aria-label="Search database"
							icon={<AiOutlineEye size={24} />}
						/>
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
					<PriceTag price={price} salePrice={salePrice} currency="USD" />
				</Stack>
				<HStack>
					<Rating defaultValue={rating} size="sm" />
					<Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
						12 Reviews
					</Text>
				</HStack>
			</Stack>
		</Stack>
	);
};

ProductCard.defaultProps = {
	rootProps: {},
};

export default ProductCard;
