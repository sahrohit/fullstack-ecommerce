import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import HeadingGroup from "@/components/pages/account/HeadingGroup";
import Result from "@/components/shared/Result";
import Navbar from "@/components/shared/navbar";
import { PriceTag } from "@/components/shared/product/PriceTag";
import Rating from "@/components/shared/product/Rating";
import {
	Favourite,
	useFavouritesWithProductQuery,
	useRemoveFromFavouriteMutation,
} from "@/generated/graphql";
import {
	AspectRatio,
	Box,
	HStack,
	Link,
	Skeleton,
	Image,
	Text,
	Stack,
	useColorModeValue,
	VStack,
	Button,
	SimpleGrid,
	SkeletonText,
} from "@chakra-ui/react";
import dayjs from "dayjs";

const FavouritePage = () => {
	const { data, loading, error } = useFavouritesWithProductQuery();

	if (error) {
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	return (
		<>
			<Navbar />
			<Box
				maxW="7xl"
				mx="auto"
				px={{ base: "4", md: "8", lg: "12" }}
				py={{ base: "6", md: "8", lg: "12" }}
			>
				<HeadingGroup
					py={4}
					textAlign="center"
					title="Favourites"
					description="Your favourite products"
				/>
				<SimpleGrid
					columns={[1, 1, 1, 1, 1]}
					columnGap={{ base: "4", md: "6" }}
					rowGap={{ base: "8", md: "10" }}
				>
					{loading
						? Array(4)
								.fill("product-skeleton")
								.map((mock, index) => (
									<FavouriteProductCardSkeleton key={`${mock}-${index + 1}`} />
								))
						: data?.favouritesWithProduct?.map((favourite) => (
								<FavouriteProductCard
									key={favourite.id}
									favourite={favourite as Favourite}
								/>
						  ))}
				</SimpleGrid>
			</Box>
		</>
	);
};

export default FavouritePage;

const FavouriteProductCard = ({ favourite }: { favourite: Favourite }) => {
	const [removeFromFavouriteMutation, { loading }] =
		useRemoveFromFavouriteMutation({
			refetchQueries: ["FavouritesWithProduct"],
		});
	const {
		name,
		images: unsortedImages,
		inventories,
		identifier,
		desc,
	} = favourite.product;

	const images = [...unsortedImages]?.sort((a, b) => a.sequence - b.sequence);

	return (
		<Stack
			justifyContent="space-between"
			w="full"
			direction={{ base: "column", md: "row" }}
		>
			<Stack w="full" gap={4} direction={{ base: "column", md: "row" }}>
				<AspectRatio
					ratio={6 / 5}
					as={Link}
					href={`/products/${identifier}`}
					w={{ base: "full", md: "180px" }}
				>
					<Image
						src={images?.[0]?.imageURL ?? "https://picsum.photos/200/300"}
						alt={name}
						draggable="false"
						fallback={<Skeleton />}
						borderRadius={{ base: "md", md: "xl" }}
					/>
				</AspectRatio>
				<Stack
					alignSelf="flex-start"
					justifyContent="space-between"
					w="full"
					direction={{ base: "row", md: "column" }}
				>
					<VStack spacing="1" alignItems="flex-start" alignSelf="flex-start">
						<Text
							fontWeight="medium"
							fontSize="xl"
							color={useColorModeValue("gray.700", "gray.400")}
						>
							{name}
						</Text>
						<Text>
							Starting from{" "}
							<PriceTag
								price={inventories?.[0]?.price || 0}
								// salePrice={salePrice}
								currency="USD"
								rootProps={{
									display: "inline-flex",
								}}
							/>
						</Text>
					</VStack>
					<Stack
						alignSelf="flex-start"
						direction={{ base: "column", md: "row" }}
					>
						<Rating defaultValue={2} size="sm" />
						<Text
							fontSize="sm"
							color={useColorModeValue("gray.600", "gray.400")}
						>
							12 Reviews
						</Text>
					</Stack>
					<Box display={{ base: "none", lg: "block" }}>
						<Text maxW="lg" noOfLines={2}>
							{desc}
						</Text>
					</Box>
				</Stack>
			</Stack>
			<VStack justifyContent="space-around" h="100%">
				<Text>
					Item added on{" "}
					{dayjs(Number(favourite.created_at)).format("DD MMMM YYYY")}
				</Text>
				<VStack gap={2} w={{ base: "full", md: "unset" }}>
					<Button
						as={Link}
						w="full"
						href={`/products/${identifier}`}
						_hover={{
							textDecoration: "none",
						}}
					>
						View Product
					</Button>
					<HStack w="full">
						<ConfirmationModal
							flexGrow={1}
							variant="outline"
							isLoading={loading}
							headerText="Remove from Favourites"
							bodyText={`Are you sure you want to remove ${favourite.product.name} from your favourites?`}
							onSuccess={() => {
								removeFromFavouriteMutation({
									variables: {
										productId: favourite.productId,
									},
								});
							}}
						>
							Remove
						</ConfirmationModal>
						<Button flexGrow={1} variant="outline">
							Add to Cart
						</Button>
					</HStack>
				</VStack>
			</VStack>
		</Stack>
	);
};

const FavouriteProductCardSkeleton = () => (
	<Stack
		justifyContent="space-between"
		w="full"
		direction={{ base: "column", md: "row" }}
	>
		<Stack w="full" gap={4} direction={{ base: "column", md: "row" }}>
			<AspectRatio ratio={6 / 5} w={{ base: "full", md: "180px" }}>
				<Skeleton>Hello</Skeleton>
			</AspectRatio>
			<Stack
				alignSelf="flex-start"
				justifyContent="space-between"
				w="full"
				direction={{ base: "row", md: "column" }}
			>
				<VStack spacing="1" alignItems="flex-start" alignSelf="flex-start">
					<Skeleton>Product Name </Skeleton>
					<Skeleton>Price goes here on and on</Skeleton>
				</VStack>
				<Stack alignSelf="flex-start" direction={{ base: "column", md: "row" }}>
					<Rating defaultValue={0} size="sm" />
					<Skeleton>Number reviews</Skeleton>
				</Stack>
				<Box display={{ base: "none", lg: "block" }} maxW="xl">
					<SkeletonText noOfLines={2} />
				</Box>
			</Stack>
		</Stack>
		<VStack justifyContent="space-around" h="100%">
			<Skeleton w="full">Hello</Skeleton>
			<VStack gap={2} w={{ base: "full", md: "unset" }}>
				<Skeleton>Item added on 20 May 2023 on 20 May</Skeleton>
				<HStack w="full">
					<Skeleton flexGrow={1}>Hello</Skeleton>
					<Skeleton flexGrow={1}>Hello</Skeleton>
				</HStack>
			</VStack>
		</VStack>
	</Stack>
);
